import React, { Component } from 'react'
import { ScrollView, SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import GetAddressActions from '../Redux/GetAddressRedux'
import EditAddressActions from '../Redux/EditAddressRedux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/AddressListScreenStyles'

class AddressListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addresses:[],
      primaryAddressId: 1
    }
  }

  componentDidMount(){
    this.reloadAddresses()
  }

  reloadAddresses(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getAddressProcess(data)
  }

  actNavigate (screen, data = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, data)
  }

  componentWillReceiveProps(newProps){
    if(this.props.address !== newProps.address){
      if (
        newProps.address.payload !== null &&
        newProps.address.error === null &&
        !newProps.address.fetching
      ) {
        this.setState({
          addresses: newProps.address.payload.addresses,
        })
      }
    }
    if(newProps.editaddress !== this.props.editaddress){
      if (
        newProps.editaddress.payload !== null &&
        newProps.editaddress.error === null &&
        !newProps.editaddress.fetching
      ) {
          this.reloadAddresses()
        }
      }
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
            let data = {
              data_request:{
                user_id: this.props.auth.payload.user_id,
                unique_token: this.props.auth.payload.unique_token,
                customer_address_id: index
              }
            }
            this.props.deleteAddressProcess(data)
          }
        }
      ],
      { cancelable: false }
    )
  }

  selectAddress(item){
    if(this.props.navigation.state.params.setSelectAddress){
      this.props.navigation.state.params.setSelectAddress(item)
      this.props.navigation.goBack()
    }
  }

  _renderAddress(){
    if(this.state.addresses.length > 0)
    return (
      this.state.addresses.map((item, index) => {
        var style = styles.deliveryAddressContainer
        var color = Colors.black
        var imgEdit = Images.edit
        var imgDelete = Images.delete
        if(item.is_primary === 1){
          style = styles.deliveryAddressContainer2
          color = Colors.white
          imgEdit = Images.edit2
          imgDelete = Images.delete2
        }
        return(
          <TouchableOpacity onPress={() => this.selectAddress(item)} key={index.toString()}>
          <View style={style}>
            <View style={styles.btnContainer}>
              <Text style={[styles.addressName, {color: color}]}>{item.receiver_name}</Text>
              <View style={styles.btnContainer2}>
                <TouchableOpacity onPress={() => this.actNavigate('UpdateAddressScreen', {item: item})}><Image source={imgEdit} style={styles.btnEditAddress}/></TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteAddress(item.id)}><Image source={imgDelete} style={styles.btnEditAddress}/></TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.address, {color: color}]}>{item.address}</Text>
            <Text style={[styles.address, {color: color}]}>{item.district_name}, {item.city_name}</Text>
            <Text style={[styles.address, {color: color}]}>{item.province_name} - {item.zip_code}</Text>
            <Text style={[styles.address, {color: color}]}>{item.receiver_phone}</Text>
          </View>
          </TouchableOpacity>
        )
      })
    )
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
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
            {this._renderAddress()}
          <View style={styles.wrapperSeparator}/>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('NewAddressScreen')}}>
            <Text style={styles.chooseAddressText}>+ Tambah Alamat</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    address: state.address,
    auth: state.auth,
    editaddress: state.editaddress
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAddressProcess: data => {
      dispatch(GetAddressActions.getAddressRequest(data))
    },
    deleteAddressProcess: data => {
      dispatch(EditAddressActions.deleteAddressRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressListScreen)
