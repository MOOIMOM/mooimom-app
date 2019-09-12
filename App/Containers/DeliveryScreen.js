import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/DeliveryScreenStyles'
var dataProducts = [
  {id: '1', images: [
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
  ],
    name:'Full Coverage Seamless Maternity & Nursing Bra', price: 350000, discPrice: 0,
    qty: 1, size:1, color:1},
  {id: '2', images: [
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/05/08/main-c7889-1-compressor.jpg'},
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-4.jpg'},
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-5.jpg'},
    {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-3.jpg'},
  ],
    name:'Bamboo Postpartum Belly Band Corset', price: 920000, discPrice: 200000,
    qty: 1, size:1, color:1
}]
var dataAddress = [
  {name:'James', street:'Graha Boulevard BO5', district:'Kelapa Gading Timur, Kelapa Gading, Jakarta Utara, DKI Jakarta', zipCode:'14240', phone:'081823908879'}
]
var dataDelivery = [
  {name:'JNE CTC (1-2 hari)', price:9000},
  {name:'JNE CTC YES (1 hari)', price:18000},
  {name:'Ninja Express (COD)', price:0},
]
class DeliveryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      carts: dataProducts,
      totalPrice:0,
      selectedAddress: dataAddress[0],
      deliveryOptions: dataDelivery,
      isShowDelivery: false,
      selectedDelivery: {}
    }
  }

  componentDidMount () {
    this.calculatePrice()
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  calculatePrice(){
    var price = 0;
    this.state.carts.map(cart => {
      price += (cart.qty * (cart.discPrice > 0 ? cart.discPrice : cart.price))
    })

    if(this.state.selectedDelivery.price && this.state.selectedDelivery.price > 0)
      price += this.state.selectedDelivery.price

    this.setState({
      totalPrice: price
    })
  }

  calculateDelivery(){
    this.setState({
      isShowDelivery:true
    })
  }

  async selectDelivery(index){
    await this.setState({
      isShowDelivery: false,
      selectedDelivery: this.state.deliveryOptions[index]
    })
    await this.calculatePrice()
  }

  processBuy(){
    if(!this.state.selectedDelivery.name){
      Alert.alert('', 'Please select one of delivery option first')
      return
    }
  }

  _renderProductCart({item, index}){
    var price = item.discPrice > 0 ? item.discPrice : item.price
    price = convertToRupiah(price * item.qty)
    return(
      <View style={styles.productContainer}>
        <View style={styles.productImageWrapper}>
          <Image source={{uri:item.images[0].url}} style={styles.productImage}/>
        </View>
        <View style={styles.productDescriptionWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
          <View style={styles.propertyWrapper}>
            <View style={styles.sizeWrapper}>
              <Text style={styles.itemText}>Ukuran - S</Text>
            </View>
            <View style={styles.colorWrapper}>
              <Text style={styles.itemText}>Warna - Blue</Text>
            </View>
            <View style={styles.qtyWrapper}>
              <Text style={styles.itemText}>Qty - 1</Text>
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
    const {selectedAddress} = this.state
    return(
      <View style={styles.deliveryAddressContainer}>
        <Text style={styles.addressName}>{selectedAddress.name}</Text>
        <Text style={styles.address}>{selectedAddress.street}</Text>
        <Text style={styles.address}>{selectedAddress.district}</Text>
        <Text style={styles.address}>{selectedAddress.zipCode}</Text>
        <Text style={styles.address}>{selectedAddress.phone}</Text>
      </View>
    )
  }

  _renderDeliveriesOption({item, index}){
    return (
      <TouchableOpacity style={styles.deliveryOptionWrapper} onPress={() => this.selectDelivery(index)}>
        <Text style={styles.deliveryNameText}>{item.name}</Text>
        <Text style={styles.deliveryPriceText}>{convertToRupiah(item.price)}</Text>
      </TouchableOpacity>
    )
  }

  renderDelivery(){
    var selectedDelivery = <View/>
    if(this.state.selectedDelivery.name){
      selectedDelivery =
        <View style={styles.selectedDeliveryWrapper}>
          <Text style={styles.deliveryNameText}>{this.state.selectedDelivery.name}</Text>
          <Text style={styles.deliveryPriceText}>{convertToRupiah(this.state.selectedDelivery.price)}</Text>
        </View>
      }
    if(this.state.isShowDelivery){
      return (
        <View style={styles.chooseDeliveryWrapper}>
          {selectedDelivery}
          <TouchableOpacity style={styles.chooseDeliveryBtn2} onPress={() => this.setState({
            isShowDelivery:false
          })}>
            <Image source={Images.x} style={styles.imageClose}/>
            <Text style={styles.chooseDeliveryText2}>Pilih Opsi Pengiriman</Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.deliveryOptions}
            renderItem={this._renderDeliveriesOption.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.chooseDeliveryWrapper}>
          {selectedDelivery}
          <TouchableOpacity style={styles.chooseDeliveryBtn} onPress={() => this.calculateDelivery()}>
            <Text style={styles.chooseDeliveryText}>Pilih Opsi Pengiriman</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    var totalPrice = convertToRupiah(this.state.totalPrice)
    var commission = convertToRupiah(this.state.totalPrice / 10)
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
          <Text style={styles.productSubtitle2}>KIRIM KE</Text>
          <View style={styles.wrapperSeparator}/>
            {this.renderSelectedAddress()}
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('AddressListScreen')}}>
            <Text style={styles.chooseAddressText}>Pilih Alamat</Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.carts}
            renderItem={this._renderProductCart.bind(this)}
            keyExtractor={(item, index) => item.id}
          />
          <View style={styles.wrapperSeparator}/>
          {this.renderDelivery()}
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            <Text style={styles.commissionText}>Komisi {commission}</Text>
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

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryScreen)
