import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { Images } from '../Themes'
import {convertToRupiah, share} from '../Lib/utils'

import styles from './Styles/ProductCardStyles'

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product
    };
  }

  onSharePress(){
    share(this.state.product.images)
    if(this.props.sharedProductProcess){
      let data = {
        product: this.state.product
      }
      this.props.sharedProductProcess(data)
    }
  }

  renderWishlist(){
    var image = Images.wishlistBlack
    if(this.state.product.wishlist === 1)
      image = Images.wishlist1
    return(
      <TouchableWithoutFeedback>
        <View style={styles.wishlist}>
          <Image
              source={image}
              style={styles.wishlistImage}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render () {
    if(!this.state.product.product_regular_price) return (<View/>)
    var price = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_sale_price) : convertToRupiah(this.state.product.product_regular_price)
    var disc = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_regular_price) : ''
    return (
      <View style={styles.item}>
        <Image
            source={{uri:this.state.product.images[0].url}}
            style={styles.image}
        />
        {this.renderWishlist()}
        <Text style={styles.name}>{this.state.product.product_name}</Text>
        <View style={styles.priceGroup}>
          <Text style={styles.priceDiscount}>{disc}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.extra}>
          <TouchableWithoutFeedback onPress={() => this.onSharePress()}>
            <View style={styles.btn}>
              <Text style={styles.textBtn}>BAGIKAN</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
