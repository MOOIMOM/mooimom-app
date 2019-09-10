import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
import DatePickerCustom from '../Components/DatePickerCustom'
import PickerCustom from '../Components/PickerCustom'
// Styles
import styles from './Styles/EditProfileScreenStyles'

class EditProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      address: '',
      province: '',
      city: '',
      district: '',
      zipCode: '',
      phone: '',
      email: '',
      birthday:'',
      gender:'',
      status:'',
      children:'',
      enumGender:[
        {label:'Pria', value:'male'},
        {label:'Wanita', value:'female'},
      ],
      enumStatus:[
        {label:'Single', value:'single'},
        {label:'Menikah', value:'married'},
        {label:'Bercerai', value:'divorced'},
      ],
      enumChildren:[
        {label:'0', value:0},
        {label:'1', value:1},
        {label:'2', value:2},
        {label:'3', value:3},
        {label:'4', value:4},
        {label:'>4', value:5},
      ]
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  updateProfile(){
    this.props.navigation.goBack()
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
          <Text style={styles.productSubtitle}>Edit Profile</Text>
          <View style={styles.wrapperSeparator}/>
          <TextInputCustom
            placeholder='Nama Depan'
            color={Colors.black}
            label={'Nama Depan'}
            textAlign='left'
            value={this.state.firstname}
            onChangeText={val => this.setState({ firstname: val })}
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Nama Belakang'
            color={Colors.black}
            label={'Nama Belakang'}
            textAlign='left'
            value={this.state.lastname}
            onChangeText={val => this.setState({ lastname: val })}
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Nomor Handphone'
            color={Colors.black}
            label={'Nomor Handphone'}
            textAlign='left'
            value={this.state.phone}
            onChangeText={val => this.setState({ phone: val })}
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Email'
            color={Colors.black}
            label={'Email'}
            textAlign='left'
            value={this.state.email}
            onChangeText={val => this.setState({ email: val })}
          />
          <DatePickerCustom
            label={'Tanggal Lahir'}
            date={this.state.birthday}
            placeholder={'Masukkan Tanggal Lahir'}
            onDateChange={(date) => {this.setState({birthday: date})}}
            color={Colors.black}
          />
          <PickerCustom
            placeholder='Gender'
            data={this.state.enumGender}
            selectedValue={this.state.gender}
            color={Colors.black}
            label={'Gender'}
            value={this.state.gender}
            onValueChange={val => this.setState({ gender: val })}
          />
          <PickerCustom
            placeholder='Status'
            data={this.state.enumStatus}
            selectedValue={this.state.status}
            color={Colors.black}
            label={'Status'}
            value={this.state.status}
            onValueChange={val => this.setState({ status: val })}
          />
          <PickerCustom
            placeholder='Memiliki Anak'
            data={this.state.enumChildren}
            selectedValue={this.state.children}
            color={Colors.black}
            label={'Memiliki Anak'}
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
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Pilih Propinsi'
            color={Colors.black}
            label={'Propinsi'}
            textAlign='left'
            value={this.state.province}
            onChangeText={val => this.setState({ province: val })}
          />
          <TextInputCustom
            placeholder='Pilih Kota'
            color={Colors.black}
            label={'Kota'}
            textAlign='left'
            value={this.state.city}
            onChangeText={val => this.setState({ city: val })}
          />
          <TextInputCustom
            placeholder='Pilih Kecamatan'
            color={Colors.black}
            label={'Kecamatan'}
            textAlign='left'
            value={this.state.district}
            onChangeText={val => this.setState({ district: val })}
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Kode Pos'
            color={Colors.black}
            label={'Kode Pos'}
            textAlign='left'
            value={this.state.zipCode}
            onChangeText={val => this.setState({ zipCode: val })}
            autoCapitalize= 'words'
          />
          <View style={styles.wrapperSeparator}/>
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.updateProfile()}}>
            <Text style={styles.chooseAddressText}>Simpan</Text>
          </TouchableOpacity>
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
)(EditProfileScreen)
