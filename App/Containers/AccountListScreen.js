import React, { Component } from 'react'
import { ScrollView, SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import BankAccountActions from '../Redux/BankAccountRedux'
import EditBankAccountActions from '../Redux/EditBankAccountRedux'
import { convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/AccountListScreenStyles'
var dataAccounts = [
  { id: 1, name: 'James', bank: 'Bank Central Asia', account: '12345667' },
]

class AccountListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    this.reloadData()
  }

  componentWillReceiveProps(newProps) {
    if (this.props.bankAccount !== newProps.bankAccount) {
      if (
        newProps.bankAccount.payload !== null &&
        newProps.bankAccount.error === null &&
        !newProps.bankAccount.fetching
      ) {
        this.setState({
          accounts: newProps.bankAccount.payload.banks,
        })
      }
    }

    if (this.props.editBankAccount !== newProps.editBankAccount) {
      if (
        newProps.editBankAccount.payload !== null &&
        newProps.editBankAccount.error === null &&
        !newProps.editBankAccount.fetching
      ) {
        this.reloadData()
      }
    }
  }

  reloadData() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getBankAccountsProcess(data)
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  actSelect(item) {
    if (this.props.navigation.state.params.selectAccount) {
      this.props.navigation.state.params.selectAccount(item)
      this.props.navigation.goBack()
    }
  }

  deleteAddress(id) {
    Alert.alert(
      '',
      'Hapus Rekening Ini?',
      [
        {
          text: 'No'
        },
        {
          text: 'Yes', onPress: () => {
            let data = {
              data_request: {
                user_id: this.props.auth.payload.user_id,
                unique_token: this.props.auth.payload.unique_token,
                bank_data_id: id
              }
            }
            this.props.deleteBankAccountsProcess(data)
          }
        }
      ],
      { cancelable: false }
    )
  }

  _renderAccount() {
    if (this.state.accounts.length > 0)
      return this.state.accounts.map((item, index) => {
        var style = styles.deliveryAddressContainer
        var color = Colors.black
        var imgEdit = Images.edit
        var imgDelete = Images.delete
        return (
          <TouchableWithoutFeedback onPress={() => this.actSelect(item)} key={index.toString()}>
            <View style={style}>
              <View style={styles.btnContainer}>
                <Text style={[styles.addressName, { color: color }]}>{item.bank_account_name}</Text>
                <View style={styles.btnContainer2}>
                  <TouchableOpacity onPress={() => this.actNavigate('UpdateAccountScreen', { bank: item })}><Image source={imgEdit} style={styles.btnEditAddress} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => this.deleteAddress(item.bank_data_id)}><Image source={imgDelete} style={styles.btnEditAddress} /></TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.address, { color: color }]}>{item.the_bank_name}</Text>
              <Text style={[styles.address, { color: color }]}>{item.bank_account_number}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })
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
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.productSubtitle}>Rekening Bank Anda</Text>
            <View style={styles.wrapperSeparator} />
            {this._renderAccount()}
            <View style={styles.wrapperSeparator} />
            <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => { this.actNavigate('NewAccountScreen') }}>
              <Text style={styles.chooseAddressText}>+ Tambah Nomor Rekening Bank</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    bankAccount: state.bankAccount,
    editBankAccount: state.editBankAccount,
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getBankAccountsProcess: data => {
      dispatch(BankAccountActions.getBankAccountRequest(data))
    },
    deleteBankAccountsProcess: data => {
      dispatch(EditBankAccountActions.deleteBankAccountRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountListScreen)
