import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Linking, Alert, Platform } from 'react-native'
import { Images } from '../Themes'
import FastImage from 'react-native-fast-image'
import {convertToRupiah, share, download} from '../Lib/utils'

import styles from './Styles/ProductCardSingleStyles'

export default class ProductCardSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isInWishlist: this.props.product.wishlist === 1,
      modalClipboardVisible: false,
      modalClipboardVisible2: false,
      modalClipboardVisible3: false
    };
  }

  onSharePress(social = ''){
    this.setState({
      modalClipboardVisible2: true
    })
    if(social === 'whatsapp') {
      const url = `whatsapp://send?phone=6281288446533`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible2: false
              })
            }, 3000);
            share(this.state.product.images, social)
            if(this.props.sharedProductProcess){
              let data = {
                product: this.state.product
              }
              this.props.sharedProductProcess(data)
            }
            if(this.props.shareWhatsapp){
              this.props.shareWhatsapp(this.state.product.product_content)
            }
          } else {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible2: false
              })
            }, 1000);
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
            setTimeout(() => {
              this.setState({
                modalClipboardVisible2: false
              })
            }, 3000);
            share(this.state.product.images, social)
            if(this.props.sharedProductProcess){
              let data = {
                product: this.state.product
              }
              this.props.sharedProductProcess(data)
            }
          } else {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible2: false
              })
            }, 1000);
            Alert.alert(
                'Sorry',
                'Facebook is not installed on your phone',
            )
          }
      })
    } else {
      setTimeout(() => {
        this.setState({
          modalClipboardVisible2: false
        })
      }, 3000);
      share(this.state.product.images, social)
      if(this.props.sharedProductProcess){
        let data = {
          product: this.state.product
        }
        this.props.sharedProductProcess(data)
      }
    }
  }

  async onDownloadPress(){
    this.setState({
      modalClipboardVisible3: true
    })
    let finish = await download(this.state.product.images)
    if(finish){
      this.setState({
        modalClipboardVisible: true,
        modalClipboardVisible3: false
      })
      setTimeout(() => {
        this.setState({
          modalClipboardVisible: false
        })
      }, 2000);
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

  renderOutofstock(){
    if(this.state.product && this.state.product.stock < 1)
    return (
      <View style={styles.productEmptyContainer}>
        <Image source={Images.sad} style={styles.imageSad}/>
        <View style={styles.textSoldContainer}>
          <Text style={styles.textSold1}>SOLD OUT!</Text>
          <Text style={styles.textSold2}>we will restock soon</Text>
        </View>
      </View>
    )
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
    var price = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_sale_price) : convertToRupiah(this.state.product.product_regular_price)
    var disc = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_regular_price) : ''
    var image = Images.default
    if(this.state.product.images.length > 0 && this.state.product.images[0].url && this.state.product.images[0].url !== '')
      image = {uri:this.state.product.images[0].url}
    return (
      <View style={styles.item}>
        <View style={styles.topItem}>
          <View style={styles.topLeftItem}>
          <FastImage
              source={image}
              style={styles.image}
          />
          {this.renderOutofstock()}
          {this.renderWishlist()}
          </View>
          <View style={styles.topRightItem}>
            <Text style={styles.name}>{this.state.product.product_name}</Text>
            <View style={styles.priceGroup}>
              <Text style={styles.priceDiscount}>{disc}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomItem}>
          {Platform.OS !== 'ios' && <View style={styles.bottomLeftItem}>
            <TouchableOpacity onPress={() => this.onDownloadPress()} style={styles.btnExtra}>
              <Image source={Images.download} style={styles.imageExtra}/>
              <Text style={styles.textBtnExtra}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSharePress('facebook')} style={styles.btnExtra}>
              <Image source={Images.fb} style={styles.imageExtra}/>
              <Text style={styles.textBtnExtra}>FB</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSharePress('')} style={styles.btnExtra}>
              <Image source={Images.share2} style={styles.imageExtra}/>
              <Text style={styles.textBtnExtra}>Lainnya</Text>
            </TouchableOpacity>
          </View>}
          {Platform.OS !== 'ios' && <View style={styles.bottomRightItem}>
            <TouchableOpacity onPress={() => this.onSharePress('whatsapp')} style={styles.btn}>
              <Image source={Images.wa2} style={styles.imageBtn}/>
              <Text style={styles.textBtn}>Bagikan</Text>
            </TouchableOpacity>
          </View>}
         {Platform.OS === 'ios' && <View style={styles.bottomLeftItem}>
            <TouchableOpacity onPress={() => this.onDownloadPress()} style={styles.btn}>
              <Text style={styles.textBtn}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSharePress('')} style={styles.btn}>
              <Text style={styles.textBtn}>Bagikan</Text>
            </TouchableOpacity>
          </View>}
        </View>
        {this.state.modalClipboardVisible && <View style={styles.modalView}>
          <Text style={styles.modalText}>Images have been downloaded</Text>
        </View>}
        {this.state.modalClipboardVisible2 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Sharing ...</Text>
        </View>}
        {this.state.modalClipboardVisible3 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Downloading Image ...</Text>
        </View>}
      </View>
    );
  }
}
