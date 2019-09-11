import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import ProductCard from '../Components/ProductCard'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/SharedProductScreenStyles'

class SharedProductScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuStatus: ['Wishlist Produk', 'Produk Dibagikan'],
      selectedMenuIdx: this.props.navigation.state.params.selectedMenuIdx ? this.props.navigation.state.params.selectedMenuIdx : 0
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
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
            sharedProductProcess={this.props.sharedProductProcess}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderMenuStatus({item, index}){
    var style = styles.menuBtn
    var styleText = styles.menuText
    if(index === this.state.selectedMenuIdx){
      style = styles.menuBtn2
      styleText = styles.menuText2
    }
    return(
      <TouchableOpacity onPress={() => this.setState({
        selectedMenuIdx: index
      })}>
        <View style={style}>
            <Text style={styleText}>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btnHeader} onPress={
              () => this.props.navigation.goBack()
            }>
              <Image source={Images.back} style={styles.imgHeader}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <View style={styles.menuStatus}>
              <FlatList
                data={this.state.menuStatus}
                renderItem={this._renderMenuStatus.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                extraData={this.state}
              />
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.productContainer}>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
              <FlatList
                data={this.props.sharedProduct.data}
                renderItem={this._renderProduct.bind(this)}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
              />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    sharedProduct: state.sharedProduct
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedProductScreen)
