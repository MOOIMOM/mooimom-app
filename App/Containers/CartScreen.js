import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/CartScreenStyles'
var colors = [
  {id:1, color:'#FFFFCC'},
  {id:2, color:'pink'},
  {id:3, color:'red'},
  {id:4, color:'green'},
  {id:5, color:'gray'},
  {id:6, color:'blue'},
  {id:7, color:'yellow'},
  {id:8, color:'orange'},
  {id:9, color:'purple'},
]
var sizes = [
  {id:1, size:'S'},
  {id:2, size:'M'},
  {id:3, size:'L'},
  {id:4, size:'XL'},
  {id:5, size:'2XL'},
  {id:6, size:'3XL'},
]
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
class CartScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      carts: dataProducts,
      colors:colors,
      sizes:sizes,
      totalPrice:0,
    }
  }

  componentDidMount () {
    this.calculatePrice()
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  _renderSize({item, index}){
    return (
        <TouchableOpacity>
          <View style={styles.sizeBtn}>
            <Text style={styles.sizeText}>
              {item.size}
            </Text>
          </View>
        </TouchableOpacity>
    );
  }

  _renderColor({item, index}){
    return (
        <TouchableOpacity>
          <View style={styles.colorBtn}>
            <View style={[styles.colorPick, {backgroundColor: item.color}]}/>
          </View>
        </TouchableOpacity>
    );
  }

  _dropdown_renderSizeButtonText(rowData) {
    const {size} = rowData;
    return `${size}`;
  }

  _dropdown_renderColorButtonText(rowData) {
    const {color} = rowData;
    return `${color}`;
  }

  calculatePrice(){
    var price = 0;
    this.state.carts.map(cart => {
      price += (cart.qty * (cart.discPrice > 0 ? cart.discPrice : cart.price))
    })
    this.setState({
      totalPrice: price
    })
  }

  minQty(index){
    var cart =  Object.assign([], this.state.carts);
    if(cart[index].qty - 1 <= 0){
      this.removeFromCart(index)
    } else {
      cart[index].qty = Math.max(cart[index].qty - 1, 0)
      this.setState({
        carts: cart
      })
      this.calculatePrice()
    }
  }

  addQty(index){
    var cart =  Object.assign([], this.state.carts);
    cart[index].qty = cart[index].qty + 1
    this.setState({
      carts: cart
      })
    this.calculatePrice()
  }

  removeFromCart(index){
    Alert.alert(
      '',
      'Remove item from cart?',
      [
        {
          text: 'No'
        },
        {
          text: 'Yes', onPress: () => {
            var cart =  Object.assign([], this.state.carts);
            cart.splice(index, 1)
            this.setState({
              carts: cart
            })
            this.calculatePrice()
          }
        }
      ],
      { cancelable: false }
    )
  }

  _renderProductCart({item, index}){
    var price = item.discPrice > 0 ? item.discPrice : item.price
    price = convertToRupiah(price * item.qty)
    return(
      <View style={styles.productContainer}>
        <View style={styles.productImageWrapper}>
          <Image source={{uri:item.images[0].url}} style={styles.productImage}/>
          <TouchableOpacity style={styles.removeBtn} onPress={() => {this.removeFromCart(index)}}>
            <Image source={Images.x} style={styles.removeImg}/>
          </TouchableOpacity>
        </View>
        <View style={styles.productDescriptionWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
          <View style={styles.propertyWrapper}>
            <View style={styles.sizeWrapper}>
              <Text style={styles.itemText}>Ukuran</Text>
              <ModalDropDown
                renderRow={this._renderSize.bind(this)}
                options={this.state.sizes}
                style={styles.size_dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                defaultValue={this.state.sizes[0].size}
                isColor={false}
                renderButtonText={(rowData) => this._dropdown_renderSizeButtonText(rowData)}
               />
            </View>
            <View style={styles.colorWrapper}>
              <Text style={styles.itemText}>Warna</Text>
              <ModalDropDown
                renderRow={this._renderColor.bind(this)}
                options={this.state.colors}
                style={styles.size_dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                defaultValue={this.state.colors[0].color}
                isColor={true}
                renderButtonText={(rowData) => this._dropdown_renderColorButtonText(rowData)}
               />
            </View>
            <View style={styles.qtyWrapper}>
              <Text style={styles.itemText}>Qty</Text>
              <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => this.minQty(index)}><View style={styles.btnQty}>
                  <Text style={styles.dropdown_text}>-</Text></View></TouchableOpacity>
                <View style={styles.qtyText}><Text style={styles.dropdown_text}>{item.qty}</Text></View>
                <TouchableOpacity onPress={() => {this.addQty(index)}}><View style={styles.btnQty}><Text style={styles.dropdown_text}>+</Text></View></TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.itemText}>{price}</Text>
          </View>
        </View>
      </View>
    );
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
          <Text style={styles.productSubtitle}>Cart {(this.state.carts.length > 1 ? '(' + this.state.carts.length + ')' : '')}</Text>
          <FlatList
            data={this.state.carts}
            renderItem={this._renderProductCart.bind(this)}
            keyExtractor={(item, index) => item.id}
          />
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            <Text style={styles.commissionText}>Komisi {commission}</Text>
          </View>
          <TouchableOpacity style={styles.buyBtn} onPress={() =>this.actNavigate('DeliveryScreen')}>
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
)(CartScreen)
