import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/DetailOrderScreenStyles'
var dataAddress = [
  {name:'James', street:'Graha Boulevard BO5', district:'Kelapa Gading Timur, Kelapa Gading, Jakarta Utara, DKI Jakarta', zipCode:'14240', phone:'081823908879'}
]
class DetailOrderScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order:this.props.navigation.state.params.order,
      products: this.props.navigation.state.params.order.products,
      totalPrice:0,
      selectedAddress: dataAddress[0]
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
    this.state.products.map(cart => {
      price += (cart.qty * (cart.discPrice > 0 ? cart.discPrice : cart.price))
    })
    this.setState({
      totalPrice: price
    })
  }

  _renderProductCart({item, index}){
    var price = item.discPrice > 0 ? item.discPrice : item.price
    price = convertToRupiah(price * item.qty)
    var image = Images.default
    if(item.images[0].url && item.images[0].url !== '')
      image = {uri:item.images[0].url}
    return(
      <View style={styles.productContainer}>
        <View style={styles.productImageWrapper}>
          <Image source={image} style={styles.productImage}/>
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
            <Text style={styles.itemText2}>{price}</Text>
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

  renderMenu(){
    var totalPrice = convertToRupiah(this.state.totalPrice)
    var commission = convertToRupiah(this.state.totalPrice / 10)
    if(this.state.order.status === 'Pembayaran'){
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
    } else if(this.state.order.status === 'Selesai'){
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
    } else if(this.state.order.status === 'Dibatalkan'){
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
    } else if(this.state.order.status === 'Diproses'){
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
          <Text style={styles.productSubtitle}>Detil Order {this.state.order.orderID}</Text>
          <View style={styles.wrapperSeparator}/>
          <Text style={styles.productSubtitle2}>Status: {this.state.order.statusname}</Text>
          <View style={styles.wrapperSeparator}/>
            {this.renderSelectedAddress()}
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          <FlatList
            data={this.state.products}
            renderItem={this._renderProductCart.bind(this)}
            keyExtractor={(item, index) => item.id}
          />
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

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailOrderScreen)
