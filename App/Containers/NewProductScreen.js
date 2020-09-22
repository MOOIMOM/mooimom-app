import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, Modal, TouchableWithoutFeedback, Platform, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
// import Carousel, { Pagination } from 'react-native-snap-carousel'
import Carousel from "pinar"
import ColorPick from '../Components/ColorPick'
import SizePick from '../Components/SizePick'
import FastImage from 'react-native-fast-image'
import ScaledImage from '../Components/ScaledImage'
import { DotIndicator } from 'react-native-indicators'

import NewProductCard from '../Components/NewProductCard'
import NewProductDescriptions from '../Components/NewProductDescriptions'
import axios from 'axios'

export default class NewProductScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      productColors: [],
      productSizes: [],
      categoryList: [],
      otherProducts: [],
      productPhotos: [],
      descriptionImageList: [],
      peopleSays: [],
      thumbnail: '',
      selectedColor: '',
      selectedSize: '',
      showAddtoCartModal: false,
      showBuyProductModal: false,
      quantity: 0,
      productDescriptionsEnum: [
        {
          id: 1,
          title: 'Product Description',
          descriptionText: [
            'Free your hands when milking, you can take care of your baby at the same time, use your computer and mobile phone',
            'No steel ring, no restraint, no chest pressure, soft and elastic fabric, breathable and comfortable',
            'Spare fabric pieces with double zippers on the front chest, strong viscosity devil felt on the back, freely adjustable size',
            'Non-slip wide shoulder strap design to reduce the pressure of breast sagging during pregnancy'
          ]
        },
        {
          id: 2,
          title: 'Product Details',
          descriptionText: 'Material: 93% cotton, 7% elastic fiber'
        },
        {
          id: 3,
          title: 'Washing Instructions',
          descriptionText: 'It is recommended to wash personal clothing by hand, and for machine washing, it is recommended to put it in a laundry bag to avoid pulling'
        }
      ],
    }

    this.renderRating = this.renderRating.bind(this)
  }

  async componentDidMount() {
    if (this.props.navigation.state.params.productId) {
      let selectedProductId = this.props.navigation.state.params.productId
      console.log('ProductId', selectedProductId)
      this.getProductDetails(selectedProductId)
    }
  }

  showBuyProductModal() {
    this.setState({ showBuyProductModal: true })
  }

  onPressBuyProduct() {
    this.setState({ showBuyProductModal: false })
    alert("Success buy product")
    this.navigate_to('NewCheckoutScreen')
  }

  showAddtoCartModal() {
    this.setState({ showAddtoCartModal: true })
  }

  onPressAddtoCart() {
    this.setState({ showAddtoCartModal: false })
    alert("Success add to cart")
  }

  addQuantity() {
    this.setState({ quantity: this.state.quantity + 1 })
  }

  subtractQuantity() {
    if (this.state.quantity === 0) {

    }
    else {
      this.setState({ quantity: this.state.quantity - 1 })
    }
  }

  navigate_to(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  getProductDetails(productId) {
    axios.get(`https://mooimom-alpha.ec.tnpgroup.co/web/product/${productId}?type=mobile`)
      .then((res) => {
        let selectedProductAttributes = res.data.attribute_value_list
        let productImage = res.data.image_gallery
        let descriptionImageList = res.data.description_image_list
        let peopleSays = res.data.people_say
        let otherProducts = res.data.our_pick

        console.log('Product Data: ', res.data)
        this.setState({
          product: res.data,
          thumbnail: productImage[0].image,
          productPhotos: productImage,
          descriptionImageList: descriptionImageList,
          peopleSays: peopleSays,
          otherProducts: otherProducts
        })
        this.getAttributeList(selectedProductAttributes)
      })
      .catch(err => {
        console.log('ERROR :', err)
      })
  }

  getAttributeList(selectedProductAttributes) {
    axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/attribute/all?type=mobile')
      .then((res) => {
        let sizes = res.data[0]
        let colors = res.data[1]

        let productAttributes = selectedProductAttributes

        productAttributes.map(productId => {
          sizes.attribute_values.map(sizeItem => {
            if (sizeItem.id === productId) {
              // console.log('Berhasil')
              this.setState({
                productSizes: [...this.state.productSizes, sizeItem]
              })
            }
          })

          colors.attribute_values.map(colorItem => {
            if (colorItem.id === productId) {
              // console.log('Berhasil juga')
              this.setState({
                productColors: [...this.state.productColors, colorItem]
              })
            }
          })
        })
      })
      .catch(err => {
        console.log('ERROR :', err)
      })
  }

  renderImage({ item, index }, parallaxProps) {
    return (
      <FastImage source={{ uri: item.image }} style={{ width: Metrics.screenWidth, height: Metrics.screenHeight / 1.6 }} resizeMode={FastImage.resizeMode.contain} />
    );
  }

  renderProductPhotos({ item, index }) {
    return (
      <View key={index} style={{ width: Metrics.screenWidth / 7, height: (Metrics.screenWidth / 7) + 20, justifyContent: 'center', alignItems: 'center', backgroundColor: item.image !== '' ? '' : Colors.mediumGray, marginHorizontal: 10 }}>
        <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} />
      </View>
    )
  }

  renderBenefits({ item, index }) {
    return (
      <View style={{ width: Metrics.screenWidth / 3.6, height: (Metrics.screenWidth / 3.6) - 50, backgroundColor: Colors.mediumGray, marginHorizontal: 10 }}>

      </View>
    )
  }

  renderColor({ item, index }) {
    return (
      <View style={{ width: Metrics.screenWidth / 8, height: Metrics.screenWidth / 8, backgroundColor: Colors.mediumGray, marginRight: 20 }}>

      </View>
    )
  }

  renderSize({ item, index }) {
    return (
      <View style={{ width: Metrics.screenWidth / 5, height: (Metrics.screenWidth / 5) - 40, borderRadius: (Metrics.screenWidth / 5) / 2, borderColor: Colors.gray, borderWidth: 1, marginRight: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontFamily: Fonts.gotham1, color: Colors.black, fontSize: 14 }}>{item.name}</Text>
      </View>
    )
  }

  renderProductDesc() {
    return (
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <FlatList
          data={this.state.productDescriptionsEnum}
          renderItem={(parentItem, index) => (
            <NewProductDescriptions productDescriptions={parentItem.item} />
          )}
          showsVerticalScrollIndicator={false}
        />
        <View style={{ width: '100%', paddingRight: 10, marginTop: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>
            Dear customer, The color display may differ on each computer monitor. The default color is the color of the product. Please wait carefully for the clothing size chart & the clothes testing results before placing an order. Choose a size that suits your posture.
          </Text>
        </View>
      </View>
    )
  }

  renderAddtoCartModal() {
    return (
      <View style={{ width: '100%', height: Metrics.screenHeight - 50, top: 50, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
        <View style={{ position: 'absolute', alignSelf: 'center', width: '90%', }}>
          <TouchableOpacity onPress={() => this.setState({ showAddtoCartModal: false })} style={{ marginLeft: '96%', marginTop: 10, position: 'absolute', zIndex: 1, width: 20, height: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginBottom: 20 }}>
            <View style={{ width: Metrics.screenWidth / 7, height: (Metrics.screenWidth / 7) + 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: this.state.product.image }} style={{ width: '100%', height: '100%' }} />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontFamily: Fonts.type.gotham4, color: Colors.black }}>Rp{this.state.product.retail_price}</Text>
              <Text style={{ fontSize: 12, fontFamily: Fonts.type.gotham4, color: Colors.mediumGray, textDecorationLine: 'line-through' }}>Rp299.000</Text>
            </View>
          </View> */}

          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Color</Text>
            <ColorPick options={this.state.productColors} onSelected={(value) => this.setState({ selectedColor: value })} />
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Size</Text>
            <SizePick options={this.state.productSizes} onSelected={(value) => this.setState({ selectedSize: value })} />
          </View>
          <View style={{ width: '90%', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Quantity</Text>

            <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) / 4, borderRadius: 10, flexDirection: 'row', alignItem: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.gray, marginBottom: 10 }}>
              <TouchableOpacity onPress={() => this.subtractQuantity()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mediumGray, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ color: Colors.black, fontSize: 12 }}>-</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.black, fontFamily: Fonts.type.gotham4 }}>{this.state.quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => this.addQuantity()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mediumGray, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{ color: Colors.black, fontSize: 12 }}>+</Text>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity onPress={() => { this.onPressAddtoCart() }} style={{ width: '90%', alignSelf: 'center', height: (Metrics.screenWidth / 4) / 3, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom, marginVertical: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white }}>Add to cart</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50 }} />
        </ScrollView>
      </View>
    )
  }

  renderBuyProductModal() {
    return (
      <View style={{ width: '100%', height: Metrics.screenHeight - 50, top: 50, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
        <View style={{ position: 'absolute', alignSelf: 'center', width: '90%', }}>
          <TouchableOpacity onPress={() => this.setState({ showBuyProductModal: false })} style={{ marginLeft: '96%', marginTop: 10, position: 'absolute', zIndex: 1, width: 20, height: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginBottom: 20 }}>
            <View style={{ width: Metrics.screenWidth / 7, height: (Metrics.screenWidth / 7) + 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: this.state.product.image }} style={{ width: '100%', height: '100%' }} />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontFamily: Fonts.type.gotham4, color: Colors.black }}>Rp{this.state.product.retail_price}</Text>
              <Text style={{ fontSize: 12, fontFamily: Fonts.type.gotham4, color: Colors.mediumGray, textDecorationLine: 'line-through' }}>Rp299.000</Text>
            </View>
          </View> */}

          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Color</Text>
            <ColorPick options={this.state.productColors} onSelected={(value) => this.setState({ selectedColor: value })} />
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Size</Text>
            <SizePick options={this.state.productSizes} onSelected={(value) => this.setState({ selectedSize: value })} />
          </View>
          <View style={{ width: '90%', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Quantity</Text>

            <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) / 4, borderRadius: 10, flexDirection: 'row', alignItem: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.gray, marginBottom: 10 }}>
              <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mediumGray, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ color: Colors.black, fontSize: 12 }}>-</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.black, fontFamily: Fonts.type.gotham4 }}>{this.state.quantity}</Text>
              </View>
              <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mediumGray, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{ color: Colors.black, fontSize: 12 }}>+</Text>
              </TouchableOpacity>
            </View>

          </View>
          <TouchableOpacity onPress={() => { this.onPressBuyProduct() }} style={{ width: '90%', alignSelf: 'center', height: (Metrics.screenWidth / 4) / 3, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom, marginVertical: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white }}>Buy</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50 }} />
        </ScrollView>
      </View>
    )
  }

  renderDescriptionImageList() {
    return (
      this.state.descriptionImageList.map((parentItem, index) => {

        let descriptionText = ''
        let hasTitle = (parentItem.description.includes('#') && parentItem.description.includes('\r\n'))

        if (hasTitle) {
          let description = parentItem.description.replace('#', '')
          let finalDesc = description.split('\r\n')

          descriptionText = finalDesc
        }

        return (
          <View style={{ width: '100%', marginVertical: 20 }}>
            {
              (parentItem.show_text && hasTitle) &&
              <View style={{ marginBottom: 20, alignItems: 'center' }}>
                <View style={{ width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ position: 'absolute', zIndex: 1, paddingHorizontal: 10, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.mooimom, fontSize: Metrics.fontSize3 }}>{descriptionText[0]}</Text>
                  </View>
                  <View style={{ width: '100%', height: 1, backgroundColor: Colors.mooimom }} />
                </View>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                  <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.mediumGray, fontSize: Metrics.fontSize1, lineHeight: Metrics.fontSize1 }}>{descriptionText[1]}</Text>
                </View>
              </View>
            }
            <View style={{ width: '100%' }}>
              <ScaledImage key={index.toString()} uri={parentItem.image} width={Metrics.screenWidth} />
            </View>
          </View>
        )

      })
    )

  }

  renderPeopleSays() {
    return (
      <View style={{ width: '100%', height: Metrics.screenHeight / 1.6, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize3, marginTop: 20 }}>What People Are Saying</Text>
        <Carousel
          loop={true}
          autoplay={true}
          showsDots={false}
          width={Metrics.screenWidth}
          height={Metrics.screenHeight / 1.7}
          controlsButtonStyle={{
            opacity: .5
          }}
        >
          {
            this.state.peopleSays.map((parenItem, index) => {

              return (
                <View style={{ width: '100%', height: Metrics.screenHeight / 1.7, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: Metrics.screenWidth / 3, height: Metrics.screenWidth / 3, borderRadius: Metrics.screenWidth / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <FastImage source={{ uri: parenItem.image }} style={{ width: '100%', height: '100%', borderRadius: Metrics.screenWidth / 3 }} resizeMode={FastImage.resizeMode.contain} />
                  </View>
                  <View style={{ width: 15, height: 15, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <Image source={Images.quote} style={{ width: '100%', height: '100%' }} />
                  </View>
                  <View style={{ width: Metrics.screenWidth / 2, alignItems: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize1 }}>{parenItem.excerpt}</Text>
                  </View>
                </View>
              )
            })
          }
        </Carousel>
      </View>
    )
  }

  renderOtherProducts() {
    return (
      <View style={{
        flex: 1,
        width: Metrics.screenWidth,
        flexGrow: 1,
      }}>

        <FlatList
          data={this.state.otherProducts}
          showsVerticalScrollIndicator={false}
          // keyExtractor={(parentItem, index) => index.toString()}
          renderItem={(parentItem, index) => (
            <View style={{ marginTop: 30 }}>
              <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20 }}>
                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize2 }}>{parentItem.item.tittle}</Text>
              </View>
              <FlatList
                data={parentItem.item.product_list}
                renderItem={this.renderNewProduct}
                // keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                ListHeaderComponent={<View style={{ marginLeft: 10 }} />}
                ListFooterComponent={<View style={{ marginLeft: 20 }} />}
                getItemLayout={(data, index) => (
                  { length: Metrics.screenHeight / 2, offset: Metrics.screenHeight / 2 * index, index }
                )}
              />

              {/* {this.props.getHomepage.fetching &&
                        <DotIndicator color={Colors.mediumGray} size={8} style={{ marginVertical: 20 }} />}
                      {this.state.seeMore &&
                        <TouchableOpacity onPress={() => this.navigate_to('Category')} style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: Colors.white, borderColor: Colors.mooimom, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20, borderRadius: 20, width: '50%', alignSelf: 'center' }}>
                          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1 }}>See More</Text>
                        </TouchableOpacity>
                      } */}
            </View>
          )}
        />
      </View>
    )
  }

  renderNewProduct({ item, index }) {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.navigate_to('NewProductScreen', { productId: '123' })}
      // onPress={() => this.navigate_to('ProductScreen', {
      //   product_slug: item.slug,
      //   auth: this.props.auth
      // })}
      >
        <View>
          <NewProductCard
            product={item}
          // auth={this.props.auth}
          // sharedProductProcess={this.props.sharedProductProcess}
          // addWishlistProductProcess={this.props.addWishlistProductProcess}
          // deleteWishlistProductProcess={this.props.deleteWishlistProductProcess}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderRating() {
    var stars = []
    var rating = this.state.product.ranking
    // var review = this.state.product.total_review
    for (var i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push({ img: Images.star, id: i })
      } else {
        stars.push({ img: Images.starEmpty, id: i })
      }
    }
    return (
      <View style={{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}>
          {stars.map((star) => {
            return (
              <Image key={star.id} source={star.img} style={{
                width: 15 * Metrics.screenWidth / 320,
                height: 15 * Metrics.screenWidth / 320,
                resizeMode: 'contain',
                marginRight: 5 * Metrics.screenWidth / 320,
                marginBottom: Platform.OS === 'ios' ? 5 : 0
              }} />
            )
          })}
        </View>
        {/* <Text style={styles.ratingText}>{review} reviews</Text> */}
      </View>
    )
  }

  renderReview() {
    return (
      <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
        <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10, marginBottom: 10 }}>Review</Text>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize0, marginRight: 10 }}>Rating</Text>
          {this.renderRating()}
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 10 }}>
            <TextInput
              placeholder="Your Title"
              underlineColorAndroid='transparent'
              keyboardType='phone-pad'
              // onChangeText={(value) => this.setState({ phone: value })}
              style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}
            />
          </View>

          <View style={{ width: '100%', borderRadius: 10, height: 40 * 3, paddingHorizontal: 10, paddingBottom: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 10 }}>
            <TextInput
              multiline={true}
              placeholder="Write your Review.."
              underlineColorAndroid='transparent'
              style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}
            />
          </View>

          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{ width: '30%', height: 30, backgroundColor: Colors.mooimom, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 10 }}>
              <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '30%', height: 30, backgroundColor: Colors.mooimom, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
              <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    console.log('Sizes : ', this.state.productSizes)
    console.log('Colors : ', this.state.productColors)

    return (
      <SafeAreaView>
        <LinearGradient colors={['#8df2e5', '#28C9B9']} style={{ width: '100%', height: 60 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Metrics.screenWidth - 40,
            marginHorizontal: 20,
            alignItems: 'center',
            height: 60
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <TouchableOpacity onPress={() => this.navigate_to('NewCategoryScreen')}>
                <Image source={Images.menuLogo} style={{
                  height: 16 * Metrics.screenWidth / 320,
                  width: 16 * Metrics.screenWidth / 320,
                  marginRight: 20,
                  marginTop: 5,
                  resizeMode: 'contain'
                }} />
              </TouchableOpacity>
              <Image source={Images.mooimomLogoWhite} style={{
                width: Metrics.screenWidth / 3,
                maxHeight: 30,
                resizeMode: 'contain'
              }} />
            </View>
            <View style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <TouchableOpacity onPress={() => this.navigate_to('SearchScreen')}>
                <Image source={Images.search2} style={{
                  height: 18 * Metrics.screenWidth / 320,
                  width: 18 * Metrics.screenWidth / 320,
                  marginLeft: 18,
                  resizeMode: 'contain'
                }} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={{ height: Metrics.screenHeight - 150 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 20 }}>
              <Carousel
                showsDots={false}
                width={Metrics.screenWidth}
                height={Metrics.screenHeight / 1.6}
                controlsButtonStyle={{
                  opacity: .2
                }}
              >
                {this.state.productPhotos.map((parentItem, index) => (
                  <FastImage source={{ uri: parentItem.image }} style={{ width: Metrics.screenWidth, height: Metrics.screenHeight / 1.6 }} resizeMode={FastImage.resizeMode.contain} />
                ))}
              </Carousel>
              {/* <Carousel
                // sliderWidth={Metrics.screenWidth}
                // sliderHeight={Metrics.screenHeight / 1.6}
                itemWidth={Metrics.screenWidth}
                data={this.state.productPhotos}
                renderItem={this.renderImage}
                lockScrollWhileSnapping={true}
              // onSnapToItem={(index) => this.setState({ activeSlide: index })}
              /> */}
            </View>

            {/* <View style={{ width: '70%', height: Metrics.screenHeight / 1.6, backgroundColor: this.state.thumbnail !== "" ? Colors.white : Colors.mediumGray, marginBottom: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
              <Image source={{ uri: this.state.thumbnail }} style={{ width: '100%', height: '100%' }} />
            </View> */}
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <FlatList
                data={this.state.productPhotos}
                renderItem={this.renderProductPhotos}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
              <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>{this.state.product.name}</Text>
            </View>
            <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.mooimom, marginRight: 20 }}>Rp{this.state.product.sales_price}</Text>
              {/* <Text style={{ fontSize: 12, fontFamily: Fonts.type.gotham4, color: Colors.black, textDecorationColor: Colors.fire, textDecorationLine: 'line-through' }}>Rp299.000</Text> */}
            </View>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <FlatList
                data={[1, 2, 3, 4, 5]}
                renderItem={this.renderBenefits}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Color</Text>
              <FlatList
                data={this.state.productColors}
                renderItem={this.renderColor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
              <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Size</Text>
              <FlatList
                data={this.state.productSizes}
                renderItem={this.renderSize}
                numColumns={4}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: Metrics.screenWidth / 2.4, height: (Metrics.screenWidth / 2.4) / 4, borderRadius: 5, borderWidth: 1, borderColor: Colors.gray, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <Image source={Images.sizeGuide} style={{ width: 30, height: 20 }} />
                <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>Size Guide</Text>
                <Image source={Images.rightArrowBlack} style={{ width: 15, height: 15 }} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20, justifyContent: 'flex-start' }}>
              <View style={{ flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Qty</Text>
                <View style={{ width: '60%', height: 40, flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: Colors.gray }}>
                  <TouchableOpacity style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>-</Text>
                  </TouchableOpacity>
                  <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>1</Text>
                  </View>
                  <TouchableOpacity style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray, borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              {this.renderRating()}
            </View>


            {/* <View style={{ width: '90%', alignSelf: 'center', marginBottom: 20, alignItems: 'flex-start' }}>
              <Rating
                type='star'
                count={5}
                ratingCount={5}
                selectedColor={Colors.mooimom}
                readonly={true}
                imageSize={20}
                // showRating
                // onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10 }}
              />
            </View> */}

            <View style={{ width: '90%', alignSelf: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 20 }}>
              <View style={{ width: '100%', borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.mediumGray, padding: 10 }} >
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                  <View style={{ width: '20%', height: 30, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                  <View style={{ width: '80%' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>Shipping from other country. Shipping time 10-14 days.</Text>
                  </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                  <View style={{ width: '20%', height: 30, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                  <View style={{ width: '80%' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>Shipping fee start from Rp184.000</Text>
                  </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }} >
                  <View style={{ width: '20%', height: 30, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                  <View style={{ width: '80%' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>18% tax from the price</Text>
                  </View>
                </View>
              </View>
            </View>


            {this.renderProductDesc()}
            {this.renderDescriptionImageList()}
            {this.renderPeopleSays()}
            {this.renderReview()}
            {this.renderOtherProducts()}


            <View style={{ marginTop: 20 }} />
          </ScrollView>
        </View>


        <View style={{
          width: '100%',
          height: Metrics.screenWidth / 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 0.5,
          borderColor: Colors.mediumGray
        }}>
          <TouchableOpacity style={{ flex: 1.5, height: Metrics.screenWidth / 8, borderRadius: 5, borderWidth: 1, borderColor: Colors.gray, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={Images.wishlistBlack} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.showAddtoCartModal()} style={{ flex: 3, height: Metrics.screenWidth / 8, borderRadius: 5, borderWidth: 1, borderColor: Colors.mooimom, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.mooimom, fontSize: 14 }}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.showBuyProductModal()} style={{ flex: 4, height: Metrics.screenWidth / 8, borderRadius: 5, backgroundColor: Colors.mooimom, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: 14 }}>Buy</Text>
          </TouchableOpacity>
        </View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showAddtoCartModal}
          onRequestClose={() => {
            this.setState({
              showAddtoCartModal: false
            })
          }}>
          <TouchableOpacity
            style={{
              width: Metrics.screenWidth,
              height: Metrics.screenHeight,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'flex-end'
            }}
            activeOpacity={1}
            onPressOut={() => {
              this.setState({
                showAddtoCartModal: false
              })
            }}
          />
          {this.renderAddtoCartModal()}
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showBuyProductModal}
          onRequestClose={() => {
            this.setState({
              showBuyProductModal: false
            })
          }}>
          <TouchableOpacity
            style={{
              width: Metrics.screenWidth,
              height: Metrics.screenHeight,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'flex-end'
            }}
            activeOpacity={1}
            onPressOut={() => {
              this.setState({
                showBuyProductModal: false
              })
            }}
          />
          {this.renderBuyProductModal()}
        </Modal>
      </SafeAreaView >
    )
  }
}