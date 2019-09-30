import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback , Image, Alert, FlatList, AsyncStorage, Linking } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import ProductCard from '../Components/ProductCard'
import SharedProductActions from '../Redux/SharedProductRedux'
import GetHomepageActions from '../Redux/GetHomepageRedux'
import SettingActions from '../Redux/SettingRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import GetNotificationActions from '../Redux/GetNotificationRedux'
import FastImage from 'react-native-fast-image'
import firebase from 'react-native-firebase'
import {getNewNotificationsCount} from '../Lib/utils'

// Styles
import styles from './Styles/HomeScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

var isReloadPage = false
class HomeScreen extends Component {
  static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.home2 : Images.home)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)

    this.state = {
      products: [],
      banners: [],
      categories: [],
      activeSlide: 0,
      fcmToken: '',
      currentPage: 1,
    }

    this._renderProduct = this._renderProduct.bind(this)
    this.navigate_to = this.navigate_to.bind(this)
  }

  async componentDidMount(){
    this.checkPermission()
    setTimeout(() => {
      this.createNotificationListeners()
      let data = {
        data_request:{
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          fcm_token: this.state.fcmToken
        }
      }
      this.props.getHomepageRequest(data)
      this.props.getSettingRequest(data)
      this.refreshNotification()
    }, 200)
  }

  componentWillUnmount () {
    this.notificationListener()
    this.notificationOpenedListener()
    this.messageListener()
  }

  refreshNotification(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcm_token: this.state.fcmToken
      }
    }
    this.props.getNotificationProcess(data)
  }

  async checkPermission () {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  }

  async getToken () {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }
    this.setState({ fcmToken: fcmToken })
  }

  async requestPermission () {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
    } catch (error) {
    }
  }

  async createNotificationListeners () {
    const channel = new firebase.notifications.Android.Channel('primary', 'Primary', firebase.notifications.Android.Importance.Max).setDescription('Mooimom.id'); //add this line

    firebase.notifications().android.createChannel(channel); //add this line
    /*
     * Triggered when a particular notification has been received in foreground
     * */

    // buka saat aplikasi kebuka
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification
        this.refreshNotification()
        firebase.notifications().displayNotification(notification);
      })

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification
        this.refreshNotification()
      })

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */

    // buka dari notif luar
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification()
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification
      // this.actionGo()
      this.refreshNotification()
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      // this.actReloadOrder()
      const newNotification = new firebase.notifications.Notification()
          .android.setChannelId('primary')
          .android.setSmallIcon('ic_launcher')
          .android.setPriority(firebase.notifications.Android.Priority.Max)
          .setNotificationId(message.messageId)
          .setTitle(message.data.message_title)
          .setBody(message.data.message_body)
          .setData(message.data)
          .setSound('default');
      firebase.notifications().displayNotification(newNotification);
      this.refreshNotification()
    })
  }

  async componentWillReceiveProps (newProps) {
    if (this.props.getHomepage !== newProps.getHomepage) {
      if (
        newProps.getHomepage.payload !== null &&
        newProps.getHomepage.error === null &&
        !newProps.getHomepage.fetching && !isReloadPage
      ) {
          this.setState({
            products: newProps.getHomepage.payload.best_seller,
            banners: newProps.getHomepage.payload.big_banner,
            categories: newProps.getHomepage.payload.categories,
          })
      } else if (
        newProps.getHomepage.payload !== null &&
        newProps.getHomepage.error === null &&
        !newProps.getHomepage.fetching && isReloadPage
      ) {
          var arr = [...this.state.products]
          arr = arr.concat(newProps.getHomepage.payload.best_seller)
          this.setState({
            currentPage: this.state.currentPage + 1,
            products: arr
          })
          isReloadPage = false
      }
    }
  }

  navigate_to(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  pressBanner(item){
    switch(item.type){
      case 'product':
        this.navigate_to('ProductScreen', {
          product_slug: item.slug,
          auth: this.props.auth
        })
        break
      case 'product_category':
        this.navigate_to('Category', {
          category_id: item.slug,
          auth: this.props.auth
        })
        break
      case 'custom_url':
        Linking.canOpenURL(item.slug).then(supported => {
          if (supported) {
            Linking.openURL(item.slug);
          }
        });
        break
    }
  }

  _renderHeroBanner ({item, index}, parallaxProps) {
      var image = Images.default
      if(item.img_url && item.img_url !== '')
        image = {uri:item.img_url}
      return (
        <TouchableWithoutFeedback
        onPress={()=>this.pressBanner.bind(this)(item)}
        >
          <View style={styles.itemHeroBanner}>
              <ParallaxImage
                  source={image}
                  containerStyle={styles.imageContainerHeroBanner}
                  style={styles.imageHeroBanner}
                  parallaxFactor={0.6}
                  {...parallaxProps}
              />
          </View>
        </TouchableWithoutFeedback>
      );
    }

  renderCategories(){
    if(this.state.categories.length > 0)
    return (
      this.state.categories.map((item, index) => {
        var image = Images.default
        if(item.img_url && item.img_url !== '')
          image = {uri:item.img_url}
        return(
          <TouchableOpacity key={index.toString()} style={styles.catButton} onPress={() => this.navigate_to('Category', {category_id: item.slug})}>
            <FastImage source={image} style={styles.catImage} resizeMode={FastImage.resizeMode.contain}/>
            <Text style={styles.catText}>{item.name}</Text>
          </TouchableOpacity>
        )
      })
    )
  }

  _renderProduct ({item, index}) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.navigate_to('ProductScreen', {
          product_slug: item.slug,
          auth: this.props.auth
        })}
      >
        <View>
          <ProductCard
            product={item}
            auth={this.props.auth}
            sharedProductProcess={this.props.sharedProductProcess}
            addWishlistProductProcess={this.props.addWishlistProductProcess}
            deleteWishlistProductProcess={this.props.deleteWishlistProductProcess}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  loadMoreData(){
    if (!isReloadPage) {
      if (this.state.currentPage + 1 <= this.props.getHomepage.payload.total_pages) {
        isReloadPage = true
        let data = {
          data_request:{
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            fcm_token: this.state.fcmToken,
            current_page: this.state.currentPage + 1
          }
        }
        this.props.getHomepageRequest(data)
      }
    }
  }

  isCloseToBottom(nativeEvent){
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent
    const paddingToBottom = Metrics.screenHeight;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render () {
    const { navigate } = this.props.navigation
    var notifCount = 0
    if(this.props.notification.payload && this.props.notification.payload.all_notifications.length > 0){
      notifCount = getNewNotificationsCount(this.props.notification.payload.all_notifications, this.props.lastNotification.payload)
    }
    return (
    <View style={styles.container}>
      <View style={styles.containerScroll}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
        onScroll={({nativeEvent}) => {
          if (this.isCloseToBottom(nativeEvent)) {
            this.loadMoreData();
          }
        }}
        scrollEventThrottle={0}
        >
          <View style={styles.backgroundHeader} />
          <View style={styles.headerWrapper}>
            <View style={styles.headerWrapper1}>
              <View style={styles.headerButtonLeft}>
                <Image source={Images.mooimomLogoWhite} style={styles.logo} />
              </View>
              <View style={styles.headerButtonRight}>
                <TouchableOpacity onPress={() => this.navigate_to('SharedProductScreen')}><Image source={Images.wishlist} style={styles.buttonHeader} /></TouchableOpacity>
                <TouchableOpacity onPress={() => this.navigate_to('CartScreen')}><Image source={Images.shoppingCart} style={styles.buttonHeader} /></TouchableOpacity>
                <TouchableOpacity onPress={() => this.navigate_to('NotificationScreen', {fcmToken: this.state.fcmToken})}>
                  <Image source={Images.notifWhite} style={styles.buttonHeader2} />
                  {notifCount > 0 && <View style={styles.notifContainer}>
                    <Text style={styles.textNotif}>{notifCount}</Text>
                  </View>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.headerWrapper}>
            <View style={styles.headerWrapper2}>
              <TouchableOpacity style={styles.searchButton} onPress={() => this.navigate_to('SearchScreen')}>
                <Image source={Images.search} style={styles.imageSearch}/>
                <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.heroBannerWrapper}>
            <Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={Metrics.screenWidth}
              sliderHeight={220}
              itemWidth={Metrics.screenWidth - 60}
              data={this.state.banners}
              renderItem={this._renderHeroBanner.bind(this)}
              hasParallaxImages={true}
              autoplay={true}
              lockScrollWhileSnapping={true}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            <Pagination
              dotsLength={this.state.banners.length}
              activeDotIndex={this.state.activeSlide}
              dotStyle={styles.paginationDotStyleHeroBanner}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              containerStyle={styles.paginationContainerStyleHeroBanner}
              dotContainerStyle={styles.paginationDotContainerStyleHeroBanner}
            />
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.categoryWrapper}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.renderCategories()}
            </ScrollView>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.productWrapper}>
            <View>
              {this.state.products.length > 0 && <Text style={styles.subTitleWrapper}>Produk Terlaris</Text>}
              <FlatList
                data={this.state.products}
                renderItem={this._renderProduct}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                getItemLayout={(data, index) => (
                  {length: Metrics.screenHeight / 2, offset: Metrics.screenHeight / 2 * index, index}
                )}
              />
            </View>
          </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    getHomepage: state.getHomepage,
    auth:state.auth,
    notification: state.notification,
    setting: state.setting,
    lastNotification: state.lastNotification
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sharedProductProcess: data => {
      dispatch(SharedProductActions.sharedProductRequest(data))
    },
    getHomepageRequest: data => {
      dispatch(GetHomepageActions.getHomepageRequest(data))
    },
    getSettingRequest: data => {
      dispatch(SettingActions.getSettingRequest(data))
    },
    addWishlistProductProcess: data => {
      dispatch(EditWishlistActions.addWishlistRequest(data))
    },
    deleteWishlistProductProcess: data => {
      dispatch(EditWishlistActions.deleteWishlistRequest(data))
    },
    getNotificationProcess: data => {
      dispatch(GetNotificationActions.getNotificationRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
