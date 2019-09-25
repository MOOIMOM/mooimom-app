import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image, Linking, Alert } from 'react-native'
import { Images } from '../Themes'
import { CachedImage } from 'react-native-cached-image';
import {convertToRupiah, share, download} from '../Lib/utils'

import styles from './Styles/ProductCardSingleStyles'

export default class ProductCardSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isInWishlist: this.props.product.wishlist === 1,
      modalClipboardVisible: false
    };
  }

  onSharePress(social = ''){
    if(social === 'whatsapp') {
      const url = `whatsapp://send?phone=6281288446533`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
            share(this.state.product.images, social)
            if(this.props.sharedProductProcess){
              let data = {
                product: this.state.product
              }
              this.props.sharedProductProcess(data)
            }
            if(this.props.shareWhatsapp){
              this.props.shareWhatsapp(this.state.product.name)
            }
          } else {
              Alert.alert(
                  'Sorry',
                  'WhatsApp is not installed on your phone',
              )
          }
      })
    } else if(social === 'facebook') {
      const url = `fb://profile/1234567`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
            share(this.state.product.images, social)
            if(this.props.sharedProductProcess){
              let data = {
                product: this.state.product
              }
              this.props.sharedProductProcess(data)
            }
          } else {
              Alert.alert(
                  'Sorry',
                  'Facebook is not installed on your phone',
              )
          }
      })
    }
  }

  async onDownloadPress(){
    let finish = await download(this.state.product.images)
    if(finish){
      this.setState({
        modalClipboardVisible: true
      })
      setTimeout(() => {
        this.setState({
          modalClipboardVisible: false
        })
      }, 1000);
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
    var price = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_sale_price) : convertToRupiah(this.state.product.product_regular_price)
    var disc = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_regular_price) : ''
    var image = Images.default
    if(this.state.product.images.length > 0 && this.state.product.images[0].url && this.state.product.images[0].url !== '')
      image = {uri:this.state.product.images[0].url}
    return (
      <View style={styles.item}>
        <View style={styles.topItem}>
          <View style={styles.topLeftItem}>
          <CachedImage
              source={image}
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
            <TouchableWithoutFeedback onPress={() => this.onDownloadPress()}>
              <View style={styles.btnExtra}>
                <Image source={Images.download} style={styles.imageExtra}/>
                <Text style={styles.textBtnExtra}>Download</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.onSharePress('facebook')}>
              <View style={styles.btnExtra}>
                <Image source={Images.fb} style={styles.imageExtra}/>
                <Text style={styles.textBtnExtra}>FB</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.onSharePress('')}>
              <View style={styles.btnExtra}>
                <Image source={Images.share2} style={styles.imageExtra}/>
                <Text style={styles.textBtnExtra}>Lainnya</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bottomRightItem}>
            <TouchableWithoutFeedback onPress={() => this.onSharePress('whatsapp')}>
              <View style={styles.btn}>
                <Image source={Images.wa2} style={styles.imageBtn}/>
                <Text style={styles.textBtn}>Bagikan</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.state.modalClipboardVisible && <View style={styles.modalView}>
          <Text style={styles.modalText}>Images have been downloaded</Text>
        </View>}
      </View>
    );
  }
}
