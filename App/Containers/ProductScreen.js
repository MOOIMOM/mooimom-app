import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Platform, TouchableWithoutFeedback, Image, Clipboard, Alert, AsyncStorage, AppState, Linking, Modal } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SharedProductActions from '../Redux/SharedProductRedux'
import GetProductActions from '../Redux/GetProductRedux'
import CartActions from '../Redux/CartRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import SubscribeProductActions from '../Redux/SubscribeProductRedux'
// import UpdateOnlineCartActions from '../Redux/UpdateOnlineCartRedux'
// import GetOnlineCartActions from '../Redux/GetOnlineCartRedux'
// import ChooseFreeGiftActions from '../Redux/ChooseFreeGiftRedux'
import FastImage from 'react-native-fast-image'
import ScaledImage from '../Components/ScaledImage';
import { convertToRupiah, share, shareDescripton, download, titleCase, getNewNotificationsCount } from '../Lib/utils'
import RNAiqua from 'react-native-aiqua-sdk'

import { DotIndicator } from 'react-native-indicators'
// Styles
import styles from './Styles/ProductScreenStyles'

// var cart = []

// AsyncStorage.getItem('cart').then(res => cart = JSON.parse(res))

class ProductScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      product: {},
      isInWishlist: false,
      activeSlide: 0,
      // freeGiftColorSelected: '',
      // freeGiftSizeSelected: '',
      // freeGiftCustomSelected: '',
      colorSelected: '',
      sizeSelected: '',
      customSelected: '',
      modalClipboardVisible: false,
      modalClipboardVisible2: false,
      modalClipboardVisible3: false,
      modalClipboardVisible4: false,
      willShareDescription: false,
      finishShareImage: false,
      socialShare: '',
      isShowSizeGuide: false,
      fcmToken: '',
      isShowError: false,
      qty: 1,
      // shoppingCartId: 0,
      // freeGiftItem: [],
      // freeGiftModal: false
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  async componentDidMount() {
    // this.refreshOnlineCart()
    AppState.addEventListener('change', this._handleAppStateChange);
    this.setState({ fcmToken: await AsyncStorage.getItem('fcmToken') })
    let data = {
      data_request: {
        product_slug: this.props.navigation.state.params.product_slug,
        user_id: this.props.navigation.state.params.auth.payload.user_id,
        unique_token: this.props.navigation.state.params.auth.payload.unique_token,
        fcmToken: this.state.fcmToken
      }
    }
    this.props.loadProductProcess(data)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.navigation.state.params && newProps.navigation.state.params.product_slug
      && newProps.navigation.state.params.product_slug !== this.props.navigation.state.params.product_slug) {
      let data = {
        data_request: {
          product_slug: newProps.navigation.state.params.product_slug,
          user_id: this.props.navigation.state.params.auth.payload.user_id,
          unique_token: this.props.navigation.state.params.auth.payload.unique_token,
          fcmToken: this.state.fcmToken
        }
      }
      this.props.loadProductProcess(data)
    }
    // if (this.props.getOnlineCart !== newProps.getOnlineCart) {
    //   if (
    //     newProps.getOnlineCart.payload !== null &&
    //     newProps.getOnlineCart.error === null &&
    //     !newProps.getOnlineCart.fetching
    //   ) {
    //     this.setState({
    //       shoppingCartId: newProps.getOnlineCart.payload.shopping_cart_id
    //     })
    //   }
    // }
    // if (this.props.updateOnlineCart !== newProps.updateOnlineCart) {
    //   if (
    //     newProps.updateOnlineCart.payload !== null &&
    //     newProps.updateOnlineCart.error === null &&
    //     !newProps.updateOnlineCart.fetching
    //   ) {
    //     if (newProps.updateOnlineCart.payload.success === 1) {
    //       if (newProps.updateOnlineCart.payload.show_popup_ask_user_choose_free_gift === 1) {
    //         this.setState({
    //           freeGiftModal: true,
    //           freeGiftItem: newProps.updateOnlineCart.payload.the_free_gift_product
    //         })
    //       }
    //     }
    //   }
    // }
    if (this.props.cart !== newProps.cart) {
      if (
        newProps.cart.payload !== null &&
        newProps.cart.error === null &&
        !newProps.cart.fetching
      ) {
        let logData = {
          category_name: this.state.product.category_name,
          product_id: this.state.product.product_id,
          product_name: this.state.product.product_name,
          product_image_url: this.state.product.img_url,
          product_url: `www.mooimom.id/product/${this.state.product.slug}`,
          product_price: this.state.product.product_regular_price
        }
        console.log('RNAiqua product_added_to_cart', logData)
        RNAiqua.logEvent('product_added_to_cart', logData)
      }
    }

    if (this.props.editWishlist !== newProps.editWishlist) {
      if (
        newProps.editWishlist.payload !== null &&
        newProps.editWishlist.error === null &&
        !newProps.editWishlist.fetching
      ) {
        let logData = {
          category_name: this.state.product.category_name,
          product_id: this.state.product.product_id,
          product_name: this.state.product.product_name,
          product_image_url: this.state.product.img_url,
          product_url: `www.mooimom.id/product/${this.state.product.slug}`,
          product_price: this.state.product.product_regular_price
        }
        console.log('RNAiqua product_added_to_wishlist', logData)
        RNAiqua.logEvent('product_added_to_wishlist', logData)
      }
    }
    // if (this.props.chooseFreeGift !== newProps.chooseFreeGift) {
    //   if (
    //     newProps.chooseFreeGift.payload !== null &&
    //     newProps.chooseFreeGift.error === null &&
    //     !newProps.chooseFreeGift.fetching
    //   ) {
    //     if (newProps.chooseFreeGift.payload.success === 1) {
    //       this.setState({ freeGiftModal: false })
    //     }
    //   }
    // }
    if (this.props.product !== newProps.product) {
      if (
        newProps.product.payload !== null &&
        newProps.product.error === null &&
        !newProps.product.fetching
      ) {
        var color = this.state.colorSelected
        var size = this.state.sizeSelected
        var custom = this.state.customSelected
        if (color === '' && size === '' && custom === '') {
          var i = 0, data;
          while (i < newProps.product.payload.all_product_variations_with_stock_data.length) {
            data = newProps.product.payload.all_product_variations_with_stock_data[i]
            if (data.stock_quantity > 0) {
              color = data.color_slug
              size = data.size_slug
              custom = data.custom_attribute_1_slug
              break;
            }
            i++
          }
        }
        this.setState({
          product: newProps.product.payload,
          // freeGiftColorSelected: color,
          // freeGiftSizeSelected: size,
          // freeGiftCustomSelected: custom,
          colorSelected: color,
          sizeSelected: size,
          customSelected: custom,
          isInWishlist: newProps.product.payload.wishlist === 1,
          isShowError: false,
          qty: 1
        })

        let logData = {
          category_name: newProps.product.payload.category_name,
          product_id: newProps.product.payload.product_id,
          product_name: newProps.product.payload.product_name,
          product_image_url: newProps.product.payload.img_url,
          product_url: `www.mooimom.id/product/${newProps.product.payload.slug}`,
          product_price: newProps.product.payload.product_regular_price
        }
        console.log('RNAiqua product_viewed', logData)
        RNAiqua.logEvent('product_viewed', logData)

      } else if (newProps.product.payload === null
        && !newProps.product.fetching
      ) {
        this.setState({
          isShowError: true
        })
      }
    }
  }

  // onPressClaimFreeGift() {
  //   if (!this.props.product.payload || !this.props.product.payload.all_product_variations_with_stock_data)
  //     return;
  //   var arr = this.props.product.payload.all_product_variations_with_stock_data
  //   var sku = ''
  //   var qty = this.state.qty
  //   for (var i = 0; i < arr.length; i++) {
  //     if (arr[i].color_slug === this.state.colorSelected
  //       && arr[i].size_slug === this.state.sizeSelected
  //       && arr[i].custom_attribute_1_slug === this.state.customSelected) {
  //       if (arr[i].stock_quantity > 0) {
  //         sku = arr[i].sku
  //         if (arr[i].stock_quantity < this.state.qty) {
  //           qty = arr[i].stock_quantity
  //           this.setState({
  //             qty: qty
  //           })
  //         }
  //       }
  //       break;
  //     }
  //   }

  //   let data2 = {
  //     data_request: {
  //       user_id: this.props.navigation.state.params.auth.payload.user_id,
  //       unique_token: this.props.navigation.state.params.auth.payload.unique_token,
  //       shopping_cart_id: this.state.shoppingCartId,
  //       chosen_free_gift_product_sku: this.props.product.payload.sku,
  //       chosen_size_slug: this.state.freeGiftSizeSelected,
  //       chosen_color_slug: this.state.freeGiftColorSelected,
  //       chosen_custom_attribute_1_slug: this.state.freeGiftCustomSelected,
  //       the_product_variation_sku_user_added: sku,
  //     }
  //   }
  //   this.props.chooseFreeGiftProcess(data2)
  // }

  // refreshOnlineCart() {
  //   let data2 = {
  //     data_request: {
  //       user_id: this.props.navigation.state.params.auth.payload.user_id,
  //       unique_token: this.props.navigation.state.params.auth.payload.unique_token,
  //     }
  //   }
  //   console.log('resfresing')
  //   this.props.getOnlineCartProcess(data2)
  // }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (this.state.willShareDescription === true) {
        this.setState({
          finishShareImage: true
        })
        setTimeout(() => {
          shareDescripton(this.state.product.product_content, this.state.socialShare)
          this.setState({
            willShareDescription: false,
            socialShare: ''
          })
        }, 1000);
      }
    }
    this.setState({ appState: nextAppState });
  };

  subscribeProduct() {
    let data = {
      data_request: {
        product_slug: this.state.product.slug,
        user_id: this.props.navigation.state.params.auth.payload.user_id,
        unique_token: this.props.navigation.state.params.auth.payload.unique_token,
        fcmToken: this.state.fcmToken
      }
    }
    this.props.subscribeProductProcess(data)
    Alert.alert(
      '',
      'Kami akan memberi tahu Anda lewat notifikasi ketika barang sudah tersedia',
    )
  }

  async shareSocial(social) {
    this.setState({
      modalClipboardVisible3: true
    })
    if (social === 'whatsapp') {
      const url = `whatsapp://send?phone=6281288446533`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          if (this.state.willShareDescription === false) {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible3: false
              })
            }, 3000);
            this.setState({
              willShareDescription: true,
              finishShareImage: false,
              socialShare: social
            });
            share(this.state.product.images, social)
          } else {
            Clipboard.setString(this.state.product.product_content);
            share(this.state.product.images, social)
          }
          let data = {
            product: this.state.product
          }
          this.props.sharedProductProcess(data)
        } else {
          setTimeout(() => {
            this.setState({
              modalClipboardVisible3: false
            })
          }, 1000);
          Alert.alert(
            'Sorry',
            'WhatsApp is not installed on your phone',
          )
        }
      })
    } else if (social === 'facebook') {
      const url = `fb://profile/mooimom.id`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          setTimeout(() => {
            this.setState({
              modalClipboardVisible3: false
            })
          }, 3000);
          Clipboard.setString(this.state.product.product_content);
          share(this.state.product.images, social)
        } else {
          setTimeout(() => {
            this.setState({
              modalClipboardVisible3: false
            })
          }, 1000);
          Alert.alert(
            'Sorry',
            'Facebook is not installed on your phone',
          )
        }
        let data = {
          product: this.state.product
        }
        this.props.sharedProductProcess(data)
      })
    } else if (social === 'instagram') {
      const url = `instagram://user?username=mooimom.id`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          setTimeout(() => {
            this.setState({
              modalClipboardVisible3: false
            })
          }, 3000);
          Clipboard.setString(this.state.product.product_content);
          share(this.state.product.images, social)
        } else {
          setTimeout(() => {
            this.setState({
              modalClipboardVisible3: false
            })
          }, 1000);
          Alert.alert(
            'Sorry',
            'Instagram is not installed on your phone',
          )
        }
        let data = {
          product: this.state.product
        }
        this.props.sharedProductProcess(data)
      })
    } else {
      setTimeout(() => {
        this.setState({
          modalClipboardVisible3: false
        })
      }, 3000);
      if (Platform.OS === 'ios') {
        this.setState({
          willShareDescription: true,
          finishShareImage: false,
          socialShare: social
        });
      }
      Clipboard.setString(this.state.product.product_content);
      let res = await share(this.state.product.images, social)
      if (res && Platform.OS === 'ios') {
        shareDescripton(this.state.product.product_content, social)
        this.setState({
          finishShareImage: true
        })
        setTimeout(() => {
          this.setState({
            willShareDescription: false,
            socialShare: ''
          })
        }, 2000);
      }
      let data = {
        product: this.state.product
      }
      this.props.sharedProductProcess(data)
    }
  }

  async copyText() {
    this.setState({
      modalClipboardVisible: true
    })
    await Clipboard.setString(this.state.product.product_content);
    setTimeout(() => {
      this.setState({
        modalClipboardVisible: false
      })
    }, 1000);
  }

  async downloadImages() {
    this.setState({
      modalClipboardVisible4: true
    })
    let finish = await download(this.state.product.all_images_mobile_custom)
    if (finish) {
      this.setState({
        modalClipboardVisible2: true,
        modalClipboardVisible4: false
      })
      setTimeout(() => {
        this.setState({
          modalClipboardVisible2: false
        })
      }, 1000);
    }
  }

  selectColor(slug) {
    if (this.state.colorSelected === slug) return;
    this.setState({
      colorSelected: slug
    })
    let data = {
      data_request: {
        product_slug: this.state.product.slug,
        user_id: this.props.navigation.state.params.auth.payload.user_id,
        unique_token: this.props.navigation.state.params.auth.payload.unique_token,
        color_slug: slug,
        size_slug: this.state.sizeSelected,
        custom_attribute_slug: this.state.customSelected,
      }
    }
    this.props.loadProductVariationProcess(data)
  }

  freeGiftSelectColor(slug) {
    if (this.state.freeGiftColorSelected === slug) return;
    this.setState({
      freeGiftColorSelected: slug
    })
  }

  onWishlistPress() {
    if (!this.state.isInWishlist) {
      let data = {
        data_request: {
          user_id: this.props.navigation.state.params.auth.payload.user_id,
          unique_token: this.props.navigation.state.params.auth.payload.unique_token,
          product_slug: this.state.product.slug
        }
      }
      this.props.addWishlistProductProcess(data)

      let logData = {
        category_name: this.state.product.category_name,
        product_id: this.state.product.product_id,
        product_name: this.state.product.product_name,
        product_image_url: this.state.product.img_url,
        product_url: `www.mooimom.id/product/${this.state.product.slug}`,
        product_price: this.state.product.product_regular_price
      }
      console.log('RNAiqua product_added_to_wishlist', logData)
      RNAiqua.logEvent('product_added_to_wishlist', logData)
    } else {
      let data = {
        data_request: {
          user_id: this.props.navigation.state.params.auth.payload.user_id,
          unique_token: this.props.navigation.state.params.auth.payload.unique_token,
          product_slug: this.state.product.slug
        }
      }
      this.props.deleteWishlistProductProcess(data)
    }
    this.setState({
      isInWishlist: !this.state.isInWishlist
    })
  }

  renderWishlistButton() {
    var image = Images.wishlistProduct
    if (this.state.isInWishlist)
      image = Images.isWishlistProduct
    return (
      <TouchableWithoutFeedback onPress={() => this.onWishlistPress()}>
        <View style={styles.wishlistBtn}>
          <Image source={image} style={styles.wishlistImage} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderImage({ item, index }, parallaxProps) {
    var image = Images.default
    if (item.url && item.url !== '')
      image = { uri: item.url }
    return (
      <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain} />
    );
  }

  renderRating() {
    var stars = []
    var rating = this.state.product.average_review
    var review = this.state.product.total_review
    for (var i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push({ img: Images.star, id: i })
      } else {
        stars.push({ img: Images.starEmpty, id: i })
      }
    }
    return (
      <View style={styles.ratingWrapper}>
        <View style={styles.ratingStarWrapper}>
          {stars.map((star) => {
            return (
              <Image key={star.id} source={star.img} style={styles.reviewStar} />
            )
          })}
        </View>
        <Text style={styles.ratingText}>{review} reviews</Text>
      </View>
    )
  }

  renderEmpty() {
    if (this.state.product && this.state.product.stock < 1)
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText1}>Produk Habis Terjual</Text>
          <Text style={styles.emptyText2}>Akan restock segera</Text>
          <Text style={styles.emptyText3}>Klik untuk mendapatkan notifikasi</Text>
          <Text style={styles.emptyText3}>jika barang sudah tersedia</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => this.subscribeProduct()}>
            <Text style={styles.emptyTextBtn}>KABARI BILA TERSEDIA</Text>
          </TouchableOpacity>
        </View>
      )
  }

  renderColor() {
    if (this.state.product.colors && this.state.product.colors.length > 0)
      return (
        <>
          <View style={styles.colorWrapper}>
            <Text style={styles.productSubtitle}>Warna</Text>
            <View style={styles.colorContainer}>
              {this.state.product.colors.map((data) => {
                let isEmpty = this.checkEmpty(data.slug, 1)
                let styleDisabled
                if (isEmpty)
                  styleDisabled = styles.buttonColorDisabled
                var image = Images.default
                if (data.image_url && data.image_url !== '')
                  image = { uri: data.image_url }
                return (
                  <TouchableOpacity key={data.slug} onPress={
                    () => this.selectColor(data.slug)} disabled={isEmpty}>
                    <FastImage source={image} style={[styles.colorButton, this.colorStyling(data.slug, data.color)]} />
                    <View style={styleDisabled} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
  }

  renderFreeGiftColor() {
    if (this.state.freeGiftItem.colors && this.state.freeGiftItem.colors.length > 0)
      return (
        <>
          <View style={[styles.colorWrapper, { alignSelf: 'flex-start', paddingVertical: 10 }]}>
            <Text style={[styles.productSubtitle, { fontSize: Metrics.fontSize1 }]}>Warna</Text>
            <View style={styles.colorContainer}>
              {this.state.freeGiftItem.colors.map((data) => {
                let isEmpty = this.checkEmpty(data.slug, 1)
                let styleDisabled
                if (isEmpty)
                  styleDisabled = styles.buttonColorDisabled
                var image = Images.default
                if (data.image_url && data.image_url !== '')
                  image = { uri: data.image_url }
                return (
                  <TouchableOpacity key={data.slug} onPress={
                    () => this.freeGiftSelectColor(data.slug)} disabled={isEmpty}>
                    <FastImage source={image} style={[styles.colorButton, this.colorStyling(data.slug, data.color), { width: 20 * Metrics.screenWidth / 320, height: 20 * Metrics.screenWidth / 320 }]} />
                    <View style={styleDisabled} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
  }

  colorStyling(id, color) {
    if (id === this.state.colorSelected) {
      return styles.colorButtonSelected
    }
  }

  checkEmpty(id, type) {
    var data = this.state.product.all_product_variations_with_stock_data
    if (data.length < 1) return true
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 1:
          if (data[i].color_slug === id
            && data[i].size_slug === this.state.sizeSelected
            && data[i].custom_attribute_1_slug === this.state.customSelected
          ) {
            return data[i].stock_quantity === 0
          }
          break;
        case 2:
          if (data[i].size_slug === id
            && data[i].color_slug === this.state.colorSelected
            && data[i].custom_attribute_1_slug === this.state.customSelected
          ) {
            return data[i].stock_quantity === 0
          }
          break;
        case 3:
          if (data[i].custom_attribute_1_slug === id
            && data[i].size_slug === this.state.sizeSelected
            && data[i].color_slug === this.state.colorSelected
          ) {
            return data[i].stock_quantity === 0
          }
          break;
      }
    }
    return true
  }

  renderSize() {
    if (this.state.product.sizes && this.state.product.sizes.length > 0)
      return (
        <>
          <View style={styles.sizeWrapper}>
            <Text style={styles.productSubtitle}>Ukuran</Text>
            <View style={styles.sizeContainer}>
              {this.state.product.sizes.map((data) => {
                let isEmpty = this.checkEmpty(data.slug, 2)
                let styleDisabled
                if (isEmpty)
                  styleDisabled = styles.buttonDisabled
                return (
                  <TouchableOpacity style={[styles.sizeButton, this.sizeStyling(data.slug), styleDisabled]} key={data.slug} onPress={
                    () => this.setState({
                      sizeSelected: data.slug
                    })
                  } disabled={isEmpty}>
                    <Text style={styles.sizeText}>{data.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
  }

  renderFreeGiftSize() {
    if (this.state.freeGiftItem.sizes && this.state.freeGiftItem.sizes.length > 0)
      return (
        <>
          <View style={[styles.sizeWrapper, { alignSelf: 'flex-start', paddingBottom: 10 }]}>
            <Text style={[styles.productSubtitle, { fontSize: Metrics.fontSize1 }]}>Ukuran</Text>
            <View style={styles.sizeContainer}>
              {this.state.product.sizes.map((data) => {
                let isEmpty = this.checkEmpty(data.slug, 2)
                let styleDisabled
                if (isEmpty)
                  styleDisabled = styles.buttonDisabled
                return (
                  <TouchableOpacity style={[styles.sizeButton, { width: 40 * Metrics.screenWidth / 320, height: 20 * Metrics.screenWidth / 320 }, this.sizeStyling(data.slug), styleDisabled]} key={data.slug} onPress={
                    () => this.setState({
                      freeGiftSizeSelected: data.slug
                    })
                  } disabled={isEmpty}>
                    <Text style={styles.sizeText}>{data.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
  }

  sizeStyling(id) {
    if (id === this.state.sizeSelected) {
      return styles.sizeButtonSelected
    }
  }

  renderCustomAttribute() {
    if (this.state.product.custom_attributes && this.state.product.custom_attributes.length > 0) {
      var title = titleCase(this.state.product.custom_attribute_text)
      return (
        <>
          <View style={styles.sizeWrapper}>
            <Text style={styles.productSubtitle}>{title}</Text>
            <View style={styles.sizeContainer}>
              {this.state.product.custom_attributes.map((data) => {
                let isEmpty = this.checkEmpty(data.slug, 3)
                let styleDisabled
                if (isEmpty)
                  styleDisabled = styles.buttonDisabled
                return (
                  <TouchableOpacity style={[styles.sizeButton, this.customStyling(data.slug), styleDisabled]} key={data.slug} onPress={
                    () => this.setState({
                      customSelected: data.slug
                    })
                  } disabled={isEmpty}>
                    <Text style={styles.sizeText}>{data.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
    }
  }

  renderFreeGiftCustomAttribute() {
    if (this.state.freeGiftItem.custom_attributes && this.state.freeGiftItem.custom_attributes.length > 0) {
      var title = titleCase(this.state.freeGiftItem.custom_attribute_text)
      return (
        <>
          <View style={[styles.sizeWrapper, { paddingBottom: 10 }]}>
            <Text style={[styles.productSubtitle, { fontSize: Metrics.fontSize2 }]}>{title}</Text>
            <View style={styles.sizeContainer}>
              {this.state.product.custom_attributes.map((data) => {
                let isEmpty = this.checkEmpty(data.slug, 3)
                let styleDisabled
                if (isEmpty)
                  styleDisabled = styles.buttonDisabled
                return (
                  <TouchableOpacity style={[styles.sizeButton, { width: 40 * Metrics.screenWidth / 320, height: 20 * Metrics.screenWidth / 320 }, this.customStyling(data.slug), styleDisabled]} key={data.slug} onPress={
                    () => this.setState({
                      freeGiftCustomSelected: data.slug
                    })
                  } disabled={isEmpty}>
                    <Text style={[styles.sizeText, { fontSize: Metrics.fontSize1 }]}>{data.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
    }
  }

  minQty() {
    if (this.state.qty > 1) {
      this.setState({
        qty: this.state.qty - 1
      })
    }
  }

  addQty() {
    this.setState({
      qty: this.state.qty + 1
    })
  }

  renderQty() {
    if (this.state.product.stock > 0)
      return (
        <>
          <View style={styles.qtyWrapper}>
            <Text style={styles.productSubtitle}>Qty</Text>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={this.minQty.bind(this)}><View style={styles.btnQty}>
                <Text style={styles.dropdown_text}>-</Text></View></TouchableOpacity>
              <View style={styles.qtyText}><Text style={styles.dropdown_text}>{this.state.qty}</Text></View>
              <TouchableOpacity onPress={this.addQty.bind(this)}><View style={styles.btnQty}><Text style={styles.dropdown_text}>+</Text></View></TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
  }

  customStyling(id) {
    if (id === this.state.customSelected) {
      return styles.sizeButtonSelected
    }
  }

  renderSizeGuide() {
    if (this.state.product.show_size_guide_button)
      return (
        <>
          <View style={styles.sizeGuideWrapper}>
            <TouchableOpacity onPress={() => this.setState({
              isShowSizeGuide: true
            })}>
              <View style={styles.sizeGuideWrapper2}>
                <View style={styles.sizeGuideLeft}>
                  <Text style={styles.productSubtitle}>Size Guide</Text>
                  <Image source={Images.sizeGuide} style={styles.imageSizeGuide} />
                </View>
                <View style={styles.sizeGuideRight}>
                  <Image source={Images.rightArrowBlack} style={styles.buttonSizeGuide} />
                </View>
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.isShowSizeGuide}
              onRequestClose={() => {
                this.setState({
                  isShowSizeGuide: false
                })
              }}>
              <SafeAreaView style={styles.sizeGuideWrapperContainer}>
                <View style={styles.headerWrapper}>
                  <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.setState({
                    isShowSizeGuide: false
                  })}>
                    <Image source={Images.back} style={styles.buttonHeader} />
                  </TouchableOpacity>
                </View>
                <View style={styles.sizeGuideWrapperContainer2}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <Text style={styles.textRincian}>Rincian Ukuran</Text>
                    <Text style={styles.textRincian2}>Cara Mengukur</Text>
                    <View style={styles.wrapperSeparator} />
                    {this.state.product.picture_for_how_to_measure_url && this.state.product.picture_for_how_to_measure_url !== '' && <FastImage source={{ uri: this.state.product.picture_for_how_to_measure_url }} style={styles.imageHowTo} resizeMode={FastImage.resizeMode.contain} />}
                    <View style={styles.wrapperSeparator} />
                    <Text style={styles.textRincian3}>{this.state.product.text_for_how_to_measure}</Text>
                    {this.renderTableFrontend(this.state.product.how_to_measure_table_header_frontend, this.state.product.how_to_measure_table_frontend)}
                    {this.renderTableFrontend(this.state.product.how_to_measure_table_header_extra_frontend, this.state.product.how_to_measure_table_extra_frontend)}
                    <Text style={styles.textRincian2}>Fitting Report</Text>
                    <View style={styles.wrapperSeparator} />
                    <Text style={styles.textRincian3}>{this.state.product.suggestion_text}</Text>
                    {this.renderTableFrontend(this.state.product.suggestion_table_header_frontend, this.state.product.suggestion_table_frontend)}
                  </ScrollView>
                </View>
              </SafeAreaView>
            </Modal>
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
  }

  renderTableFrontend(header, content) {
    if (!header || !content || content.length < 1) return (<View />)
    return (
      <View>
        <View style={styles.headerTable}>
          {header.column_1 !== "" && <Text style={styles.headerTableText}>{header.column_1}</Text>}
          {header.column_2 !== "" && <Text style={styles.headerTableText}>{header.column_2}</Text>}
          {header.column_3 !== "" && <Text style={styles.headerTableText}>{header.column_3}</Text>}
          {header.column_4 !== "" && <Text style={styles.headerTableText}>{header.column_4}</Text>}
          {header.column_5 !== "" && <Text style={styles.headerTableText}>{header.column_5}</Text>}
          {header.column_6 !== "" && <Text style={styles.headerTableText}>{header.column_6}</Text>}
          {header.column_7 !== "" && <Text style={styles.headerTableText}>{header.column_7}</Text>}
          {header.column_8 !== "" && <Text style={styles.headerTableText}>{header.column_8}</Text>}
          {header.column_9 !== undefined && header.column_9 !== "" && <Text style={styles.headerTableText}>{header.column_9}</Text>}
          {header.column_10 !== undefined && header.column_10 !== "" && <Text style={styles.headerTableText}>{header.column_10}</Text>}
        </View>
        {content.map((data, index) => {
          return (
            <View style={styles.tableContent} key={index.toString()}>
              {data.column_1 !== "" && <Text style={styles.tableText}>{data.column_1}</Text>}
              {data.column_2 !== "" && <Text style={styles.tableText}>{data.column_2}</Text>}
              {data.column_3 !== "" && <Text style={styles.tableText}>{data.column_3}</Text>}
              {data.column_4 !== "" && <Text style={styles.tableText}>{data.column_4}</Text>}
              {data.column_5 !== "" && <Text style={styles.tableText}>{data.column_5}</Text>}
              {data.column_6 !== "" && <Text style={styles.tableText}>{data.column_6}</Text>}
              {data.column_7 !== "" && <Text style={styles.tableText}>{data.column_7}</Text>}
              {data.column_8 !== "" && <Text style={styles.tableText}>{data.column_8}</Text>}
              {data.column_9 !== undefined && data.column_9 !== "" && <Text style={styles.tableText}>{data.column_9}</Text>}
              {data.column_10 !== undefined && data.column_10 !== "" && <Text style={styles.tableText}>{data.column_10}</Text>}
            </View>
          )
        })}
      </View>
    )
  }

  renderImagesCustom() {
    if (this.state.product.all_images_mobile_custom && this.state.product.all_images_mobile_custom.length > 0) {
      return (
        <>
          <View style={styles.customImagesContainer}>
            <TouchableOpacity style={styles.btnDownload} onPress={() => this.downloadImages()}>
              <Text style={styles.textCopy}>Download Images</Text>
            </TouchableOpacity>
            {this.state.product.all_images_mobile_custom.map((image, index) => {
              return (
                <ScaledImage key={index.toString()} uri={image.url} width={Metrics.screenWidth - 40} />
              )
            })}
          </View>
          <View style={styles.wrapperSeparator} />
        </>
      )
    }
  }

  renderReview() {
    if (this.state.product.reviews && this.state.product.reviews.length > 0)
      return (
        <View style={styles.reviewWrapper}>
          <Text style={styles.productSubtitle}>Ulasan Produk</Text>
          {this.state.product.reviews.map((item, index) => {
            var stars = []
            for (var i = 1; i <= 5; i++) {
              if (i <= item.star) {
                stars.push({ img: Images.star, id: i })
              } else {
                stars.push({ img: Images.starEmpty, id: i })
              }
            }
            return (
              <View style={styles.reviewContainer} key={index.toString()}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.reviewName1}>Oleh </Text><Text style={styles.reviewName2}> {item.name}</Text>
                </View>
                <View style={styles.reviewStarWrapper}>
                  {stars.map((star) => {
                    return (
                      <Image key={star.id} source={star.img} style={styles.reviewStar} />
                    )
                  })}
                </View>
                <View style={styles.reviewDescriptionWrapper}>
                  <Text style={styles.reviewTitle}>{item.review_title}</Text>
                  <Text style={styles.textReview}>{item.review_content}</Text>
                </View>
                <View style={styles.reviewImageWrapper}>
                  {item.images.map((image, index) => {
                    var image_review = Images.default
                    if (image.url && image.url !== '')
                      image_review = { uri: image.url }
                    return (
                      <FastImage key={index} source={image_review} style={styles.reviewImage} resizeMode={FastImage.resizeMode.contain} />
                    )
                  })}
                </View>
              </View>
            )
          })}
        </View>
      )
  }

  addToCart() {
    if (!this.props.product.payload || !this.props.product.payload.all_product_variations_with_stock_data)
      return;
    var arr = this.props.product.payload.all_product_variations_with_stock_data
    var sku = ''
    var qty = this.state.qty
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].color_slug === this.state.colorSelected
        && arr[i].size_slug === this.state.sizeSelected
        && arr[i].custom_attribute_1_slug === this.state.customSelected) {
        if (arr[i].stock_quantity > 0) {
          sku = arr[i].sku
          if (arr[i].stock_quantity < this.state.qty) {
            qty = arr[i].stock_quantity
            this.setState({
              qty: qty
            })
          }
        }
        break;
      }
    }
    if (sku === '') {
      Alert.alert(
        'Sorry',
        'The product you wish to buy is empty',
      )
      return;
    }
    let data = {
      product: this.props.product.payload,
      color: this.state.colorSelected,
      size: this.state.sizeSelected,
      custom: this.state.customSelected,
      sku: sku,
      qty: qty
    }

    // let dataCart = '['
    // dataCart = dataCart + '{"sku":"' + sku + '","quantity":' + qty + '},'
    // if (dataCart.length > 1)
    //   dataCart = dataCart.substring(0, dataCart.length - 1)
    // dataCart = dataCart + ']'

    // let data2 = {
    //   data_request: {
    //     user_id: this.props.navigation.state.params.auth.payload.user_id,
    //     unique_token: this.props.navigation.state.params.auth.payload.unique_token,
    //     shopping_cart_id: this.state.shoppingCartId,
    //     product_variations_user_want_to_buy: dataCart,
    //     the_product_variation_sku_user_added: sku,
    //   }
    // }

    // this.props.updateOnlineCartProcess(data2)
    this.props.addToCartProcess(data)
    Alert.alert(
      '',
      'Produk Berhasil Ditambahkan!',
    )
  }

  render() {
    if (this.props.product.fetching && (!this.state.product.product_name || this.state.product.product_name === '')) {
      return (
        <View style={styles.containerLoading2}>
          <DotIndicator size={12} color={Colors.mooimom} />
        </View>
      )
    }
    var notifCount = 0
    if (this.props.notification.payload && this.props.notification.payload.all_notifications.length > 0) {
      notifCount = getNewNotificationsCount(this.props.notification.payload.all_notifications, this.props.lastNotification.payload)
    }
    if (this.state.isShowError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
              <Image source={Images.back} style={styles.buttonHeader} />
            </TouchableOpacity>
            <View style={styles.headerButtonCenter}>
              <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
                <Image source={Images.search} style={styles.imageSearch} />
                <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.headerButtonRight}>
              <TouchableOpacity onPress={() => this.actNavigate('SharedProductScreen')}><Image source={Images.wishlistBlack} style={styles.buttonHeader} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.actNavigate('CartScreen')}><Image source={Images.shoppingCartBlack} style={styles.buttonHeader} />
                {this.props.cart.data.length > 0 && <View style={styles.notifContainer}>
                  <Text style={styles.textNotif}>{this.props.cart.data.length}</Text>
                </View>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.actNavigate('NotificationScreen')}><Image source={Images.notif} style={styles.buttonHeader2} />
                {notifCount > 0 && <View style={styles.notifContainer2}>
                  <Text style={styles.textNotif}>{notifCount}</Text>
                </View>}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productContainer}>
            <View style={styles.descriptionWrapper2}>
              <View style={styles.descriptionHeader2}>
                <Text style={styles.productSubtitle2}>Maaf</Text>
                <Text style={styles.productSubtitle2}>Produk Tidak Ditemukan</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )
    }
    var price = ''
    var disc = ''
    if (this.state.product && this.state.product.product_regular_price > 0) {
      price = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_sale_price) : convertToRupiah(this.state.product.product_regular_price)
      disc = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_regular_price) : ''
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
          <View style={styles.headerButtonCenter}>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch} />
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerButtonRight}>
            <TouchableOpacity onPress={() => this.actNavigate('SharedProductScreen')}><Image source={Images.wishlistBlack} style={styles.buttonHeader} /></TouchableOpacity>
            <TouchableOpacity onPress={() => this.actNavigate('CartScreen')}><Image source={Images.shoppingCartBlack} style={styles.buttonHeader} />
              {this.props.cart.data.length > 0 && <View style={styles.notifContainer}>
                <Text style={styles.textNotif}>{this.props.cart.data.length}</Text>
              </View>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.actNavigate('NotificationScreen')}><Image source={Images.notif} style={styles.buttonHeader2} />
              {notifCount > 0 && <View style={styles.notifContainer2}>
                <Text style={styles.textNotif}>{notifCount}</Text>
              </View>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {this.state.product.images && <View style={styles.productImageWrapper}>
              <Carousel
                sliderWidth={Metrics.screenWidth}
                sliderHeight={Metrics.screenWidth}
                itemWidth={Metrics.screenWidth}
                data={this.state.product.images}
                renderItem={this._renderImage}
                lockScrollWhileSnapping={true}
                onSnapToItem={(index) => this.setState({ activeSlide: index })}
              />
              <Pagination
                dotsLength={this.state.product.images.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={styles.paginationDotStyleImage}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.paginationContainerStyleImage}
                dotContainerStyle={styles.paginationDotContainerStyleImage}
              />
              {this.renderWishlistButton()}
            </View>}
            <View style={styles.wrapperSeparator} />
            <View style={styles.productDescriptionWrapper}>
              <Text style={styles.productCode}>PRODUCT CODE - {this.state.product.sku}</Text>
              <Text style={styles.productName}>{this.state.product.product_name}</Text>
              <View style={styles.priceGroup}>
                <Text style={styles.productPrice}>{price}</Text>
                <Text style={styles.productPriceDiscount}>{disc}</Text>
              </View>
            </View>
            {Platform.OS !== 'ios' && <View style={styles.wrapperSeparator} />}
            {Platform.OS !== 'ios' && <View style={styles.shareSocialWrapper}>
              <TouchableOpacity style={styles.shareSocialButton} onPress={() => this.shareSocial('instagram')}>
                <Image source={Images.instagram} style={styles.shareSocialImage} />
                <Text style={styles.shareSocialText}>Bagikan di Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareSocialButton} onPress={() => this.shareSocial('whatsapp')}>
                <Image source={Images.whatsapp} style={styles.shareSocialImage} />
                <Text style={styles.shareSocialText}>Bagikan di Whatsapp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareSocialButton} onPress={() => this.shareSocial('facebook')}>
                <Image source={Images.facebook} style={styles.shareSocialImage} />
                <Text style={styles.shareSocialText}>Bagikan di Facebook</Text>
              </TouchableOpacity>
            </View>}
            <View style={styles.wrapperSeparator} />
            {this.renderRating()}
            {this.renderEmpty()}
            <View style={styles.descriptionWrapper}>
              <View style={styles.descriptionHeader}>
                <Text style={styles.productSubtitle}>Deskripsi Produk</Text>
                <TouchableOpacity style={styles.btnCopy} onPress={() => this.copyText()}>
                  <Text style={styles.textCopy}>Copy</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.productDescriptionText}>{this.state.product.product_content}</Text>
            </View>
            {this.renderColor()}
            {this.renderSize()}
            {this.renderCustomAttribute()}
            {this.renderQty()}
            {this.renderSizeGuide()}
            {this.renderImagesCustom()}
            {this.renderReview()}
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.btnAddToCart} onPress={() => this.addToCart()}>
            <Text style={styles.textAddToCart}>ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnShare} onPress={() => this.shareSocial('')}>
            <Text style={styles.textShare}>SHARE</Text>
          </TouchableOpacity>
        </View>
        {this.state.modalClipboardVisible && <View style={styles.modalView}>
          <Text style={styles.modalText}>Text Copied to Clipboard</Text>
        </View>}
        {this.state.modalClipboardVisible2 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Images have been downloaded</Text>
        </View>}
        {this.state.modalClipboardVisible3 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Sharing ...</Text>
        </View>}
        {this.state.modalClipboardVisible4 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Downloading Images ...</Text>
        </View>}
        {this.state.willShareDescription && <View style={styles.modalShareView}>
          <View style={styles.modalShareContainer}>
            <Text style={styles.modalShareText}>Images Downloaded</Text>
            <Text style={(this.state.finishShareImage ? styles.modalShareText : styles.modalShareText2)}>Description Copied</Text>
          </View>
        </View>}
        {/* <Modal
          animationType='fade'
          transparent
          visible={this.state.freeGiftModal}
          onRequestClose={() => {
            this.setState({ freeGiftModal: false })
          }}
        >
          <View style={styles.viewOut}>
            <View style={styles.viewIn}>
              <View style={styles.viewTextLine}>
                <Text style={styles.textModalLine}>Selamat! Anda mendapatkan produk gratis</Text>
              </View>
              {this.state.freeGiftItem.img_url &&
                <FastImage source={{ uri: this.state.freeGiftItem.img_url }} style={{ width: Metrics.screenWidth - 40, height: (Metrics.screenHeight / 2 + 60) / 2 - 80 }} resizeMode={FastImage.resizeMode.contain} />
              }
              <View style={{ width: Metrics.screenWidth - 60, alignSelf: 'center', marginTop: 20 }}>
                <Text style={[styles.productName, { fontSize: Metrics.fontSize1 }]}>{this.state.freeGiftItem.product_name}</Text>
                {this.renderFreeGiftColor()}
                {this.renderFreeGiftSize()}
                {this.renderFreeGiftCustomAttribute()}
                <TouchableOpacity onPress={() => this.onPressClaimFreeGift()} style={{ width: Metrics.screenWidth - 80, paddingVertical: 10, backgroundColor: Colors.mooimom, justifyContent: 'center', alignItems: 'center', borderRadius: 20, alignSelf: 'center' }}>
                  <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize1 }}>Ambil Free Gift</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    cart: state.cart,
    // getOnlineCart: state.getOnlineCart,
    // updateOnlineCart: state.updateOnlineCart,
    wishlist: state.wishlist,
    notification: state.notification,
    lastNotification: state.lastNotification,
    subscribeProduct: state.subscribeProduct,
    // chooseFreeGift: state.chooseFreeGift
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sharedProductProcess: data => {
      dispatch(SharedProductActions.sharedProductRequest(data))
    },
    loadProductProcess: data => {
      dispatch(GetProductActions.getProductRequest(data))
    },
    loadProductVariationProcess: data => {
      dispatch(GetProductActions.getProductVariationRequest(data))
    },
    addToCartProcess: data => {
      dispatch(CartActions.addCartRequest(data))
    },
    addWishlistProductProcess: data => {
      dispatch(EditWishlistActions.addWishlistRequest(data))
    },
    deleteWishlistProductProcess: data => {
      dispatch(EditWishlistActions.deleteWishlistRequest(data))
    },
    subscribeProductProcess: data => {
      dispatch(SubscribeProductActions.subscribeProductRequest(data))
    },
    // updateOnlineCartProcess: data => {
    //   dispatch(UpdateOnlineCartActions.updateOnlineCartRequest(data))
    // },
    // getOnlineCartProcess: data => {
    //   dispatch(GetOnlineCartActions.getOnlineCartRequest(data))
    // },
    // chooseFreeGiftProcess: data => {
    //   dispatch(ChooseFreeGiftActions.chooseFreeGiftRequest(data))
    // }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductScreen)
