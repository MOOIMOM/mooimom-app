import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { Images } from '../Themes'
import {convertToRupiah, share} from '../Lib/utils'

import styles from './Styles/ProductCardSingleStyles'

export default class ProductCardSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isInWishlist: false
    };
  }

  onSharePress(){
    share(this.state.product.images)
  }

  renderWishlist(){
    var image = Images.wishlistBlack
    if(this.state.isInWishlist)
      image = Images.wishlist1
    return(
      <TouchableWithoutFeedback onPress={() => this.setState({
        isInWishlist: !this.state.isInWishlist
      })}>
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
    var price = convertToRupiah(this.state.product.price - this.state.product.discPrice)
    var disc = this.state.product.discPrice > 0 ? convertToRupiah(this.state.product.price) : ''
    return (
      <View style={styles.item}>
        <View style={styles.topItem}>
          <View style={styles.topLeftItem}>
          <Image
              source={{uri:this.state.product.images[0].url}}
              style={styles.image}
          />
          {this.renderWishlist()}
          </View>
          <View style={styles.topRightItem}>
            <Text style={styles.name}>{this.state.product.name}</Text>
            <View style={styles.priceGroup}>
              <Text style={styles.priceDiscount}>{disc}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomItem}>
          <View style={styles.bottomLeftItem}>
            <TouchableWithoutFeedback>
              <View style={styles.btnExtra}>
                <Image source={Images.rightArrow} style={styles.imageExtra}/>
                <Text style={styles.textBtnExtra}>Download</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.btnExtra}>
                <Image source={Images.facebook} style={styles.imageExtra}/>
                <Text style={styles.textBtnExtra}>FB</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.btnExtra}>
                <Image source={Images.share} style={styles.imageExtra}/>
                <Text style={styles.textBtnExtra}>Lainnya</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bottomRightItem}>
            <TouchableWithoutFeedback onPress={() => this.onSharePress()}>
              <View style={styles.btn}>
                <Image source={Images.whatsapp} style={styles.imageBtn}/>
                <Text style={styles.textBtn}>Bagikan</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}
