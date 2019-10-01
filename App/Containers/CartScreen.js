import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import { Images, Metrics } from '../Themes'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import {convertToRupiah, titleCase } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
import CartActions from '../Redux/CartRedux'
import CommissionEstimationActions from '../Redux/CommissionEstimationRedux'
// Styles
import styles from './Styles/CartScreenStyles'
class CartScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      commission: 0
    }
  }

  componentDidMount(){
    this.reloadCommission(this.props.cart.data)
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
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

    if(this.props.cart !== newProps.cart){
      if (
        newProps.commissionEstimation.payload !== null &&
        newProps.commissionEstimation.error === null &&
        !newProps.commissionEstimation.fetching
      ) {
          this.reloadCommission(newProps.cart.data)
      }
    }
  }

  reloadCommission(arr){
    if(arr.length < 1) {
      this.setState({
        commission: 0
      })
      return
    };
    let dataCart = '['
    arr.map(cart => {
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
    var image = Images.default
    if(item.image_url && item.image_url !== ''){
      image = {uri:item.image_url}
    }
    return (
        <TouchableOpacity>
          <View style={styles.colorBtn}>
            <FastImage source={image} style={[styles.colorPick]} resizeMode={FastImage.resizeMode.contain}/>
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
        custom: cart[index].custom,
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
      custom: cart[index].custom,
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
              custom: cart[index].custom,
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
    var custom = cart[index_item].custom
    var newProduct = cart[index_item].product.all_product_variations_with_stock_data.find(variant => variant.color_slug === color && variant.size_slug === size && variant.custom_attribute_1_slug === custom)
    var sku = newProduct.sku
    var qty = cart[index_item].qty
    var product = {...cart[index_item].product}
    product.product_regular_price = newProduct.regular_price
    product.product_sale_price = newProduct.sale_price
    //REMOVE
    let data = {
      product: cart[index_item].product,
      color: cart[index_item].color,
      size: size,
      sku: cart[index_item].sku,
      custom: custom,
      qty: 0
    }
    this.props.addToCartProcess(data)
    //ADD
    let data2 = {
      product: product,
      color: color,
      size: size,
      custom: custom,
      sku: sku,
      qty: qty
    }
    this.props.addToCartProcess(data2)
  }

  selectSize(item, index, index_item){
    var cart =  Object.assign([], this.props.cart.data);
    var color = cart[index_item].color
    var size = item.slug
    var custom = cart[index_item].custom
    var newProduct = cart[index_item].product.all_product_variations_with_stock_data.find(variant => variant.color_slug === color && variant.size_slug === size && variant.custom_attribute_1_slug === custom)
    var sku = newProduct.sku
    var qty = cart[index_item].qty
    var product = {...cart[index_item].product}
    product.product_regular_price = newProduct.regular_price
    product.product_sale_price = newProduct.sale_price
    //REMOVE
    let data = {
      product: cart[index_item].product,
      color: cart[index_item].color,
      size: size,
      sku: cart[index_item].sku,
      custom: custom,
      qty: 0
    }
    this.props.addToCartProcess(data)
    //ADD
    let data2 = {
      product: product,
      color: color,
      size: size,
      sku: sku,
      custom: custom,
      qty: qty
    }
    this.props.addToCartProcess(data2)
  }

  selectCustom(item, index, index_item){
    var cart =  Object.assign([], this.props.cart.data);
    var color = cart[index_item].color
    var size = cart[index_item].size
    var custom = item.slug
    var newProduct = cart[index_item].product.all_product_variations_with_stock_data.find(variant => variant.color_slug === color && variant.size_slug === size && variant.custom_attribute_1_slug === custom)
    var sku = newProduct.sku
    var qty = cart[index_item].qty
    var product = {...cart[index_item].product}
    product.product_regular_price = newProduct.regular_price
    product.product_sale_price = newProduct.sale_price
    //REMOVE
    let data = {
      product: cart[index_item].product,
      color: color,
      size: size,
      sku: cart[index_item].sku,
      custom: cart[index_item].custom,
      qty: 0
    }
    this.props.addToCartProcess(data)
    //ADD
    let data2 = {
      product: product,
      color: color,
      size: size,
      sku: sku,
      custom: custom,
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

  checkEmpty(data, slug, type, size, color, custom) {
    for(var i = 0;i<data.length;i++){
      switch(type){
        case 1:
          if(data[i].color_slug === slug
            && data[i].size_slug === size
            && data[i].custom_attribute_1_slug === custom
          ){
              return data[i].stock_quantity === 0
          }
        break;
        case 2:
          if(data[i].size_slug === slug
            && data[i].color_slug === color
            && data[i].custom_attribute_1_slug === custom
          ){
            return data[i].stock_quantity === 0
          }
        break;
        case 3:
          if(data[i].custom_attribute_1_slug === slug
            && data[i].color_slug === color
            && data[i].size_slug === size
          ){
            return data[i].stock_quantity === 0
          }
        break;
      }
    }
    return true
  }

  _renderProductCart(){
    if(this.props.cart.data.length > 0)
    return this.props.cart.data.map((item, index) => {
      var price = item.product.product_sale_price > 0 ? item.product.product_sale_price : item.product.product_regular_price
      price = convertToRupiah(price * item.qty)
      var isFound, size, color, title, custom = ''
      isFound = item.product.sizes.find(x => x.slug === item.size)
      if(isFound)
        size = isFound.name
      isFound = item.product.colors.find(x => x.slug === item.color)
      if(isFound)
        color = isFound.image_url
      isFound = item.product.custom_attributes.find(x => x.slug === item.custom)
      if(isFound){
        custom = isFound.name
        title = titleCase(item.product.custom_attribute_text)
      }
      var image = Images.default
      if(item.product.img_url && item.product.img_url !== ''){
        image = {uri:item.product.img_url}
      }
      var sizes = []
      for(var i=0;i<item.product.sizes.length;i++){
        if(!this.checkEmpty(item.product.all_product_variations_with_stock_data, item.product.sizes[i].slug, 2, item.size, item.color, item.custom)){
          sizes.push(item.product.sizes[i])
        }
      }
      var colors = []
      for(var i=0;i<item.product.colors.length;i++){
        if(!this.checkEmpty(item.product.all_product_variations_with_stock_data, item.product.colors[i].slug, 1, item.size, item.color, item.custom)){
          colors.push(item.product.colors[i])
        }
      }
      var customs = []
      for(var i=0;i<item.product.custom_attributes.length;i++){
        if(!this.checkEmpty(item.product.all_product_variations_with_stock_data, item.product.custom_attributes[i].slug, 3, item.size, item.color, item.custom)){
          customs.push(item.product.custom_attributes[i])
        }
      }
      return(
        <View style={styles.productContainer} key={index.toString()}>
          <View style={styles.productImageWrapper}>
            <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain}/>
            <TouchableOpacity style={styles.removeBtn} onPress={() => {this.removeFromCart(index)}}>
              <Image source={Images.x} style={styles.removeImg}/>
            </TouchableOpacity>
          </View>
          <View style={styles.productDescriptionWrapper}>
            <View style={styles.nameWrapper}>
              <Text style={styles.productName}>{item.product.product_name}</Text>
            </View>
            <View style={styles.propertyWrapper}>
              {colors.length > 0 &&
              <View style={styles.colorWrapper}>
                <Text style={styles.itemText}>Warna</Text>
                <ModalDropDown
                  renderRow={this._renderColor.bind(this)}
                  options={colors}
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
              }
              {sizes.length > 0 &&
              <View style={styles.sizeWrapper}>
                <Text style={styles.itemText}>Ukuran</Text>
                <ModalDropDown
                  renderRow={this._renderSize.bind(this)}
                  options={sizes}
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
              }
              {customs.length > 0 &&
              <View style={styles.sizeWrapper}>
                <Text style={styles.itemText}>{title}</Text>
                <ModalDropDown
                  renderRow={this._renderSize.bind(this)}
                  options={customs}
                  style={styles.size_dropdown}
                  textStyle={styles.dropdown_text}
                  dropdownStyle={styles.dropdown_dropdown}
                  defaultValue={custom}
                  index_item={index}
                  isColor={false}
                  onSelect={(item, index, index_item) => this.selectCustom(item, index, index_item)}
                  renderButtonText={(rowData) => this._dropdown_renderSizeButtonText(rowData)}
                 />
              </View>
              }
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
    })
  }

  render () {
    var price = this.calculatePrice()
    var totalPrice = convertToRupiah(price)
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
          {this.props.cart.data.length === 0 &&
            <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.subtotalText}>Keranjang Belanja Masih Kosong</Text>
              <Text style={styles.subtotalText}>Ayo Mulai Belanja Sekarang</Text>
            </View>
          }
          {this.props.cart.data.length > 0 && <Text style={styles.productSubtitle}>Cart {(this.props.cart.data.length > 1 ? '(' + this.props.cart.data.length + ')' : '')}</Text>}
          {this._renderProductCart()}

          </ScrollView>
        </View>
        {this.props.cart.data.length > 0 && <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            {!this.props.commissionEstimation.fetching && <Text style={styles.commissionText}>Est. Komisi {commission}</Text>}
          </View>
          <TouchableOpacity style={styles.buyBtn} onPress={() => this.actBuy()}>
            <Text style={styles.buyText}>Beli</Text>
          </TouchableOpacity>
        </View>}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    auth: state.auth,
    commissionEstimation: state.commissionEstimation,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartProcess: data => {
      dispatch(CartActions.addCartRequest(data))
    },
    getCommissionEstimationProcess: data => {
      dispatch(CommissionEstimationActions.getCommissionEstimationRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen)
