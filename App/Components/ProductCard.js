import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { Images } from '../Themes'
import { CachedImage } from 'react-native-cached-image';
import {convertToRupiah, share} from '../Lib/utils'

import styles from './Styles/ProductCardStyles'

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isInWishlist: this.props.product.wishlist === 1
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

  onWishlistPress(){
    if(!this.state.isInWishlist){
      if(this.props.addWishlistProductProcess){
        let data = {
          data_request:{
            user_id:this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            product_slug: this.state.product.slug
          }
        }
        this.props.addWishlistProductProcess(data)
        this.setState({
          isInWishlist: !this.state.isInWishlist
        })
      }
    } else {
      if(this.props.deleteWishlistProductProcess){
        let data = {
          data_request:{
            user_id:this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            product_slug: this.state.product.slug
          }
        }
        this.props.deleteWishlistProductProcess(data)
        this.setState({
          isInWishlist: !this.state.isInWishlist
        })
      }
    }
  }

  renderWishlist(){
    var image = Images.wishlistBlack
    if(this.state.isInWishlist)
      image = Images.wishlist1
    return(
      <TouchableWithoutFeedback onPress={() => this.onWishlistPress()}>
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
    var image = Images.default
    if(this.state.product.images && this.state.product.images.length > 0 && this.state.product.images[0].url && this.state.product.images[0].url !== '')
      image = {uri:this.state.product.images[0].url}
    return (
      <View style={styles.item}>
        <CachedImage
            source={image}
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
