import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
import BalanceActions from '../Redux/BalanceRedux'
import AddWithdrawActions from '../Redux/AddWithdrawRedux'
import PickerCustom from '../Components/PickerCustom'
// Styles
import styles from './Styles/NewPaymentRequestScreenStyles'

class NewPaymentRequestScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount:'',
      balance:0,
      selectedAccount:{}
    }

    this.selectAccount = this.selectAccount.bind(this)
  }

  componentDidMount(){
    let data ={
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getBalanceProcess(data)
  }

  componentWillReceiveProps(newProps){
    if(this.props.balance !== newProps.balance){
      if (
        newProps.balance.payload !== null &&
        newProps.balance.error === null &&
        !newProps.balance.fetching
      ) {
        this.setState({
          balance: newProps.balance.payload.total_saldo_left
        })
      }
    }
  }

  actNavigate (screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  selectAccount(obj){
    this.setState({
      selectedAccount: obj
    })
  }

  renderSelectedAccount(){
    var viewInput = <View style={[styles.deliveryAddressContainer, {height: 50}]}/>
    if(this.state.selectedAccount.bank_account_name){
      viewInput = <View style={styles.deliveryAddressContainer}>
        <Text style={styles.addressName}>{this.state.selectedAccount.bank_account_name}</Text>
        <Text style={styles.address}>{this.state.selectedAccount.the_bank_name}</Text>
        <Text style={styles.address}>{this.state.selectedAccount.bank_account_number}</Text>
      </View>
    }
    return (
      <TouchableOpacity  onPress={() => this.actNavigate('AccountListScreen', {selectAccount:this.selectAccount})}>
        <View style={styles.inputCustom}>
          {viewInput}
          <View style={styles.inputLabelWrapper}>
            <Text
              style={
                [
                  styles.inputLabel,
                  { color: 'white', backgroundColor: Colors.mooimom }
                ]
              }
            >
              Rekening Tujuan
            </Text>
          </View>
        </View>
        <Image source={Images.down} style={{position:'absolute', width:12, height:12, resizeMode: 'contain', top:'50%', right:20}}/>
      </TouchableOpacity>
    )
  }

  requestNow(){
    const {amount, balance, selectedAccount} = this.state
    if(amount === '' || amount < 50000){
      Alert.alert(
          '',
          'Jumlah Penarikan minimal Rp 50.000',
      )
      return
    }
    if(amount > balance){
      Alert.alert(
          '',
          'Saldo Anda kurang dari Jumlah penarikan',
      )
      return
    }
    if(!selectedAccount.bank_data_id){
      Alert.alert(
          '',
          'Silakan masukkan rekening tujuan',
      )
      return
    }
    let data ={
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        the_app_customer_bank_account_id: selectedAccount.bank_data_id,
        the_amount: amount
      }
    }
    this.props.addWithdrawProcess(data)
    this.actNavigate('PaymentScreen')
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

          <View style={styles.wrapperSeparator}/>
          <View style={styles.saldoContainer}>
            <Text style={styles.textSaldo}>SALDO</Text>
            <Text style={styles.textSaldoAmount}>{convertToRupiah(this.state.balance)}</Text>
          </View>
          <View style={styles.wrapperSeparator}/>
          <TextInputCustom
            placeholder='Minimal Rp50.000'
            color={Colors.black}
            label={'Jumlah Penarikan'}
            textAlign='left'
            keyboardType='numeric'
            value={this.state.amount}
            onChangeText={val => this.setState({ amount: val })}
          />
          {this.renderSelectedAccount()}

        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => this.requestNow()}>
            <Text style={styles.chooseAddressText}>Tarik Saldo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    auth: state.auth,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getBalanceProcess: data => {
      dispatch(BalanceActions.getBalanceRequest(data))
    },
    addWithdrawProcess: data => {
      dispatch(AddWithdrawActions.addWithdrawRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPaymentRequestScreen)
