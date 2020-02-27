import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import ProductCard from '../Components/ProductCard'
import WishlistActions from '../Redux/WishlistRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import SharedProductActions from '../Redux/SharedProductRedux'
import { connect } from 'react-redux'
import { convertToRupiah } from '../Lib/utils'

// Styles
import styles from './Styles/SharedProductScreenStyles'

class SharedProductScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuStatus: ['Wishlist Produk', 'Produk Dibagikan'],
      selectedMenuIdx: this.props.navigation.state.params.selectedMenuIdx ? this.props.navigation.state.params.selectedMenuIdx : 0,
      products: []
    }

    this._renderProduct = this._renderProduct.bind(this)
    this._renderMenuStatus = this._renderMenuStatus.bind(this)
  }

  componentDidMount() {
    this.reloadWishlist()
    if (this.state.selectedMenuIdx === 1) {
      this.setState({
        products: this.props.sharedProduct.data
      })
    }
  }

  reloadWishlist() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getWishlistProcess(data)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.editWishlist !== newProps.editWishlist) {
      if (
        newProps.editWishlist.payload !== null &&
        newProps.editWishlist.error === null &&
        !newProps.editWishlist.fetching
      ) {
        this.reloadWishlist()
      }
    }

    if (this.props.sharedProduct !== newProps.sharedProduct) {
      if (
        newProps.sharedProduct.payload !== null &&
        newProps.sharedProduct.error === null &&
        !newProps.sharedProduct.fetching
      ) {
        if (this.state.selectedMenuIdx === 1) {
          this.setState({
            products: newProps.sharedProduct.data
          })
        }
      }
    }

    if (this.props.wishlist !== newProps.wishlist) {
      if (
        newProps.wishlist.payload !== null &&
        newProps.wishlist.error === null &&
        !newProps.wishlist.fetching
      ) {
        if (this.state.selectedMenuIdx === 0) {
          this.setState({
            products: newProps.wishlist.payload.products
          })
        }
      }
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  pressSelectedMenu(index) {
    this.setState({
      products: [],
      selectedMenuIdx: index,
    })
    var data = []
    if (index === 0) {
      if (this.props.wishlist.payload && this.props.wishlist.payload.products.length > 0)
        data = this.props.wishlist.payload.products
    } else {
      data = this.props.sharedProduct.data
    }
    setTimeout(() => {
      this.setState({
        products: data
      })
    }, 100);
  }

  _renderProduct({ item, index }) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.actNavigate('ProductScreen', {
          product_slug: item.slug,
          auth: this.props.auth
        })}
      >
        <View>
          <ProductCard
            product={item}
            auth={this.props.auth}
            sharedProductProcess={this.props.sharedProductProcess}
            addWishlistProductProcess={this.props.addWishlistProductProcess}
            deleteWishlistProductProcess={this.props.deleteWishlistProductProcess}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderMenuStatus() {
    if (this.state.menuStatus.length > 0) {
      return (
        <View style={styles.menuStatus}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.menuStatus.map((item, index) => {
              var style = styles.menuBtn
              var styleText = styles.menuText
              if (index === this.state.selectedMenuIdx) {
                style = styles.menuBtn2
                styleText = styles.menuText2
              }
              return (
                <TouchableOpacity key={index.toString()} onPress={() => this.pressSelectedMenu(index)}>
                  <View style={style}>
                    <Text style={styleText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btnHeader} onPress={
              () => this.props.navigation.goBack()
            }>
              <Image source={Images.back} style={styles.imgHeader} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch} />
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader} />
              {this.props.cartt.data.length > 0 && <View style={styles.notifContainer}>
                <Text style={styles.textNotif}>{this.props.cartt.data.length}</Text>
              </View>}
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator} />
          <View style={styles.contentContainer}>
            {this._renderMenuStatus()}
            <View style={styles.wrapperSeparator} />
            <FlatList
              data={this.state.products}
              renderItem={this._renderProduct}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              getItemLayout={(data, index) => (
                { length: Metrics.screenHeight / 2, offset: Metrics.screenHeight / 2 * index, index }
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {
  return {
    sharedProduct: state.sharedProduct,
    wishlist: state.wishlist,
    auth: state.auth,
    editWishlist: state.editWishlist,
    cartt: state.cartt
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getWishlistProcess: data => {
      dispatch(WishlistActions.getWishlistRequest(data))
    },
    addWishlistProductProcess: data => {
      dispatch(EditWishlistActions.addWishlistRequest(data))
    },
    deleteWishlistProductProcess: data => {
      dispatch(EditWishlistActions.deleteWishlistRequest(data))
    },
    sharedProductProcess: data => {
      dispatch(SharedProductActions.sharedProductRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedProductScreen)
