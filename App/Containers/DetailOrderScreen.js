import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, Modal, Linking, WebView, Platform } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import FastImage from 'react-native-fast-image'
import GetOrderActions from '../Redux/GetOrderRedux'
import CommissionEstimationActions from '../Redux/CommissionEstimationRedux'
import GetOrderStatusMidtransActions from '../Redux/GetOrderStatusMidtransRedux'
import DeleteOrderHistoryActions from '../Redux/DeleteOrderHistoryRedux'
import GopayActions from '../Redux/GopayRedux'
import CartActions from '../Redux/CartRedux'
import CarttActions from '../Redux/CarttRedux'
import UpdateOnlineCartActions from '../Redux/UpdateOnlineCartRedux'
import { connect } from 'react-redux'
import { convertToRupiah, getDateFromString, convertToThousandOrHigher, isIphoneXorAbove } from '../Lib/utils'
import MidtransModule from '../Lib/Midtrans'

import { DotIndicator } from 'react-native-indicators'

// Styles
import styles from './Styles/DetailOrderScreenStyles'
class DetailOrderScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuStatus: [
        { status: 'all', status_name: 'Semua', status_name_proses: '' },
        { status: 'pending', status_name: 'Pembayaran', status_name_proses: 'Menunggu Pembayaran' },
        { status: 'processing', status_name: 'Diproses', status_name_proses: 'Sedang Diproses' },
        { status: 'completed', status_name: 'Selesai', status_name_proses: 'Selesai' },
        { status: 'cancelled', status_name: 'Dibatalkan', status_name_proses: 'Dibatalkan' }
      ],
      order_id: this.props.navigation.state.params.order_id,
      totalPrice: 0,
      commission: 0,
      paymentType: '',
      order: {},
      midtrans: {},
      xenditLink: "",
      openXendit: false,
      isShowPaymentMethod: false
    }
  }

  componentDidMount() {
    this.reloadData()
  }

  componentWillReceiveProps(newProps) {

    if (this.props.order !== newProps.order) {
      if (
        newProps.order.payload !== null &&
        newProps.order.error === null &&
        !newProps.order.fetching
      ) {

        this.setState({
          order: newProps.order.payload,
          totalPrice: newProps.order.payload.order_total,
          commission: newProps.order.payload.total_commission_for_this_order,
          midtrans: JSON.parse(newProps.order.payload.midtrans_data),
          xenditLink: newProps.order.payload.xendit_link,
          isShowPaymentMethod: false
        })

        // this.reloadCommission(newProps.order.payload.order_items)
      }
    }

    if (this.props.deleteOrderHistory !== newProps.deleteOrderHistory) {
      if (
        newProps.deleteOrderHistory.payload !== null &&
        newProps.deleteOrderHistory.error === null &&
        !newProps.deleteOrderHistory.fetching
      ) {
        this.props.navigation.goBack()
      }
    }

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

  }

  reloadData() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        order_id: this.state.order_id
      }
    }

    this.props.getOrderRequest(data)
  }

  reloadCommission(items) {
    if (!items || items.length < 1) return;
    let dataCart = '['
    items.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.quantity + '},'
    })
    if (dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        product_variations_user_want_to_buy: dataCart
      }
    }
    this.props.getCommissionEstimationProcess(data)
  }

  actNavigate(screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  getGopayLink() {
    const { data } = this.props.gopay
    for (var i = 0; i < data.length; i++) {
      if (data[i].order_id === this.state.order.order_id) {
        return data[i].gopay_link
      }
    }
    return ''
  }

  pressDeleteOrderHistory(orderId) {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        order_id: orderId
      }
    }
    this.props.deleteOrderHistoryProcess(data)
  }

  async payNow() {
    if (this.state.xenditLink !== null) {
      // Linking.openURL(this.state.z)
      this.setState({ openXendit: true })
    }
    else {
      if (this.state.midtrans && this.state.midtrans.payment_type && this.state.midtrans.payment_type === 'gopay' && this.state.midtrans.transaction_status === 'pending') {
        var link = this.getGopayLink()
        if (link === '') {
          Alert.alert(
            'Sorry',
            'This order is not valid anymore, please make a new order',
          )
          return;
        }
        Linking.canOpenURL(link).then(supported => {
          if (supported) {
            Linking.openURL(link);
          } else {
            Alert.alert(
              'Sorry',
              'Go-jek is not installed on your phone',
            )
          }
        });
        return
      }

      const optionConect = {
        clientKey: "VT-client-35STW7Jm-F0bTh1x",
        urlMerchant: "http://www.mooimom.id"
      }

      const transRequest = {
        transactionId: '' + this.state.order.order_id,
        totalAmount: this.state.order.order_total,
        token: this.state.order.midtrans_token,
      }

      const itemDetails = [

      ];

      const creditCardOptions = {
        saveCard: false,
        saveToken: false,
        paymentMode: "Normal",
        secure: false
      };

      const userDetail = {
        fullName: this.state.order.billing_name,
        email: '',
        phoneNumber: this.state.order.billing_address,
        userId: this.state.order.billing_phone,
        address: this.state.order.billing_address,
        city: this.state.order.billing_city,
        country: "IDN",
        zipCode: this.state.order.billing_zip_code
      };

      const optionColorTheme = {
        primary: Colors.mooimom,
        primaryDark: Colors.mooimom,
        secondary: Colors.mooimom,
      }

      const optionFont = {
        defaultText: Fonts.type.gotham2,
        semiBoldText: Fonts.type.gotham2,
        boldText: Fonts.type.gotham2,
      }

      const callback = (res, gopay) => {
        this.reloadData()
        if (gopay && gopay !== '') {
          let data = {
            order_id: this.state.order.order_id,
            token: this.state.order.midtrans_token,
            gopay_link: gopay
          }
          this.props.saveGopayRequestProcess(data)
        }
      };

      MidtransModule.checkOut(
        optionConect,
        transRequest,
        itemDetails,
        creditCardOptions,
        userDetail,
        optionColorTheme,
        optionFont,
        callback
      );
    }
  }

  pressOrderAgain() {
    const { order_items } = this.state.order
    let dataCart = []
    if (!order_items || order_items.length < 1)
      return;
    order_items.map((order, index) => {
      let productVar = { sku: order.sku, quantity: order.quantity }
      this.props.addToCarttProcess(productVar)
      dataCart.unshift(productVar)
    })

    let data2 = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        shopping_cart_id: this.props.getOnlineCart.payload.shopping_cart_id,
        product_variations_user_want_to_buy: JSON.stringify(dataCart.reverse())
      }
    }

    this.props.updateOnlineCartProcess(data2)

    Alert.alert(
      '',
      'Produk Berhasil Ditambahkan!',
    )

  }

  _renderProductCart(data) {
    if (data && data.length > 0)
      return (
        data.map((item, index) => {
          var price = convertToRupiah(item.price * item.quantity)
          var image = Images.default
          if (item.main_image && item.main_image !== '')
            image = { uri: item.main_image }
          return (
            <View style={styles.productContainer} key={index.toString()}>
              <View style={styles.productImageWrapper}>
                <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain} />
              </View>
              <View style={styles.productDescriptionWrapper}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <View style={styles.propertyWrapper}>
                  <View style={styles.sizeWrapper}>
                    <Text style={styles.itemText}>Ukuran - {item.size_name}</Text>
                  </View>
                  <View style={styles.colorWrapper}>
                    <Text style={styles.itemText}>Warna - {item.color_name}</Text>
                  </View>
                  {item.custom_attribute_name !== '' && <View style={styles.colorWrapper}>
                    <Text style={styles.itemText}>Jenis - {item.custom_attribute_name}</Text>
                  </View>}
                  <View style={styles.qtyWrapper}>
                    <Text style={styles.itemText}>Qty - {item.quantity}</Text>
                  </View>
                  <Text style={styles.itemText2}>{price}</Text>
                </View>
              </View>
            </View>
          );
        })
      )
  }

  renderSelectedAddress() {
    const { order } = this.state
    return (
      <View style={styles.deliveryAddressContainer}>
        <Text style={styles.addressName}>{order.billing_name}</Text>
        <Text style={styles.address}>{order.billing_address}</Text>
        <Text style={styles.address}>{order.billing_subdistrict}, {order.billing_city}</Text>
        <Text style={styles.address}>{order.billing_province} - {order.billing_zip_code}</Text>
        <Text style={styles.address}>+62{order.billing_phone}</Text>
      </View>
    )
  }

  renderXenditPayment() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.openXendit}
        onRequestClose={() => {
          this.setState({
            openXendit: false
          })
        }}>
        <SafeAreaView
          style={{ width: Metrics.screenWidth, height: Metrics.screenHeight, top: 0, bottom: 5 }}
          activeOpacity={1}
        >

          <WebView
            startInLoadingState={true}
            renderLoading={() => {
              return (
                <DotIndicator
                  color={Colors.mooimom}
                  size={12}
                />
              )
            }}
            style={{ marginBottom: 20 }}
            useWebKit={false}
            scalesPageToFit={false}
            source={{ uri: this.state.xenditLink }}
          />
          <View style={{ width: '96%', alignItems: 'flex-start', alignSelf: 'center', position: 'absolute', zIndex: 1, }}>
            <TouchableOpacity onPress={() => this.setState({ openXendit: false })} style={{
              marginTop: Platform.OS === 'ios' ? 30 : 20, marginLeft: 10,
              width: 30, height: 30, borderRadius: 20,
              justifyContent: 'center', alignItems: 'center',
              backgroundColor: Colors.white, shadowColor: '#CCCCCC', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <Image source={Images.back} style={{
                height: 12 * Metrics.screenWidth / 320,
                width: 12 * Metrics.screenWidth / 320,
                resizeMode: 'contain'
              }} />
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </Modal>
    )
  }

  renderMethod() {
    const { status_code, payment_type, va_numbers, payment_code,
      permata_va_number, transaction_status, store,
      biller_code, bill_key } = this.state.midtrans
    if (status_code && status_code !== '201' && transaction_status && transaction_status !== 'pending') return <View />
    switch (payment_type) {
      case 'echannel':
        return (
          <View>
            <Text style={styles.deliveryText2}>Mandiri Bill Payment</Text>
            <View style={styles.wrapperSeparator} />
            <Text style={styles.deliveryText3}>Company Code</Text>
            <Text style={styles.deliveryText2}>{biller_code}</Text>
            <View style={styles.wrapperSeparator} />
            <Text style={styles.deliveryText3}>Billpay Code</Text>
            <Text style={styles.deliveryText2}>{bill_key}</Text>
          </View>
        );
      case 'bank_transfer':
        if (va_numbers && va_numbers.length > 0) {
          switch (va_numbers[0].bank) {
            case 'bca':
              return (
                <View>
                  <Text style={styles.deliveryText2}>BCA Virtual Account</Text>
                  <View style={styles.wrapperSeparator} />
                  <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
                  <Text style={styles.deliveryText2}>{va_numbers[0].va_number}</Text>
                </View>
              )
            case 'bni':
              return (
                <View>
                  <Text style={styles.deliveryText2}>BNI Virtual Account</Text>
                  <View style={styles.wrapperSeparator} />
                  <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
                  <Text style={styles.deliveryText2}>{va_numbers[0].va_number}</Text>
                </View>
              )
            default:
              return <View />
          }
        } else if (permata_va_number && permata_va_number !== '') {
          return (
            <View>
              <Text style={styles.deliveryText2}>Permata Virtual Account</Text>
              <View style={styles.wrapperSeparator} />
              <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
              <Text style={styles.deliveryText2}>{permata_va_number}</Text>
            </View>
          )
        } else {
          return <View />
        }
      case 'cstore':
        switch (store) {
          case 'indomaret':
            return (
              <View>
                <Text style={styles.deliveryText2}>Indomaret</Text>
                <View style={styles.wrapperSeparator} />
                <Text style={styles.deliveryText3}>Kode Pembayaran:</Text>
                <Text style={styles.deliveryText2}>{payment_code}</Text>
              </View>
            );
          default:
            return <View />
        }
        break;
    }
    return <View />
  }

  renderShowPayment() {
    if (!this.state.isShowPaymentMethod) return;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowPaymentMethod}
        onRequestClose={() => {
          this.setState({
            isShowPaymentMethod: false
          })
        }}>
        <SafeAreaView style={styles.paymentGuideContainer}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.setState({
              isShowPaymentMethod: false
            })}>
              <Image source={Images.back} style={styles.buttonHeader} />
            </TouchableOpacity>
          </View>
          <View style={styles.cartContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.productSubtitle}>Cara Pembayaran</Text>
              <View style={styles.wrapperSeparator} />
              <View style={styles.selectedDeliveryWrapper}>
                <Text style={styles.deliveryText3}>Segera Lakukan Pembayaran Sebelum:</Text>
                <Text style={styles.deliveryText2}> {getDateFromString(this.state.order.order_expire_date, true, true, true, false)}</Text>
              </View>
              <View style={styles.wrapperSeparator} />
              <Text style={styles.deliveryText3}>Jumlah yang harus dibayar:</Text>
              <Text style={styles.priceText2}>{convertToRupiah(parseInt(this.state.midtrans.gross_amount))}</Text>
              <View style={styles.wrapperSeparator} />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  hasNullorNot(paymentToFilter) {
    payment_type = ''

    if ((typeof paymentToFilter === 'object' && !paymentToFilter) || (typeof paymentToFilter == 'undefined') || (paymentToFilter === '') || (paymentToFilter === 'unknown')) {
      payment_type = "Tidak Diketahui"
    }
    else {
      payment_type = paymentToFilter
    }
    return payment_type

  }


  renderMenu() {
    var totalPrice = convertToRupiah(this.state.totalPrice)
    var commission = convertToRupiah(this.state.commission)
    if (this.state.order.order_status === 'pending') {
      var menuPay
      if (!this.state.midtrans || !this.state.midtrans.payment_type || this.state.midtrans.payment_type === 'gopay') {
        menuPay = (<TouchableOpacity style={styles.buyBtn} onPress={() => this.payNow()}>
          <Text style={styles.buyText}>Bayar</Text>
        </TouchableOpacity>)
      } else {
        menuPay = (<TouchableOpacity style={styles.buyBtn} onPress={() => this.setState({
          isShowPaymentMethod: true
        })}>
          <Text style={styles.buyText}>Cara Pembayaran</Text>
        </TouchableOpacity>)
      }
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            <Text style={styles.commissionText2}>Est. Komisi {commission}</Text>
          </View>
          {menuPay}
          <View style={styles.sizedVerticalMargin} />
        </View>
      )
    } else if (this.state.order.order_status === 'completed' || this.state.order.order_status === 'cancelled') {
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper2}>
            <View style={styles.menuTextTopWrapper}>
              <Text style={styles.subtotalText}>SUBTOTAL</Text>
              <Text style={styles.priceText}>{totalPrice}</Text>
            </View>
            <View style={styles.menuTextTopWrapper}>
              <Text style={styles.commissionText2}>Komisi {commission}</Text>
            </View>
          </View>
          <View style={styles.menuTextTopWrapper}>
            <TouchableOpacity style={[styles.btnOrderAgain, { backgroundColor: '#43aea0' }]} onPress={() => this.pressOrderAgain()}>
              <Text style={styles.textOrderAgain}>Beli Lagi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sizedVerticalMargin} />
        </View>
      )
    } else if (this.state.order.order_status === 'processing') {
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            <Text style={styles.commissionText2}>Est. Komisi {commission}</Text>
          </View>
        </View>
      )
    }
  }

  render() {
    console.log('xendit', this.state.xenditLink)
    if (this.props.order.fetching) {
      return (
        <View style={{ width: Metrics.screenWidth, height: Metrics.screenHeight, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0 }}>
          <DotIndicator size={12} color={Colors.mooimom} />
        </View>
      )
    }
    if (this.props.deleteOrderHistory.fetching) {
      return (
        <View style={{ width: Metrics.screenWidth, height: Metrics.screenHeight, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0 }}>
          <DotIndicator size={12} color={Colors.mooimom} />
        </View>
      )
    }
    const { menuStatus, order, midtrans } = this.state
    var status = ''
    var idx = menuStatus.findIndex(status => status.status === order.order_status)
    if (idx >= 0)
      status = menuStatus[idx].status_name_proses
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
        </View>
        <View style={styles.cartContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.productSubtitle}>Detail Order #{order.order_id}</Text>
              {
                this.state.order.order_status === 'completed' || this.state.order.order_status === 'cancelled' &&
                <TouchableOpacity onPress={() => this.pressDeleteOrderHistory(order.order_id)}>
                  <FastImage source={Images.bin} style={{ width: 18, height: 18 }} resizeMode={FastImage.resizeMode.contain} />
                </TouchableOpacity>
              }
            </View>

            <View style={styles.wrapperSeparator} />

            <Text style={styles.productSubtitle2}>Status: {status}</Text>

            <Text style={styles.productSubtitle2}>{getDateFromString(order.order_date, true, false, true, false)}</Text>
            <View style={styles.wrapperSeparator} />
            {this.renderSelectedAddress()}
            <View style={styles.wrapperSeparator} />
            <View style={styles.selectedDeliveryWrapper}>
              <Text style={styles.deliveryText2}>Pengiriman:</Text>
              <View style={styles.selectedDeliveryTextWrapper}>
                <Text style={styles.deliveryText}>{order.shipping_method}</Text>
                <Text style={styles.deliveryText}>{convertToRupiah(order.shipping_total)}</Text>
              </View>
            </View>
            <View style={styles.wrapperSeparator} />
            {this._renderProductCart(order.order_items)}
            {this.renderMenu()}
          </ScrollView>
        </View>
        {this.renderShowPayment()}
        {this.renderXenditPayment()}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    auth: state.auth,
    commissionEstimation: state.commissionEstimation,
    statusMidtrans: state.statusMidtrans,
    gopay: state.gopay,
    deleteOrderHistory: state.deleteOrderHistory,
    getOnlineCart: state.getOnlineCart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderRequest: data => {
      dispatch(GetOrderActions.getOrderRequest(data))
    },
    getCommissionEstimationProcess: data => {
      dispatch(CommissionEstimationActions.getCommissionEstimationRequest(data))
    },
    getStatusMidtransProcess: data => {
      dispatch(GetOrderStatusMidtransActions.getOrderStatusMidtransRequest(data))
    },
    saveGopayRequestProcess: data => {
      dispatch(GopayActions.saveGopayRequest(data))
    },
    addToCartProcess: data => {
      dispatch(CartActions.addCartRequest(data))
    },
    deleteOrderHistoryProcess: data => {
      dispatch(DeleteOrderHistoryActions.deleteOrderHistoryRequest(data))
    },
    updateOnlineCartProcess: data => {
      dispatch(UpdateOnlineCartActions.updateOnlineCartRequest(data))
    },
    addToCarttProcess: data => {
      dispatch(CarttActions.addCarttRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailOrderScreen)
