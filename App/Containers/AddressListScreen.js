import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import AddressActions from '../Redux/AddressRedux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/AddressListScreenStyles'
var dataAddress = [
  {id:1, name:'James', street:'Graha Boulevard BO5', district:'Kelapa Gading Timur, Kelapa Gading, Jakarta Utara, DKI Jakarta', zipCode:'14240', phone:'081823908879'},
  {id:2, name:'James', street:'Graha Boulevard BO5', district:'Kelapa Gading Timur, Kelapa Gading, Jakarta Utara, DKI Jakarta', zipCode:'14240', phone:'081823908879'},
]

class AddressListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addresses: dataAddress,
      primaryAddressId: 1
    }
  }

  componentDidMount(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getAddressProcess(data)
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  deleteAddress(index){
    Alert.alert(
      '',
      'Remove address?',
      [
        {
          text: 'No'
        },
        {
          text: 'Yes', onPress: () => {
            var addresses =  Object.assign([], this.state.addresses);
            addresses.splice(index, 1)
            this.setState({
              addresses: addresses
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  _renderAddress({item, index}){
    console.info(item)
    var style = styles.deliveryAddressContainer
    var color = Colors.black
    var imgEdit = Images.edit
    var imgDelete = Images.delete
    if(item.id === this.state.primaryAddressId){
      style = styles.deliveryAddressContainer2
      color = Colors.white
      imgEdit = Images.edit2
      imgDelete = Images.delete2
    }
    return(
      <TouchableOpacity onPress={() => this.setState({
        primaryAddressId: item.id
      })}>
      <View style={style}>
        <View style={styles.btnContainer}>
          <Text style={[styles.addressName, {color: color}]}>{item.name}</Text>
          <View style={styles.btnContainer2}>
            <TouchableOpacity onPress={() => this.actNavigate('UpdateAddressScreen')}><Image source={imgEdit} style={styles.btnEditAddress}/></TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteAddress(index)}><Image source={imgDelete} style={styles.btnEditAddress}/></TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.address, {color: color}]}>{item.street}</Text>
        <Text style={[styles.address, {color: color}]}>{item.district}</Text>
        <Text style={[styles.address, {color: color}]}>{item.zipCode}</Text>
        <Text style={[styles.address, {color: color}]}>{item.phone}</Text>
      </View>
      </TouchableOpacity>
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
          <Text style={styles.productSubtitle}>Alamat Pengiriman</Text>
          <View style={styles.wrapperSeparator}/>
            {this.props.address.payload && <FlatList
              data={this.props.address.payload.addresses}
              renderItem={this._renderAddress.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
            />}
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
    address: state.address,
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAddressProcess: data => {
      dispatch(AddressActions.getAddressRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressListScreen)
