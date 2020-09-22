import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import FastImage from 'react-native-fast-image'
import { convertToRupiah, share } from '../Lib/utils'

import styles from './Styles/ProductCardStyles'

import RNAiqua from 'react-native-aiqua-sdk'

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isInWishlist: this.props.product.wishlist === 1,
      modalClipboardVisible: false
    };
  }

  onSharePress() {
    this.setState({
      modalClipboardVisible: true
    })
    share(this.state.product.images)
    if (this.props.sharedProductProcess) {
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

  onWishlistPress() {
    if (!this.state.isInWishlist) {
      if (this.props.addWishlistProductProcess) {
        let data = {
          data_request: {
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            product_slug: this.state.product.slug
          }
        }
        this.props.addWishlistProductProcess(data)
        this.setState({
          isInWishlist: !this.state.isInWishlist
        })
        let logData = {
          category_name: this.state.product.category_name,
          product_id: this.state.product.product_id,
          product_name: this.state.product.product_name,
          product_image_url: this.state.product.images[0].url,
          product_url: `www.mooimom.id/product/${this.state.product.slug}`,
          product_price: this.state.product.product_regular_price
        }
        console.log('RNAiqua product_added_to_wishlist', logData)
        RNAiqua.logEvent('product_added_to_wishlist', logData)
      }
    } else {
      if (this.props.deleteWishlistProductProcess) {
        let data = {
          data_request: {
            user_id: this.props.auth.payload.user_id,
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

  renderOutofstock() {
    if (this.state.product && this.state.product.stock < 1)
      return (
        <View style={styles.productEmptyContainer}>
          <Image source={Images.sad} style={styles.imageSad} />
          <View style={styles.textSoldContainer}>
            <Text style={styles.textSold1}>SOLD OUT!</Text>
            <Text style={styles.textSold2}>we will restock soon</Text>
          </View>
        </View>
      )
  }

  renderWishlist() {
    var image = Images.wishlistBlack
    if (this.state.isInWishlist)
      image = Images.wishlist1
    return (

      <TouchableOpacity onPress={() => this.onWishlistPress()} style={styles.wishlist}>
        <Image
          source={image}
          style={styles.wishlistImage}
        />
      </TouchableOpacity>

    )
  }

  render() {
    if (!this.state.product.product_regular_price) return (<View />)
    var price = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_sale_price) : convertToRupiah(this.state.product.product_regular_price)
    var disc = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_regular_price) : ''
    var image = Images.default
    if (this.state.product.images && this.state.product.images.length > 0 && this.state.product.images[0].url && this.state.product.images[0].url !== '')
      image = { uri: this.state.product.images[0].url }
    return (
      <View style={styles.item}>
        <FastImage
          source={image}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        {this.renderOutofstock()}
        {this.renderWishlist()}
        <View style={styles.productNameContainer}>
          <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.name}>{this.state.product.product_name}</Text>
        </View>
        <View style={styles.priceGroup}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.priceDiscount}>{disc}</Text>
        </View>
        <View style={styles.extra}>
          <TouchableOpacity onPress={() => this.onSharePress()} style={styles.btnShare}>
            <Text style={styles.textBtn}>Add to cart</Text>
          </TouchableOpacity>
        </View>
        {this.state.modalClipboardVisible && <View style={styles.modalView}>
          <Text style={styles.modalText}>Sharing ...</Text>
        </View>}
      </View>
    );
  }
}
