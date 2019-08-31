import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { Images } from '../Themes'
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
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
  }

  render () {
    var price = convertToRupiah(this.state.product.price - this.state.product.discPrice)
    var disc = this.state.product.discPrice > 0 ? convertToRupiah(this.state.product.price) : ''
    return (
      <View style={styles.item}>
        <Image
            source={{uri:this.state.product.images[0].url}}
            style={styles.image}
        />
        <Image
            source={Images.wishlistProduct}
            style={styles.wishlist}
        />
        <Text style={styles.name}>{this.state.product.name}</Text>
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
