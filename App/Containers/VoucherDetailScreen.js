import React from 'react'

import { connect } from 'react-redux'
import { View, SafeAreaView, Text, TouchableOpacity, Image, ScrollView, Alert, AsyncStorage } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import { isIphoneXorAbove } from '../Lib/utils'

import styles from './Styles/VoucherScreenStyles'

import HTML from 'react-native-render-html'
import FastImage from 'react-native-fast-image'

import GetOneVoucherActions from '../Redux/GetOneVoucherRedux'
import CheckCouponActions from '../Redux/CheckCouponRedux'
import ClaimVoucherActions from '../Redux/ClaimVoucherRedux'

import { DotIndicator } from 'react-native-indicators'

class VoucherDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      voucherDetail: {},
      onPayment: false
    }
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('on_payment_process', (error, result) => {
      if (result === 'ready') {
        this.setState({ onPayment: true })
      }
    })

    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        app_event_id: this.props.navigation.state.params.voucherId
      }
    }
    this.props.getOneVoucherProcess(data)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.getOneVoucher !== newProps.getOneVoucher) {
      if (
        newProps.getOneVoucher.payload !== null &&
        newProps.getOneVoucher.error === null &&
        !newProps.getOneVoucher.fetching
      ) {
        this.setState({
          voucherDetail: newProps.getOneVoucher.payload,
        })
      }
    }

    if (this.props.checkCoupon !== newProps.checkCoupon) {
      if (
        newProps.checkCoupon.payload !== null &&
        newProps.checkCoupon.error === null &&
        !newProps.checkCoupon.fetching
      ) {
        console.log('aww')
        this.onSuccessCheckCoupon(newProps.checkCoupon)
      }
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  goBack() {
    const { goBack } = this.props.navigation
    AsyncStorage.setItem('on_payment_process', 'not_ready')
    goBack()
  }


  onSuccessCheckCoupon(newProps) {
    if (newProps.payload.success === 1) {
      Alert.alert(
        '',
        'Apakah anda yakin ingin menggunakan voucher?',
        [
          {
            text: 'No',
            onPress: () => { this.props.emptyVoucherProcess() }
          },
          {
            text: 'Yes',
            onPress: () => {
              let data = {
                voucher_code: this.state.voucherDetail.voucher_code
              }
              AsyncStorage.setItem('on_payment_process', 'not_ready')
              this.props.claimVoucherProcess(data)
              this.actNavigate('DeliveryScreen')
            }
          }
        ],
        { cancelable: false }
      )
    }

    else if (newProps.payload.success === 0) {
      switch (newProps.payload.message) {
        case 'coupon_does_not_exist':
          Alert.alert('', 'Voucher tidak valid')
          break;
        case 'web_only':
          Alert.alert('', 'Voucher hanya berlaku di website www.mooimom.id')
          break;
        case 'can_only_be_used_for_first_order':
          Alert.alert('', 'Hanya bisa dipakai untuk order pertama')
          break;
        case 'user_limit_per_user_failed':
          let limitUse = `Voucher hanya bisa dipakai ${newProps.payload.usage_limit_per_user} kali`
          Alert.alert('', limitUse)
          break;
        case 'coupon_expired':
          Alert.alert('', 'Voucher sudah expired')
          break;
        case 'minimum_amount_failed':
          let minUse = `Voucher hanya bisa dipakai minimal pembelian Rp ${newProps.payload.minimum_amount}`
          Alert.alert('', minUse)
          break;
        case 'maximum_amount_failed':
          let maxUse = `Voucher hanya bisa dipakai maximum pembelian Rp ${newProps.payload.maximum_amount}`
          Alert.alert('', maxUse)
          break;
        default:
          Alert.alert('', 'Mohon coba lagi')
          break;
      }
    }
  }

  onPressUseVoucher = async () => {
    let dataCart = '['
    this.props.cartt.data.map(cart => {
      dataCart = dataCart + '{"sku":"' + cart.sku + '","quantity":' + cart.quantity + '},'
    })
    if (dataCart.length > 1)
      dataCart = dataCart.substring(0, dataCart.length - 1)
    dataCart = dataCart + ']'

    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        product_variations_user_want_to_buy: dataCart,
        coupon_code: this.state.voucherDetail.voucher_code
      }
    }
    console.log(data)
    this.props.checkCouponProcess(data)

  }

  renderBack() {
    return (
      <TouchableOpacity onPress={() => this.goBack()} style={{
        position: 'absolute', zIndex: 1,
        marginTop: isIphoneXorAbove() ? 40 : 20, marginLeft: 10,
        width: 30, height: 30, borderRadius: 20,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: Colors.white, shadowColor: '#CCCCCC', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <Image source={Images.back} style={styles.imgHeader2} />
      </TouchableOpacity>
    )
  }

  render() {
    image = { uri: this.state.voucherDetail.the_app_event_image }

    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {this.renderBack()}
            <FastImage source={image} style={{ width: '100%', height: 200 }} />
          </View>
          <SafeAreaView />
          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>
            {
              this.props.getOneVoucher.fetching ?
                <DotIndicator color={Colors.mediumGray} size={12} />
                :
                <HTML html={this.state.voucherDetail.event_custom_html} />
            }
            {this.state.onPayment &&
              <TouchableOpacity onPress={() => this.onPressUseVoucher()} style={{ width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom, borderRadius: 5, alignSelf: 'center', marginVertical: 10 }}>
                {
                  this.props.checkCoupon.fetching ?
                    <DotIndicator color={Colors.white} size={8} />
                    :
                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize2, fontWeight: 'bold' }}>Gunakan Voucher</Text>
                }
              </TouchableOpacity>
            }
          </View>
        </ScrollView>
        <SafeAreaView />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    getOneVoucher: state.getOneVoucher,
    checkCoupon: state.checkCoupon,
    cartt: state.cartt
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getOneVoucherProcess: data => {
      dispatch(GetOneVoucherActions.getOneVoucherRequest(data))
    },
    checkCouponProcess: data => {
      dispatch(CheckCouponActions.checkCouponRequest(data))
    },
    claimVoucherProcess: data => {
      dispatch(ClaimVoucherActions.claimVoucherRequest(data))
    },
    emptyVoucherProcess: () => {
      dispatch(ClaimVoucherActions.emptyVoucherRequest())
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoucherDetailScreen)
