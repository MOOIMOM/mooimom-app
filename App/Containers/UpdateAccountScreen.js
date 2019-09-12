import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import TextInputCustom from '../Components/TextInputCustom'
import PickerCustom from '../Components/PickerCustom'
// Styles
import styles from './Styles/UpdateAccountScreenStyles'

class UpdateAccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bank: '',
      name: '',
      account:'',
      enumBank:[
        {label:'Bank Central Asia', value:0},
        {label:'Bank Mandiri', value:1},
        {label:'Bank Permata', value:2},
        {label:'Bank Rakyat Indonesia', value:3},
        {label:'Bank Nasional Indonesia', value:4},
      ]
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
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
          <Text style={styles.productSubtitle}>Edit Nomor Rekening Bank</Text>
          <View style={styles.wrapperSeparator}/>
          <PickerCustom
            placeholder='Pilih Bank'
            data={this.state.enumBank}
            selectedValue={this.state.bank}
            color={Colors.black}
            label={'Pilih Bank'}
            value={this.state.bank}
            onValueChange={val => this.setState({ bank: val })}
          />
          <TextInputCustom
            placeholder='Nama Pemilik Rekening'
            color={Colors.black}
            label={'Nama Pemilik Rekening'}
            textAlign='left'
            value={this.state.name}
            onChangeText={val => this.setState({ name: val })}
            autoCapitalize= 'words'
          />
          <TextInputCustom
            placeholder='Nomor Rekening'
            color={Colors.black}
            label={'Nomor Rekening'}
            textAlign='left'
            keyboardType='numeric'
            value={this.state.account}
            onChangeText={val => this.setState({ account: val })}
          />
          <View style={styles.wrapperSeparator}/>
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('AccountListScreen')}}>
            <Text style={styles.chooseAddressText}>Simpan Nomor Rekening</Text>
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
)(UpdateAccountScreen)
