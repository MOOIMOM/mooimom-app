import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Modal, FlatList, AsyncStorage, Linking, RefreshControl, Platform, Alert } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import ProductCard from '../Components/ProductCard'
import SharedProductActions from '../Redux/SharedProductRedux'
import GetHomepageActions from '../Redux/GetHomepageRedux'
import GetAppVersionActions from '../Redux/GetAppVersionRedux'
import ProfileActions from '../Redux/ProfileRedux'
import SettingActions from '../Redux/SettingRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import GetNotificationActions from '../Redux/GetNotificationRedux'
import FastImage from 'react-native-fast-image'
import firebase from 'react-native-firebase'
import RNAiqua from 'react-native-aiqua-sdk'
import { getNewNotificationsCount } from '../Lib/utils'

import { DotIndicator } from 'react-native-indicators'



// Styles
import styles from './Styles/HomeScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

var isReloadPage = false
class HomeScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => {
      const iconName = (focused ? Images.home2 : Images.home)
      return <Image source={iconName} style={menuStyles.menuImage} />
    },
  };
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      banners: [],
      popups: [],
      categories: [],
      activeSlide: 0,
      activeSlide2: 0,
      fcmToken: '',
      currentPage: 1,
      showPopUp: false,
      seeMore: false,
      refreshing: false,
      forceUpdate: false,
      completeProfile: false
    }

    this._renderProduct = this._renderProduct.bind(this)
    this.navigate_to = this.navigate_to.bind(this)
    this.refreshPage = this.refreshPage.bind(this)


  }

  async componentDidMount() {


    Linking.getInitialURL().then(url => {
      if (url || url !== null) {
        this.navigate(url)
      }
    })

    this.checkPermission()
    setTimeout(() => {
      // this.createNotificationListeners()
      this.refreshPage()
    }, 200)
  }

  handleOpenURL = (event) => {
    this.navigate(event.url)
  }

  navigate = (url) => {
    Alert.alert('AIQUA Deeplink', url)
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    // const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName1 = route.split('/')[1];
    const routeName2 = route.split('/')[2];

    const routeName = routeName1 + '-' + routeName2

    console.log(routeName)

    switch (routeName) {
      case 'app-qr-code-to-app-install-page-store-kokas':
        RNAiqua.logEvent('qr_code_install_page_store_kokas')
        break;
      case 'app-qr-code-to-app-install-page-store-pim':
        RNAiqua.logEvent('qr_code_install_page_store_pim')
        break;
      case 'app-qr-code-to-app-install-page-store-pp':
        RNAiqua.logEvent('qr_code_install_page_store_pp')
        break;
      case 'app-qr-code-to-app-install-page-store-gi':
        RNAiqua.logEvent('qr_code_install_page_store_gi')
        break;
      case 'app-qr-code-to-app-install-page-store-mkg':
        RNAiqua.logEvent('qr_code_install_page_store_mkg')
        break;
      case 'app-qr-code-to-app-install-page-store-lotte-avenue':
        RNAiqua.logEvent('qr_code_install_page_store_lotte-avenue')
        break;
      case 'app-qr-code-to-app-install-page-store-central':
        RNAiqua.logEvent('qr_code_install_page_store_central')
        break;
      case 'app-qr-code-to-app-install-page-store-aeon-bsd':
        RNAiqua.logEvent('qr_code_install_page_store_aeon_bsd')
        break;
      case 'app-qr-code-to-app-install-page-store-aeon-jgc':
        RNAiqua.logEvent('qr_code_install_page_store_kokas')
        break;
      case 'app-qr-code-to-app-install-page-store-kokas':
        RNAiqua.logEvent('qr_code_install_page_store_kokas')
        break;
      case 'app-qr-code-to-brand-nero&bianco':
        RNAiqua.logEvent('qr_code_brand_page_nero&bianco')
        break;
      case 'app-qr-code-to-brand-mooimom':
        RNAiqua.logEvent('qr_code_brand_page_mooimom')
        break;
      case 'app-qr-code-to-brand-tweeling':
        RNAiqua.logEvent('qr_code_brand_page_tweeling')
        break;
      case 'app-qr-code-to-category-page-jeelly':
        RNAiqua.logEvent('qr_code_category_page_jeelly')
        break;
      case 'app-qr-code-to-category-page-klara':
        RNAiqua.logEvent('qr_code_category_page_klara')
        break;
      case 'app-qr-code-to-expo-CBMI':
        RNAiqua.logEvent('qr_code_expo_CBMI')
        break;
      case 'app-qr-code-to-expo-babymamafestival':
        RNAiqua.logEvent('qr_code_expo_babymamafestival')
        break;
      case 'app-qr-code-to-app-install-page-mooimom-box':
        RNAiqua.logEvent('qr_code_install_page_mooimom_box')
        break;
    }
  }

  forceUpdate() {
    if (Platform.OS === 'android') {
      Linking.openURL("https://play.google.com/store/apps/details?id=com.mooimom.id&hl=en")
    }
    else if (Platform.OS === 'ios') {
      Linking.openURL("https://apps.apple.com/id/app/mooimom/id1483723655")
    }
    this.setState({ forceUpdate: false })
  }

  pressCompleteProfile() {
    this.setState({ completeProfile: false })
    this.navigate_to('ProfileCompletionScreen')
  }

  refreshPage() {
    if (!this.state.refreshing) {
      this.setState({
        refreshing: true
      });
      let data = {
        data_request: {
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          fcm_token: this.state.fcmToken
        }
      }
      this.refreshNotification()
      this.props.getAppVersionProcess()
      this.props.getProfileProcess(data)
      this.props.getSettingRequest(data)
      this.props.getHomepageRequest(data)
    }
  }

  componentWillUnmount() {
    // this.notificationListener()
    // this.notificationOpenedListener()
    // this.messageListener()
  }

  refreshNotification() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcm_token: this.state.fcmToken
      }
    }
    this.props.getNotificationProcess(data)
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  } l

  async getToken() {
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

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
    } catch (error) {
    }
  }

  // async createNotificationListeners() {
  //   const channel = new firebase.notifications.Android.Channel('primary', 'Primary', firebase.notifications.Android.Importance.Max).setDescription('Mooimom.id'); //add this line

  //   firebase.notifications().android.createChannel(channel); //add this line
  //   /*
  //    * Triggered when a particular notification has been received in foreground
  //    * */

  //   // buka saat aplikasi kebuka
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       const { title, body } = notification
  //       this.refreshNotification()
  //     })

  //   /*
  //    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //    * */
  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened(notificationOpen => {
  //       const { title, body } = notificationOpen.notification
  //       this.refreshNotification()
  //     })

  //   /*
  //    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //    * */

  //   // buka dari notif luar
  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification()
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification
  //     // this.actionGo()
  //     this.refreshNotification()
  //   }
  //   /*
  //    * Triggered for data only payload in foreground
  //    * */
  //   this.messageListener = firebase.messaging().onMessage(message => {
  //     // this.actReloadOrder()
  //     const newNotification = new firebase.notifications.Notification()
  //       .android.setChannelId('primary')
  //       .android.setSmallIcon('ic_launcher')
  //       .android.setPriority(firebase.notifications.Android.Priority.Max)
  //       .setNotificationId(message.messageId)
  //       .setTitle(message.data.message_title)
  //       .setBody(message.data.message_body)
  //       .setData(message.data)
  //       .setSound('default');
  //     firebase.notifications().displayNotification(newNotification);
  //     this.refreshNotification()
  //   })
  // }


  async componentWillReceiveProps(newProps) {
    if (this.props.getHomepage !== newProps.getHomepage) {
      if (
        newProps.getHomepage.payload !== null &&
        newProps.getHomepage.error === null &&
        !newProps.getHomepage.fetching && !isReloadPage
      ) {
        let popups = newProps.getHomepage.payload.popups
        if (popups.length > 0) {
          this.setState({
            products: newProps.getHomepage.payload.best_seller,
            banners: newProps.getHomepage.payload.big_banner,
            popups: newProps.getHomepage.payload.popups,
            categories: newProps.getHomepage.payload.categories,
            refreshing: false,
            showPopUp: true
          })
        }
        else if (popups.length === 0) {
          this.setState({
            products: newProps.getHomepage.payload.best_seller,
            banners: newProps.getHomepage.payload.big_banner,
            popups: newProps.getHomepage.payload.popups,
            categories: newProps.getHomepage.payload.categories,
            refreshing: false,
            showPopUp: false
          })
        }
      } else if (
        newProps.getHomepage.payload !== null &&
        newProps.getHomepage.error === null &&
        !newProps.getHomepage.fetching && isReloadPage
      ) {
        var arr = [...this.state.products]
        arr = arr.concat(newProps.getHomepage.payload.best_seller)
        this.setState({
          currentPage: this.state.currentPage + 1,
          products: arr,
          refreshing: false
        })
        isReloadPage = false
      }
    }
    if (this.props.profile !== newProps.profile) {
      if (
        newProps.profile.payload !== null &&
        newProps.profile.error === null &&
        !newProps.profile.fetching
      ) {
        if (newProps.profile.payload.name === "" && newProps.profile.payload.email === "" && newProps.profile.payload.gender_slug === "no_data") {
          this.setState({
            completeProfile: true
          })
        }
      }
    }
    if (this.props.getAppVersion !== newProps.getAppVersion) {
      if (
        newProps.getAppVersion.payload !== null &&
        newProps.getAppVersion.error === null &&
        !newProps.getAppVersion.fetching
      ) {

        let ANDROID_APP_VERSION = '1.2.19'
        let IOS_APP_VERSION = '1.2.18'

        let currAndroidVersion = newProps.getAppVersion.payload.android
        let currIOSVersion = newProps.getAppVersion.payload.ios

        if (Platform.OS === 'android') {

          if (currAndroidVersion !== ANDROID_APP_VERSION) {
            console.log('Curr And :', currAndroidVersion, typeof (currAndroidVersion), 'Lat And :', ANDROID_APP_VERSION, typeof (ANDROID_APP_VERSION))
            this.setState({ forceUpdate: true })
          }
        }
        else if (Platform.OS === 'ios') {
          if (currIOSVersion !== IOS_APP_VERSION) {
            console.log('Curr And :', currIOSVersion, typeof (currIOSVersion), 'Lat And :', IOS_APP_VERSION, typeof (IOS_APP_VERSION))
            this.setState({ forceUpdate: true })
          }
        }
      }
    }
  }

  navigate_to(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  pressBanner(item) {
    switch (item.type) {
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
      case 'activity_page':
        switch (item.url) {
          case '[be_merchant]':
            this.navigate_to('BeOurMerchantScreen')
            break;
          case '[event_form]':
            this.navigate_to('EventRegistrationScreen')
            break;
          case '[category_menu]':
            this.navigate_to('Category')
            break;
          case '[homepage]':
            break;
          case '[my_profile]':
            this.navigate_to('Akun')
            break;
          case '[learn_youtube]':
            this.navigate_to('Learn', {
              activeMenu: "video"
            })
            break;
          case '[learn_article]':
            this.navigate_to('Learn', {
              activeMenu: "article"
            })
            break;
          case '[learn_qa]':
            this.navigate_to('Learn', {
              activeMenu: "question"
            })
            break;
          case '[order_history]':
            this.navigate_to('Order')
            break;
        }
        break
    }
  }

  pressPopUp(item) {
    switch (item.type) {
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
      case 'activity_page':
        switch (item.url) {
          case '[event_form]':
            console.log(item.url)
            this.navigate_to('EventRegistrationScreen')
            break;
          case '[category_menu]':
            this.navigate_to('Category')
            break;
          case '[homepage]':
            break;
          case '[my_profile]':
            this.navigate_to('Akun')
            break;
          case '[learn_youtube]':
            this.navigate_to('Learn', {
              activeMenu: "video"
            })
            break;
          case '[learn_article]':
            this.navigate_to('Learn', {
              activeMenu: "article"
            })
            break;
          case '[learn_qa]':
            this.navigate_to('Learn', {
              activeMenu: "question"
            })
            break;
          case '[order_history]':
            this.navigate_to('Order')
            break;
        }
        break
    }
    this.setState({ showPopUp: false })
  }

  _renderHeroBanner({ item, index }) {
    var image = Images.default
    if (item.img_url && item.img_url !== '')
      image = { uri: item.img_url }
    return (
      <TouchableWithoutFeedback
        onPress={() => this.pressBanner.bind(this)(item)}
      >
        <View style={styles.itemHeroBanner}>
          <FastImage
            source={image}
            style={styles.imageHeroBanner}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderCategories() {
    if (this.state.categories.length > 0)
      return (
        this.state.categories.map((item, index) => {
          var image = Images.default
          if (item.img_url && item.img_url !== '')
            image = { uri: item.img_url }
          return (
            <TouchableOpacity key={index.toString()} style={styles.catButton} onPress={() => this.navigate_to('Category', { category_id: item.slug })}>
              <FastImage source={image} style={styles.catImage} resizeMode={FastImage.resizeMode.contain} />
              <Text style={styles.catText}>{item.name}</Text>
            </TouchableOpacity>
          )
        })
      )
  }

  _renderProduct({ item, index }) {
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

  _renderPopUp({ item, index }) {
    image = { uri: item.the_image_mobile }
    return (
      <>
        <View style={{ width: 270, height: 100, justifyContent: 'flex-start', alignItems: 'flex-end', position: 'absolute', zIndex: 1 }}>
          <TouchableOpacity onPress={() => this.setState({ showPopUp: false })} style={{
            width: 25, height: 25,
            justifyContent: 'center', alignItems: 'center',
            borderRadius: 25 / 2, backgroundColor: Colors.white,
            shadowColor: '#CCCCCC',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize1, textAlign: 'center' }}>X</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.pressPopUp.bind(this)(item)}>
          <FastImage source={image} style={{
            marginTop: 10,
            width: 258,
            height: 362
          }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </>
    )
  }

  loadMoreData() {
    if (!isReloadPage && this.props.getHomepage.payload) {
      if (this.state.currentPage + 1 <= this.props.getHomepage.payload.total_pages) {
        isReloadPage = true
        let data = {
          data_request: {
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            fcm_token: this.state.fcmToken,
            current_page: this.state.currentPage + 1
          }
        }
        this.props.getHomepageRequest(data)
      }
      if (this.state.currentPage == this.props.getHomepage.payload.total_pages) {
        this.setState({ seeMore: true })
      }
    }
  }

  isCloseToBottom(nativeEvent) {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
    const paddingToBottom = Metrics.screenHeight;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render() {
    const { navigate } = this.props.navigation
    var notifCount = 0
    var cartCount = this.props.cart.data.length
    if (this.props.notification.payload && this.props.notification.payload.all_notifications.length > 0) {
      notifCount = getNewNotificationsCount(this.props.notification.payload.all_notifications, this.props.lastNotification.payload)
    }
    return (
      <SafeAreaView style={{ backgroundColor: Colors.mooimom, flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.containerScroll}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[2]}
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  this.loadMoreData();
                }
              }}
              scrollEventThrottle={0}
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshPage} />}
            >
              <View style={styles.backgroundHeader} />
              <View style={styles.headerWrapper}>
                <View style={styles.headerWrapper1}>
                  <View style={styles.headerButtonLeft}>
                    <Image source={Images.mooimomLogoWhite} style={styles.logo} />
                  </View>
                  <View style={styles.headerButtonRight}>
                    <TouchableOpacity onPress={() => this.navigate_to('SharedProductScreen')}><Image source={Images.wishlist} style={styles.buttonHeader} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigate_to('CartScreen')}><Image source={Images.shoppingCart} style={styles.buttonHeader} />
                      {cartCount > 0 && <View style={styles.notifContainer}>
                        <Text style={styles.textNotif}>{cartCount}</Text>
                      </View>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigate_to('NotificationScreen', { fcmToken: this.state.fcmToken })}>
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
                    <Image source={Images.search} style={styles.imageSearch} />
                    <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.heroBannerWrapper}>
                <Carousel
                  ref={(carousel) => { this._carousel = carousel; }}
                  sliderWidth={Metrics.screenWidth}
                  itemWidth={Metrics.screenWidth - 60}
                  data={this.state.banners}
                  renderItem={this._renderHeroBanner.bind(this)}
                  autoplay={true}
                  loop={true}
                  lockScrollWhileSnapping={true}
                  onSnapToItem={(index) => this.setState({ activeSlide: index })}
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
              <View style={styles.wrapperSeparator} />
              <View style={styles.categoryWrapper}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {this.renderCategories()}
                </ScrollView>
              </View>
              <View style={styles.wrapperSeparator} />
              <View style={styles.wrapperSeparator} />
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
                      { length: Metrics.screenHeight / 2, offset: Metrics.screenHeight / 2 * index, index }
                    )}
                  />
                  {this.props.getHomepage.fetching &&
                    <DotIndicator color={Colors.mediumGray} size={8} style={{ marginVertical: 20 }} />}
                  {this.state.seeMore &&
                    <TouchableOpacity onPress={() => this.navigate_to('Category')} style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: Colors.white, borderColor: Colors.mooimom, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20, borderRadius: 20, width: '50%', alignSelf: 'center' }}>
                      <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1 }}>See More</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </ScrollView>
            {
              this.state.forceUpdate ?
                <Modal
                  animationType='fade'
                  transparent
                  visible={this.state.forceUpdate}
                  onRequestClose={() => {
                    this.setState({ forceUpdate: false })
                  }}
                >
                  <View style={styles.viewOut}>
                    <TouchableOpacity onPress={() => this.forceUpdate()}>
                      <FastImage source={Images.forceUpdatePopUp} style={{
                        marginTop: 10,
                        width: 258,
                        height: 362
                      }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                  </View>
                </Modal>
                :
                <>
                  <Modal
                    animationType='fade'
                    transparent
                    visible={this.state.completeProfile}
                    onRequestClose={() => {
                      this.setState({ completeProfile: false })
                    }}
                  >
                    <View style={styles.viewOut}>
                      <TouchableOpacity onPress={() => this.pressCompleteProfile()}>
                        <FastImage source={Images.profilePopUp} style={{
                          marginTop: 10,
                          width: 258,
                          height: 362
                        }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </TouchableOpacity>
                    </View>
                  </Modal>
                  <Modal
                    animationType='fade'
                    transparent
                    visible={this.state.showPopUp}
                    onRequestClose={() => {
                      this.setState({ showPopUp: false })
                    }}
                  >
                    <View style={styles.viewOut}>
                      <View style={{ marginTop: 50, height: 372 }}>
                        <Carousel
                          sliderWidth={270}
                          sliderHeight={372}
                          itemWidth={270}
                          itemHeight={372}
                          data={this.state.popups}
                          renderItem={this._renderPopUp.bind(this)}
                          lockScrollWhileSnapping={true}
                          onSnapToItem={(index) => this.setState({ activeSlide2: index })}
                        />
                      </View>
                      <Pagination
                        dotsLength={this.state.popups.length}
                        activeDotIndex={this.state.activeSlide2}
                        dotStyle={styles.paginationDotStyleImage}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                      />
                    </View>
                  </Modal>
                </>
            }
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {
  return {
    getHomepage: state.getHomepage,
    auth: state.auth,
    notification: state.notification,
    setting: state.setting,
    lastNotification: state.lastNotification,
    cart: state.cart,
    profile: state.profile,
    getAppVersion: state.getAppVersion
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
    getAppVersionProcess: () => {
      dispatch(GetAppVersionActions.getAppVersionRequest())
    },
    getProfileProcess: data => {
      dispatch(ProfileActions.getProfileRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
