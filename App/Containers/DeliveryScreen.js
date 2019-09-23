import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList, Modal } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import GetAddressActions from '../Redux/GetAddressRedux'
import GetShippingOptionsActions from '../Redux/GetShippingOptionsRedux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/DeliveryScreenStyles'
class DeliveryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowDelivery: false,
      selectedDelivery: {},
      selectedAddressID: ''
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
    if(this.props.address.payload === null || this.props.address.payload.addresses.length === 0){
        Alert.alert('', 'Please input the delivery address first')
      return;
    }
    var selectedAddress = this.props.address.payload.addresses.find(address => address.id === this.state.selectedAddressID)
    if(!selectedAddress)
      selectedAddress = this.props.address.payload.addresses.find(address => address.is_primary === 1)
    if(!selectedAddress){
      Alert.alert('', 'Please input the delivery address first')
      return;
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
  }

  _renderProductCart({item, index}){
    var price = item.product.product_sale_price > 0 ? item.product.product_sale_price : item.product.product_regular_price
    price = convertToRupiah(price * item.qty)
    var size = item.product.sizes.find(x => x.slug === item.size).name
    var color = item.product.colors.find(x => x.slug === item.color).name
    return(
      <View style={styles.productContainer}>
        <View style={styles.productImageWrapper}>
          <Image source={{uri:item.product.img_url}} style={styles.productImage}/>
        </View>
        <View style={styles.productDescriptionWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.productName}>{item.product.name}</Text>
          </View>
          <View style={styles.propertyWrapper}>
            <View style={styles.sizeWrapper}>
              <Text style={styles.itemText}>Ukuran - {size}</Text>
            </View>
            <View style={styles.colorWrapper}>
              <Text style={styles.itemText}>Warna - {color}</Text>
            </View>
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
  }

  renderSelectedAddress(){
    if(this.props.address.payload === null || this.props.address.payload.addresses.length === 0){
      return <View/>
    }
    var selectedAddress = this.props.address.payload.addresses.find(address => address.id === this.state.selectedAddressID)
    if(!selectedAddress)
      selectedAddress = this.props.address.payload.addresses.find(address => address.is_primary === 1)
    if(selectedAddress)
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

  _renderDeliveriesOption({item, index}){
    return (
      <TouchableOpacity style={styles.deliveryOptionWrapper} onPress={() => this.selectDelivery(index)}>
        <Text style={styles.deliveryNameText}>{item.jne_or_jnt} {item.service} ({item.delivery_time}) hari</Text>
        <Text style={styles.deliveryPriceText}>{convertToRupiah(item.price)}</Text>
      </TouchableOpacity>
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
              <FlatList
                data={this.props.shippingOptions.payload ? this.props.shippingOptions.payload.shipping_options : []}
                renderItem={this._renderDeliveriesOption.bind(this)}
                keyExtractor={(item, index) => index.toString()}
              />
              </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      </View>
    )
  }

  setSelectAddress(param){
    this.setState({
      selectedAddressID: param,
      selectedDelivery: {}
    })
  }

  render () {
    var price = this.calculatePrice()
    var deliveryPrice = this.state.selectedDelivery.price ? this.state.selectedDelivery.price : 0
    var totalPrice = convertToRupiah(price + deliveryPrice)
    var commission = convertToRupiah(price / 10)
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
          <Text style={styles.productSubtitle}>Konfirmasi</Text>
          <View style={styles.wrapperSeparator}/>
            {this.renderSelectedAddress()}
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('AddressListScreen', {
            setSelectAddress: this.setSelectAddress.bind(this)
          })}}>
            <Text style={styles.chooseAddressText}>Pilih Alamat</Text>
          </TouchableOpacity>
          <FlatList
            data={this.props.cart.data}
            renderItem={this._renderProductCart.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.wrapperSeparator}/>
          {this.renderDelivery()}
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            <Text style={styles.commissionText}>Est. Komisi {commission}</Text>
          </View>
          <TouchableOpacity style={styles.buyBtn} onPress={() => this.processBuy()}>
            <Text style={styles.buyText}>Beli</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    address: state.address,
    auth: state.auth,
    shippingOptions: state.shippingOptions
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAddressProcess: data => {
      dispatch(GetAddressActions.getAddressRequest(data))
    },
    getShippingOptionsProcess: data => {
      dispatch(GetShippingOptionsActions.getShippingOptionsRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryScreen)
