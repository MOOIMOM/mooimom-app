import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Clipboard, Alert, AsyncStorage, ActivityIndicator, AppState, Linking, Modal } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { Pagination  } from 'react-native-snap-carousel';
import SharedProductActions from '../Redux/SharedProductRedux'
import GetProductActions from '../Redux/GetProductRedux'
import CartActions from '../Redux/CartRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import FastImage from 'react-native-fast-image'
import ScaledImage from '../Components/ScaledImage';
import {convertToRupiah, share, shareDescripton, download, titleCase} from '../Lib/utils'
// Styles
import styles from './Styles/ProductScreenStyles'

class ProductScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      product: {},
      isInWishlist: false,
      activeSlide: 0,
      colorSelected:'',
      sizeSelected:'',
      customSelected:'',
      modalClipboardVisible: false,
      modalClipboardVisible2: false,
      modalClipboardVisible3: false,
      modalClipboardVisible4: false,
      willShareDescription:false,
      finishShareImage: false,
      socialShare: '',
      isShowSizeGuide: false,
      fcmToken: '',
      isShowError: false
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  async componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.setState({ fcmToken: await AsyncStorage.getItem('fcmToken') })
    let data = {
      data_request:{
        product_slug: this.props.navigation.state.params.product_slug,
        user_id: this.props.navigation.state.params.auth.payload.user_id,
        unique_token: this.props.navigation.state.params.auth.payload.unique_token,
        fcmToken: this.state.fcmToken
      }
    }
    this.props.loadProductProcess(data)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps (newProps) {
    if(newProps.navigation.state.params && newProps.navigation.state.params.product_slug
      && newProps.navigation.state.params.product_slug !== this.props.navigation.state.params.product_slug){
      let data = {
        data_request:{
          product_slug: newProps.navigation.state.params.product_slug,
          user_id: this.props.navigation.state.params.auth.payload.user_id,
          unique_token: this.props.navigation.state.params.auth.payload.unique_token,
          fcmToken: this.state.fcmToken
        }
      }
      this.props.loadProductProcess(data)
    }
    if(this.props.product !== newProps.product){
      if (
        newProps.product.payload !== null &&
        newProps.product.error === null &&
        !newProps.product.fetching
      ) {
        var color = this.state.colorSelected
        var size = this.state.sizeSelected
        var custom = this.state.customSelected
        if(color === '' && size === '' && custom === ''){
          var i = 0, data;
          while(i < newProps.product.payload.all_product_variations_with_stock_data.length){
            data = newProps.product.payload.all_product_variations_with_stock_data[i]
            if(data.stock_quantity > 0){
              color = data.color_slug
              size = data.size_slug
              custom = data.custom_attribute_1_slug
              break;
            }
            i++
          }
        }
        this.setState({
          product: newProps.product.payload,
          colorSelected: color,
          sizeSelected: size,
          customSelected: custom,
          isInWishlist: newProps.product.payload.wishlist === 1,
          isShowError: false
        })
      } else if(newProps.product.payload === null
        && !newProps.product.fetching
      ){
        this.setState({
          isShowError: true
        })
      }
    }
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
          shareDescripton(this.state.product.product_content, this.state.socialShare)
          this.setState({
            willShareDescription: false,
            socialShare: ''
          })
        }, 1000);
      }
    }
    this.setState({appState: nextAppState});
  };

  async shareSocial(social){
    this.setState({
      modalClipboardVisible3: true
    })
    if(social === 'whatsapp') {
      const url = `whatsapp://send?phone=6281288446533`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
            if(this.state.willShareDescription === false){
              setTimeout(() => {
                this.setState({
                  modalClipboardVisible3: false
                })
              }, 3000);
              this.setState({
                willShareDescription: true,
                finishShareImage : false,
                socialShare: social
              });
              share(this.state.product.images, social)
            } else {
              Clipboard.setString(this.state.product.product_content);
              share(this.state.product.images, social)
            }
            let data = {
              product: this.state.product
            }
            this.props.sharedProductProcess(data)
          } else {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible3: false
              })
            }, 1000);
              Alert.alert(
                  'Sorry',
                  'WhatsApp is not installed on your phone',
              )
          }
      })
    } else if(social === 'facebook') {
      const url = `fb://profile/mooimom.id`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible3: false
              })
            }, 3000);
            Clipboard.setString(this.state.product.product_content);
            share(this.state.product.images, social)
          } else {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible3: false
              })
            }, 1000);
              Alert.alert(
                  'Sorry',
                  'Facebook is not installed on your phone',
              )
          }
          let data = {
            product: this.state.product
          }
          this.props.sharedProductProcess(data)
      })
    } else if(social === 'instagram') {
      const url = `instagram://user?username=mooimom.id`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
            setTimeout(() => {
              this.setState({
                modalClipboardVisible3: false
              })
            }, 3000);
            Clipboard.setString(this.state.product.product_content);
            share(this.state.product.images, social)
          } else {
              setTimeout(() => {
                this.setState({
                  modalClipboardVisible3: false
                })
              }, 1000);
              Alert.alert(
                  'Sorry',
                  'Instagram is not installed on your phone',
              )
          }
          let data = {
            product: this.state.product
          }
          this.props.sharedProductProcess(data)
      })
    } else {
      setTimeout(() => {
        this.setState({
          modalClipboardVisible3: false
        })
      }, 3000);
      Clipboard.setString(this.state.product.product_content);
      share(this.state.product.images, social)
      let data = {
        product: this.state.product
      }
      this.props.sharedProductProcess(data)
    }
  }

  async copyText(){
    this.setState({
      modalClipboardVisible: true
    })
    await Clipboard.setString(this.state.product.product_content);
    setTimeout(() => {
      this.setState({
        modalClipboardVisible: false
      })
    }, 1000);
  }

  async downloadImages(){
    this.setState({
      modalClipboardVisible4: true
    })
    let finish = await download(this.state.product.all_images_mobile_custom)
    if(finish){
      this.setState({
        modalClipboardVisible2: true,
        modalClipboardVisible4: false
      })
      setTimeout(() => {
        this.setState({
          modalClipboardVisible2: false
        })
      }, 1000);
    }
  }

  selectColor(slug){
    if(this.state.colorSelected === slug) return;
    this.setState({
      colorSelected:slug
    })
    let data = {
      data_request:{
        product_slug: this.state.product.slug,
        user_id: this.props.navigation.state.params.auth.payload.user_id,
        unique_token: this.props.navigation.state.params.auth.payload.unique_token,
        color_slug: slug,
        size_slug: this.state.sizeSelected,
        custom_attribute_slug: this.state.customSelected,
      }
    }
    this.props.loadProductVariationProcess(data)
  }

  onWishlistPress(){
    if(!this.state.isInWishlist){
      let data = {
        data_request:{
          user_id:this.props.navigation.state.params.auth.payload.user_id,
          unique_token: this.props.navigation.state.params.auth.payload.unique_token,
          product_slug: this.state.product.slug
        }
      }
      this.props.addWishlistProductProcess(data)

    } else {
      let data = {
        data_request:{
          user_id:this.props.navigation.state.params.auth.payload.user_id,
          unique_token: this.props.navigation.state.params.auth.payload.unique_token,
          product_slug: this.state.product.slug
        }
      }
      this.props.deleteWishlistProductProcess(data)
    }
    this.setState({
      isInWishlist: !this.state.isInWishlist
    })
  }

  renderWishlistButton(){
    var image = Images.wishlistProduct
    if(this.state.isInWishlist)
      image = Images.isWishlistProduct
    return (
      <TouchableWithoutFeedback onPress={() => this.onWishlistPress()}>
        <View style={styles.wishlistBtn}>
            <Image source={image} style={styles.wishlistImage} />
          </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderImage ({item, index}, parallaxProps) {
    var image = Images.default
    if(item.url && item.url !== '')
      image = {uri:item.url}
    return (
      <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain}/>
    );
  }

  renderRating(){
    var stars = []
    var rating = this.state.product.average_review
    var review = this.state.product.total_review
    for(var i = 1;i<=5;i++){
      if(i <= rating){
        stars.push({img: Images.star, id:i})
      } else {
        stars.push({img: Images.starEmpty, id:i})
      }
    }
    return(
      <View style={styles.ratingWrapper}>
        <View style={styles.ratingStarWrapper}>
          {stars.map((star) => {
            return (
              <Image key={star.id} source={star.img} style={styles.reviewStar}/>
            )
          })}
        </View>
        <Text style={styles.ratingText}>{review} reviews</Text>
      </View>
    )
  }

  renderColor(){
    if(this.state.product.colors && this.state.product.colors.length > 0)
    return(
      <View style={styles.colorWrapper}>
        <Text style={styles.productSubtitle}>Warna</Text>
        <View style={styles.colorContainer}>
        {this.state.product.colors.map((data) => {
          let isEmpty = this.checkEmpty(data.slug, 1)
          let styleDisabled
          if(isEmpty)
            styleDisabled = styles.buttonColorDisabled
          var image = Images.default
          if(data.image_url && data.image_url !== '')
            image = {uri:data.image_url}
          return(
            <TouchableOpacity key={data.slug} onPress={
              () => this.selectColor(data.slug)} disabled={isEmpty}>
              <FastImage source={image} style={[styles.colorButton, this.colorStyling(data.slug, data.color)]}/>
              <View style={styleDisabled}/>
            </TouchableOpacity>
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

  checkEmpty(id, type) {
    var data = this.state.product.all_product_variations_with_stock_data
    if(data.length < 1) return true
    for(var i = 0;i<data.length;i++){
      switch(type){
        case 1:
          if(data[i].color_slug === id
            && data[i].size_slug === this.state.sizeSelected
            && data[i].custom_attribute_1_slug === this.state.customSelected
          ){
            return data[i].stock_quantity === 0
          }
        break;
        case 2:
          if(data[i].size_slug === id
            && data[i].color_slug === this.state.colorSelected
            && data[i].custom_attribute_1_slug === this.state.customSelected
          ){
            return data[i].stock_quantity === 0
          }
        break;
        case 3:
          if(data[i].custom_attribute_1_slug === id
            && data[i].size_slug === this.state.sizeSelected
            && data[i].color_slug === this.state.colorSelected
          ){
            return data[i].stock_quantity === 0
          }
        break;
      }
    }
    return true
  }

  renderSize(){
    if(this.state.product.sizes && this.state.product.sizes.length > 0)
    return(
      <View style={styles.sizeWrapper}>
        <Text style={styles.productSubtitle}>Ukuran</Text>
        <View style={styles.sizeContainer}>
        {this.state.product.sizes.map((data) => {
          let isEmpty = this.checkEmpty(data.slug, 2)
          let styleDisabled
          if(isEmpty)
            styleDisabled = styles.buttonDisabled
          return(
            <TouchableOpacity style={[styles.sizeButton, this.sizeStyling(data.slug), styleDisabled]} key={data.slug} onPress={
              () => this.setState({
                sizeSelected:data.slug
              })
            } disabled={isEmpty}>
              <Text style={styles.sizeText}>{data.name}</Text>
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

  renderCustomAttribute(){
    if(this.state.product.custom_attributes && this.state.product.custom_attributes.length > 0){
      var title = titleCase(this.state.product.custom_attribute_text)
      return(
        <View style={styles.sizeWrapper}>
          <Text style={styles.productSubtitle}>{title}</Text>
          <View style={styles.sizeContainer}>
          {this.state.product.custom_attributes.map((data) => {
            let isEmpty = this.checkEmpty(data.slug, 3)
            let styleDisabled
            if(isEmpty)
              styleDisabled = styles.buttonDisabled
            return(
              <TouchableOpacity style={[styles.sizeButton, this.customStyling(data.slug), styleDisabled]} key={data.slug} onPress={
                () => this.setState({
                  customSelected:data.slug
                })
              } disabled={isEmpty}>
                <Text style={styles.sizeText}>{data.name}</Text>
              </TouchableOpacity>
            )})}
          </View>
        </View>
      )
    }
  }

  customStyling(id) {
    if (id === this.state.customSelected){
      return styles.sizeButtonSelected
    }
  }

  renderSizeGuide(){
    if(!this.state.product.show_size_guide_button)
      return <View/>
    return (
        <View style={styles.sizeGuideWrapper}>
        <TouchableOpacity onPress={() => this.setState({
          isShowSizeGuide: true
        })}>
        <View style={styles.sizeGuideWrapper2}>
          <View style={styles.sizeGuideLeft}>
            <Text style={styles.productSubtitle}>Size Guide</Text>
            <Image source={Images.sizeGuide} style={styles.imageSizeGuide} />
          </View>
          <View style={styles.sizeGuideRight}>
              <Image source={Images.rightArrowBlack} style={styles.buttonSizeGuide} />
          </View>
          </View>
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowSizeGuide}
        onRequestClose={() => {
          this.setState({
            isShowSizeGuide:false
          })
        }}>
          <View style={styles.sizeGuideWrapperContainer}>
            <View style={styles.headerWrapper}>
              <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.setState({
                isShowSizeGuide:false
              })}>
                <Image source={Images.back} style={styles.buttonHeader} />
              </TouchableOpacity>
            </View>
            <View style={styles.sizeGuideWrapperContainer2}>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <Text style={styles.textRincian}>Rincian Ukuran</Text>
                <Text style={styles.textRincian2}>Cara Mengukur</Text>
                <View style={styles.wrapperSeparator}/>
                {this.state.product.picture_for_how_to_measure_url && this.state.product.picture_for_how_to_measure_url !== '' && <FastImage source={{uri:this.state.product.picture_for_how_to_measure_url}} style={styles.imageHowTo} resizeMode={FastImage.resizeMode.contain}/>}
                <View style={styles.wrapperSeparator}/>
                <Text style={styles.textRincian3}>{this.state.product.text_for_how_to_measure}</Text>
                {this.renderTableFrontend(this.state.product.how_to_measure_table_header_frontend, this.state.product.how_to_measure_table_frontend)}
                {this.renderTableFrontend(this.state.product.how_to_measure_table_header_extra_frontend, this.state.product.how_to_measure_table_extra_frontend)}
                <Text style={styles.textRincian2}>Fitting Report</Text>
                <View style={styles.wrapperSeparator}/>
                <Text style={styles.textRincian3}>{this.state.product.suggestion_text}</Text>
                {this.renderTableFrontend(this.state.product.suggestion_table_header_frontend, this.state.product.suggestion_table_frontend)}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  renderTableFrontend(header, content){
    if(!header || !content || content.length < 1) return (<View/>)
      return (
        <View>
          <View style={styles.headerTable}>
            {header.column_1 !== "" && <Text style={styles.headerTableText}>{header.column_1}</Text>}
            {header.column_2 !== "" && <Text style={styles.headerTableText}>{header.column_2}</Text>}
            {header.column_3 !== "" && <Text style={styles.headerTableText}>{header.column_3}</Text>}
            {header.column_4 !== "" && <Text style={styles.headerTableText}>{header.column_4}</Text>}
            {header.column_5 !== "" && <Text style={styles.headerTableText}>{header.column_5}</Text>}
            {header.column_6 !== "" && <Text style={styles.headerTableText}>{header.column_6}</Text>}
            {header.column_7 !== "" && <Text style={styles.headerTableText}>{header.column_7}</Text>}
            {header.column_8 !== "" && <Text style={styles.headerTableText}>{header.column_8}</Text>}
            {header.column_9 !== undefined && header.column_9 !== "" && <Text style={styles.headerTableText}>{header.column_9}</Text>}
            {header.column_10 !== undefined && header.column_10 !== "" && <Text style={styles.headerTableText}>{header.column_10}</Text>}
          </View>
          {content.map((data, index) => {
            return (
              <View style={styles.tableContent} key={index.toString()}>
                {data.column_1 !== "" && <Text style={styles.tableText}>{data.column_1}</Text>}
                {data.column_2 !== "" && <Text style={styles.tableText}>{data.column_2}</Text>}
                {data.column_3 !== "" && <Text style={styles.tableText}>{data.column_3}</Text>}
                {data.column_4 !== "" && <Text style={styles.tableText}>{data.column_4}</Text>}
                {data.column_5 !== "" && <Text style={styles.tableText}>{data.column_5}</Text>}
                {data.column_6 !== "" && <Text style={styles.tableText}>{data.column_6}</Text>}
                {data.column_7 !== "" && <Text style={styles.tableText}>{data.column_7}</Text>}
                {data.column_8 !== "" && <Text style={styles.tableText}>{data.column_8}</Text>}
                {data.column_9 !== undefined && data.column_9 !== "" && <Text style={styles.tableText}>{data.column_9}</Text>}
                {data.column_10 !== undefined && data.column_10 !== "" && <Text style={styles.tableText}>{data.column_10}</Text>}
              </View>
            )
          })}
        </View>
      )
  }

  renderImagesCustom(){
    if(this.state.product.all_images_mobile_custom && this.state.product.all_images_mobile_custom.length > 0){
      return (
        <View style={styles.customImagesContainer}>
        <TouchableOpacity style={styles.btnDownload} onPress={() => this.downloadImages()}>
          <Text style={styles.textCopy}>Download Images</Text>
        </TouchableOpacity>
        {this.state.product.all_images_mobile_custom.map((image, index) => {
          return (
            <ScaledImage key={index.toString()} uri={image.url} width={Metrics.screenWidth - 40} />
          )
        })}
        </View>
      )
    }
  }

  renderReview(){
    if(this.state.product.reviews && this.state.product.reviews.length > 0)
    return(
      <View style={styles.reviewWrapper}>
        <Text style={styles.productSubtitle}>Ulasan Produk</Text>
        {this.state.product.reviews.map((item, index) => {
          var stars = []
          for(var i = 1;i<=5;i++){
            if(i <= item.star){
              stars.push({img: Images.star, id:i})
            } else {
              stars.push({img: Images.starEmpty, id:i})
            }
          }
          return(
            <View style={styles.reviewContainer} key={index.toString()}>
              <View style={styles.nameWrapper}>
                <Text style={styles.reviewName1}>Oleh </Text><Text style={styles.reviewName2}> {item.name}</Text>
              </View>
              <View style={styles.reviewStarWrapper}>
                {stars.map((star) => {
                  return (
                    <Image key={star.id} source={star.img} style={styles.reviewStar}/>
                  )
                })}
              </View>
              <View style={styles.reviewDescriptionWrapper}>
                <Text style={styles.reviewTitle}>{item.review_title}</Text>
                <Text style={styles.textReview}>{item.review_content}</Text>
              </View>
              <View style={styles.reviewImageWrapper}>
                {item.images.map((image, index) => {
                  var image_review = Images.default
                  if(image.url && image.url !== '')
                    image_review = {uri:image.url}
                  return (
                    <FastImage key={index} source={image_review} style={styles.reviewImage} resizeMode={FastImage.resizeMode.contain}/>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  addToCart(){
    if(!this.props.product.payload || !this.props.product.payload.all_product_variations_with_stock_data)
      return;
    var arr = this.props.product.payload.all_product_variations_with_stock_data
    var sku = ''
    for(var i = 0;i<arr.length;i++){
      if(arr[i].color_slug === this.state.colorSelected
         && arr[i].size_slug === this.state.sizeSelected
         && arr[i].custom_attribute_1_slug === this.state.customSelected){
        if(arr[i].stock_quantity > 0)
          sku = arr[i].sku
        break;
      }
    }
    if(sku === ''){
      Alert.alert(
          'Sorry',
          'The product you wish to buy is empty',
      )
      return;
    }
    let data = {
      product: this.props.product.payload,
      color: this.state.colorSelected,
      size: this.state.sizeSelected,
      custom: this.state.customSelected,
      sku: sku,
      qty: 1
    }
    this.props.addToCartProcess(data)
    this.actNavigate('CartScreen')
  }

  render () {
    if(this.props.product.fetching && (!this.state.product.product_name || this.state.product.product_name === '')){
      return (
        <View style={styles.containerLoading2}>
          <ActivityIndicator size="large" color={Colors.mooimom} />
        </View>
      )
    }
    if(this.state.isShowError){
      return (
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
              <Image source={Images.back} style={styles.buttonHeader} />
            </TouchableOpacity>
            <View style={styles.headerButtonCenter}>
              <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
                <Image source={Images.search} style={styles.imageSearch}/>
                <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.headerButtonRight}>
              <TouchableOpacity onPress={() => this.actNavigate('SharedProductScreen')}><Image source={Images.wishlistBlack} style={styles.buttonHeader} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.actNavigate('CartScreen')}><Image source={Images.shoppingCartBlack} style={styles.buttonHeader} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.actNavigate('NotificationScreen')}><Image source={Images.notif} style={styles.buttonHeader2} /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.productContainer}>
            <View style={styles.descriptionWrapper2}>
              <View style={styles.descriptionHeader2}>
                <Text style={styles.productSubtitle2}>Maaf</Text>
                <Text style={styles.productSubtitle2}>Produk Tidak Ditemukan</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    var price = ''
    var disc = ''
    if(this.state.product && this.state.product.product_regular_price > 0){
       price = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_sale_price) : convertToRupiah(this.state.product.product_regular_price)
       disc = this.state.product.product_sale_price > 0 ? convertToRupiah(this.state.product.product_regular_price) : ''
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
          <View style={styles.headerButtonCenter}>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerButtonRight}>
            <TouchableOpacity onPress={() => this.actNavigate('SharedProductScreen')}><Image source={Images.wishlistBlack} style={styles.buttonHeader} /></TouchableOpacity>
            <TouchableOpacity onPress={() => this.actNavigate('CartScreen')}><Image source={Images.shoppingCartBlack} style={styles.buttonHeader} /></TouchableOpacity>
            <TouchableOpacity onPress={() => this.actNavigate('NotificationScreen')}><Image source={Images.notif} style={styles.buttonHeader2} /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.productContainer}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            {this.state.product.images && <View style={styles.productImageWrapper}>
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
            </View>}
            <View style={styles.wrapperSeparator}/>
            <View style={styles.productDescriptionWrapper}>
              <Text style={styles.productCode}>PRODUCT CODE - {this.state.product.sku}</Text>
              <Text style={styles.productName}>{this.state.product.product_name}</Text>
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
            {this.renderRating()}
            <View style={styles.descriptionWrapper}>
              <View style={styles.descriptionHeader}>
                <Text style={styles.productSubtitle}>Deskripsi Produk</Text>
                <TouchableOpacity style={styles.btnCopy} onPress={() => this.copyText()}>
                  <Text style={styles.textCopy}>Copy</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.productDescriptionText}>{this.state.product.product_content}</Text>
            </View>
              {this.renderColor()}
            <View style={styles.wrapperSeparator}/>
              {this.renderSize()}
            <View style={styles.wrapperSeparator}/>
              {this.renderCustomAttribute()}
            <View style={styles.wrapperSeparator}/>
              {this.renderSizeGuide()}
              {this.renderImagesCustom()}
            <View style={styles.wrapperSeparator}/>
              {this.renderReview()}
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.btnAddToCart} onPress={() => this.addToCart()}>
            <Text style={styles.textAddToCart}>ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnShare} onPress={() => this.shareSocial('')}>
            <Text style={styles.textShare}>SHARE</Text>
          </TouchableOpacity>
        </View>
        {this.state.modalClipboardVisible && <View style={styles.modalView}>
          <Text style={styles.modalText}>Text Copied to Clipboard</Text>
        </View>}
        {this.state.modalClipboardVisible2 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Images have been downloaded</Text>
        </View>}
        {this.state.modalClipboardVisible3 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Sharing ...</Text>
        </View>}
        {this.state.modalClipboardVisible4 && <View style={styles.modalView}>
          <Text style={styles.modalText}>Downloading Images ...</Text>
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
    product: state.product,
    cart: state.cart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sharedProductProcess: data => {
      dispatch(SharedProductActions.sharedProductRequest(data))
    },
    loadProductProcess: data => {
      dispatch(GetProductActions.getProductRequest(data))
    },
    loadProductVariationProcess: data => {
      dispatch(GetProductActions.getProductVariationRequest(data))
    },
    addToCartProcess: data => {
      dispatch(CartActions.addCartRequest(data))
    },
    addWishlistProductProcess: data => {
      dispatch(EditWishlistActions.addWishlistRequest(data))
    },
    deleteWishlistProductProcess: data => {
      dispatch(EditWishlistActions.deleteWishlistRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductScreen)
