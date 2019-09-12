import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'
import { NavigationActions, StackActions } from 'react-navigation'

// Styles
import styles from './Styles/PaymentScreenStyles'

var dataPayment= [
  {date:'2019-09-13', amount:2000000, name:'James', bank:'Bank Central Asia', account:'12345678', status:'Sedang Diproses'},
  {date:'2019-08-03', amount:150000, name:'James', bank:'Bank Rakyat Indonesia', account:'77722-123', status:'Selesai'},
]
class PaymentScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      balance:0,
      payments:dataPayment
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  renderPayment({index, item}){
    return(
      <View style={styles.menu}>
        <View style={styles.menuTop}>
          <Text style={styles.imgText}>{item.date}</Text>
          <Text style={styles.imgText}>{item.status}</Text>
        </View>
        <Text style={styles.textAmount}>{convertToRupiah(item.amount)}</Text>
        <Text style={styles.imgTextBold}>{item.name}</Text>
        <Text style={styles.imgText}>{item.account}</Text>
        <Text style={styles.imgText}>{item.bank}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.props.navigation.goBack()}>
              <Image source={Images.back} style={styles.imgHeader} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.saldoContainer}>
              <Text style={styles.textSaldo}>SALDO</Text>
              <Text style={styles.textSaldoAmount}>{convertToRupiah(this.state.balance)}</Text>
            </View>
            <TouchableOpacity style={styles.btnEditProfile} onPress={() => this.actNavigate('NewPaymentRequestScreen', {})}>
              <Text style={styles.textEditProfile}>Minta Pembayaran</Text>
            </TouchableOpacity>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.containerMenu}>
              {this.state.payments.length > 0 && <Text style={styles.subtitle}>Riwayat Pembayaran Saya</Text>}
              <View style={styles.wrapperSeparator}/>
              <FlatList
                data={this.state.payments}
                renderItem={this.renderPayment.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
              />
            </View>
            </ScrollView>
          </View>
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
)(PaymentScreen)
