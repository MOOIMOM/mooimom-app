import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Clipboard, Alert, FlatList, Modal, AppState } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { Pagination  } from 'react-native-snap-carousel';
import {convertToRupiah, share, shareDescripton} from '../Lib/utils'
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
    var reviews = [
      {id:'1', name:'Ann', title:'Sudah Diterima', review:'pengiriman cepat , semoga cocok dengan cream nya', star:4, images:[
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2019/08/30/sc7001-9.jpg__100x100_q85_subsampling-2.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/12/20/q8005-9-compressor.jpg__600x800_q85_subsampling-2.jpg'},
      ]},
      {id:'2', name:'Kim Kamasean', title: 'Barang Bagus', review:'Kereen.. packing rapi.. cepat sampai.. trs wangiiii creamnya.. senang!', star:5, images:[
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2017/06/15/crossover-navy-1.jpg__600x800_q85_subsampling-2.jpg'},
      ]},
    ]
    this.state = {
      appState: AppState.currentState,
      product: this.props.navigation.state.params.product,
      activeSlide: 0,
      colors:colors,
      colorSelected:colors[0].id,
      sizes:sizes,
      sizeSelected:sizes[0].id,
      isInWishlist:false,
      reviews:reviews,
      modalVisible: false,
      willShareDescription:false,
      finishShareImage: false,
      socialShare: ''
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if(this.state.willShareDescription === true){
        this.setState({
          finishShareImage: true
        })
        setTimeout(() => {
          shareDescripton(this.state.product.description, this.state.socialShare)
          this.setState({
            willShareDescription: false,
            socialShare: ''
          })
        }, 1000);
      }
    }
    console.info(nextAppState)
    this.setState({appState: nextAppState});
  };

  shareSocial(social){
    if(this.state.willShareDescription === false){
      this.setState({
        willShareDescription: true,
        finishShareImage : false,
        socialShare: social
      });
      share(this.state.product.images, social)
    }
  }

  async copyText(){
    this.setState({
      modalVisible: true
    })
    await Clipboard.setString(this.state.product.description);
    setTimeout(() => {
      this.setState({
        modalVisible: false
      })
    }, 1000);
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

  renderReview({item, index}){
    var stars = []
    for(var i = 1;i<=5;i++){
      if(i <= item.star){
        stars.push({img: Images.star, id:i})
      } else {
        stars.push({img: Images.starEmpty, id:i})
      }
    }
    return(
      <View style={styles.reviewContainer} key={item.id}>
        <View style={styles.nameWrapper}>
          <Text style={styles.reviewName1}>Oleh </Text><Text style={styles.reviewName2}> {item.name}</Text>
        </View>
        <View style={styles.reviewStarWrapper}>
          {stars.map((star) => {
            return (
              <Image key={star.id} source={star.img} style={styles.reviewStar}/>
            )
          })}
          <Text style={styles.reviewTitle}>{item.title}</Text>
        </View>
        <View style={styles.reviewDescriptionWrapper}>
          <Text style={styles.textReview}>{item.review}</Text>
        </View>
        <View style={styles.reviewImageWrapper}>
          {item.images.map((image, index) => {
            return (
              <Image key={index} source={{uri:image.url}} style={styles.reviewImage}/>
            )
          })}
        </View>
      </View>
    )
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
                lockScrollWhileSnapping={true}
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
                <TouchableOpacity style={styles.btnCopy} onPress={() => this.copyText()}>
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
            <View style={styles.wrapperSeparator}/>
            <View style={styles.reviewWrapper}>
              <Text style={styles.productSubtitle}>Ulasan Produk</Text>
              <FlatList
                data={this.state.reviews}
                renderItem={this.renderReview}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
              />
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
        {this.state.modalVisible && <View style={styles.modalView}>
          <Text style={styles.modalText}>Text Copied to Clipboard</Text>
        </View>}
        {this.state.willShareDescription && <View style={styles.modalShareView}>
          <View style={styles.modalShareContainer}>
            <Text style={styles.modalShareText}>Images Downloaded</Text>
            <Text style={(this.state.finishShareImage ? styles.modalShareText : styles.modalShareText2)}>Description Copied</Text>
          </View>
        </View>}
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
