import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import { convertToRupiah } from '../Lib/utils'
import TextInputCustom from '../Components/TextInputCustom'
import BalanceActions from '../Redux/BalanceRedux'
import AddWithdrawActions from '../Redux/AddWithdrawRedux'

import PickerCustom from '../Components/PickerCustom'
// Styles
import styles from './Styles/NewPaymentRequestScreenStyles'

import FastImage from 'react-native-fast-image'


class NewPaymentRequestScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      balance: 0,
      selectedAccount: {}
    }

    this.selectAccount = this.selectAccount.bind(this)
  }

  componentDidMount() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getBalanceProcess(data)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.balance !== newProps.balance) {
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

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  selectAccount(obj) {
    this.setState({
      selectedAccount: obj
    })
  }

  renderSelectedAccount() {
    var viewInput = <View style={[styles.deliveryAddressContainer, { height: 50 }]} />
    if (this.state.selectedAccount.bank_account_name) {
      viewInput = <View style={styles.deliveryAddressContainer}>
        <Text style={styles.addressName}>{this.state.selectedAccount.bank_account_name}</Text>
        <Text style={styles.address}>{this.state.selectedAccount.the_bank_name}</Text>
        <Text style={styles.address}>{this.state.selectedAccount.bank_account_number}</Text>
      </View>
    }
    return (
      <TouchableOpacity onPress={() => this.actNavigate('AccountListScreen', { selectAccount: this.selectAccount })}>
        <View style={styles.inputCustom}>
          {viewInput}
          <View style={styles.inputLabelWrapper}>
            <Text
              style={
                [
                  styles.inputLabel,
                  { color: 'white' }
                ]
              }
            >
              Rekening Tujuan
            </Text>
          </View>
        </View>
        <Image source={Images.down} style={{ position: 'absolute', width: 12, height: 12, resizeMode: 'contain', top: '50%', right: 20 }} />
      </TouchableOpacity>
    )
  }

  requestNow() {
    const { amount, balance, selectedAccount } = this.state
    if (amount === '' || amount < 100000) {
      Alert.alert(
        '',
        'Jumlah Penarikan minimal Rp 100.000',
      )
      return
    }
    if (amount > balance) {
      Alert.alert(
        '',
        'Saldo Anda kurang dari Jumlah penarikan',
      )
      return
    }
    if (!selectedAccount.bank_data_id) {
      Alert.alert(
        '',
        'Silakan masukkan rekening tujuan',
      )
      return
    }
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        the_app_customer_bank_account_id: selectedAccount.bank_data_id,
        the_amount: amount
      }
    }
    this.props.addWithdrawProcess(data)
    this.actNavigate('PaymentScreen')
  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.buttonHeader} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.btnHeader} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.back} style={styles.imgHeader} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
            <Image source={Images.search} style={styles.imageSearch} />
            <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
            <Image source={Images.shoppingCartBlack} style={styles.imgHeader} />
            {this.props.cart.data.length > 0 && <View style={styles.notifContainer}>
              <Text style={styles.textNotif}>{this.props.cart.data.length}</Text>
            </View>}
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            enabled
          >
            <View style={styles.cartContainer}>

              <View style={styles.wrapperSeparator} />

              <View style={styles.cardBallanceContainer} >
                <View style={styles.containerBallanceTittle}>
                  <Text style={styles.textBallanceCardTitle}>Saldo Anda Saat Ini</Text>
                </View>
                <View style={styles.wrapperBallanceArea}>
                  <View>
                    <View style={styles.wrapperBallanceHeader}>
                      <FastImage source={Images.mooimomCash} style={styles.imgMooimomCash} resizeMode={FastImage.resizeMode.contain} />
                      <View>
                        <Text style={styles.textMooimomBallance}>Mooimom</Text>
                        <Text style={styles.textMooimomBallance}>Cash</Text>
                      </View>
                    </View>
                    <View style={styles.ballanceSizedVerticalMargin} />
                    <View style={{ width: Metrics.screenWidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, paddingBottom: 10, borderColor: Colors.mediumGray }}>
                      <Text style={styles.textBallanceNumber}>Total</Text>
                      <View style={styles.rowAlign}>
                        <Text style={styles.textBallanceNumber}>{convertToRupiah(this.state.balance)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.wrapperSeparator} />
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
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    auth: state.auth,
    cart: state.cart

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
