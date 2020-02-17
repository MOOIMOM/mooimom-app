import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import { convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
import DatePickerCustom from '../Components/DatePickerCustom'
import PickerCustom from '../Components/PickerCustom'
import ProvinceActions from '../Redux/ProvinceRedux'
import CityActions from '../Redux/CityRedux'
import DistrictActions from '../Redux/DistrictRedux'
import EditProfileActions from '../Redux/EditProfileRedux'
// Styles
import styles from './Styles/EditProfileScreenStyles'

class EditProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.navigation.state.params.profile.name,
      email: this.props.navigation.state.params.profile.email,
      address: this.props.navigation.state.params.profile.address,
      province: this.props.navigation.state.params.profile.province_id,
      province_name: this.props.navigation.state.params.profile.province_name,
      city: this.props.navigation.state.params.profile.city_id,
      city_name: this.props.navigation.state.params.profile.city_name,
      district: this.props.navigation.state.params.profile.district_id,
      district_name: this.props.navigation.state.params.profile.district_name,
      zipCode: this.props.navigation.state.params.profile.zip_code,
      phone: '+62' + this.props.navigation.state.params.profile.phone_number,
      birthday: this.props.navigation.state.params.profile.birthday,
      gender: this.props.navigation.state.params.profile.gender_slug,
      status: this.props.navigation.state.params.profile.status,
      children: this.props.navigation.state.params.profile.children,
      enumGender: [
        { name: 'Pria', id: 'male' },
        { name: 'Wanita', id: 'female' },
      ],
      enumStatus: [
        { name: 'Single', id: 'single' },
        { name: 'Menikah', id: 'married' },
        { name: 'Bercerai', id: 'divorce' },
      ],
      enumChildren: [
        { name: '0', id: 0 },
        { name: '1', id: 1 },
        { name: '2', id: 2 },
        { name: '3', id: 3 },
        { name: '4', id: 4 },
        { name: '5', id: 5 },
        { name: '6', id: 6 },
        { name: '7', id: 7 },
        { name: '>7', id: 8 },
      ]
    }
  }

  componentDidMount() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getProvincesProcess(data)

    if (this.state.province !== '') {
      let data2 = {
        data_request: {
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          province_id: this.state.province
        }
      }
      this.props.getCitiesProcess(data2)
    }
    if (this.state.city !== '') {
      let data3 = {
        data_request: {
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          city_id: this.state.city
        }
      }
      this.props.getDistrictsProcess(data3)
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.editprofile !== newProps.editprofile) {
      if (
        !newProps.editprofile.fetching
      ) {
        this.props.navigation.goBack()
      }
    }
  }

  actNavigate(screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  updateProfile() {
    const { name, phone, address, province, city, email, district, zipCode, birthday, gender, status, children } = this.state
    if (name === '' || address === '' || province === '' || city === '' || district === ''
      || zipCode === '' || birthday === '' || gender === '' || status === '' || children === '') {
      Alert.alert('Sorry', 'Please fill in all of the form', [{ text: 'OK' }])
      return;
    }
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        name: name,
        address: address,
        province_id: province,
        city_id: city,
        district_id: district,
        zip_code: zipCode,
        birthday: birthday,
        gender_slug: gender,
        status: status,
        children: children,
        email: email,
        phone_number: phone.substring(3)
      }
    }
    this.props.editProfileProcess(data)
  }

  async changeProvince(val) {
    var province_name = await this.props.province.payload.provinces.find(province => province.id === val).name
    this.setState({ province: val, province_name: province_name, city_name: '', city: '', district: '', district_name: '' })
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        province_id: val
      }
    }
    this.props.getCitiesProcess(data)
  }

  async changeCity(val) {
    var city_name = await this.props.city.payload.cities.find(city => city.id === val).name
    this.setState({ city: val, city_name: city_name, district: '', district_name: '' })
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        city_id: val
      }
    }
    this.props.getDistrictsProcess(data)
  }

  render() {
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
              <Text style={styles.productSubtitle}>Edit Profile</Text>
              <View style={styles.wrapperSeparator} />
              <TextInputCustom
                placeholder='Nomor Handphone'
                color={Colors.black}
                label={'Nomor Handphone'}
                textAlign='left'
                value={this.state.phone}
                onChangeText={val => this.setState({ phone: val })}
                autoCapitalize='words'
                editable={false}
                backgroundColor={Colors.lightGray}
              />
              <TextInputCustom
                placeholder='Nama'
                color={Colors.black}
                label={'Nama'}
                textAlign='left'
                value={this.state.name}
                onChangeText={val => this.setState({ name: val })}
                autoCapitalize='words'
              />
              <TextInputCustom
                placeholder='Email'
                color={Colors.black}
                label={'Email'}
                textAlign='left'
                keyboardType={'email-address'}
                value={this.state.email}
                onChangeText={val => this.setState({ email: val })}
                autoCapitalize='words'
              />
              <DatePickerCustom
                label={'Tanggal Lahir'}
                date={this.state.birthday}
                placeholder={'Masukkan Tanggal Lahir'}
                onDateChange={(date) => { this.setState({ birthday: date }) }}
                color={Colors.black}
              />
              <PickerCustom
                placeholder='Gender'
                data={this.state.enumGender}
                selectedValue={this.state.gender}
                color={Colors.black}
                label={'Gender'}
                label0={'Pilih Gender'}
                value={this.state.gender}
                onValueChange={val => this.setState({ gender: val })}
              />
              <PickerCustom
                placeholder='Status'
                data={this.state.enumStatus}
                selectedValue={this.state.status}
                color={Colors.black}
                label={'Status'}
                label0={'Pilih Status'}
                value={this.state.status}
                onValueChange={val => this.setState({ status: val })}
              />
              <PickerCustom
                placeholder='Memiliki Anak'
                data={this.state.enumChildren}
                selectedValue={this.state.children}
                color={Colors.black}
                label={'Memiliki Anak'}
                label0={'Pilih Jumlah Anak'}
                value={this.state.children}
                onValueChange={val => this.setState({ children: val })}
              />
              <TextInputCustom
                placeholder='Alamat'
                color={Colors.black}
                label={'Alamat'}
                textAlign='left'
                value={this.state.address}
                onChangeText={val => this.setState({ address: val })}
                autoCapitalize='words'
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
                  onValueChange={val => this.setState({ district: val })}
                />}
              <TextInputCustom
                placeholder='Kode Pos'
                color={Colors.black}
                label={'Kode Pos'}
                textAlign='left'
                value={this.state.zipCode}
                onChangeText={val => this.setState({ zipCode: val })}
                autoCapitalize='words'
              />
              <View style={styles.wrapperSeparator} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => { this.updateProfile() }}>
            <Text style={styles.chooseAddressText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    editprofile: state.editprofile,
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
    editProfileProcess: data => {
      dispatch(EditProfileActions.editProfileRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileScreen)
