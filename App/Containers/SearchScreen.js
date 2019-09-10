import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/SearchScreenStyles'

class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
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
            <TouchableOpacity style={styles.searchButton}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >

            </ScrollView>
          </View>
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
)(SearchScreen)
