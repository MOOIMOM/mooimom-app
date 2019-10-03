import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images } from '../Themes'
import FastImage from 'react-native-fast-image'
import {convertToRupiah, share} from '../Lib/utils'

import styles from './Styles/ProductCardStyles'

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isInWishlist: this.props.product.wishlist === 1,
      modalClipboardVisible: false
    };
  }

  onSharePress(){
    this.setState({
      modalClipboardVisible: true
    })
    share(this.state.product.images)
    if(this.props.sharedProductProcess){
      let data = {
        product: this.state.product
      }
      this.props.sharedProductProcess(data)
    }
    setTimeout(() => {
      this.setState({
        modalClipboardVisible: false
      })
    }, 3000);
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
      <TouchableOpacity onPress={() => this.onWishlistPress()} style={styles.wishlist}>
        <Image
            source={image}
            style={styles.wishlistImage}
        />
      </TouchableOpacity>
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
        <FastImage
            source={image}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
        />
        {this.renderWishlist()}
        <Text style={styles.name}>{this.state.product.product_name}</Text>
        <View style={styles.priceGroup}>
          <Text style={styles.priceDiscount}>{disc}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.extra}>
          <TouchableOpacity onPress={() => this.onSharePress()} style={styles.btn}>
            <Text style={styles.textBtn}>BAGIKAN</Text>
          </TouchableOpacity>
        </View>
        {this.state.modalClipboardVisible && <View style={styles.modalView}>
          <Text style={styles.modalText}>Sharing ...</Text>
        </View>}
      </View>
    );
  }
}
