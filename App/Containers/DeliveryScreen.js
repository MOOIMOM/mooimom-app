import React, { Component } from 'react'
import ReactNative from 'react-native'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, Modal, TextInput, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import GetAddressActions from '../Redux/GetAddressRedux'
import GetShippingOptionsActions from '../Redux/GetShippingOptionsRedux'
import CheckoutActions from '../Redux/CheckoutRedux'
import CartActions from '../Redux/CartRedux'
import CommissionEstimationActions from '../Redux/CommissionEstimationRedux'
// import GetOnlineCartActions from '../Redux/GetOnlineCartRedux'
import GetMooimomPointsActions from '../Redux/GetMooimomPointsRedux'
import GetAllOrderActions from '../Redux/GetAllOrderRedux'
import CheckCouponActions from '../Redux/CheckCouponRedux'
import { convertToRupiah, titleCase, convertToThousandOrHigher } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import RNAiqua from 'react-native-aiqua-sdk'
import { DotIndicator } from 'react-native-indicators'

// Styles
import styles from './Styles/DeliveryScreenStyles'
class DeliveryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowDelivery: false,
      isShowUsePointsModal: false,
      selectedDelivery: {},
      selectedAddressID: '',
      selectedAddress: null,
      commission: 0,
      isPointButtonClicked: false,
      isProductPriceAllowed: true,
      buttonDisabled: false,
      usingDiscount: false,
      usingVoucher: false,
      usingCoupon: false,
      points: 0,
      pointUsage: 0,
      nomPointsToUse: 0,
      discounts: {},
      discountCode: "",
      voucherCode: "",
      couponCode: "",
      discountUsage: 0,
      freeShippingUsage: 0,
      // shoppingCartId: 0
    }
  }

  componentDidMount() {

    var price = this.calculatePrice()

    if (price < 100000) {
      this.setState({
        isProductPriceAllowed: false,
        buttonDisabled: true
      })
    }

    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getAddressProcess(data)
    this.props.getMooimomPointsProcess(data)
    this.reloadCommission()
  }

  componentWillReceiveProps(newProps) {
    if (this.props.commissionEstimation !== newProps.commissionEstimation) {
      if (
        newProps.commissionEstimation.payload !== null &&
        newProps.commissionEstimation.error === null &&
        !newProps.commissionEstimation.fetching
      ) {
        this.setState({
          commission: newProps.commissionEstimation.payload.commission_expectation
        })
      }
    }

    if (this.props.address !== newProps.address) {
      if (
        newProps.address.payload !== null &&
        newProps.address.error === null &&
        !newProps.address.fetching
      ) {
        if (this.state.selectedAddressID === '' || this.state.selectedAddress === null) {
          var selectedAddress = newProps.address.payload.addresses.find(address => address.is_primary === 1)
          if (selectedAddress) {
            this.setState({
              selectedAddressID: selectedAddress.id,
              selectedAddress: selectedAddress
            })
          }
        }
      }
    }

    // if (this.props.getOnlineCart !== newProps.getOnlineCart) {
    //   if (
    //     newProps.getOnlineCart.payload !== null &&
    //     newProps.getOnlineCart.error === null &&
    //     !newProps.getOnlineCart.fetching
    //   ) {
    //     this.setState({ shoppingCartId: newProps.getOnlineCart.payload.shopping_cart_id })
    //   }
    // }

    if (this.props.checkout !== newProps.checkout) {
      if (
        newProps.checkout.payload !== null &&
        newProps.checkout.error === null &&
        !newProps.checkout.fetching
      ) {
        this.props.emptyCartProcess()
        this.props.navigation.popToTop()
        let data = {
          data_request: {
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            selected_status: 'all'
          }
        }
        this.props.cart.data.map(cart => {
          let logData = {
            category_name: cart.product.category_name,
            product_id: cart.product.product_id,
            product_name: cart.product.product_name,
            product_image_url: cart.product.img_url,
            product_url: `www.mooimom.id/product/${cart.product.slug}`,
            product_price: cart.product.product_regular_price
          }
          console.log('RNAiqua, product_purchased', logData)
          RNAiqua.logEvent('product_purchased', logData)
        })
        this.props.getAllOrderProcess(data)
        this.actNavigate('DetailOrderScreen', { order_id: newProps.checkout.payload.order_id })
      } else if (
        newProps.checkout.payload === null &&
        !newProps.checkout.fetching
      ) {
        Alert.alert('Sorry', 'Checkout failed, please try again later')
      }
    }

    if (this.props.mooimomPoints !== newProps.mooimomPoints) {
      if (
        newProps.mooimomPoints.payload !== null &&
        newProps.mooimomPoints.error === null &&
        !newProps.mooimomPoints.fetching
      ) {
        this.setState({
          points: newProps.mooimomPoints.payload.how_many_points
        })
      }
    }

    if (this.props.claimVoucher !== newProps.claimVoucher) {
      if (
        newProps.claimVoucher.payload !== null &&
        newProps.claimVoucher.error === null &&
        !newProps.claimVoucher.fetching
      ) {
        this.usingVoucherAction(newProps.claimVoucher)
      }
    }

    if (this.props.checkCoupon !== newProps.checkCoupon) {
      if (
        newProps.checkCoupon.payload !== null &&
        newProps.checkCoupon.error === null &&
        !newProps.checkCoupon.fetching
      ) {
        this.usingCouponAction(newProps.checkCoupon)
      }
    }
  }

  usingVoucherAction(newProps) {
    if (this.props.checkCoupon.payload.free_shipping_mode) {
      if (this.props.checkCoupon.payload.free_shipping_mode === 1) {
        this.setState({
          voucherCode: newProps.payload.voucher_code,
          discountCode: newProps.payload.voucher_code,
          usingVoucher: true,
          usingDiscount: true,
          usingCoupon: false,
          discountUsage: 0,
          freeShippingUsage: this.props.checkCoupon.payload.free_shipping_maximum_discount
        })
      }
    }
    else {
      this.setState({
        voucherCode: newProps.payload.voucher_code,
        discountCode: newProps.payload.voucher_code,
        usingVoucher: true,
        usingDiscount: true,
        usingCoupon: false,
        discountUsage: this.props.checkCoupon.payload.total_discount
      })
    }
    this.reloadCommission()
    Alert.alert('', 'Voucher berhasil dipakai')
  }

  usingCouponAction(newProps) {
    if (newProps.payload.success === 0) {
      switch (newProps.payload.message) {
        case 'coupon_does_not_exist':
          Alert.alert('', 'Kupon tidak valid')
          break;
        case 'web_only':
          Alert.alert('', 'Kupon hanya berlaku di website www.mooimom.id')
          break;
        case 'can_only_be_used_for_first_order':
          Alert.alert('', 'Hanya bisa dipakai untuk order pertama')
          break;
        case 'user_limit_per_user_failed':
          let limitUse = `Kupon hanya bisa dipakai ${newProps.payload.usage_limit_per_user} kali`
          Alert.alert('', limitUse)
          break;
        case 'coupon_expired':
          Alert.alert('', 'Kupon sudah expired')
          break;
        case 'minimum_amount_failed':
          let minUse = `Kupon hanya bisa dipakai minimal pembelian Rp ${newProps.payload.minimum_amount}`
          Alert.alert('', minUse)
          break;
        case 'maximum_amount_failed':
          let maxUse = `Kupon hanya bisa dipakai maximum pembelian Rp ${newProps.payload.maximum_amount}`
          Alert.alert('', maxUse)
          break;
        default:
          Alert.alert('', 'Mohon coba lagi')
          break;
      }
    }
    else {
      if (newProps.payload.free_shipping_mode) {
        if (newProps.payload.free_shipping_mode === 1) {
          this.setState({
            voucherCode: "",
            usingVoucher: false,
            usingDiscount: true,
            usingCoupon: true,
            discountUsage: 0,
            freeShippingUsage: newProps.payload.free_shipping_maximum_discount
          })
        }
      }
      else {
        this.setState({
          voucherCode: "",
          usingVoucher: false,
          usingDiscount: true,
          usingCoupon: true,
          discountUsage: newProps.payload.total_discount
        })
      }
      this.reloadCommission()
      Alert.alert('', 'Kupon berhasil dipakai')
    }
  }

  reloadCommission() {
    let dataCart = '['
    this.props.cart.data.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.qty + '},'
    })
    if (dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        product_variations_user_want_to_buy: dataCart,
        coupon_code: this.state.discountCode
      }
    }
    console.log(data)
    this.props.getCommissionEstimationProcess(data)
  }

  actNavigate(screen, data = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, data)
  }

  calculatePrice() {
    var price = 0;
    this.props.cart.data.map(cart => {
      price += (cart.qty * (cart.is_free_gift ? 0 : (cart.product.product_sale_price > 0 ? cart.product.product_sale_price : cart.product.product_regular_price)))
    })
    return price
  }
  checkCoupon() {
    if (this.state.discountCode === "") {
      Alert.alert('', 'Masukkan kode kupon')
    }
    else if (this.state.usingVoucher) {
      Alert.alert('', 'Tidak bisa menggunakan kupon jika sudah menggunakan voucher')
    }
    else {
      let dataCart = '['
      this.props.cart.data.map(cart => {
        dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.qty + '},'
      })
      if (dataCart.length > 1)
        dataCart = dataCart.substring(0, dataCart.length - 1)
      dataCart = dataCart + ']'

      let data = {
        data_request: {
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          product_variations_user_want_to_buy: dataCart,
          coupon_code: this.state.discountCode
        }
      }
      this.props.checkCouponProcess(data)
    }
  }
  calculateDelivery() {
    if (this.state.selectedAddress === null) {
      Alert.alert('', 'Please input the delivery address first')
      return;
    }
    var selectedAddress = this.state.selectedAddress
    let dataCart = '['
    this.props.cart.data.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.qty + '},'
    })
    if (dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        district_id: selectedAddress.district_id,
        product_variations_sku_and_quantity: dataCart,
        coupon_code: this.state.discountCode
      }
    }
    this.props.getShippingOptionsProcess(data)
    this.setState({
      isShowDelivery: true
    })
  }

  selectDelivery(index) {
    this.setState({
      isShowDelivery: false,
      selectedDelivery: this.props.shippingOptions.payload.shipping_options[index]
    })
  }

  processBuy() {
    if (this.props.address.payload === null || this.props.address.payload.addresses.length === 0) {
      Alert.alert('', 'Please input the delivery address first')
      return;
    }
    if (!this.state.selectedDelivery.jne_or_jnt) {
      Alert.alert('', 'Please select one of delivery option first')
      return
    }
    let dataCart = '['
    this.props.cart.data.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.qty + '},'
    })
    if (dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    console.log(dataCart)
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        product_variations_user_want_to_buy: dataCart,
        chosen_shipping_mode: this.state.selectedDelivery.jne_or_jnt + '_' + this.state.selectedDelivery.service,
        chosen_shipping_price: this.state.selectedDelivery.price,
        chosen_app_customer_address_id: this.state.selectedAddressID,
        chosen_method: 'midtrans', // DEFAULT
        mooimom_app_points: this.state.pointUsage,  // OPTIONAL
        android_or_ios: this.state.systemName,
        coupon_code: this.state.discountCode,
        // shopping_cart_id: this.state.shoppingCartId
      }
    }
    console.log(data)
    console.log("Choosen Shiping Mode: " + this.state.selectedDelivery.jne_or_jnt + '_' + this.state.selectedDelivery.service,
      "chosen_shipping_price: " + this.state.selectedDelivery.price,
      "chosen_app_customer_address_id: " + this.state.selectedAddressID,

    )
    this.props.getCheckoutProcess(data)
  }

  _renderProductCart() {
    if (this.props.cart.data && this.props.cart.data.length > 0)
      return (
        this.props.cart.data.map((item, index) => {
          console.log('cart', item)
          var price = item.is_free_gift ? 0 : (item.product.product_sale_price > 0 ? item.product.product_sale_price : item.product.product_regular_price)
          price = convertToRupiah(price * item.qty)
          var isFound, size, color, title, custom = ''
          isFound = item.product.sizes.find(x => x.slug === item.size)
          if (isFound)
            size = isFound.name
          isFound = item.product.colors.find(x => x.slug === item.color)
          if (isFound)
            color = isFound.name
          isFound = item.product.custom_attributes.find(x => x.slug === item.custom)
          if (isFound) {
            custom = isFound.name
            title = titleCase(item.product.custom_attribute_text)
          }
          var image = Images.default
          if (item.product.img_url && item.product.img_url !== '')
            image = { uri: item.product.img_url }
          return (
            <View style={styles.productContainer} key={index.toString()}>
              <View style={styles.productImageWrapper}>
                <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain} />
              </View>
              <View style={styles.productDescriptionWrapper}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.productName}>{item.product.product_name}</Text>
                </View>
                <View style={styles.propertyWrapper}>
                  {size !== '' && <View style={styles.sizeWrapper}>
                    <Text style={styles.itemText}>Ukuran - {size}</Text>
                  </View>}
                  {color !== '' && <View style={styles.colorWrapper}>
                    <Text style={styles.itemText}>Warna - {color}</Text>
                  </View>}
                  {custom !== '' && <View style={styles.colorWrapper}>
                    <Text style={styles.itemText}>{title} - {custom}</Text>
                  </View>}
                  <View style={styles.qtyWrapper}>
                    <Text style={styles.itemText}>Qty - {item.qty}</Text>
                  </View>
                </View>
                {
                  item.is_free_gift ?
                    <View style={styles.priceWrapper}>
                      <Text style={styles.itemText}>FREE</Text>
                    </View>
                    :
                    <View style={styles.priceWrapper}>
                      <Text style={styles.itemText}>{price}</Text>
                    </View>
                }
              </View>
            </View>
          );
        })
      )
  }

  renderSelectedAddress() {
    if (this.state.selectedAddress === null) {
      return <View />
    }
    const { selectedAddress } = this.state
    return (
      <View>
        <Text style={styles.productSubtitle2}>KIRIM KE {this.state.systemName}</Text>
        <View style={styles.wrapperSeparator} />
        <View style={styles.deliveryAddressContainer}>
          <Text style={styles.addressName}>{selectedAddress.receiver_name}</Text>
          <Text style={styles.address}>{selectedAddress.address}</Text>
          <Text style={styles.address}>{selectedAddress.district_name}, {selectedAddress.city_name}</Text>
          <Text style={styles.address}>{selectedAddress.province_name} - {selectedAddress.zip_code}</Text>
          <Text style={styles.address}>{selectedAddress.receiver_phone}</Text>
        </View>
      </View>
    )
  }

  _renderDeliveriesOption() {
    if (this.props.shippingOptions.payload && this.props.shippingOptions.payload.shipping_options.length > 0)
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.props.shippingOptions.payload.shipping_options.map((item, index) => {
            return (
              <TouchableOpacity style={styles.deliveryOptionWrapper} onPress={() => this.selectDelivery(index)} key={index.toString()}>
                <Text style={styles.deliveryNameText}>{item.jne_or_jnt} {item.service} ({item.delivery_time}) hari</Text>
                <Text style={styles.deliveryPriceText}>{convertToRupiah(item.price)}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      )
  }

  renderDelivery() {
    var selectedDelivery = <View />
    if (this.state.selectedDelivery.jne_or_jnt) {
      selectedDelivery =
        <View style={styles.selectedDeliveryWrapper}>
          <Text style={styles.deliveryNameText}>{this.state.selectedDelivery.jne_or_jnt} {this.state.selectedDelivery.service} ({this.state.selectedDelivery.delivery_time}) hari</Text>
          <Text style={styles.deliveryPriceText}>{convertToRupiah(this.state.selectedDelivery.price)}</Text>
        </View>
    }
    return (
      <View style={styles.chooseDeliveryWrapper}>
        {selectedDelivery}
        <TouchableOpacity style={styles.chooseDeliveryBtn} onPress={() => this.calculateDelivery()}>
          <Text style={styles.chooseDeliveryText}>Pilih Opsi Pengiriman</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isShowDelivery}
          onRequestClose={() => {
            this.setState({
              isShowDelivery: false
            })
          }}>
          <TouchableOpacity
            style={styles.containerModal}
            activeOpacity={1}
            onPressOut={() => this.setState({
              isShowDelivery: false
            })}
          >
            <TouchableWithoutFeedback>
              <View style={styles.chooseDeliveryWrapper2}>
                <TouchableOpacity style={styles.chooseDeliveryBtn2} onPress={() => this.setState({
                  isShowDelivery: false
                })}>
                  <Image source={Images.x} style={styles.imageClose} />
                  <Text style={styles.chooseDeliveryText2}>Pilih Opsi Pengiriman</Text>
                </TouchableOpacity>
                {this.props.shippingOptions.fetching && <View style={styles.containerLoading}>
                  <DotIndicator size={12} color={Colors.mooimom} />
                </View>}
                {this._renderDeliveriesOption()}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }

  setSelectAddress(item) {
    this.setState({
      selectedAddressID: item.id,
      selectedAddress: item,
      selectedDelivery: {}
    })
  }

  onPressUsePoints() {
    if (this.state.points === 0) {
      Alert.alert('', 'Nominal poin anda kosong. Anda tidak bisa menggunakan poin')
    }
    else if (this.state.nomPointsToUse > this.state.points) {
      Alert.alert('', 'Poin anda tidak cukup')
    }
    else {
      this.setState({
        points: this.state.points - this.state.nomPointsToUse,
        pointUsage: this.state.nomPointsToUse,
        isPointButtonClicked: true,
        isShowUsePointsModal: false
      })
    }
  }

  onPressUseVoucher() {
    if (this.state.usingCoupon) {
      Alert.alert('', 'Tidak bisa menggunakan voucher jika sudah menggunakan kupon')
    }
    else {
      AsyncStorage.setItem('on_payment_process', 'ready')
      this.actNavigate('VoucherScreen')
    }
  }

  onCancelPoints() {
    this.setState({
      points: this.props.mooimomPoints.payload.how_many_points,
      pointUsage: 0,
      isPointButtonClicked: false
    })
  }

  onCancelVoucher() {
    this.setState({
      discountUsage: 0,
      freeShippingUsage: 0,
      usingDiscount: false,
      usingVoucher: false,
      discountCode: "",
      voucherCode: ""
    })
    AsyncStorage.setItem('on_payment_process', 'not_ready')
  }

  onCancelCoupon() {
    this.setState({
      discountUsage: 0,
      freeShippingUsage: 0,
      usingDiscount: false,
      usingCoupon: false,
      discountCode: "",
      couponCode: ""
    })
    AsyncStorage.setItem('on_payment_process', 'not_ready')
  }

  isPointUsedView() {
    if (this.state.isPointButtonClicked) {
      return (
        <View style={styles.selectedDeliveryTextWrapper}>
          <View style={styles.usedPointsTitleWrapper}>
            <View style={styles.imgMooimomPoints} />
            <Text>Points Terpakai</Text>
          </View>
          <Text style={styles.decreasedMooimomPoints}> - {convertToThousandOrHigher(this.state.pointUsage)}</Text>
        </View>
      )
    } else {
      return (<View />)
    }
  }
  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  renderMooimomPoints() {
    var mooimomPoints = Images.mooimomPoints

    const { isPointButtonClicked, isProductPriceAllowed, buttonDisabled } = this.state

    return (
      <>
        <View style={styles.mooimomPointsWrapper}>
          <View style={styles.selectedDeliveryTextWrapper}>
            <View style={styles.mooimomPointsTitleWrapper}>
              <FastImage source={mooimomPoints} style={styles.imgMooimomPoints} resizeMode={FastImage.resizeMode.contain} />
              <Text style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1 }}>Mooimom Points</Text>
            </View>
            <Text style={styles.deliveryText}>{convertToThousandOrHigher(this.state.points)}</Text>
          </View>
          {this.isPointUsedView()}
          {
            isPointButtonClicked ?
              <TouchableOpacity onPress={() => this.onCancelPoints()} activeOpacity={0.5} style={styles.cancelUsePointButton}>
                <Text style={styles.textUsePointButton}>Cancel</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity disabled={buttonDisabled} onPress={() => this.setState({ isShowUsePointsModal: true })} activeOpacity={0.5} style={[{ backgroundColor: buttonDisabled ? Colors.mediumGray : Colors.fire }, styles.usePointButton]}>
                <Text style={styles.textUsePointButton}>Use Points</Text>
              </TouchableOpacity>
          }

          {isProductPriceAllowed ? <View /> : <View style={styles.wrapperSeparator}><Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray }}>* untuk menggunakan poin, minimal pembelian produk Rp 100.000 keatas.</Text></View>}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isShowUsePointsModal}
          onRequestClose={() => {
            this.setState({
              isShowUsePointsModal: false
            })
          }}>
          <TouchableOpacity
            style={styles.containerModal}
            activeOpacity={1}
            onPressOut={() => this.setState({
              isShowUsePointsModal: false
            })}
          >
            <TouchableWithoutFeedback>
              <View style={styles.chooseDeliveryWrapper2}>
                <TouchableOpacity style={styles.chooseDeliveryBtn2} onPress={() => this.setState({
                  isShowUsePointsModal: false
                })}>
                  <Image source={Images.x} style={styles.imageClose} />
                  <Text style={styles.chooseDeliveryText2}>Masukkan jumlah poin yang ingin dipakai</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', alignItems: 'center', marginVertical: 20, alignSelf: 'center', height: Metrics.screenHeight / 4, justifyContent: 'center' }}>
                  <View style={{
                    width: '90%',
                    borderBottomColor: Colors.mooimom,
                    borderBottomWidth: 0.5,
                    paddingBottom: 10,
                    marginBottom: 20
                  }}>
                    <TextInput
                      onChangeText={(val) => this.setState({ nomPointsToUse: val })}
                      style={{ textAlign: 'center', fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize4 }}
                      placeholder="Misal, 20.000"
                    />
                  </View>
                  <TouchableOpacity onPress={() => this.onPressUsePoints()} style={{ width: '90%', backgroundColor: Colors.mooimom, paddingVertical: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onPressUsePoints()}>
                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize1 }}>Gunakan Poin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </>
    )
  }

  renderCouponField() {
    var discountVoucher = Images.discountVoucher
    return (
      <KeyboardAwareScrollView
        extraScrollHeight={100} enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Kode Kupon</Text>
          <FastImage source={discountVoucher} style={styles.imgDiscountVoucher} resizeMode={FastImage.resizeMode.contain} />
        </View>

        <View style={styles.couponInputContainer}>
          <TextInput
            autoCapitalize="characters"
            value={this.state.couponCode}
            style={styles.couponInput}
            onChangeText={input => this.setState({ discountCode: input, couponCode: input })}
          />
          {
            this.state.usingCoupon ?
              <TouchableOpacity onPress={() => this.onCancelCoupon()} style={{ marginRight: 10 }}><Text style={{ color: Colors.fire, fontWeight: 'bold', fontFamily: Fonts.type.gotham1, fontSize: Metrics.fontSize1 }}>BATAL</Text></TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.checkCoupon()} style={{ marginRight: 10 }}><Text style={{ color: Colors.mooimom, fontWeight: 'bold', fontFamily: Fonts.type.gotham1, fontSize: Metrics.fontSize1 }}>PAKAI</Text></TouchableOpacity>
          }
        </View>
      </KeyboardAwareScrollView>
    )
  }

  renderVoucherField() {
    var discountVoucher = Images.discountVoucher
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Voucher</Text>
          <FastImage source={discountVoucher} style={styles.imgDiscountVoucher} resizeMode={FastImage.resizeMode.contain} />
        </View>
        {
          this.state.usingVoucher ?
            <View style={[styles.couponInputContainer, { justifyContent: 'space-between' }]}>
              <View style={styles.couponInput}>
                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.voucherCode}</Text>
              </View>
              <TouchableOpacity onPress={() => this.onCancelVoucher()} style={{ marginRight: 10 }}><Text style={{ color: Colors.fire, fontWeight: 'bold' }}>BATAL</Text></TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => this.onPressUseVoucher()} style={[styles.couponInputContainer, { justifyContent: 'center' }]}>
              <Text style={{ fontWeight: 'bold', color: Colors.mooimom, fontFamily: Fonts.type.gotham1, fontSize: Metrics.fontSize1 }}>Gunakan Voucher</Text>
            </TouchableOpacity>
        }
      </View>
    )
  }

  render() {
    console.log(this.state.discountUsage)
    var price = this.calculatePrice()
    var deliveryPrice = this.state.selectedDelivery.price ? this.state.selectedDelivery.price : 0
    var totalPrice = convertToRupiah(price + deliveryPrice - this.state.discountUsage - this.state.freeShippingUsage - this.state.pointUsage)
    var commission = convertToRupiah(this.state.commission)
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
              <Image source={Images.back} style={styles.buttonHeader} />
            </TouchableOpacity>
          </View>
          <View style={styles.cartContainer}>

            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.productSubtitle}>Konfirmasi Pengiriman</Text>
              <View style={styles.wrapperSeparator} />
              {this.renderSelectedAddress()}
              <View style={styles.wrapperSeparator} />
              <View style={styles.wrapperSeparator} />
              <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {
                this.actNavigate('AddressListScreen', {
                  setSelectAddress: this.setSelectAddress.bind(this)
                })
              }}>
                <Text style={styles.chooseAddressText}>Pilih Alamat</Text>
              </TouchableOpacity>
              {this._renderProductCart()}
              <View style={styles.wrapperSeparator} />
              {this.renderDelivery()}
              {this.renderMooimomPoints()}
              {this.renderVoucherField()}

              {this.renderCouponField()}

            </ScrollView>
          </View>
          <View style={styles.menuWrapper}>
            <View style={styles.subtotalWrapper}>
              <Text style={styles.subtotalText}>SUBTOTAL</Text>
              <Text style={styles.priceText}>{totalPrice}</Text>
              {!this.props.commissionEstimation.fetching && <Text style={styles.commissionText}>Est. Komisi {commission}</Text>}
            </View>
            <TouchableOpacity style={styles.buyBtn} onPress={() => this.processBuy()}>
              <Text style={styles.buyText}>Konfirmasi</Text>
            </TouchableOpacity>
          </View>
          {this.props.checkout.fetching && <View style={styles.fullScreenModal}>
            <DotIndicator size={12} color={Colors.mooimom} />
          </View>}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    address: state.address,
    auth: state.auth,
    shippingOptions: state.shippingOptions,
    checkout: state.checkout,
    commissionEstimation: state.commissionEstimation,
    mooimomPoints: state.mooimomPoints,
    checkCoupon: state.checkCoupon,
    claimVoucher: state.claimVoucher,
    getOnlineCart: state.getOnlineCart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCartProcess: () => {
      dispatch(CartActions.emptyCartRequest())
    },
    checkCouponProcess: data => {
      dispatch(CheckCouponActions.checkCouponRequest(data))
    },
    getAddressProcess: data => {
      dispatch(GetAddressActions.getAddressRequest(data))
    },
    getShippingOptionsProcess: data => {
      dispatch(GetShippingOptionsActions.getShippingOptionsRequest(data))
    },
    getMooimomPointsProcess: data => {
      dispatch(GetMooimomPointsActions.getMooimomPointsRequest(data))
    },
    getCheckoutProcess: data => {
      dispatch(CheckoutActions.getCheckoutRequest(data))
    },
    getCommissionEstimationProcess: data => {
      dispatch(CommissionEstimationActions.getCommissionEstimationRequest(data))
    },
    getAllOrderProcess: data => {
      dispatch(GetAllOrderActions.getAllOrderRequest(data))
    },
    getOnlineCartProcess: data => {
      dispatch(GetOnlineCartActions.getOnlineCartRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryScreen)
