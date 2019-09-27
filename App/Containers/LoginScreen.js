import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import LoginActions from '../Redux/LoginRedux'
import SendOtpActions from '../Redux/SendOtpRedux'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/LoginScreenStyles'

var isProcessing = false
class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  componentWillReceiveProps (newProps) {
    if (this.props.login !== newProps.login) {
      if (
        newProps.login.payload !== null &&
        newProps.login.error === null &&
        !newProps.login.fetching
      ) {
          let data ={
            data_request: {
              phone_number: this.props.login.data.data_request.phone_number,
              user_id: newProps.login.payload.user_id
            }
          }
          this.props.sendOtpProcess(data)
        }
      else if (
        newProps.login.payload === null &&
        !newProps.login.fetching
      ) {
        try {
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
        } catch (err) {
          // Alert.alert('Can not connect server now')
          Alert.alert(
            '',
            'Can not connect to the server now',
            [
              {
                text: 'OK'
              }
            ],
            { cancelable: false }
          )
        }
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
    }
  }

  login(){
    if(isProcessing) return;
    isProcessing = true
    const {phone} = this.state
    var myPhoneNumber = phone.indexOf('0') == 0 ? phone.substring(1) : phone;
    if(myPhoneNumber === "" || myPhoneNumber.length <= 9) {
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
    let data = {
      data_request: {
        phone_number: myPhoneNumber
      }
    }
    this.props.loginProcess(data)
  }

  render () {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#7CE0D3', '#28C9B9']} style={styles.linergradient}>
        <Image source={Images.mooimomLogoWhite} style={styles.title}/>
        <View style={styles.loginContainer}>
          <KeyboardAvoidingView>
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
                placeholderTextColor='white'
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
          </KeyboardAvoidingView>
        </View>
        </LinearGradient>
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
