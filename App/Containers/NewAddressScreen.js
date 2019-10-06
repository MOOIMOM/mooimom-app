import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
import ProvinceActions from '../Redux/ProvinceRedux'
import CityActions from '../Redux/CityRedux'
import DistrictActions from '../Redux/DistrictRedux'
import EditAddressActions from '../Redux/EditAddressRedux'
import CheckBox from '../Components/CheckBox'
import PickerCustom from '../Components/PickerCustom'
// Styles
import styles from './Styles/NewAddressScreenStyles'

var requestAdd = false
class NewAddressScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      street: '',
      province: '',
      city: '',
      district: '',
      zipCode: '',
      phone: '',
      isSetPrimary:false
    }
  }

  componentDidMount(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getProvincesProcess(data)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.editaddress !== newProps.editaddress) {
      if (
        newProps.editaddress.payload !== null &&
        newProps.editaddress.error === null &&
        !newProps.editaddress.fetching && requestAdd
      ) {
          requestAdd = false
          if(this.props.navigation.state.params.reloadAddresses){
            this.props.navigation.state.params.reloadAddresses()
          }
          this.actNavigate('AddressListScreen')
        }
      }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  toggleCheckBox = (isCheck) => {
    this.setState({
      isSetPrimary: isCheck
    })
  }

  changeProvince(val){
    this.setState({ province: val, city: '', district: ''})
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        province_id: val
      }
    }
    this.props.getCitiesProcess(data)
  }

  changeCity(val){
    this.setState({ city: val, district: '' })
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        city_id: val
      }
    }
    this.props.getDistrictsProcess(data)
  }

  saveAddress(){
    const {name, street, province, city, district, zipCode, phone, isSetPrimary} = this.state
    if(name === '' || street === '' || province === '' || city === '' || district === '' || zipCode === '' || phone === ''){
      Alert.alert('Sorry', 'Please fill in all of the form', [{ text: 'OK'}])
      return;
    }
    var receiver_phone = phone.indexOf('0') == 0 ? phone.substring(1) : phone
    var isPrimary = isSetPrimary === true ? 1 : 0
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        receiver_name: name,
        address: street,
        province_id: province,
        city_id: city,
        district_id: district,
        zip_code: zipCode,
        receiver_phone: receiver_phone,
        is_primary: isPrimary,
      }
    }
    this.props.addAddressProcess(data)
    requestAdd = true
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            enabled
          >
          <Text style={styles.productSubtitle}>Alamat Baru</Text>
          <View style={styles.wrapperSeparator}/>
          <TextInputCustom
            placeholder='Nama Penerima'
            color={Colors.black}
            label={'Nama Penerima'}
            textAlign='left'
            value={this.state.name}
            onChangeText={val => this.setState({ name: val })}
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Alamat'
            color={Colors.black}
            label={'Alamat'}
            textAlign='left'
            value={this.state.street}
            onChangeText={val => this.setState({ street: val })}
            autoCapitalize= 'words'
          />
          <PickerCustom
            placeholder='Pilih Propinsi'
            data={this.props.province.payload ? this.props.province.payload.provinces : []}
            selectedValue={this.state.province}
            color={Colors.black}
            label={'Propinsi'}
            label0={'Pilih Propinsi'}
            value={this.state.province}
            onValueChange={val => this.changeProvince(val)}
          />
          <PickerCustom
            placeholder='Pilih Kota'
            data={this.props.city.payload ? this.props.city.payload.cities : []}
            selectedValue={this.state.city}
            color={Colors.black}
            label={'Kota'}
            label0={'Pilih Kota'}
            value={this.state.city}
            onValueChange={val => this.changeCity(val)}
          />
          <PickerCustom
            placeholder='Pilih Kecamatan'
            data={this.props.district.payload ? this.props.district.payload.districts : []}
            selectedValue={this.state.district}
            color={Colors.black}
            label={'Kecamatan'}
            label0={'Pilih Kecamatan'}
            value={this.state.district}
            onValueChange={val => this.setState({district: val})}
          />
          <TextInputCustom
            placeholder='Kode Pos'
            color={Colors.black}
            label={'Kode Pos'}
            textAlign='left'
            keyboardType={'numeric'}
            value={this.state.zipCode}
            onChangeText={val => this.setState({ zipCode: val })}
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Nomor Telepon'
            color={Colors.black}
            label={'Nomor Telepon'}
            textAlign='left'
            value={this.state.phone}
            keyboardType={'numeric'}
            onChangeText={val => this.setState({ phone: val })}
            autoCapitalize= 'words'
          />
          <View style={styles.checkboxWrapper}>
            <CheckBox clicked={(isCheck) => this.toggleCheckBox(isCheck)} />
            <Text style={styles.checkboxText}>Pakai Sebagai Alamat Utama</Text>
          </View>
          <View style={styles.wrapperSeparator}/>
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => this.saveAddress()}>
            <Text style={styles.chooseAddressText}>Simpan Alamat</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    province: state.province,
    city: state.city,
    district: state.district,
    editaddress: state.editaddress
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getProvincesProcess: data => {
      dispatch(ProvinceActions.getProvinceRequest(data))
    },
    getCitiesProcess: data => {
      dispatch(CityActions.getCityRequest(data))
    },
    getDistrictsProcess: data => {
      dispatch(DistrictActions.getDistrictRequest(data))
    },
    addAddressProcess: data => {
      dispatch(EditAddressActions.addAddressRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAddressScreen)
