import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableOpacity, TouchableWithoutFeedback, Image, KeyboardAvoidingView, TextInput, Picker } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { Pagination  } from 'react-native-snap-carousel';
import {convertToRupiah, share} from '../Lib/utils'
// Styles
import styles from './Styles/ProductScreenStyles'

class ProductScreen extends Component {
  constructor (props) {
    super(props)
    var colors = [
      {id:1, color:'#FFFFCC'},
      {id:2, color:'pink'},
      {id:3, color:'red'},
      {id:4, color:'green'},
      {id:5, color:'gray'},
      {id:6, color:'blue'},
      {id:7, color:'yellow'},
      {id:8, color:'orange'},
      {id:9, color:'purple'},
    ]
    var sizes = [
      {id:1, size:'S'},
      {id:2, size:'M'},
      {id:3, size:'L'},
      {id:4, size:'XL'},
      {id:5, size:'2XL'},
      {id:6, size:'3XL'},
    ]
    this.state = {
      product: this.props.navigation.state.params.product,
      activeSlide: 0,
      colors:colors,
      colorSelected:colors[0].id,
      sizes:sizes,
      sizeSelected:sizes[0].id,
      isInWishlist:false
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  shareSocial(social){
    share(this.state.product.images, social)
  }

  renderWishlistButton(){
    var image = Images.wishlistProduct
    if(this.state.isInWishlist)
      image = Images.isWishlistProduct
    return (
      <View style={styles.wishlistBtn}>
        <TouchableWithoutFeedback onPress={() => this.setState({
            isInWishlist: !this.state.isInWishlist
          })}>
            <Image source={image} style={styles.wishlistImage} />
        </TouchableWithoutFeedback>
      </View>
    )
  }

  _renderImage ({item, index}, parallaxProps) {
    return (
      <Image source={{uri:item.url}} style={styles.productImage} />
    );
  }

  renderColor(){
    return(
      <View style={styles.colorWrapper}>
        <Text style={styles.productSubtitle}>Warna</Text>
        <View style={styles.colorContainer}>
        {this.state.colors.map((data) => {
          return(
            <TouchableOpacity style={[{backgroundColor:data.color}, styles.colorButton, this.colorStyling(data.id, data.color)]} key={data.id} onPress={
              () => this.setState({
                colorSelected:data.id
              })
            }/>
          )})}
        </View>
      </View>
    )
  }

  colorStyling(id, color) {
    if (id === this.state.colorSelected){
      return styles.colorButtonSelected
    }
  }

  renderSize(){
    return(
      <View style={styles.sizeWrapper}>
        <Text style={styles.productSubtitle}>Ukuran</Text>
        <View style={styles.sizeContainer}>
        {this.state.sizes.map((data) => {
          return(
            <TouchableOpacity style={[styles.sizeButton, this.sizeStyling(data.id)]} key={data.id} onPress={
              () => this.setState({
                sizeSelected:data.id
              })
            }>
              <Text style={styles.sizeText}>{data.size}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>
    )
  }

  sizeStyling(id) {
    if (id === this.state.sizeSelected){
      return styles.sizeButtonSelected
    }
 }

  render () {
    var price = convertToRupiah(this.state.product.price - this.state.product.discPrice)
    var disc = this.state.product.discPrice > 0 ? convertToRupiah(this.state.product.price) : ''

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
          <View style={styles.headerButtonCenter}>
            <TouchableOpacity style={styles.searchButton}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerButtonRight}>
            <Image source={Images.wishlistBlack} style={styles.buttonHeader} />
            <Image source={Images.shoppingCartBlack} style={styles.buttonHeader} />
            <Image source={Images.notif} style={styles.buttonHeader} />
          </View>
        </View>
        <View style={styles.wrapperSeparator}/>
        <View style={styles.productContainer}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            <View style={styles.productImageWrapper}>
              <Carousel
                sliderWidth={Metrics.screenWidth}
                sliderHeight={Metrics.screenWidth}
                itemWidth={Metrics.screenWidth}
                data={this.state.product.images}
                renderItem={this._renderImage}
                autoplay={true}
                lockScrollWhileSnapping={true}
                loop={true}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
              <Pagination
                dotsLength={this.state.product.images.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={styles.paginationDotStyleImage}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.paginationContainerStyleImage}
                dotContainerStyle={styles.paginationDotContainerStyleImage}
              />
              {this.renderWishlistButton()}
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.productDescriptionWrapper}>
              <Text style={styles.productCode}>PRODUCT CODE - {this.state.product.id}</Text>
              <Text style={styles.productName}>{this.state.product.name}</Text>
              <View style={styles.priceGroup}>
                <Text style={styles.productPrice}>{price}</Text>
                <Text style={styles.productPriceDiscount}>{disc}</Text>
              </View>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.shareSocialWrapper}>
              <TouchableOpacity style={styles.shareSocialButton} onPress={() => this.shareSocial('instagram')}>
                <Image source={Images.instagram} style={styles.shareSocialImage}/>
                <Text style={styles.shareSocialText}>Bagikan di Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareSocialButton} onPress={() => this.shareSocial('whatsapp')}>
                <Image source={Images.whatsapp} style={styles.shareSocialImage}/>
                <Text style={styles.shareSocialText}>Bagikan di Whatsapp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareSocialButton} onPress={() => this.shareSocial('facebook')}>
                <Image source={Images.facebook} style={styles.shareSocialImage}/>
                <Text style={styles.shareSocialText}>Bagikan di Facebook</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.descriptionWrapper}>
              <View style={styles.descriptionHeader}>
                <Text style={styles.productSubtitle}>Deskripsi Produk</Text>
                <TouchableOpacity style={styles.btnCopy}>
                  <Text style={styles.textCopy}>Copy</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.productDescriptionText}>{this.state.product.description}</Text>
            </View>
              {this.renderColor()}
            <View style={styles.wrapperSeparator}/>
              {this.renderSize()}
            <View style={styles.wrapperSeparator}/>
            <View style={styles.sizeGuideWrapper}>
              <View style={styles.sizeGuideLeft}>
                <Text style={styles.productSubtitle}>Size Guide</Text>
                <Image source={Images.sizeGuide} style={styles.imageSizeGuide} />
              </View>
              <View style={styles.sizeGuideRight}>
                <Image source={Images.rightArrow} style={styles.buttonSizeGuide} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.btnAddToCart}>
            <Text style={styles.textAddToCart}>ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnShare} onPress={() => this.shareSocial('')}>
            <Text style={styles.textShare}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductScreen)
