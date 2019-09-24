import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback , Image, FlatList, Alert, AsyncStorage, Linking } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import ProductCard from '../Components/ProductCard'
import SharedProductActions from '../Redux/SharedProductRedux'
import GetHomepageActions from '../Redux/GetHomepageRedux'
import SettingActions from '../Redux/SettingRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import { CachedImage } from 'react-native-cached-image';
import firebase from 'react-native-firebase'

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
    }, 200)
  }

  componentWillUnmount () {
    this.notificationListener()
    this.notificationOpenedListener()
    this.messageListener()
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
    /*
     * Triggered when a particular notification has been received in foreground
     * */

    // buka saat aplikasi kebuka
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification
        Alert.alert(title, body, [{ text: 'OK'}])
      })

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification
        Alert.alert(title, body, [{ text: 'OK'}])
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
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      // this.actReloadOrder()
    })
  }

  componentWillReceiveProps (newProps) {
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
          category_slug: item.slug,
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
        return (
          <TouchableWithoutFeedback
          onPress={()=>this.pressBanner.bind(this)(item)}
          >
            <View style={styles.itemHeroBanner}>
                <ParallaxImage
                    source={{uri:item.img_url}}
                    containerStyle={styles.imageContainerHeroBanner}
                    style={styles.imageHeroBanner}
                    parallaxFactor={0.6}
                    {...parallaxProps}
                />
            </View>
          </TouchableWithoutFeedback>
        );
    }

  _renderCategories({item, index}){
    return(
      <TouchableOpacity style={styles.catButton} onPress={() => this.navigate_to('Category', {category_id: item.slug})}>
        <CachedImage source={{uri:item.img_url}} style={styles.catImage}/>
        <Text style={styles.catText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  _renderProduct ({item, index}) {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('ProductScreen', {
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
    );
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
                <TouchableOpacity onPress={() => this.navigate_to('NotificationScreen')}><Image source={Images.notifWhite} style={styles.buttonHeader2} /></TouchableOpacity>
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
            <FlatList
              data={this.state.categories}
              renderItem={this._renderCategories.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.productWrapper}>
          <View>
            {this.state.products.length > 0 && <Text style={styles.subTitleWrapper}>Produk Terlaris</Text>}
            <FlatList
              ref={(flatlist) => { this._flatlist = flatlist; }}
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
    setting: state.setting
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
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
