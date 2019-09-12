import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
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
    var viewInput = <View style={[styles.deliveryAddressContainer, {height: 60}]}/>
    if(this.state.selectedAccount.name){
      viewInput = <View style={styles.deliveryAddressContainer}>
        <Text style={styles.addressName}>{this.state.selectedAccount.name}</Text>
        <Text style={styles.address}>{this.state.selectedAccount.bank}</Text>
        <Text style={styles.address}>{this.state.selectedAccount.account}</Text>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            enabled
          >
          <View style={styles.wrapperSeparator}/>
          <View style={styles.saldoContainer}>
            <Text style={styles.textSaldo}>SALDO</Text>
            <Text style={styles.textSaldoAmount}>{convertToRupiah(this.state.balance)}</Text>
          </View>
          <View style={styles.wrapperSeparator}/>
          <Text style={styles.productSubtitle}>Minta Pembayaran</Text>
          <TextInputCustom
            placeholder='Minimal Rp50.000'
            color={Colors.black}
            label={'Jumlah'}
            textAlign='left'
            keyboardType='numeric'
            value={this.state.amount}
            onChangeText={val => this.setState({ amount: val })}
          />
          {this.renderSelectedAccount()}
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('PaymentScreen')}}>
            <Text style={styles.chooseAddressText}>Minta Pembayaran</Text>
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
)(NewPaymentRequestScreen)
