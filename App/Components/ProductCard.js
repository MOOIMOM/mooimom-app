import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { Images } from '../Themes'
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';

import styles from './Styles/ProductCardStyles'

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product
    };
  }

  convertToRupiah (price) {
    var rupiah = ''
    var price = price
      .toString()
      .split('')
      .reverse()
      .join('')
    for (var i = 0; i < price.length; i++) {
      if (i % 3 === 0) rupiah += price.substr(i, 3) + '.'
    }
    return (
      'Rp' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    )
  }

  onSharePress(){
    RNFetchBlob.fetch('GET', this.state.product.image)
      .then(resp => {
        let base64image = resp.data;
        this.share('data:image/png;base64,' + base64image);
      })
      .catch(err => errorHandler(err));
  }

  share(base64image){
    let shareOptions = {
      url: base64image,
    };

    Share.open(shareOptions)
      .then(res => {

      })
      .catch(err => {

      });
  }

  render () {
    var price = this.convertToRupiah(this.state.product.price - this.state.product.discPrice)
    var disc = this.state.product.discPrice > 0 ? this.convertToRupiah(this.state.product.price) : ''
    return (
      <View style={styles.item}>
        <Image
            source={{uri:this.state.product.image}}
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
