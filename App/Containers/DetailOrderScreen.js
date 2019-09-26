import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, ActivityIndicator } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import GetOrderActions from '../Redux/GetOrderRedux'
import CommissionEstimationActions from '../Redux/CommissionEstimationRedux'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
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
      order: {}
    }
  }

  componentDidMount () {
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        order_id : this.state.order_id
      }
    }
    this.props.getOrderRequest(data)
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
        })

        this.reloadCommission(newProps.order.payload.order_items)
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
              <Image source={image} style={styles.productImage}/>
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

  renderMenu(){
    var totalPrice = convertToRupiah(this.state.totalPrice)
    var commission = convertToRupiah(this.state.commission)
    if(this.state.order.order_status === 'pending'){
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            <Text style={styles.commissionText}>Est. Komisi {commission}</Text>
          </View>
          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>Bayar</Text>
          </TouchableOpacity>
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
          <Text style={styles.productSubtitle2}>{order.order_date}</Text>
          <View style={styles.wrapperSeparator}/>
            {this.renderSelectedAddress()}
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          {this._renderProductCart(order.order_items)}
          <View style={styles.wrapperSeparator}/>
          </ScrollView>
        </View>
        {this.renderMenu()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    auth: state.auth,
    commissionEstimation: state.commissionEstimation,
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailOrderScreen)
