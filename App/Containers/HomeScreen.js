import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback , Image, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import ProductCard from '../Components/ProductCard'
import SharedProductActions from '../Redux/SharedProductRedux'
import GetHomepageActions from '../Redux/GetHomepageRedux'

// Styles
import styles from './Styles/HomeScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

class HomeScreen extends Component {
  static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.home2 : Images.home)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)

    this.state = {
      products: [],
      activeSlide: 0,
    }

    this._renderProduct = this._renderProduct.bind(this)
    this.navigate_to = this.navigate_to.bind(this)
  }

  async componentDidMount(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getHomepageRequest(data)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.getHomepage !== newProps.getHomepage) {
      if (
        newProps.getHomepage.payload !== null &&
        newProps.getHomepage.error === null &&
        !newProps.getHomepage.fetching
      ) {
          this.setState({
            products: newProps.getHomepage.payload.best_seller,
          })
        }
      }
  }

  navigate_to(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  _renderHeroBanner ({item, index}, parallaxProps) {
        return (
            <View style={styles.itemHeroBanner}>
                <ParallaxImage
                    source={{uri:item.img_url}}
                    containerStyle={styles.imageContainerHeroBanner}
                    style={styles.imageHeroBanner}
                    parallaxFactor={0.6}
                    {...parallaxProps}
                />
            </View>
        );
    }

  _renderCategories({item, index}){
    return(
      <TouchableOpacity style={styles.catButton} onPress={() => this.navigate_to('Category', {category_id: item.slug})}>
        <Image source={{uri:item.img_url}} style={styles.catImage}/>
        <Text style={styles.catText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  _renderProduct ({item, index}) {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('ProductScreen', {
          product: item,
          auth: this.props.auth
        })}
      >
        <View>
          <ProductCard
            product={item}
            sharedProductProcess={this.props.sharedProductProcess}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render () {
    if(this.props.getHomepage.fetching === null || this.props.getHomepage.fetching === true) return <View/>
    const { navigate } = this.props.navigation
    return (
    <View style={styles.container}>
      <View style={styles.containerScroll}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
        >
          <View style={styles.backgroundHeader} />
          <View style={styles.headerWrapper}>
          <View style={styles.headerWrapper1}>
            <View style={styles.headerButtonLeft}>
              <Image source={Images.mooimomLogoWhite} style={styles.logo} />
            </View>
            <View style={styles.headerButtonRight}>
              <TouchableOpacity onPress={() => this.navigate_to('SharedProductScreen')}><Image source={Images.wishlist} style={styles.buttonHeader} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigate_to('CartScreen')}><Image source={Images.shoppingCart} style={styles.buttonHeader} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.navigate_to('NotificationScreen')}><Image source={Images.notifWhite} style={styles.buttonHeader2} /></TouchableOpacity>
            </View>
          </View>
          </View>
          <View style={styles.headerWrapper}>
            <View style={styles.headerWrapper2}>
              <TouchableOpacity style={styles.searchButton} onPress={() => this.navigate_to('SearchScreen')}>
                <Image source={Images.search} style={styles.imageSearch}/>
                <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.heroBannerWrapper}>
            <Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={Metrics.screenWidth}
              sliderHeight={220}
              itemWidth={Metrics.screenWidth - 60}
              data={this.props.getHomepage.payload.big_banner}
              renderItem={this._renderHeroBanner}
              hasParallaxImages={true}
              autoplay={true}
              lockScrollWhileSnapping={true}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            <Pagination
              dotsLength={this.props.getHomepage.payload.big_banner.length}
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
            <FlatList
              data={this.props.getHomepage.payload.categories}
              renderItem={this._renderCategories.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.productWrapper}>
            <Text style={styles.subTitleWrapper}>Produk Terlaris</Text>
            <FlatList
              data={this.state.products}
              renderItem={this._renderProduct}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
            />
          </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    getHomepage: state.getHomepage,
    auth:state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sharedProductProcess: data => {
      dispatch(SharedProductActions.sharedProductRequest(data))
    },
    getHomepageRequest: data => {
      dispatch(GetHomepageActions.getHomepageRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
