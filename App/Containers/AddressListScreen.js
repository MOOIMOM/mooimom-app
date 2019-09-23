import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
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

  selectAddress(id){
    if(this.props.navigation.state.params.setSelectAddress){
      this.props.navigation.state.params.setSelectAddress(id)
      this.props.navigation.goBack()
    }
  }

  _renderAddress({item, index}){
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
      <TouchableOpacity onPress={() => this.selectAddress(item.id)}>
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
