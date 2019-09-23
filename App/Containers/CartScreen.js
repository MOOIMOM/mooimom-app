import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
import CartActions from '../Redux/CartRedux'
// Styles
import styles from './Styles/CartScreenStyles'
class CartScreen extends Component {
  constructor (props) {
    super(props)
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
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
    );
  }

  _renderColor({item, index}){
    return (
        <TouchableOpacity>
          <View style={styles.colorBtn}>
            <Image source={{uri:item.image_url}} style={[styles.colorPick]}/>
          </View>
        </TouchableOpacity>
    );
  }

  _dropdown_renderSizeButtonText(rowData) {
    const {name} = rowData;
    return `${name}`;
  }

  _dropdown_renderColorButtonText(rowData) {
    const {image_url} = rowData;
    return `${image_url}`;
  }

  calculatePrice(){
    var price = 0;
    this.props.cart.data.map(cart => {
      price += (cart.qty * (cart.product.product_sale_price > 0 ? cart.product.product_sale_price : cart.product.product_regular_price))
    })
    return price
  }

  minQty(index){
    var cart =  Object.assign([], this.props.cart.data);
    if(cart[index].qty - 1 <= 0){
      this.removeFromCart(index)
    } else {
      let data = {
        product: cart[index].product,
        color: cart[index].color,
        size: cart[index].size,
        sku: cart[index].sku,
        qty: cart[index].qty - 1
      }
      this.props.addToCartProcess(data)
    }
  }

  addQty(index){
    var cart =  Object.assign([], this.props.cart.data);
    let data = {
      product: cart[index].product,
      color: cart[index].color,
      size: cart[index].size,
      sku: cart[index].sku,
      qty: cart[index].qty + 1
    }
    this.props.addToCartProcess(data)
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
            var cart =  Object.assign([], this.props.cart.data);
            let data = {
              product: cart[index].product,
              color: cart[index].color,
              size: cart[index].size,
              sku: cart[index].sku,
              qty: 0
            }
            this.props.addToCartProcess(data)
          }
        }
      ],
      { cancelable: false }
    )
  }

  selectColor(item, index, index_item){
    var cart =  Object.assign([], this.props.cart.data);
    var color = item.slug
    var size = cart[index_item].size
    var sku = cart[index_item].product.all_product_variations_with_stock_data.find(variant => variant.color_slug === color && variant.size_slug === size).sku
    var qty = cart[index_item].qty
    var product = cart[index_item].product
    //REMOVE
    let data = {
      product: cart[index_item].product,
      color: cart[index_item].color,
      size: cart[index_item].size,
      sku: cart[index_item].sku,
      qty: 0
    }
    this.props.addToCartProcess(data)
    //ADD
    let data2 = {
      product: product,
      color: color,
      size: size,
      sku: sku,
      qty: qty
    }
    this.props.addToCartProcess(data2)
  }

  selectSize(item, index, index_item){
    var cart =  Object.assign([], this.props.cart.data);
    var color = cart[index_item].color
    var size = item.slug
    var sku = cart[index_item].product.all_product_variations_with_stock_data.find(variant => variant.color_slug === color && variant.size_slug === size).sku
    var qty = cart[index_item].qty
    var product = cart[index_item].product
    //REMOVE
    let data = {
      product: cart[index_item].product,
      color: cart[index_item].color,
      size: cart[index_item].size,
      sku: cart[index_item].sku,
      qty: 0
    }
    this.props.addToCartProcess(data)
    //ADD
    let data2 = {
      product: product,
      color: color,
      size: size,
      sku: sku,
      qty: qty
    }
    this.props.addToCartProcess(data2)
  }

  actBuy(){
    if(this.props.cart.data.length < 1){
      Alert.alert(
        'Sorry',
        'Your cart is empty',
        [
          {
            text: 'OK'
          },
        ]
      )
      return;
    }
    this.actNavigate('DeliveryScreen')
  }

  _renderProductCart({item, index}){
    var price = item.product.product_sale_price > 0 ? item.product.product_sale_price : item.product.product_regular_price
    price = convertToRupiah(price * item.qty)
    var size = item.product.sizes.find(x => x.slug === item.size).name
    var color = item.product.colors.find(x => x.slug === item.color).image_url
    return(
      <View style={styles.productContainer} key={index.toString()}>
        <View style={styles.productImageWrapper}>
          <Image source={{uri:item.product.img_url}} style={styles.productImage}/>
          <TouchableOpacity style={styles.removeBtn} onPress={() => {this.removeFromCart(index)}}>
            <Image source={Images.x} style={styles.removeImg}/>
          </TouchableOpacity>
        </View>
        <View style={styles.productDescriptionWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.productName}>{item.product.name}</Text>
          </View>
          <View style={styles.propertyWrapper}>
            <View style={styles.sizeWrapper}>
              <Text style={styles.itemText}>Ukuran</Text>
              <ModalDropDown
                renderRow={this._renderSize.bind(this)}
                options={item.product.sizes}
                style={styles.size_dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                defaultValue={size}
                index_item={index}
                isColor={false}
                onSelect={(item, index, index_item) => this.selectSize(item, index, index_item)}
                renderButtonText={(rowData) => this._dropdown_renderSizeButtonText(rowData)}
               />
            </View>
            <View style={styles.colorWrapper}>
              <Text style={styles.itemText}>Warna</Text>
              <ModalDropDown
                renderRow={this._renderColor.bind(this)}
                options={item.product.colors}
                style={styles.size_dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                defaultValue={color}
                isColor={true}
                index_item={index}
                onSelect={(item, index, index_item) => this.selectColor(item, index, index_item)}
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
            <Text style={styles.itemText2}>{price}</Text>
          </View>
        </View>
      </View>
    );
  }

  render () {
    var price = this.calculatePrice()
    var totalPrice = convertToRupiah(price)
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
          <Text style={styles.productSubtitle}>Cart {(this.props.cart.data.length > 1 ? '(' + this.props.cart.data.length + ')' : '')}</Text>
          <FlatList
            data={this.props.cart.data}
            renderItem={this._renderProductCart.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            <Text style={styles.commissionText}>Est. Komisi {commission}</Text>
          </View>
          <TouchableOpacity style={styles.buyBtn} onPress={() => this.actBuy()}>
            <Text style={styles.buyText}>Beli</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartProcess: data => {
      dispatch(CartActions.addCartRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen)
