import React from 'react'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, ScrollView, Alert, AsyncStorage, Platform, Modal } from 'react-native'
import { connect } from 'react-redux'

import { Images, Metrics, Colors, Fonts } from '../Themes'
import { DotIndicator } from 'react-native-indicators'

import styles from './Styles/EventRegistrationScreenStyles'

import RNPickerSelect from 'react-native-picker-select'
import EventFormHandlerActions from '../Redux/EventFormHandlerRedux'
import GetAllEventFormActions from '../Redux/GetAllEventFormRedux'
import MidtransModule from '../Lib/Midtrans'

import axios from 'axios'
import qs from 'qs'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { convertToRupiah, getDateFromString, convertToThousandOrHigher } from '../Lib/utils'

import RNAiqua from 'react-native-aiqua-sdk'

class EventRegistrationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      session: [
        { 'label': 'I. Pukul 11.00 - 12.00 (Obgyn)', 'value': 'i_11_to_12_am' },
        { 'label': 'II. Pukul 13.00 - 14.00 (Obgyn)', 'value': 'ii_13_to_14_pm' },
        { 'label': 'III. Pukul 15.00 - 16.00 (Pediatrician)', 'value': 'iii_15_to_16_pm' },
        { 'label': 'IV. Pukul 17.00 - 18.00 (Pediatrician)', 'value': 'iv_17_to_18_pm' }
      ],
      toRegistration: false,
      overview: true,
      registrationStatus: false,
      isShowPaymentMethod: false,
      midtransFetching: true,
      eventFormData: [],
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerCondition: "",
      selectedSessionIdx: "",
      selectedSession: "",
      midtransToken: "",
      midtransData: {},
      formId: ""
    }
  }

  componentDidMount() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }

    this.props.getAllEventFormProcess(data)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.eventFormHandler !== newProps.eventFormHandler) {
      if (
        newProps.eventFormHandler.payload !== null &&
        newProps.eventFormHandler.error === null &&
        !newProps.eventFormHandler.fetching
      ) {
        this.validateRegist(newProps.eventFormHandler)
      }
    }

    if (this.props.getAllEventForm !== newProps.getAllEventForm) {
      if (
        newProps.getAllEventForm.payload !== null &&
        newProps.getAllEventForm.error === null &&
        !newProps.getAllEventForm.fetching
      ) {
        let eventFormData = newProps.getAllEventForm.payload.all_event_forms_data
        if (eventFormData.length > 0) {
          let formId = newProps.getAllEventForm.payload.all_event_forms_data[0].event_id

          let data = {
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            app_event_form_id: formId
          }
          let url = 'https://www.mooimom.id/app-get-order-status-from-midtrans'
          const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
          }
          axios(options)
            .then((response) => {
              console.log(response)
              this.setState({ midtransData: response.data, midtransFetching: false })
            })
            .catch(function (error) {
              console.log(error)
              Alert.alert('', 'Terjadi kesalahan')
            })

          this.setState({
            registrationStatus: true,
            overview: false,
            toRegistration: false,
            eventFormData: newProps.getAllEventForm.payload.all_event_forms_data,
            midtransToken: newProps.getAllEventForm.payload.all_event_forms_data[0].midtrans_link,
            formId: newProps.getAllEventForm.payload.all_event_forms_data[0].event_id
          })
        }
      }
    }
  }

  validateRegist(newProps) {
    if (newProps.payload.success === 0) {
      switch (newProps.payload.message) {
        case 'already_inserted_form_for_this_event':
          Alert.alert('', 'Anda sudah pernah mendaftar event ini')
          break;
        case 'email_format_wrong':
          Alert.alert('', 'Mohon masukkan email dengan format yang benar')
          break;
        case 'phone_format_wrong':
          Alert.alert('', 'Mohon masukkan nomor handphone dengan format yang benar')
          break;
        case 'condition_is_empty':
          Alert.alert('', 'Kondisi tidak boleh kosong')
          break;
        case 'event_extra_info_value_is_wrong':
          Alert.alert('', 'Sesi tidak boleh kosong')
          break;
        case 'chosen_event_session_is_already_full':
          Alert.alert('', 'Mohon pilih sesi yang lain. Sesi yang anda pilih sudah penuh')
          break;
        default:
          Alert.alert('', 'Mohon coba lagi')
          break;
      }
    }
    else if (newProps.payload.success === 1) {
      this.setState({ midtransToken: newProps.payload.midtrans_link })
      Alert.alert(
        '',
        'Registrasi berhasil! Silahkan lunasi pembayaran anda paling lambat 12 jam dari sekarang',
        [
          {
            text: 'Lunasi',
            onPress: () => {
              this.componentDidMount()
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  reProcessToPayment() {
    const optionConect = {
      clientKey: "VT-client-35STW7Jm-F0bTh1x",
      urlMerchant: "http://www.mooimom.id"
    }

    const transRequest = {
      token: this.state.midtransToken,
    }

    const itemDetails = [

    ];

    const creditCardOptions = {
      saveCard: false,
      saveToken: false,
      paymentMode: "Normal",
      secure: false
    };

    const userDetail = {
      fullName: this.state.customerPhone,
      email: this.state.customerEmail,
      phoneNumber: this.state.customerPhone,
      userId: this.props.auth.payload.unique_token,
      country: "IDN",
    };

    const optionColorTheme = {
      primary: Colors.mooimom,
      primaryDark: Colors.mooimom,
      secondary: Colors.mooimom,
    }

    const optionFont = {
      defaultText: Fonts.type.gotham2,
      semiBoldText: Fonts.type.gotham2,
      boldText: Fonts.type.gotham2,
    }

    const callback = (res) => {
      this.componentDidMount()
    };

    MidtransModule.checkOut(
      optionConect,
      transRequest,
      itemDetails,
      creditCardOptions,
      userDetail,
      optionColorTheme,
      optionFont,
      callback
    );
  }

  openPaymentMethod() {
    this.setState({
      isShowPaymentMethod: true
    })
  }

  onPressToRegist() {
    this.setState({ toRegistration: true, overview: false })
  }

  onPressProcess() {
    const { customerPhone } = this.state
    var myPhoneNumber = customerPhone.indexOf('0') == 0 ? customerPhone.substring(1) : customerPhone;

    if (this.state.customerName === '' || this.state.customerEmail === '' || this.state.customerCondition === '' || this.state.customerPhone === '' || this.state.selectedSession === ' ') {
      Alert.alert('', 'Lengkapi semua form')
    }
    else if (myPhoneNumber === "" || myPhoneNumber.length <= 5) {
      Alert.alert(
        '',
        'Mohon masukkan nomor handphone dengan format yang benar',
        [
          {
            text: 'OK'
          }
        ],
        { cancelable: false }
      )
      return
    }
    else {
      if (Platform.OS === 'ios') {
        RNAiqua.logEvent('o2o_event_registration_completed')
        RNAiqua.setUserId(this.props.auth.payload.user_id)
        RNAiqua.setName(this.state.customerName)
        RNAiqua.setEmail(this.state.customerEmail)
        RNAiqua.setCustomKey('phoneNo', myPhoneNumber)
        RNAiqua.setCustomKey('condition', this.state.customerCondition)
        RNAiqua.setCustomKey('eventName', 'event_register_for_grand_indonesia_store')
        console.log('RNAiqua registration_completed')
      }
      else {
        RNAiqua.logEvent('o2o_event_registration_completed')
        RNAiqua.setUserId(this.props.auth.payload.user_id)
        RNAiqua.setName(this.state.customerName)
        RNAiqua.setEmail(this.state.customerEmail)
        RNAiqua.setPhoneNumber(myPhoneNumber)
        RNAiqua.setCustomKey('condition', this.state.customerCondition)
        RNAiqua.setCustomKey('eventName', 'event_register_for_grand_indonesia_store')
        console.log('RNAiqua registration_completed')
      }

      let data = {
        data_request: {
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          customer_name: this.state.customerName,
          email: this.state.customerEmail,
          customer_phone: myPhoneNumber,
          condition: this.state.customerCondition,
          event_extra_info: this.state.session[this.state.selectedSessionIdx].value,
          event_name: 'event_register_for_grand_indonesia_store'
        }
      }
      console.log(data)
      this.props.eventFormHandlerProcess(data)
    }
  }

  renderMethod() {
    const { status_code, payment_type, va_numbers, payment_code,
      permata_va_number, transaction_status, store,
      biller_code, bill_key } = this.state.midtransData
    if (status_code && status_code !== '201' && transaction_status && transaction_status !== 'pending') return <View />
    switch (payment_type) {
      case 'echannel':
        return (
          <View>
            <Text style={styles.deliveryText2}>Mandiri Bill Payment</Text>
            <View style={styles.wrapperSeparator} />
            <Text style={styles.deliveryText3}>Company Code</Text>
            <Text style={styles.deliveryText2}>{biller_code}</Text>
            <View style={styles.wrapperSeparator} />
            <Text style={styles.deliveryText3}>Billpay Code</Text>
            <Text style={styles.deliveryText2}>{bill_key}</Text>
          </View>
        );
      case 'bank_transfer':
        if (va_numbers && va_numbers.length > 0) {
          switch (va_numbers[0].bank) {
            case 'bca':
              return (
                <View>
                  <Text style={styles.deliveryText2}>BCA Virtual Account</Text>
                  <View style={styles.wrapperSeparator} />
                  <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
                  <Text style={styles.deliveryText2}>{va_numbers[0].va_number}</Text>
                </View>
              )
            case 'bni':
              return (
                <View>
                  <Text style={styles.deliveryText2}>BNI Virtual Account</Text>
                  <View style={styles.wrapperSeparator} />
                  <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
                  <Text style={styles.deliveryText2}>{va_numbers[0].va_number}</Text>
                </View>
              )
            default:
              return <View />
          }
        } else if (permata_va_number && permata_va_number !== '') {
          return (
            <View>
              <Text style={styles.deliveryText2}>Permata Virtual Account</Text>
              <View style={styles.wrapperSeparator} />
              <Text style={styles.deliveryText3}>Nomor Virtual Account</Text>
              <Text style={styles.deliveryText2}>{permata_va_number}</Text>
            </View>
          )
        } else {
          return <View />
        }
      case 'cstore':
        switch (store) {
          case 'indomaret':
            return (
              <View>
                <Text style={styles.deliveryText2}>Indomaret</Text>
                <View style={styles.wrapperSeparator} />
                <Text style={styles.deliveryText3}>Kode Pembayaran:</Text>
                <Text style={styles.deliveryText2}>{payment_code}</Text>
              </View>
            );
          default:
            return <View />
        }
        break;
    }
    return <View />
  }

  renderShowPayment() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowPaymentMethod}
        onRequestClose={() => {
          this.setState({
            isShowPaymentMethod: false
          })
        }}>
        <SafeAreaView style={styles.paymentGuideContainer}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.setState({
              isShowPaymentMethod: false
            })}>
              <Image source={Images.back} style={styles.buttonHeader} />
            </TouchableOpacity>
          </View>
          <View style={styles.cartContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.productSubtitle}>Cara Pembayaran</Text>
              <View style={styles.wrapperSeparator} />
              <Text style={styles.deliveryText3}>Jumlah yang harus dibayar:</Text>
              <Text style={styles.priceText2}>{convertToRupiah(parseInt(this.state.midtransData.gross_amount))}</Text>
              <View style={styles.wrapperSeparator} />
              <Text style={styles.deliveryText3}>Metode Pembayaran:</Text>
              {this.renderMethod()}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  renderHeader() {
    return (
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
            <Text style={styles.textNotif2}>{this.props.cart.data.length}</Text>
          </View>}
        </TouchableOpacity>
      </View>
    )
  }

  renderRegistration() {
    return (
      <View style={{ width: '94%', alignSelf: 'center' }}>
        <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.gray, fontSize: Metrics.fontSize3, alignSelf: 'center', marginVertical: 30 }}>Event Registration</Text>
        <View
          style={{
            paddingHorizontal: 10, borderRadius: 5,
            backgroundColor: Colors.white, shadowColor: '#CCCCCC',
            marginBottom: 20,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1.0,
            shadowRadius: 4,
            elevation: 3,
            paddingVertical: 20
          }}
        >

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1 }}>Nama Lengkap</Text>
            <View style={{ paddingBottom: 10, borderBottomWidth: 0.5, borderColor: Colors.mooimom, marginTop: 10 }}>
              <TextInput
                style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1 }}
                placeholder="Sesuai yang tertera pada ID Card/KTP"
                onChangeText={(val) => this.setState({ customerName: val })}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1 }}>Email</Text>
            <View style={{ paddingBottom: 10, borderBottomWidth: 0.5, borderColor: Colors.mooimom, marginTop: 10 }}>
              <TextInput
                autoCapitalize='none'
                style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1 }}
                placeholder="Misal, alvida@example.com"
                onChangeText={(val) => this.setState({ customerEmail: val })}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1 }}>No. Handphone</Text>
            <View style={{ paddingBottom: 10, borderBottomWidth: 0.5, borderColor: Colors.mooimom, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, fontSize: Metrics.fontSize1, color: Colors.mooimom, marginRight: 10 }}>+62</Text>
              <TextInput
                style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, width: '90%' }}
                placeholder="Misal, 882xxxx"
                keyboardType='phone-pad'
                onChangeText={(val) => this.setState({ customerPhone: val })}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1 }}>Kondisi</Text>
            <View style={{ paddingBottom: 10, borderBottomWidth: 0.5, borderColor: Colors.mooimom, marginTop: 10 }}>
              <TextInput
                style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1 }}
                placeholder="Misal, hamil 7 bulan atau memiliki 1 anak usia 5 bulan"
                onChangeText={(val) => this.setState({ customerCondition: val })}
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Sesi Acara</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Pilih sesi acara',
                value: null,
                color: Colors.mediumGray
              }}
              onValueChange={(value, index) => this.setState({ selectedSessionIdx: index, selectedSession: value })}
              items={this.state.session}
              style={{
                modalViewBottom: {
                  backgroundColor: Colors.white
                },
                placeholder: {
                  fontFamily: Fonts.type.gotham2,
                  fontSize: Metrics.fontSize1
                }
              }}
            />
          </View>
          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>
            <TouchableOpacity onPress={() => this.onPressProcess()} disabled={this.props.eventFormHandler.fetching} style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: Colors.mooimom }}>
              {
                this.props.eventFormHandler.fetching ?
                  <DotIndicator color={Colors.white} size={8} />
                  :
                  <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize1 }}>Lanjut ke pembayaran</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderOverview() {
    return (
      <View style={{ width: '94%', alignSelf: 'center', marginTop: 30 }}>
        <View style={{ marginBottom: 20, borderBottomWidth: 0.5, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize3 }}>Mom's Class </Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize2 }}>QnA Session With Expert</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Date</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Saturday - 15 Februari 2020</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Time</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>4 session (11.00-12.00) (13.00-14.00) (15.00-16.00) (17.00-18.00)</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Place</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>MOOIMOM store Grand Indonesia</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Expert</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Obgyn & Pediatrician From Brawijaya</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Registration</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>5-13 Februari 2020</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>HTM</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Rp 50.000</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Segera daftarkan diri Moms hanya di aplikasi MOOIMOM, karena kursi terbatas, hanya 15 orang/sesi.</Text>
        </View>
        <TouchableOpacity onPress={() => this.onPressToRegist()} style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: Colors.mooimom, marginBottom: 10 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize1 }}>Lanjut mendaftar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderShowPayment() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowPaymentMethod}
        onRequestClose={() => {
          this.setState({
            isShowPaymentMethod: false
          })
        }}>
        <SafeAreaView style={styles.paymentGuideContainer}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={() => this.setState({
              isShowPaymentMethod: false
            })}>
              <Image source={Images.back} style={styles.buttonHeader} />
            </TouchableOpacity>
          </View>
          <View style={styles.cartContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.productSubtitle}>Cara Pembayaran</Text>
              <View style={styles.wrapperSeparator} />
              <Text style={styles.deliveryText3}>Jumlah yang harus dibayar:</Text>
              <Text style={styles.priceText2}>{convertToRupiah(parseInt(this.state.midtransData.gross_amount))}</Text>
              <View style={styles.wrapperSeparator} />
              <Text style={styles.deliveryText3}>Metode Pembayaran:</Text>
              {this.renderMethod()}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  renderRegistrationStatus() {
    if (this.state.eventFormData[0].already_paid === 0) {
      var menuPay
      if (this.state.midtransData.length === 0 || this.state.midtransData.payment_type === 'gopay') {
        menuPay = (
          <TouchableOpacity disabled={this.state.midtransFetching} onPress={() => this.reProcessToPayment()} style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginBottom: 10, backgroundColor: Colors.mooimom }}>
            {this.state.midtransFetching ?
              <DotIndicator size={8} color={Colors.white} />
              :
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize1 }}>Lunasi sekarang</Text>
            }
          </TouchableOpacity>
        )
      } else {
        menuPay = (
          <TouchableOpacity disabled={this.state.midtransFetching} onPress={() => this.openPaymentMethod()} style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 10, paddingVertical: 10, backgroundColor: Colors.mooimom }}>
            {this.state.midtransFetching ?
              <DotIndicator size={8} color={Colors.white} />
              :
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize1 }}>Cara pembayaran</Text>
            }
          </TouchableOpacity>
        )
      }
    }

    if (this.state.eventFormData.length > 0) {
      return (
        <View style={{ width: '94%', alignSelf: 'center', marginTop: 30 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize2, marginBottom: 20 }}>Status Pendaftaran Anda</Text>
          <View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Participant Name</Text>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.eventFormData[0].name}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Email</Text>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.eventFormData[0].email}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Phone Number</Text>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.eventFormData[0].telephone}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Participant Conditionr</Text>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.eventFormData[0].condition}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1, marginBottom: 10 }}>Payment Status</Text>
              {
                this.state.eventFormData[0].already_paid === 0 ?
                  <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Pending</Text>
                  :
                  <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Paid</Text>
              }
            </View>
            {menuPay}
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <SafeAreaView>
        {this.renderHeader()}
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.props.getAllEventForm.fetching ?
                <View style={{ width: Metrics.screenWidth, height: Metrics.screenHeight, justifyContent: 'center', alignItems: 'center' }}>
                  <DotIndicator color={Colors.mooimom} size={12} />
                </View>
                :
                <>
                  <Image source={Images.momsClassBanner} style={{ width: '100%', height: 200 }} />
                  {
                    this.state.toRegistration &&
                    this.renderRegistration()
                  }
                  {
                    this.state.overview &&
                    this.renderOverview()
                  }
                  {
                    this.state.registrationStatus &&
                    this.renderRegistrationStatus()
                  }
                  <View style={{ width: '100%', height: 40, marginVertical: 10 }} />
                </>
            }
            {this.renderShowPayment()}
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart,
    eventFormHandler: state.eventFormHandler,
    getAllEventForm: state.getAllEventForm,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    eventFormHandlerProcess: data => {
      dispatch(EventFormHandlerActions.eventFormHandlerRequest(data))
    },
    getAllEventFormProcess: data => {
      dispatch(GetAllEventFormActions.getAllEventFormRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRegistrationScreen)
