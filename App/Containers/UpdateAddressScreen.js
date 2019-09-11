import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
import CheckBox from '../Components/CheckBox'
// Styles
import styles from './Styles/UpdateAddressScreenStyles'

class UpdateAddressScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      street: '',
      province: '',
      city: '',
      district: '',
      village: '',
      zipCode: '',
      phone: '',
      isSetPrimary:false
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
            placeholder='Pilih Kelurahan / Desa'
            color={Colors.black}
            label={'Kelurahan / Desa'}
            textAlign='left'
            value={this.state.village}
            onChangeText={val => this.setState({ village: val })}
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
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('AddressListScreen')}}>
            <Text style={styles.chooseAddressText}>Simpan Alamat</Text>
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
)(UpdateAddressScreen)
