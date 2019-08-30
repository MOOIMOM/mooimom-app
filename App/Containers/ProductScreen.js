import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/ProductScreenStyles'

class ProductScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: this.props.navigation.state.params.product
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
            <Image source={Images.back} style={styles.buttonHeader} />
            <TouchableOpacity style={styles.searchButton}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <Image source={Images.wishlistBlack} style={styles.buttonHeader} />
            <Image source={Images.shoppingCartBlack} style={styles.buttonHeader} />
            <Image source={Images.notif} style={styles.buttonHeader} />
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
