import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
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
            <Image source={image} style={[styles.colorPick]}/>
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

  _renderProductCart(){
    if(this.props.cart.data.length > 0)
    return this.props.cart.data.map((item, index) => {
      var price = item.product.product_sale_price > 0 ? item.product.product_sale_price : item.product.product_regular_price
      price = convertToRupiah(price * item.qty)
      var size = item.product.sizes.find(x => x.slug === item.size).name
      var color = item.product.colors.find(x => x.slug === item.color).image_url
      var image = Images.default
      if(item.product.img_url && item.product.img_url !== ''){
        image = {uri:item.product.img_url}
      }
      return(
        <View style={styles.productContainer} key={index.toString()}>
          <View style={styles.productImageWrapper}>
            <Image source={image} style={styles.productImage}/>
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
          <Text style={styles.productSubtitle}>Cart {(this.props.cart.data.length > 1 ? '(' + this.props.cart.data.length + ')' : '')}</Text>
          {this._renderProductCart()}
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <View style={styles.subtotalWrapper}>
            <Text style={styles.subtotalText}>SUBTOTAL</Text>
            <Text style={styles.priceText}>{totalPrice}</Text>
            {!this.props.commissionEstimation.fetching && <Text style={styles.commissionText}>Est. Komisi {commission}</Text>}
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
