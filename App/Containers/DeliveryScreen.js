import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, Modal, ActivityIndicator } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import GetAddressActions from '../Redux/GetAddressRedux'
import GetShippingOptionsActions from '../Redux/GetShippingOptionsRedux'
import CheckoutActions from '../Redux/CheckoutRedux'
import CartActions from '../Redux/CartRedux'
import CommissionEstimationActions from '../Redux/CommissionEstimationRedux'
import GetAllOrderActions from '../Redux/GetAllOrderRedux'
import {convertToRupiah, titleCase } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/DeliveryScreenStyles'
class DeliveryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowDelivery: false,
      selectedDelivery: {},
      selectedAddressID: '',
      selectedAddress: null,
      commission: 0
    }
  }

  componentDidMount () {
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getAddressProcess(data)
    this.reloadCommission()
  }

  componentWillReceiveProps(newProps){
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
          if(this.state.selectedAddressID === '' || this.state.selectedAddress === null){
            var selectedAddress = newProps.address.payload.addresses.find(address => address.is_primary === 1)
            if(selectedAddress){
              this.setState({
                selectedAddressID: selectedAddress.id,
                selectedAddress: selectedAddress
              })
            }
          }
      }
    }

    if (this.props.checkout !== newProps.checkout) {
      if (
        newProps.checkout.payload !== null &&
        newProps.checkout.error === null &&
        !newProps.checkout.fetching
      ) {
          this.props.emptyCartProcess()
          this.props.navigation.popToTop()
          let data = {
            data_request:{
              user_id: this.props.auth.payload.user_id,
              unique_token: this.props.auth.payload.unique_token,
              selected_status : 'all'
            }
          }
          this.props.getAllOrderProcess(data)
          this.actNavigate('DetailOrderScreen', {order_id:newProps.checkout.payload.order_id})
      } else if(
        newProps.checkout.payload === null &&
        !newProps.checkout.fetching
      ){
        Alert.alert('Sorry', 'Checkout failed, please try again later')
      }
    }
  }

  reloadCommission(){
    let dataCart = '['
    this.props.cart.data.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.qty + '},'
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

  actNavigate (screen, data = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, data)
  }

  calculatePrice(){
    var price = 0;
    this.props.cart.data.map(cart => {
      price += (cart.qty * (cart.product.product_sale_price > 0 ? cart.product.product_sale_price : cart.product.product_regular_price))
    })
    return price
  }

  calculateDelivery(){
    if(this.state.selectedAddress === null){
        Alert.alert('', 'Please input the delivery address first')
      return;
    }
    var selectedAddress = this.state.selectedAddress
    let dataCart = '['
    this.props.cart.data.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.qty + '},'
    })
    if(dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        district_id: selectedAddress.district_id,
        product_variations_sku_and_quantity: dataCart
      }
    }
    this.props.getShippingOptionsProcess(data)
    this.setState({
      isShowDelivery:true
    })
  }

  selectDelivery(index){
    this.setState({
      isShowDelivery: false,
      selectedDelivery: this.props.shippingOptions.payload.shipping_options[index]
    })
  }

  processBuy(){
    if(this.props.address.payload === null || this.props.address.payload.addresses.length === 0){
        Alert.alert('', 'Please input the delivery address first')
      return;
    }
    if(!this.state.selectedDelivery.jne_or_jnt){
      Alert.alert('', 'Please select one of delivery option first')
      return
    }
    let dataCart = '['
    this.props.cart.data.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.qty + '},'
    })
    if(dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        product_variations_user_want_to_buy:dataCart,
        chosen_shipping_mode: this.state.selectedDelivery.jne_or_jnt+'_'+this.state.selectedDelivery.service,
        chosen_shipping_price: this.state.selectedDelivery.price,
        chosen_app_customer_address_id: this.state.selectedAddressID,
        chosen_method: 'midtrans' // DEFAULT
      }
    }
    this.props.getCheckoutProcess(data)
  }

  _renderProductCart(){
    if(this.props.cart.data && this.props.cart.data.length > 0)
    return (
      this.props.cart.data.map((item, index) => {
        console.info(item.product)
        var price = item.product.product_sale_price > 0 ? item.product.product_sale_price : item.product.product_regular_price
        price = convertToRupiah(price * item.qty)
        var isFound, size, color, title, custom = ''
        isFound = item.product.sizes.find(x => x.slug === item.size)
        if(isFound)
          size = isFound.name
        isFound = item.product.colors.find(x => x.slug === item.color)
        if(isFound)
          color = isFound.name
        isFound = item.product.custom_attributes.find(x => x.slug === item.custom)
        if(isFound){
          custom = isFound.name
          title = titleCase(item.product.custom_attribute_text)
        }
        var image = Images.default
        if(item.product.img_url && item.product.img_url !== '')
          image = {uri:item.product.img_url}
        return(
          <View style={styles.productContainer} key={index.toString()}>
            <View style={styles.productImageWrapper}>
              <Image source={image} style={styles.productImage}/>
            </View>
            <View style={styles.productDescriptionWrapper}>
              <View style={styles.nameWrapper}>
                <Text style={styles.productName}>{item.product.name}</Text>
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
              <View style={styles.priceWrapper}>
                <Text style={styles.itemText}>{price}</Text>
              </View>
            </View>
          </View>
        );
      })
    )
  }

  renderSelectedAddress(){
    if(this.state.selectedAddress === null){
      return <View/>
    }
    const {selectedAddress} = this.state
    return(
      <View>
        <Text style={styles.productSubtitle2}>KIRIM KE</Text>
        <View style={styles.wrapperSeparator}/>
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

  _renderDeliveriesOption(){
    if(this.props.shippingOptions.payload && this.props.shippingOptions.payload.shipping_options.length > 0)
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

  renderDelivery(){
    var selectedDelivery = <View/>
    if(this.state.selectedDelivery.jne_or_jnt){
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
            isShowDelivery:false
          })
        }}>
        <TouchableOpacity
            style={styles.containerModal}
            activeOpacity={1}
            onPressOut={() => this.setState({
              isShowDelivery:false
            })}
          >
            <TouchableWithoutFeedback>
              <View style={styles.chooseDeliveryWrapper2}>
                <TouchableOpacity style={styles.chooseDeliveryBtn2} onPress={() => this.setState({
                  isShowDelivery:false
                })}>
                  <Image source={Images.x} style={styles.imageClose}/>
                  <Text style={styles.chooseDeliveryText2}>Pilih Opsi Pengiriman</Text>
                </TouchableOpacity>
                {this.props.shippingOptions.fetching && <View style={styles.containerLoading}>
                  <ActivityIndicator size="large" color={Colors.mooimom} />
                </View>}
                {this._renderDeliveriesOption()}
              </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      </View>
    )
  }

  setSelectAddress(item){
    this.setState({
      selectedAddressID: item.id,
      selectedAddress: item,
      selectedDelivery: {}
    })
  }

  render () {
    var price = this.calculatePrice()
    var deliveryPrice = this.state.selectedDelivery.price ? this.state.selectedDelivery.price : 0
    var totalPrice = convertToRupiah(price + deliveryPrice)
    var commission = convertToRupiah(this.state.commission)
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
          <Text style={styles.productSubtitle}>Konfirmasi Pengiriman</Text>
          <View style={styles.wrapperSeparator}/>
            {this.renderSelectedAddress()}
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('AddressListScreen', {
            setSelectAddress: this.setSelectAddress.bind(this)
          })}}>
            <Text style={styles.chooseAddressText}>Pilih Alamat</Text>
          </TouchableOpacity>
          {this._renderProductCart()}
          <View style={styles.wrapperSeparator}/>
          {this.renderDelivery()}
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
          <ActivityIndicator size="large" color={Colors.mooimom} />
        </View>}
      </View>
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
  }
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCartProcess: () => {
      dispatch(CartActions.emptyCartRequest())
    },
    getAddressProcess: data => {
      dispatch(GetAddressActions.getAddressRequest(data))
    },
    getShippingOptionsProcess: data => {
      dispatch(GetShippingOptionsActions.getShippingOptionsRequest(data))
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryScreen)
