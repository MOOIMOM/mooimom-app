import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import TextInputCustom from '../Components/TextInputCustom'
import EditBankAccountActions from '../Redux/EditBankAccountRedux'
import PickerCustom from '../Components/PickerCustom'
// Styles
import styles from './Styles/UpdateAccountScreenStyles'

class UpdateAccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bank: this.props.navigation.state.params.bank.the_bank_slug,
      name: this.props.navigation.state.params.bank.bank_account_name,
      account: this.props.navigation.state.params.bank.bank_account_number,
      enumBank: this.props.setting.payload.bank_choices
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  saveBank(){
    const {bank, name, account} = this.state
    if(bank === '' || name === ''|| account === ''){
      Alert.alert('Sorry', 'Please fill in all of the form', [{ text: 'OK'}])
      return;
    }
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        bank_slug: bank,
        bank_account_name : name,
        bank_account_number : account,
        bank_data_id: this.props.navigation.state.params.bank.bank_data_id
      }
    }
    this.props.updateBankAccountProcess(data)
    this.actNavigate('AccountListScreen')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            enabled
          >
          <View style={styles.cartContainer}>
            <Text style={styles.productSubtitle}>Edit Nomor Rekening Bank</Text>
            <View style={styles.wrapperSeparator}/>
            <PickerCustom
              placeholder='Pilih Bank'
              data={this.state.enumBank}
              selectedValue={this.state.bank}
              color={Colors.black}
              label={'Pilih Bank'}
              isBank={true}
              value={this.state.bank}
              label0={'Pilih Bank'}
              onValueChange={val => this.setState({ bank: val })}
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
            <TextInputCustom
              placeholder='Nama Pemilik Rekening'
              color={Colors.black}
              label={'Nama Pemilik Rekening'}
              textAlign='left'
              value={this.state.name}
              onChangeText={val => this.setState({ name: val })}
              autoCapitalize= 'words'
            />
            <View style={styles.wrapperSeparator}/>
            </View>
          </KeyboardAvoidingView>
          </ScrollView>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.saveBank()}}>
            <Text style={styles.chooseAddressText}>Simpan Nomor Rekening</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    setting: state.setting,
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateBankAccountProcess: data => {
      dispatch(EditBankAccountActions.editBankAccountRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAccountScreen)
