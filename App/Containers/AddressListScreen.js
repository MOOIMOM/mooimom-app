import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/AddressScreenStyles'
var dataAddress = [
  {id:1, name:'James', street:'Graha Boulevard BO5', district:'Kelapa Gading Timur, Kelapa Gading, Jakarta Utara, DKI Jakarta', zipCode:'14240', phone:'081823908879'}
]

class AddressListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addresses: dataAddress,
      primaryAddressId: 1
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  _renderAddress({item, index}){
    var style = styles.deliveryAddressContainer
    var color = Colors.black
    if(item.id === this.state.primaryAddressId){
      style = styles.deliveryAddressContainer2
      color = Colors.white
    }
    return(
      <View style={style}>
        <Text style={[styles.addressName, {color: color}]}>{item.name}</Text>
        <Text style={[styles.address, {color: color}]}>{item.street}</Text>
        <Text style={[styles.address, {color: color}]}>{item.district}</Text>
        <Text style={[styles.address, {color: color}]}>{item.zipCode}</Text>
        <Text style={[styles.address, {color: color}]}>{item.phone}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
        </View>
        <View style={styles.cartContainer}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <Text style={styles.productSubtitle}>Pilih Alamat</Text>
          <View style={styles.wrapperSeparator}/>
            <FlatList
              data={this.state.addresses}
              renderItem={this._renderAddress.bind(this)}
              keyExtractor={(item, index) => item.id.toString()}
            />
          <View style={styles.wrapperSeparator}/>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('NewAddressScreen')}}>
            <Text style={styles.chooseAddressText}>+ Tambah Alamat</Text>
          </TouchableOpacity>
          </ScrollView>
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
)(AddressListScreen)
