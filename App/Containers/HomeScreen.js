import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableOpacity, TouchableWithoutFeedback , Image, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import ProductCard from '../Components/ProductCard'

// Styles
import styles from './Styles/HomeScreenStyles'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    var dataHeroBanner = [
      Images.banner2,
      Images.banner1,
      Images.banner3
    ]
    var dataPromoBanner = [
      {id: '1', image: Images.promo1},
      {id: '2', image: Images.promo2},
      {id: '3', image: Images.promo3}
    ]
    var dataProducts = [
      {id: '1', image: 'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg', name:'Full Coverage Seamless Maternity & Nursing Bra', price: 350000, discPrice: 0},
      {id: '2', image: 'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/05/08/main-c7889-1-compressor.jpg', name:'Bamboo Postpartum Belly Band Corset', price: 920000, discPrice: 200000},
      {id: '3', image: 'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/04/30/h9502-1-compressor.jpg', name:'Mooimom Casual Hipseat Carrier', price: 399000, discPrice: 0},
      {id: '4', image: 'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/06/24/q90301-2.jpg', name:'Sloped Pillow Bantal Bayi', price: 449000, discPrice: 0},
    ]
    this.state = {
      heroBanners: dataHeroBanner,
      promoBanners: dataPromoBanner,
      products: dataProducts,
      activeSlide: 0
    }

    this._renderProduct = this._renderProduct.bind(this)
  }

  _renderHeroBanner ({item, index}, parallaxProps) {
        return (
            <View style={styles.itemHeroBanner}>
                <ParallaxImage
                    source={item}
                    containerStyle={styles.imageContainerHeroBanner}
                    style={styles.imageHeroBanner}
                    parallaxFactor={0.6}
                    {...parallaxProps}
                />
            </View>
        );
    }

  _renderPromoBanner ({item, index}) {
      return (
        <View style={styles.itemPromoBanner}>
          <TouchableWithoutFeedback>
              <Image
                  source={item.image}
                  style={styles.imagePromoBanner}
              />
          </TouchableWithoutFeedback >
        </View>
      );
  }

  _renderProduct ({item, index}) {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('ProductScreen', {
          product: item
        })}
      >
        <View>
          <ProductCard
            product={item}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            <Image source={Images.homeBG} style={styles.backgroundImage} />
            <View style={styles.headerWrapper}>
              <View style={styles.headerWrapper1}>
                <View style={styles.headerButtonLeft}>
                  <Image source={Images.mooimomLogoWhite} style={styles.logo} />
                </View>
                <View style={styles.headerButtonRight}>
                  <Image source={Images.wishlist} style={styles.buttonHeader} />
                  <Image source={Images.shoppingCart} style={styles.buttonHeader} />
                  <Image source={Images.notifWhite} style={styles.buttonHeader} />
                </View>
              </View>
              <View style={styles.headerWrapper2}>
                <TouchableOpacity style={styles.searchButton}>
                  <Image source={Images.search} style={styles.imageSearch}/>
                  <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.heroBannerWrapper}>
              <Carousel
                sliderWidth={Metrics.screenWidth}
                sliderHeight={220}
                itemWidth={Metrics.screenWidth - 60}
                data={this.state.heroBanners}
                renderItem={this._renderHeroBanner}
                hasParallaxImages={true}
                autoplay={true}
                lockScrollWhileSnapping={true}
                loop={true}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
              <Pagination
                dotsLength={this.state.heroBanners.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={styles.paginationDotStyleHeroBanner}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.paginationContainerStyleHeroBanner}
                dotContainerStyle={styles.paginationDotContainerStyleHeroBanner}
              />
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.categoryWrapper}>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catMasaKehamilan} style={styles.catImage}/>
                <Text style={styles.catText}>Masa Kehamilan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catMasaMenyusui} style={styles.catImage}/>
                <Text style={styles.catText}>Masa Menyusui</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catPascaMelahirkan} style={styles.catImage}/>
                <Text style={styles.catText}>Pasca Melahirkan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catProdukBayi} style={styles.catImage}/>
                <Text style={styles.catText}>Produk Bayi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catGiftSet} style={styles.catImage}/>
                <Text style={styles.catText}>Gift Set</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.promotionWrapper}>
              <Text style={styles.subTitleWrapper}>Promo Saat Ini</Text>
              <FlatList
                horizontal
                data={this.state.promoBanners}
                renderItem={this._renderPromoBanner}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.productWrapper}>
              <Text style={styles.subTitleWrapper}>Produk Terlaris</Text>
              <FlatList
                data={this.state.products}
                renderItem={this._renderProduct}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
              />
            </View>
            </ScrollView>
          </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.home} style={styles.menuImage}/>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.learn} style={styles.menuImage}/>
            <Text style={styles.menuText}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.category} style={styles.menuImage}/>
            <Text style={styles.menuText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.order} style={styles.menuImage}/>
            <Text style={styles.menuText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.account} style={styles.menuImage}/>
            <Text style={styles.menuText}>Akun</Text>
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
)(HomeScreen)
