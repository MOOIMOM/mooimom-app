import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
import PickerCustom from '../Components/PickerCustom'
import ProvinceActions from '../Redux/ProvinceRedux'
import CityActions from '../Redux/CityRedux'
import DistrictActions from '../Redux/DistrictRedux'
import EditAddressActions from '../Redux/EditAddressRedux'
import CheckBox from '../Components/CheckBox'
// Styles
import styles from './Styles/UpdateAddressScreenStyles'

var requestAdd = false
class UpdateAddressScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.navigation.state.params.item.receiver_name,
      province_name: this.props.navigation.state.params.item.province_name,
      city_name: this.props.navigation.state.params.item.city_name,
      district_name: this.props.navigation.state.params.item.district_name,
      id: this.props.navigation.state.params.item.id,
      street: this.props.navigation.state.params.item.address,
      province: this.props.navigation.state.params.item.province_id,
      city: this.props.navigation.state.params.item.city_id,
      district: this.props.navigation.state.params.item.district_id,
      zipCode: this.props.navigation.state.params.item.zip_code,
      phone: this.props.navigation.state.params.item.receiver_phone,
      isSetPrimary:this.props.navigation.state.params.item.is_primary === 1
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

  componentDidMount(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getProvincesProcess(data)

    let data2 = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        province_id: this.state.province
      }
    }
    this.props.getCitiesProcess(data2)

    let data3 = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        city_id: this.state.city
      }
    }
    this.props.getDistrictsProcess(data3)
  }

  async changeProvince(val){
    var province_name = await this.props.province.payload.provinces.find(province => province.id === val).name
    this.setState({province: val, province_name: province_name, city_name: '', city: '', district: '', district_name: ''})
      let data = {
        data_request:{
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          province_id: val
        }
      }
      this.props.getCitiesProcess(data)
  }

  async changeCity(val){
      var city_name = await this.props.city.payload.cities.find(city => city.id === val).name
      this.setState({city: val, city_name: city_name, district: '', district_name: ''})
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
    if(receiver_phone.substring(0, 3) === '+62'){
      receiver_phone = receiver_phone.substring(3)
    }
    var isPrimary = isSetPrimary === true ? 1 : 0
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        customer_address_id: this.state.id,
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
    this.props.editAddressProcess(data)
    this.actNavigate('AddressListScreen')
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            enabled
          >
          <Text style={styles.productSubtitle}>Ubah Alamat</Text>
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
          {this.props.province.payload && this.props.province.payload.provinces
            && this.props.province.payload.provinces.length > 0 && <PickerCustom
            placeholder='Pilih Propinsi'
            data={this.props.province.payload.provinces}
            selectedValue={this.state.province}
            selectedLabel={this.state.province_name}
            color={Colors.black}
            label={'Propinsi'}
            label0={'Pilih Propinsi'}
            onValueChange={val => this.changeProvince(val)}
          />}
          {this.props.city.payload && this.props.city.payload.cities
            && this.props.city.payload.cities.length > 0 && <PickerCustom
            placeholder='Pilih Kota'
            data={this.props.city.payload.cities}
            selectedValue={this.state.city}
            selectedLabel={this.state.city_name}
            color={Colors.black}
            label={'Kota'}
            label0={'Pilih Kota'}
            value={this.state.city}
            onValueChange={val => this.changeCity(val)}
          />}
          {this.props.district.payload && this.props.district.payload.districts
            && this.props.district.payload.districts.length > 0 &&
            <PickerCustom
            placeholder='Pilih Kecamatan'
            data={this.state.city !== '' ? this.props.district.payload.districts : []}
            selectedValue={this.state.district}
            selectedLabel={this.state.district_name}
            color={Colors.black}
            label={'Kecamatan'}
            label0={'Pilih Kecamatan'}
            value={this.state.district}
            onValueChange={val => this.setState({district: val})}
          />}
          <TextInputCustom
            placeholder='Kode Pos'
            color={Colors.black}
            label={'Kode Pos'}
            textAlign='left'
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
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    province: state.province,
    city: state.city,
    district: state.district
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
    editAddressProcess: data => {
      dispatch(EditAddressActions.editAddressRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAddressScreen)
