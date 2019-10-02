import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, ActivityIndicator, Modal } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import FastImage from 'react-native-fast-image'
import GetOrderActions from '../Redux/GetOrderRedux'
import CommissionEstimationActions from '../Redux/CommissionEstimationRedux'
import GetOrderStatusMidtransActions from '../Redux/GetOrderStatusMidtransRedux'
import { connect } from 'react-redux'
import {convertToRupiah, getDateFromString } from '../Lib/utils'
import MidtransModule from '../Lib/Midtrans'

// Styles
import styles from './Styles/DetailOrderScreenStyles'
class DetailOrderScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuStatus: [
        {status:'all', status_name:'Semua', status_name_proses: ''},
        {status:'pending', status_name:'Pembayaran', status_name_proses: 'Menunggu Pembayaran'},
        {status:'processing', status_name:'Diproses', status_name_proses: 'Sedang Diproses'},
        {status:'completed', status_name:'Selesai', status_name_proses: 'Selesai'},
        {status:'cancelled', status_name:'Dibatalkan', status_name_proses: 'Dibatalkan'}
      ],
      order_id:this.props.navigation.state.params.order_id,
      totalPrice:0,
      commission:0,
      order: {},
      midtrans: {},
      isShowPaymentMethod: false
    }
  }

  componentDidMount () {
    this.reloadData()
  }

  componentWillReceiveProps(newProps){
    if(this.props.order !== newProps.order){
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
          isShowPaymentMethod: false
        })

        // this.reloadCommission(newProps.order.payload.order_items)
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

  reloadData(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        order_id : this.state.order_id
      }
    }
    this.props.getOrderRequest(data)
    // this.props.getStatusMidtransProcess(data)
  }

  reloadCommission(items){
    if(!items || items.length < 1) return;
    let dataCart = '['
    items.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.quantity + '},'
    })
    if(dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        product_variations_user_want_to_buy:dataCart
      }
    }
    this.props.getCommissionEstimationProcess(data)
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  async payNow(){
    const optionConect = {
        clientKey: "VT-client-35STW7Jm-F0bTh1x",
        urlMerchant: "http://www.mooimom.id"
    }

    const transRequest = {
        transactionId: '' + this.state.order.order_id,
        totalAmount: this.state.order.order_total,
        token: this.state.order.midtrans_token
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
        userId: '',
        address: '',
        city: '',
        country: "IDN",
        zipCode: ''
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

    const callback = (res) => {
        this.reloadData()
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

  _renderProductCart(data){
    if(data && data.length > 0)
    return (
      data.map((item, index) => {
        var price = convertToRupiah(item.price * item.quantity)
        var image = Images.default
        if(item.main_image && item.main_image !== '')
          image = {uri:item.main_image}
        return(
          <View style={styles.productContainer} key={index.toString()}>
            <View style={styles.productImageWrapper}>
              <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain}/>
            </View>
            <View style={styles.productDescriptionWrapper}>
              <View style={styles.nameWrapper}>
                <Text style={styles.productName}>{item.product_name}</Text>
              </View>
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
              </View>
              <View style={styles.priceWrapper}>
                <Text style={styles.itemText2}>{price}</Text>
              </View>
            </View>
          </View>
        );
      })
    )
  }

  renderSelectedAddress(){
    const {order} = this.state
    return(
      <View style={styles.deliveryAddressContainer}>
        <Text style={styles.addressName}>{order.billing_name}</Text>
        <Text style={styles.address}>{order.billing_address}</Text>
        <Text style={styles.address}>{order.billing_subdistrict}, {order.billing_city}</Text>
        <Text style={styles.address}>{order.billing_province} - {order.billing_zip_code}</Text>
        <Text style={styles.address}>+62{order.billing_phone}</Text>
      </View>
    )
  }

  renderMethod(){
    const {status_code, payment_type, va_numbers, payment_code,
      permata_va_number, transaction_status, store,
      biller_code, bill_key} = this.state.midtrans
    if(status_code && status_code !== '201' && transaction_status && transaction_status !== 'pending') return <View/>
    switch(payment_type){
      case 'echannel':
        return (
          <View>
            <Text style={styles.deliveryText2}>Mandiri Bill Payment</Text>
            <View style={styles.wrapperSeparator}/>
            <Text style={styles.deliveryText3}>Company Code</Text>
            <Text style={styles.deliveryText2}>{biller_code}</Text>
            <View style={styles.wrapperSeparator}/>
            <Text style={styles.deliveryText3}>Billpay Code</Text>
            <Text style={styles.deliveryText2}>{bill_key}</Text>
          </View>
        );
      case 'bank_transfer':
        if(va_numbers && va_numbers.length > 0){
          switch(va_numbers[0].bank){
            case 'bca':
              return(
              <View>
                <Text style={styles.deliveryText2}>BCA Virtual Account</Text>
                <View style={styles.wrapperSeparator}/>
                <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
                <Text style={styles.deliveryText2}>{va_numbers[0].va_number}</Text>
              </View>
              )
            case 'bni':
              return(
              <View>
                <Text style={styles.deliveryText2}>BNI Virtual Account</Text>
                <View style={styles.wrapperSeparator}/>
                <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
                <Text style={styles.deliveryText2}>{va_numbers[0].va_number}</Text>
              </View>
              )
            default:
              return <View/>
          }
        } else if(permata_va_number && permata_va_number !== ''){
          return(
            <View>
              <Text style={styles.deliveryText2}>Permata Virtual Account</Text>
              <View style={styles.wrapperSeparator}/>
              <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
              <Text style={styles.deliveryText2}>{permata_va_number}</Text>
            </View>
          )
        } else {
          return <View/>
        }
      case 'cstore':
        switch(store){
          case 'indomaret':
            return (
            <View>
              <Text style={styles.deliveryText2}>Indomaret</Text>
              <View style={styles.wrapperSeparator}/>
              <Text style={styles.deliveryText3}>Kode Pembayaran:</Text>
              <Text style={styles.deliveryText2}>{payment_code}</Text>
            </View>
          );
          default:
            return <View/>
        }
        break;
    }
    return <View/>
  }

  renderShowPayment(){
    if(!this.state.isShowPaymentMethod) return;
    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.isShowPaymentMethod}
      onRequestClose={() => {
        this.setState({
          isShowPaymentMethod:false
        })
      }}>
        <View style={styles.paymentGuideContainer}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.setState({
              isShowPaymentMethod:false
            })}>
              <Image source={Images.back} style={styles.buttonHeader} />
            </TouchableOpacity>
          </View>
          <View style={styles.cartContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <Text style={styles.productSubtitle}>Cara Pembayaran</Text>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.selectedDeliveryWrapper}>
              <Text style={styles.deliveryText3}>Segera Lakukan Pembayaran Sebelum:</Text>
              <Text style={styles.deliveryText2}> {getDateFromString(this.state.order.order_expire_date, true, true, true, false)}</Text>
            </View>
            <View style={styles.wrapperSeparator}/>
            <Text style={styles.deliveryText3}>Jumlah yang harus dibayar:</Text>
            <Text style={styles.priceText2}>{convertToRupiah(parseInt(this.state.midtrans.gross_amount))}</Text>
            <View style={styles.wrapperSeparator}/>
            <Text style={styles.deliveryText3}>Metode Pembayaran:</Text>
            {this.renderMethod()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }

  renderMenu(){
    var totalPrice = convertToRupiah(this.state.totalPrice)
    var commission = convertToRupiah(this.state.commission)
    if(this.state.order.order_status === 'pending'){
      var menuPay
      if(!this.state.midtrans || !this.state.midtrans.payment_type){
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
            <Text style={styles.commissionText}>Est. Komisi {commission}</Text>
          </View>
          {menuPay}
        </View>
      )
    } else if(this.state.order.order_status === 'completed'){
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper2}>
            <View style={styles.menuTextTopWrapper}>
              <Text style={styles.priceText}>Subtotal</Text>
              <Text style={styles.priceText}>{totalPrice}</Text>
            </View>
            <View style={styles.menuTextTopWrapper}>
              <Text style={styles.commissionText2}>Komisi</Text>
              <Text style={styles.commissionText2}>{commission}</Text>
            </View>
          </View>
        </View>
      )
    } else if(this.state.order.order_status === 'cancelled'){
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper2}>
            <View style={styles.menuTextTopWrapper}>
              <Text style={styles.priceText}>Subtotal</Text>
              <Text style={styles.priceText}>{totalPrice}</Text>
            </View>
          </View>
        </View>
      )
    } else if(this.state.order.order_status === 'processing'){
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper2}>
            <View style={styles.menuTextTopWrapper}>
              <Text style={styles.priceText}>Subtotal</Text>
              <Text style={styles.priceText}>{totalPrice}</Text>
            </View>
            <View style={styles.menuTextTopWrapper}>
              <Text style={styles.commissionText2}>Estimasi Komisi</Text>
              <Text style={styles.commissionText2}>{commission}</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  render () {
    if(this.props.order.fetching){
      return (
        <View style={{width:Metrics.screenWidth, height: Metrics.screenHeight, justifyContent: 'center', alignItems: 'center', position: 'absolute', top:0, left:0}}>
          <ActivityIndicator size="large" color={Colors.mooimom} />
        </View>
      )
    }
    const {menuStatus, order} = this.state
    var status = ''
    var idx = menuStatus.findIndex(status => status.status === order.order_status)
    if(idx >= 0)
      status = menuStatus[idx].status_name_proses
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
        </View>
        <View style={styles.cartContainer}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <Text style={styles.productSubtitle}>Detail Order #{order.order_id}</Text>
          <View style={styles.wrapperSeparator}/>
          <Text style={styles.productSubtitle2}>Status: {status}</Text>
          <Text style={styles.productSubtitle2}>{getDateFromString(order.order_date, true, false, true, false)}</Text>
          <View style={styles.wrapperSeparator}/>
            {this.renderSelectedAddress()}
          <View style={styles.wrapperSeparator}/>
          <View style={styles.selectedDeliveryWrapper}>
            <Text style={styles.deliveryText2}>Pengiriman:</Text>
            <View style={styles.selectedDeliveryTextWrapper}>
            <Text style={styles.deliveryText}>{order.shipping_method}</Text>
            <Text style={styles.deliveryText}>{convertToRupiah(order.shipping_total)}</Text>
            </View>
          </View>
          <View style={styles.wrapperSeparator}/>
          {this._renderProductCart(order.order_items)}
          <View style={styles.wrapperSeparator}/>
          </ScrollView>
        </View>
        {this.renderMenu()}
        {this.renderShowPayment()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    auth: state.auth,
    commissionEstimation: state.commissionEstimation,
    statusMidtrans: state.statusMidtrans
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailOrderScreen)
