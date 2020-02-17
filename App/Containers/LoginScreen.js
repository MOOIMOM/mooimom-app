import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Alert, Platform, AsyncStorage } from 'react-native'
import { Images, Colors } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import LoginActions from '../Redux/LoginRedux'
import SendOtpActions from '../Redux/SendOtpRedux'
import { connect } from 'react-redux'

import RNAiqua from 'react-native-aiqua-sdk'
// Styles
import styles from './Styles/LoginScreenStyles'

var isProcessing = false
class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
    }
  }

  componentDidMount() {
    isProcessing = false
  }

  actNavigate(screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  async componentWillReceiveProps(newProps) {
    if (this.props.login !== newProps.login) {
      if (
        newProps.login.payload !== null &&
        newProps.login.error === null &&
        !newProps.login.fetching
      ) {
        if (Platform.OS === 'ios') {
          RNAiqua.logEvent('user_logged_in')
          RNAiqua.setUserId(newProps.login.payload.user_id)
          RNAiqua.setCustomKey('phoneNo', this.props.login.data.data_request.phone_number)
        }
        else if (Platform.OS === 'android') {
          RNAiqua.logEvent('user_logged_in')
          RNAiqua.setUserId(newProps.login.payload.user_id)
          RNAiqua.setPhoneNumber(this.props.login.data.data_request.phone_number)
        }

        await AsyncStorage.setItem('phone_number', this.props.login.data.data_request.phone_number)

        let data = {
          data_request: {
            phone_number: this.props.login.data.data_request.phone_number,
            user_id: newProps.login.payload.user_id
          }
        }
        this.props.sendOtpProcess(data)
      }
      else if (
        newProps.login.payload === null &&
        newProps.login.error !== null &&
        !newProps.login.fetching
      ) {
        isProcessing = false
        Alert.alert(
          '',
          newProps.login.error.human_message,
          [
            {
              text: 'OK'
            }
          ],
          { cancelable: false }
        )
      } else if (!newProps.login.fetching) {
        isProcessing = false
      }
    }

    if (this.props.sendOtp !== newProps.sendOtp) {
      if (
        newProps.sendOtp.payload !== null &&
        newProps.sendOtp.error === null &&
        !newProps.sendOtp.fetching
      ) {
        this.actNavigate('AuthScreen')
        isProcessing = false
      }
    } else if (!newProps.sendOtp.fetching) {
      isProcessing = false
    }
  }

  login() {
    if (isProcessing) return;
    const { phone } = this.state
    var myPhoneNumber = phone.indexOf('0') == 0 ? phone.substring(1) : phone;
    if (myPhoneNumber === "" || myPhoneNumber.length <= 5) {
      Alert.alert(
        '',
        'Please insert your correct phone number',
        [
          {
            text: 'OK'
          }
        ],
        { cancelable: false }
      )
      return
    }
    isProcessing = true
    let data = {
      data_request: {
        phone_number: myPhoneNumber
      }
    }
    this.props.loginProcess(data)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            enabled>
            <LinearGradient colors={['#7CE0D3', '#28C9B9']} style={styles.linergradient}>
              <Image source={Images.mooimomLogoWhite} style={styles.title} />
              <View style={styles.loginContainer}>
                <Text style={styles.caption1}>Sign In Sekarang</Text>
                <View style={styles.textInput}>
                  <Text style={styles.number62}>+62</Text>
                  <TextInput style={styles.textTextInput}
                    // onFocus={() => this.onFocus1()}
                    // onBlur={() => this.onBlur()}
                    onChangeText={phone => this.setState({ phone })}
                    autoCapitalize='none'
                    keyboardType='numeric'
                    value={this.state.phone}
                    returnKeyType='done'
                    placeholder='contoh : 831345679989'
                    underlineColorAndroid='transparent'
                    placeholderTextColor={Colors.lightGray}
                    selectionColor='white'
                    onSubmitEditing={() => this.login()}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.login()}
                >
                  <Text style={styles.btnText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.SignUpContainer}>
                  <Text style={styles.caption2}>Belum Punya Akun? </Text>
                  <TouchableOpacity
                    onPress={() => this.actNavigate('SignupScreen')}
                  >
                    <Text style={styles.textSignIn}>Daftar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    sendOtp: state.sendOtp,
    login: state.login
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loginProcess: data => {
      dispatch(LoginActions.loginRequest(data))
    },
    sendOtpProcess: data => {
      dispatch(SendOtpActions.sendOtpRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
