import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import { convertToRupiah, getDateFromString, convertToThousandOrHigher } from '../Lib/utils'
import BalanceActions from '../Redux/BalanceRedux'
import GetMooimomPointsActions from '../Redux/GetMooimomPointsRedux'
import WithdrawActions from '../Redux/WithdrawRedux'
import { NavigationActions, StackActions } from 'react-navigation'

import FastImage from 'react-native-fast-image'


// Styles
import styles from './Styles/PaymentScreenStyles'
class PaymentScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: 0,
      points: 0,
      payments: []
    }
  }

  componentDidMount() {
    this.reloadData()
  }

  reloadData() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getBalanceProcess(data)
    this.props.getMooimomPointsProcess(data)
    this.props.getWithdrawProcess(data)
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

    if (this.props.withdraw !== newProps.withdraw) {
      if (
        newProps.withdraw.payload !== null &&
        newProps.withdraw.error === null &&
        !newProps.withdraw.fetching
      ) {
        this.setState({
          payments: newProps.withdraw.payload.all_withdraw_data
        })
      }
    }

    if (this.props.addWithdraw !== newProps.addWithdraw) {
      if (
        newProps.addWithdraw.payload !== null &&
        newProps.addWithdraw.error === null &&
        !newProps.addWithdraw.fetching
      ) {
        this.reloadData()
      }
    }

    if (this.props.mooimomPoints !== newProps.mooimomPoints) {
      if (
        newProps.mooimomPoints.payload !== null &&
        newProps.mooimomPoints.error === null &&
        !newProps.mooimomPoints.fetching
      ) {
        this.setState({
          points: newProps.mooimomPoints.payload.how_many_points
        })
      }
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  renderPayment() {
    if (this.state.payments.length > 0)
      return (
        this.state.payments.map((item, index) => {
          var status = ''
          var style
          switch (item.status) {
            case 'rejected':
              status = 'Ditolak'
              style = { color: Colors.fire }
              break;
            case 'accepted':
              status = 'Selesai'
              style = { color: Colors.mooimom }
              break;
            default:
              status = 'Sedang Diproses'
              break;
          }
          return (
            <View style={styles.menu} key={index.toString()}>
              <View style={styles.menuItem}>
                <Text style={styles.imgText}>Tgl</Text>
                <Text style={styles.imgTextBold}>{getDateFromString(item.created_at, true, false, true, false)}</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.imgText}>Nama</Text>
                <Text style={styles.imgTextBold}>{item.bank_account_name}</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.imgText}>Bank Tujuan</Text>
                <Text style={styles.imgTextBold}>{item.the_bank}</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.imgText}>Rek Tujuan</Text>
                <Text style={styles.imgTextBold}>{item.bank_account_number}</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.imgText}>Jumlah</Text>
                <Text style={styles.imgTextBold}>{convertToRupiah(item.the_amount)}</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.imgText}>Status</Text>
                <Text style={[styles.imgTextBold, style]}>{status}</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.imgText}>Last Update</Text>
                <Text style={styles.imgTextBold}>{getDateFromString(item.last_updated, true, false, true, false)}</Text>
              </View>
            </View>
          )
        })
      )
  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerScroll}>
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
          <View style={styles.wrapperSeparator} />
          <View style={styles.contentContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >

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

              <TouchableOpacity style={styles.btnEditProfile} onPress={() => this.actNavigate('NewPaymentRequestScreen', {})}>
                <Text style={styles.textEditProfile}>Tarik Saldo</Text>
              </TouchableOpacity>
              <View style={styles.wrapperSeparator} />
              <View style={styles.containerMenu}>
                {this.state.payments.length > 0 && <Text style={styles.subtitle}>Riwayat</Text>}
                <View style={styles.wrapperSeparator} />
                {this.renderPayment()}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    auth: state.auth,
    withdraw: state.withdraw,
    addWithdraw: state.addWithdraw,
    cart: state.cart,
    mooimomPoints: state.mooimomPoints
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getBalanceProcess: data => {
      dispatch(BalanceActions.getBalanceRequest(data))
    },
    getWithdrawProcess: data => {
      dispatch(WithdrawActions.getWithdrawRequest(data))
    },
    getMooimomPointsProcess: data => {
      dispatch(GetMooimomPointsActions.getMooimomPointsRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentScreen)
