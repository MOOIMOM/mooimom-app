import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, FlatList } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah } from '../Lib/utils'
import ModalDropDown from '../Components/ModalDropDown'
// Styles
import styles from './Styles/AccountListScreenStyles'
var dataAccounts = [
  {id:1, name:'James', bank:'Bank Central Asia', account:'12345667'},
]

class AccountListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accounts: dataAccounts
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  actSelect(index){
    if(this.props.navigation.state.params.selectAccount){
      this.props.navigation.state.params.selectAccount(this.state.accounts[index])
      this.props.navigation.goBack()
    }
  }

  deleteAddress(index){
    Alert.alert(
      '',
      'Hapus Rekening Ini?',
      [
        {
          text: 'No'
        },
        {
          text: 'Yes', onPress: () => {
            var accounts =  Object.assign([], this.state.accounts);
            accounts.splice(index, 1)
            this.setState({
              accounts: accounts
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  _renderAccount({item, index}){
    var style = styles.deliveryAddressContainer
    var color = Colors.black
    var imgEdit = Images.edit
    var imgDelete = Images.delete
    return(
      <TouchableWithoutFeedback onPress={() => this.actSelect(index)}>
        <View style={style}>
          <View style={styles.btnContainer}>
            <Text style={[styles.addressName, {color: color}]}>{item.name}</Text>
            <View style={styles.btnContainer2}>
              <TouchableOpacity onPress={() => this.actNavigate('UpdateAccountScreen')}><Image source={imgEdit} style={styles.btnEditAddress}/></TouchableOpacity>
              <TouchableOpacity onPress={() => this.deleteAddress(index)}><Image source={imgDelete} style={styles.btnEditAddress}/></TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.address, {color: color}]}>{item.bank}</Text>
          <Text style={[styles.address, {color: color}]}>{item.account}</Text>
        </View>
      </TouchableWithoutFeedback>
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
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <Text style={styles.productSubtitle}>Rekening Bank Anda</Text>
          <View style={styles.wrapperSeparator}/>
            <FlatList
              data={this.state.accounts}
              renderItem={this._renderAccount.bind(this)}
              keyExtractor={(item, index) => item.id.toString()}
              extraData={this.state}
            />
          <View style={styles.wrapperSeparator}/>
          <TouchableOpacity style={styles.chooseAddressBtn} onPress={() => {this.actNavigate('NewAccountScreen')}}>
            <Text style={styles.chooseAddressText}>+ Tambah Nomor Rekening Bank</Text>
          </TouchableOpacity>
          </ScrollView>
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
)(AccountListScreen)
