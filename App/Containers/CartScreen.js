import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import { convertToRupiah, titleCase } from '../Lib/utils'
import CartActions from '../Redux/CartRedux'
import CarttActions from '../Redux/CarttRedux'
import UpdateOnlineCartActions from '../Redux/UpdateOnlineCartRedux'
import CommissionEstimationActions from '../Redux/CommissionEstimationRedux'
import GetOnlineCartActions from '../Redux/GetOnlineCartRedux'

import { DotIndicator } from 'react-native-indicators'
// Styles
import styles from './Styles/CartScreenStyles'


class CartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commission: 0,
      shoppingCartId: 0,
      disabledRemoveButton: false,
      cart: []
    }
  }

  componentWillMount() {
    let dataCart = [...this.props.cartt.data].reverse()

    let data2 = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        shopping_cart_id: this.props.getOnlineCart.payload.shopping_cart_id,
        product_variations_user_want_to_buy: JSON.stringify(dataCart)
      }
    }
    this.props.updateOnlineCartProcess(data2)
  }

  componentDidMount() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getOnlineCartProcess(data)
    this.reloadCommission(this.state.cart)
  }

  actNavigate(screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  componentWillReceiveProps(newProps) {
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


    if (this.props.cartt !== newProps.cartt) {
      if (
        newProps.cartt.payload !== null &&
        newProps.cartt.error === null &&
        !newProps.cartt.fetching
      ) {
        let dataCart = [...this.props.cartt.data].reverse()

        let data2 = {
          data_request: {
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            shopping_cart_id: this.state.shoppingCartId,
            product_variations_user_want_to_buy: JSON.stringify(dataCart),
          }
        }
        this.props.updateOnlineCartProcess(data2)
      }
    }

    if (this.props.updateOnlineCart !== newProps.updateOnlineCart) {
      if (
        newProps.updateOnlineCart.payload !== null &&
        newProps.updateOnlineCart.error === null &&
        !newProps.updateOnlineCart.fetching
      ) {
        this.setState({ disabledRemoveButton: false })
        this.componentDidMount()
      }
    }

    if (this.props.getOnlineCart !== newProps.getOnlineCart) {
      if (
        newProps.getOnlineCart.payload !== null &&
        newProps.getOnlineCart.error === null &&
        !newProps.getOnlineCart.fetching
      ) {
        console.log(newProps.getOnlineCart.payload.shopping_cart_content_new)
        this.reloadCommission(newProps.getOnlineCart.payload.shopping_cart_content_new)
        this.setState({ shoppingCartId: newProps.getOnlineCart.payload.shopping_cart_id, cart: newProps.getOnlineCart.payload.shopping_cart_content_new })
      }
    }
  }

  reloadCommission(arr) {
    if (arr.length < 1) {
      this.setState({
        commission: 0
      })
      return
    };
    let dataCart = '['
    arr.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.quantity + '},'
    })
    if (dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        product_variations_user_want_to_buy: dataCart
      }
    }
    this.props.getCommissionEstimationProcess(data)
  }



  calculatePrice() {
    var price = 0;
    this.state.cart.map(cart => {
      price += (cart.quantity * (cart.sale_price > 0 ? cart.sale_price : cart.regular_price))
    })
    return price
  }


  removeFromCart(index) {
    Alert.alert(
      '',
      'Remove item from cart?',
      [
        {
          text: 'No'
        },
        {
          text: 'Yes', onPress: () => {
            this.setState({ disabledRemoveButton: true })
            var cart = Object.assign([], this.props.cartt.data);
            console.log('cart', index)
            console.log(cart[index])
            let data = {
              sku: cart[index].sku,
              quantity: 0
            }
            this.props.addToCarttProcess(data)
          }
        }
      ],
      { cancelable: false }
    )
  }

  actBuy() {
    if (this.props.cartt.data.length < 1) {
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
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 1:
          if (data[i].color_slug === slug
            && data[i].size_slug === size
            && data[i].custom_attribute_1_slug === custom
          ) {
            return data[i].stock_quantity === 0
          }
          break;
        case 2:
          if (data[i].size_slug === slug
            && data[i].color_slug === color
            && data[i].custom_attribute_1_slug === custom
          ) {
            return data[i].stock_quantity === 0
          }
          break;
        case 3:
          if (data[i].custom_attribute_1_slug === slug
            && data[i].color_slug === color
            && data[i].size_slug === size
          ) {
            return data[i].stock_quantity === 0
          }
          break;
      }
    }
    return true
  }


  _renderProductCart() {

    if (this.state.cart.length > 0)
      return this.state.cart.map((item, index) => {
        var price = (item.sale_price > 0 ? item.sale_price : item.regular_price)
        price = convertToRupiah(price * item.quantity)

        var size = item.size_name
        var image = { uri: item.img_url }

        isFound = (item.colors && item.colors.length > 0) ? item.colors.find(x => x.slug === item.color_slug) : false
        if (isFound)
          color = { uri: isFound.image_url }

        var freegiftQty = item.free_gift.length


        return (
          <View key={index.toString()} >
            <View style={styles.productContainer}>
              <View style={styles.productImageWrapper}>
                <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain} />
                <TouchableOpacity disabled={this.state.disabledRemoveButton} style={styles.removeBtn} onPress={() => { this.removeFromCart(index) }}>
                  <Image source={Images.x} style={styles.removeImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.productDescriptionWrapper}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.productName}>{item.main_product_name}</Text>
                </View>
                <View style={styles.propertyWrapper}>

                  <View style={styles.colorWrapper}>
                    <Text style={styles.itemText}>Warna</Text>
                    <View style={{ width: 21, height: 21, borderWidth: item.color_slug === 'white' ? 0.5 : 0, borderColor: item.color_slug === 'white' ? Colors.black : '' }}>
                      <Image source={color} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </View>
                  </View>

                  <View style={styles.sizeWrapper}>
                    <Text style={styles.itemText}>Ukuran</Text>
                    <Text>{size}</Text>
                  </View>

                  <View style={styles.qtyWrapper}>
                    <Text style={styles.itemText}>Qty</Text>
                    <Text style={styles.dropdown_text}>{item.quantity}</Text>
                  </View>
                </View>
                <View style={styles.priceWrapper}>
                  <Text style={styles.itemText2}>{price}</Text>
                </View>
              </View>
            </View>
            {this.renderFreeGift(item, freegiftQty)}
          </View >
        );
      })
  }

  renderFreeGift(items, fgQty) {
    if (items.free_gift.length > 0) {
      return (
        <View style={{ width: '100%', height: 100, backgroundColor: Colors.mooimom, paddingBottom: 10 }}>
          <View style={{ width: '100%', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, fontWeight: 'bold', color: Colors.white, fontSize: Metrics.fontSize3, marginVertical: 5, marginRight: 10 }}>+{fgQty} Produk Gratis</Text>
            {
              items.free_gift.map((item, index) => {
                freeGiftImage = { uri: item.img_url }
                return (
                  <View key={index} style={{ width: '100%', backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                    <FastImage source={freeGiftImage} style={{ width: 70, height: 50 }} resizeMode={FastImage.resizeMode.contain} />
                    <View style={{ width: '60%', paddingHorizontal: 10 }}>
                      <Text style={[styles.productName, { fontSize: Metrics.fontSize1 }]}>{item.main_product_name}</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
      )
    }
    else { return; }
  }

  render() {
    var price = this.calculatePrice()
    var totalPrice = convertToRupiah(price)
    var commission = convertToRupiah(this.state.commission)
    return (
      <>
        {
          this.props.getOnlineCart.fetching || this.props.updateOnlineCart.fetching ?
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <DotIndicator size={12} color={Colors.mooimom} />
            </SafeAreaView>
            :
            <SafeAreaView style={styles.container}>
              <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
                  <Image source={Images.back} style={styles.buttonHeader} />
                </TouchableOpacity>
              </View>
              <View style={styles.cartContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  {this.state.cart.length === 0 &&
                    <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={styles.subtotalText}>Keranjang Belanja Masih Kosong</Text>
                      <Text style={styles.subtotalText}>Ayo Mulai Belanja Sekarang</Text>
                    </View>
                  }
                  {this.state.cart.length > 0 && <Text style={styles.productSubtitle}>Cart {(this.state.cart.length > 1 ? '(' + this.state.cart.length + ')' : '')}</Text>}
                  {this._renderProductCart()}
                  <View style={{ marginVertical: 20 }} />
                </ScrollView>
              </View>
              {this.state.cart.length > 0 && <View style={styles.menuWrapper}>
                <View style={styles.subtotalWrapper}>
                  <Text style={styles.subtotalText}>SUBTOTAL</Text>
                  <Text style={styles.priceText}>{totalPrice}</Text>
                  {!this.props.commissionEstimation.fetching && <Text style={styles.commissionText}>Est. Komisi {commission}</Text>}
                </View>
                <TouchableOpacity style={styles.buyBtn} onPress={() => this.actBuy()}>
                  <Text style={styles.buyText}>Beli</Text>
                </TouchableOpacity>
              </View>}
            </SafeAreaView>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    cartt: state.cartt,
    auth: state.auth,
    commissionEstimation: state.commissionEstimation,
    getOnlineCart: state.getOnlineCart,
    updateOnlineCart: state.updateOnlineCart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartProcess: data => {
      dispatch(CartActions.addCartRequest(data))
    },
    addToCarttProcess: data => {
      dispatch(CarttActions.addCarttRequest(data))
    },
    getCommissionEstimationProcess: data => {
      dispatch(CommissionEstimationActions.getCommissionEstimationRequest(data))
    },
    getOnlineCartProcess: data => {
      dispatch(GetOnlineCartActions.getOnlineCartRequest(data))
    },
    updateOnlineCartProcess: data => {
      dispatch(UpdateOnlineCartActions.updateOnlineCartRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen)
