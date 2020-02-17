import React from 'react'

import { View, SafeAreaView, Text, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Platform, Image, Alert } from 'react-native'
import { connect } from 'react-redux'

import DatePicker from '../Components/DatePicker'

import { Images, Metrics, Colors, Fonts } from '../Themes'
import { DotIndicator } from 'react-native-indicators'

import { isIphoneXorAbove } from '../Lib/utils'

import RNPickerSelect from 'react-native-picker-select'
import EditProfileActions from '../Redux/EditProfileRedux'

import GenderSelectionRadio from '../Components/GenderSelectionRadio'

import RNAiqua from 'react-native-aiqua-sdk'
import FastImage from 'react-native-fast-image'

class ProfileCompletionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGenderSelection: true,
      showBioForm: false,
      showMaternityAge: false,
      showBabyAge: false,
      showBirthDatePicker: false,
      genderEnum: [
        { label: 'Pria', value: 'male', 'icon': Images.dad },
        { label: 'Wanita', value: 'female', 'icon': Images.mom }
      ],
      maternityAgeEnum: [
        { label: '1 bulan', value: '1_bulan' },
        { label: '2 bulan', value: '2_bulan' },
        { label: '3 bulan', value: '3_bulan' },
        { label: '4 bulan', value: '4_bulan' },
        { label: '5 bulan', value: '5_bulan' },
        { label: '6 bulan', value: '6_bulan' },
        { label: '7 bulan', value: '7_bulan' },
        { label: '8 bulan', value: '8_bulan' },
        { label: '9 bulan', value: '9_bulan' },
        { label: 'Tidak sedang hamil', value: 'tidak_sedang_hamil' }
      ],
      babyAgeEnum: [
        { label: '1 bulan', value: '1_bulan' },
        { label: '2 bulan', value: '2_bulan' },
        { label: '3 bulan', value: '3_bulan' },
        { label: '4 bulan', value: '4_bulan' },
        { label: '5 bulan', value: '5_bulan' },
        { label: '6 bulan', value: '6_bulan' },
        { label: '7 bulan', value: '7_bulan' },
        { label: '8 bulan', value: '8_bulan' },
        { label: '9 bulan', value: '9_bulan' },
        { label: '10 bulan', value: '10_bulan' },
        { label: '11 bulan', value: '11_bulan' },
        { label: '12 bulan', value: '12_bulan' },
        { label: 'Belum memiliki bayi', value: 'belum_mempunyai_bayi' }
      ],
      selectedMaternityIdx: '',
      selectedBabyAgeIdx: '',
      gender: '',
      fullName: '',
      email: '',
      birthDate: '',
      maternityAge: '',
      babyAge: '',
      AIQUABabyAge: '',
      AIQUAMaternityAge: ''
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.editprofile !== newProps.editprofile) {
      if (
        newProps.editprofile.payload !== null &&
        newProps.editprofile.error === null &&
        !newProps.editprofile.fetching
      ) {
        if (newProps.editprofile.payload.success === 1) {
          this.setState({
            showGenderSelection: false,
            showBioForm: false,
            showMaternityAge: false,
            showBabyAge: false,
          })

          if (this.state.birthDate === '') {
            let birthDate = '0-0-0000'

            if (Platform.OS === 'ios') {
              RNAiqua.logEvent('registration_completed')
              RNAiqua.setUserId(this.props.auth.payload.user_id)
              RNAiqua.setName(this.state.fullName)
              RNAiqua.setEmail(this.state.email)
              RNAiqua.setDayOfBirth(parseInt(birthDate[2]))
              RNAiqua.setMonthOfBirth(parseInt(birthDate[1]))
              RNAiqua.setYearOfBirth(parseInt(birthDate[0]))
              RNAiqua.setCustomKey('gender', this.state.gender)
              RNAiqua.setCustomKey('maternityAge', this.state.AIQUAMaternityAge)
              RNAiqua.setCustomKey('babyAge', this.state.AIQUABabyAge)
              console.log('RNAiqua registration_completed', 'm: ', this.state.AIQUAMaternityAge, 'b: ', this.state.AIQUABabyAge)
            }
            else {
              RNAiqua.logEvent('registration_completed')
              RNAiqua.setUserId(this.props.auth.payload.user_id)
              RNAiqua.setName(this.state.fullName)
              RNAiqua.setEmail(this.state.email)
              RNAiqua.setDayOfBirth(parseInt(birthDate[2]))
              RNAiqua.setMonthOfBirth(parseInt(birthDate[1]))
              RNAiqua.setYearOfBirth(parseInt(birthDate[0]))
              RNAiqua.setCustomKey('gender', this.state.gender)
              RNAiqua.setCustomKey('maternityAge', this.state.AIQUAMaternityAge)
              RNAiqua.setCustomKey('babyAge', this.state.AIQUABabyAge)
              console.log('RNAiqua registration_completed', 'm: ', this.state.AIQUAMaternityAge, 'b: ', this.state.AIQUABabyAge)
            }
            Alert.alert(
              '',
              'Registrasi berhasil!',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    this.actNavigate('MainScreen')
                  }
                }
              ],
              { cancelable: false }
            )

          } else if (this.state.birthDate !== '') {
            let birthDate = this.state.birthDate.split('-')

            if (Platform.OS === 'ios') {
              RNAiqua.logEvent('registration_completed')
              RNAiqua.setUserId(this.props.auth.payload.user_id)
              RNAiqua.setName(this.state.fullName)
              RNAiqua.setEmail(this.state.email)
              RNAiqua.setDayOfBirth(parseInt(birthDate[2]))
              RNAiqua.setMonthOfBirth(parseInt(birthDate[1]))
              RNAiqua.setYearOfBirth(parseInt(birthDate[0]))
              RNAiqua.setCustomKey('gender', this.state.gender)
              RNAiqua.setCustomKey('maternityAge', this.state.AIQUAMaternityAge)
              RNAiqua.setCustomKey('babyAge', this.state.AIQUABabyAge)
              console.log('RNAiqua registration_completed', 'm: ', this.state.AIQUAMaternityAge, 'b: ', this.state.AIQUABabyAge)
            }
            else {
              RNAiqua.logEvent('registration_completed')
              RNAiqua.setUserId(this.props.auth.payload.user_id)
              RNAiqua.setName(this.state.fullName)
              RNAiqua.setEmail(this.state.email)
              RNAiqua.setDayOfBirth(parseInt(birthDate[2]))
              RNAiqua.setMonthOfBirth(parseInt(birthDate[1]))
              RNAiqua.setYearOfBirth(parseInt(birthDate[0]))
              RNAiqua.setCustomKey('gender', this.state.gender)
              RNAiqua.setCustomKey('maternityAge', this.state.AIQUAMaternityAge)
              RNAiqua.setCustomKey('babyAge', this.state.AIQUABabyAge)
              console.log('RNAiqua registration_completed', 'm: ', this.state.AIQUAMaternityAge, 'b: ', this.state.AIQUABabyAge)
            }
            Alert.alert(
              '',
              'Registrasi berhasil!',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    this.actNavigate('MainScreen')
                  }
                }
              ],
              { cancelable: false }
            )
          }

        } else if (newProps.editprofile.payload.success === 0) {
          this.setState({
            showGenderSelection: false,
            showBioForm: false,
            showMaternityAge: false,
            showBabyAge: false,
          })

          switch (newProps.editprofile.payload.message) {
            case 'name_empty':
              Alert.alert(
                '',
                'Nama tidak boleh kosong',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      this.setState({
                        showGenderSelection: true,
                        showBioForm: false,
                        showMaternityAge: false,
                        showBabyAge: false,
                      })
                    }
                  }
                ],
                { cancelable: false }
              )
              break;
            case 'email_format_wrong':
              Alert.alert(
                '',
                'Mohon masukkan email dengan format yang benar',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      this.setState({
                        showGenderSelection: true,
                        showBioForm: false,
                        showMaternityAge: false,
                        showBabyAge: false,
                      })
                    }
                  }
                ],
                { cancelable: false }
              )
              break;
            case 'email_is_already_used_by_other_user':
              Alert.alert(
                '',
                'Email sudah terdaftar. Masukkan email yang lain',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      this.setState({
                        showGenderSelection: true,
                        showBioForm: false,
                        showMaternityAge: false,
                        showBabyAge: false,
                      })
                    }
                  }
                ],
                { cancelable: false }
              )
              break;
            default:
              Alert.alert(
                '',
                'Mohon coba lagi',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      this.setState({
                        showGenderSelection: true,
                        showBioForm: false,
                        showMaternityAge: false,
                        showBabyAge: false,
                      })
                    }
                  }
                ],
                { cancelable: false }
              )
          }
        }
      }
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  toggleGenderSelection = (selectedGender, isCheck, index) => {
    if (isCheck === true) {
      this.setState({
        gender: selectedGender
      })
    } else {
      this.setState({ gender: '' })
    }
  }

  processToGenderSelect() {
    this.setState({
      gender: '',
      showGenderSelection: true,
      showMaternityAge: false,
      showBabyAge: false,
      showBioForm: false
    })
  }

  processToBioForm() {
    this.setState({
      showGenderSelection: false,
      showBioForm: true,
      showMaternityAge: false,
      showBabyAge: false
    })
  }

  processToMaternityAge() {
    this.setState({
      showGenderSelection: false,
      showBioForm: false,
      showMaternityAge: true,
      showBabyAge: false,
    })
  }

  processToGiveBirth() {
    this.setState({
      showGenderSelection: false,
      showBioForm: false,
      showMaternityAge: false,
      showBabyAge: true,
    })
  }

  setBirthDate = (event, date) => {
    date = date || this.state.birthDate;
    this.setState({
      showBirthDatePicker: Platform.OS === 'ios' ? true : false,
      date,
    })
  }


  proccessRegistration() {
    switch (this.state.babyAge) {
      case '1_bulan':
        this.setState({ AIQUABabyAge: '1' })
        break;
      case '2_bulan':
        this.setState({ AIQUABabyAge: '2' })
        break;
      case '3_bulan':
        this.setState({ AIQUABabyAge: '3' })
        break;
      case '4_bulan':
        this.setState({ AIQUABabyAge: '4' })
        break;
      case '5_bulan':
        this.setState({ AIQUABabyAge: '5' })
        break;
      case '6_bulan':
        this.setState({ AIQUABabyAge: '6' })
        break;
      case '7_bulan':
        this.setState({ AIQUABabyAge: '7' })
        break;
      case '8_bulan':
        this.setState({ AIQUABabyAge: '8' })
        break;
      case '9_bulan':
        this.setState({ AIQUABabyAge: '9' })
        break;
      case '10_bulan':
        this.setState({ AIQUABabyAge: '10' })
        break;
      case '11_bulan':
        this.setState({ AIQUABabyAge: '11' })
        break;
      case '12_bulan':
        this.setState({ AIQUABabyAge: '12' })
        break;
      case 'belum_mempunyai_bayi':
        this.setState({ AIQUABabyAge: '0' })
        break;
    }

    switch (this.state.maternityAge) {
      case '1_bulan':
        this.setState({ AIQUAMaternityAge: '1' })
        break;
      case '2_bulan':
        this.setState({ AIQUAMaternityAge: '2' })
        break;
      case '3_bulan':
        this.setState({ AIQUAMaternityAge: '3' })
        break;
      case '4_bulan':
        this.setState({ AIQUAMaternityAge: '4' })
        break;
      case '5_bulan':
        this.setState({ AIQUAMaternityAge: '5' })
        break;
      case '6_bulan':
        this.setState({ AIQUAMaternityAge: '6' })
        break;
      case '7_bulan':
        this.setState({ AIQUAMaternityAge: '7' })
        break;
      case '8_bulan':
        this.setState({ AIQUAMaternityAge: '8' })
        break;
      case '9_bulan':
        this.setState({ AIQUAMaternityAge: '9' })
        break;
      case '10_bulan':
        this.setState({ AIQUAMaternityAge: '10' })
        break;
      case '11_bulan':
        this.setState({ AIQUAMaternityAge: '11' })
        break;
      case '12_bulan':
        this.setState({ AIQUAMaternityAge: '12' })
        break;
      case 'tidak_sedang_hamil':
        this.setState({ AIQUAMaternityAge: '0' })
        break;
    }


    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        name: this.state.fullName,
        email: this.state.email,
        birthday: this.state.birthDate,
        gender_slug: this.state.gender,
        gestational_age: this.state.maternityAge,
        baby_age: this.state.babyAge
      }
    }

    this.props.editProfileProcess(data)
    console.log(data)
  }

  renderSteper() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {
          this.state.showGenderSelection ?
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              width: 20, height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10
            }} >
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize2, textAlign: 'center' }}>1</Text>
            </View>
            :
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              opacity: 0.5,
              width: 10, height: 10,
              borderRadius: 10 / 2
            }} />
        }
        {
          this.state.showBioForm ?
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              width: 20, height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10
            }} >
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize2, textAlign: 'center' }}>2</Text>
            </View>
            :
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              opacity: 0.5,
              width: 10, height: 10,
              borderRadius: 10 / 2
            }} />
        }
        {
          this.state.showMaternityAge ?
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              width: 20, height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10
            }} >
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize2, textAlign: 'center' }}>3</Text>
            </View>
            :
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              opacity: 0.5,
              width: 10, height: 10,
              borderRadius: 10 / 2
            }} />
        }
        {
          this.state.showBabyAge ?
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              width: 20, height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10
            }} >
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize2, textAlign: 'center' }}>4</Text>
            </View>
            :
            <View style={{
              marginHorizontal: 10,
              backgroundColor: Colors.white,
              opacity: 0.5,
              width: 10, height: 10,
              borderRadius: 10 / 2
            }} />
        }

      </View>
    )
  }

  renderGenderSelection() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.state.showGenderSelection}
        onRequestClose={() => {
          this.setState({ showGenderSelection: false })
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View style={{
            width: '90%', height: isIphoneXorAbove() ? 350 * Metrics.screenWidth / 320 : 300 * Metrics.screenWidth / 320, backgroundColor: Colors.white, borderTopLeftRadius: 10, borderTopRightRadius: 10
          }}>
            <View style={{ width: '90%', alignItems: 'flex-end', alignSelf: 'center', height: 40, justifyContent: 'center' }}>

              {this.state.gender !== '' &&
                < TouchableOpacity >
                  <Text onPress={() => { this.processToBioForm() }} style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontSize: Metrics.fontSize2 }}>Lanjut</Text>
                </TouchableOpacity>
              }
            </View>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize2, marginVertical: 10, alignSelf: 'center' }}>Saya adalah seorang</Text>

            <GenderSelectionRadio options={this.state.genderEnum} onSelected={(value) => this.setState({ gender: value })} />
          </View>
        </View>
      </Modal >
    )
  }

  renderBioForm() {
    today = new Date()

    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.state.showBioForm}
        onRequestClose={() => {
          this.setState({ showBioForm: false })
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View style={{
            width: '90%', height: isIphoneXorAbove() ? 350 * Metrics.screenWidth / 320 : 300 * Metrics.screenWidth / 320, backgroundColor: Colors.white, borderTopLeftRadius: 10, borderTopRightRadius: 10
          }}>
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', alignSelf: 'center', height: 40, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.processToGenderSelect()}>
                <Image source={Images.back} style={{ width: 14, height: 9, opacity: 0.3 }} />
              </TouchableOpacity>
              {(this.state.fullName !== '' && this.state.email !== '' && this.state.phoneNumber !== '') &&
                <TouchableOpacity onPress={() => { this.processToMaternityAge() }}>
                  <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontSize: Metrics.fontSize2 }}>Lanjut</Text>
                </TouchableOpacity>
              }
            </View>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <View style={{ marginBottom: isIphoneXorAbove() ? 20 : 10 }}>
                <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: isIphoneXorAbove() ? Metrics.fontSize2 : Metrics.fontSize1, marginBottom: isIphoneXorAbove() ? 10 : 5 }}>Nama Lengkap</Text>
                <View style={{ width: '94%', alignSelf: 'center', paddingBottom: isIphoneXorAbove() ? 10 : 5, borderBottomWidth: 0.5, borderColor: Colors.mediumGray }}>
                  <TextInput
                    value={this.state.fullName}
                    placeholder='Sesuai dengan ID Card/KTP'
                    style={{ fontFamily: Fonts.type.gotham2, fontSize: isIphoneXorAbove() ? Metrics.fontSize2 : Metrics.fontSize1, color: Colors.black }}
                    onChangeText={val => this.setState({ fullName: val })}
                  />
                </View>
              </View>
              <View style={{ marginBottom: isIphoneXorAbove() ? 20 : 10 }}>
                <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: isIphoneXorAbove() ? Metrics.fontSize2 : Metrics.fontSize1, marginBottom: isIphoneXorAbove() ? 10 : 5 }}>Email</Text>
                <View style={{ width: '94%', alignSelf: 'center', paddingBottom: isIphoneXorAbove() ? 10 : 5, borderBottomWidth: 0.5, borderColor: Colors.mediumGray }}>
                  <TextInput
                    value={this.state.email}
                    placeholder='Misal, awan@example.co'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    style={{ fontFamily: Fonts.type.gotham2, fontSize: isIphoneXorAbove() ? Metrics.fontSize2 : Metrics.fontSize1, color: Colors.black }}
                    onChangeText={val => this.setState({ email: val })}
                  />
                </View>
              </View>
              <View style={{ marginBottom: isIphoneXorAbove() ? 20 : 10 }}>
                <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: isIphoneXorAbove() ? Metrics.fontSize2 : Metrics.fontSize1 }}>Tanggal Lahir</Text>
                <View style={{ width: '94%', alignSelf: 'center', paddingBottom: 20, borderBottomWidth: 0.5, borderColor: Colors.mediumGray }}>
                  <DatePicker
                    label={'Tanggal Lahir'}
                    date={this.state.birthDate}
                    placeholder={'Masukkan Tanggal Lahir'}
                    onDateChange={date => this.setState({ birthDate: date })}
                    color={Colors.black}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderMaternityAge() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.state.showMaternityAge}
        onRequestClose={() => {
          this.setState({ showMaternityAge: false })
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View style={{
            width: '90%', height: isIphoneXorAbove() ? 350 * Metrics.screenWidth / 320 : 300 * Metrics.screenWidth / 320, backgroundColor: Colors.white, borderTopLeftRadius: 10, borderTopRightRadius: 10
          }}>
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', alignSelf: 'center', height: 40, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.processToBioForm()}>
                <Image source={Images.back} style={{ width: 14, height: 9, opacity: 0.3 }} />
              </TouchableOpacity>
              {this.state.maternityAge !== '' &&
                <TouchableOpacity>
                  <Text onPress={() => { this.processToGiveBirth() }} style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontSize: Metrics.fontSize2 }}>Lanjut</Text>
                </TouchableOpacity>
              }
            </View>
            <View style={{ width: '80%', alignSelf: 'center' }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize2, marginVertical: 10, alignSelf: 'center' }}>Berapa usia kehamilan anda?</Text>
            </View>
            <View style={{ alignSelf: 'center', marginVertical: 20 }}>
              <FastImage
                source={Images.maternityBanner}
                style={{ width: 300, height: 150, marginBottom: 20 }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <RNPickerSelect
                placeholder={{
                  label: 'Pilih usia kehamilan',
                  value: null,
                  color: Colors.mediumGray
                }}
                onValueChange={(value, index) => this.setState({ selectedMaternityIdx: index, maternityAge: value })}
                items={this.state.maternityAgeEnum}
                style={{
                  modalViewBottom: {
                    backgroundColor: Colors.white
                  },
                  placeholder: {
                    fontFamily: Fonts.type.gotham2,
                    fontSize: Metrics.fontSize1
                  },
                  inputIOS: {
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: Colors.mooimom,
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontSize: Metrics.fontSize1,
                    fontFamily: Fonts.type.gotham2,
                    color: Colors.black
                  },
                  inputAndroid: {
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: Colors.mooimom,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    textAlign: 'center',
                    fontSize: Metrics.fontSize1,
                    fontFamily: Fonts.type.gotham2,
                    color: Colors.black
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderBabyAge() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.state.showBabyAge}
        onRequestClose={() => {
          this.setState({ showBabyAge: false })
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View style={{
            width: '90%', height: isIphoneXorAbove() ? 350 * Metrics.screenWidth / 320 : 300 * Metrics.screenWidth / 320, backgroundColor: Colors.white, borderTopLeftRadius: 10, borderTopRightRadius: 10
          }}>
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', alignSelf: 'center', height: 40, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.processToMaternityAge()}>
                <Image source={Images.back} style={{ width: 14, height: 9, opacity: 0.3 }} />
              </TouchableOpacity>
              {this.state.babyAge !== '' &&
                <TouchableOpacity onPress={() => this.proccessRegistration()}>
                  <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontSize: Metrics.fontSize2 }}>Selesai</Text>
                </TouchableOpacity>
              }
            </View>
            <View style={{ width: '80%', alignSelf: 'center' }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize2, marginVertical: 10, alignSelf: 'center' }}>Berapa usia bayi anda?</Text>
            </View>
            <View style={{ alignSelf: 'center', marginVertical: 20 }}>
              <FastImage
                source={Images.babyAgeBanner}
                style={{ width: 300, height: 150, marginBottom: 20 }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <RNPickerSelect
                placeholder={{
                  label: 'Pilih usia bayi',
                  value: null,
                  color: Colors.mediumGray
                }}
                onValueChange={(value, index) => this.setState({ babyAge: value, selectedBabyAgeIdx: index })}
                items={this.state.babyAgeEnum}
                style={{
                  modalViewBottom: {
                    backgroundColor: Colors.white
                  },
                  placeholder: {
                    fontFamily: Fonts.type.gotham2,
                    fontSize: Metrics.fontSize1
                  },
                  inputIOS: {
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: Colors.mooimom,
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontSize: Metrics.fontSize1,
                    fontFamily: Fonts.type.gotham2,
                    color: Colors.black
                  },
                  inputAndroid: {
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: Colors.mooimom,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    textAlign: 'center',
                    fontSize: Metrics.fontSize1,
                    fontFamily: Fonts.type.gotham2,
                    color: Colors.black
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderWelcomeHeader() {
    return (
      <View style={{
        width: '100%',
        height: isIphoneXorAbove() ? 150 : 100,
        marginBottom: 50,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <View>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize4 }}>Selamat datang di MOOIMOM,</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize2 }}>silahkan pilih jenis kelamin anda</Text>
        </View>
      </View>
    )
  }

  renderFormHeader() {
    return (
      <View style={{
        width: '100%',
        height: isIphoneXorAbove() ? 150 : 100,
        marginBottom: 50,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <View>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize5 }}>Hai {this.state.gender === 'female' ? 'Mom' : 'Dad'},</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize3 }}>silahkan lengkapi form</Text>
          <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize3 }}>di bawah ini untuk registrasi</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <>
        {this.props.editprofile.fetching ?
          <View style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: Metrics.screenWidth,
            height: Metrics.screenHeight,
            position: 'absolute',
            left: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <DotIndicator size={12} color={Colors.mooimom} />
          </View>
          :
          <View
            style={{
              flex: 1,
              backgroundColor: '#28C9B9',
              alignItems: 'center',
            }}
          >
            {
              this.state.showGenderSelection ?
                this.renderWelcomeHeader()
                :
                this.renderFormHeader()
            }
            {this.renderSteper()}
            {this.renderGenderSelection()}
            {this.renderBioForm()}
            {this.renderMaternityAge()}
            {this.renderBabyAge()}

          </View>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    editprofile: state.editprofile,
    login: state.login
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editProfileProcess: data => {
      dispatch(EditProfileActions.editProfileRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCompletionScreen)
