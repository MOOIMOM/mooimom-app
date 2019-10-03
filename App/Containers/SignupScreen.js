import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Alert, ActivityIndicator } from 'react-native'
import { Images, Colors, Metrics } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import SignUpActions from '../Redux/SignUpRedux'
import SendOtpActions from '../Redux/SendOtpRedux'
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/SignupScreenStyles'

var isProcessing = false
class SignupScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: ''
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.register !== newProps.register) {
      if (
        newProps.register.payload !== null &&
        newProps.register.error === null &&
        !newProps.register.fetching
      ) {
          let data ={
            data_request: {
              phone_number: this.props.register.data.data_request.phone_number,
              user_id: newProps.register.payload.user_id
            }
          }
          this.props.sendOtpProcess(data)
        }
      else if (
        newProps.register.payload === null &&
        newProps.register.error !== null &&
        !newProps.register.fetching
      ) {
        const {phone} = this.state
        var myPhoneNumber = phone.indexOf('0') == 0 ? phone.substring(1) : phone;
        let data = {
          data_request: {
            phone_number: myPhoneNumber
          }
        }
        this.props.loginProcess(data)
      }
    }

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


  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  signUp(){
    if(isProcessing) return;
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
    isProcessing = true
    let data = {
      data_request: {
        phone_number: myPhoneNumber
      }
    }
    this.props.signUpProcess(data)
  }

  render () {
    return (
      <View style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      enabled>
        <LinearGradient colors={['#7CE0D3', '#28C9B9']} style={styles.linergradient}>
          <Image source={Images.mooimomLogoWhite} style={styles.title}/>
          <View style={styles.signUpContainer}>
              <Text style={styles.caption1}>Masukkan Nomor Handphone</Text>
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
                  autoFocus={true}
                  placeholder='contoh : 8123456789'
                  underlineColorAndroid='transparent'
                  placeholderTextColor={Colors.lightGray}
                  selectionColor='white'
                  onSubmitEditing={() => this.signUp()}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.signUp()}
              >
                <Text style={styles.btnText}>Lanjutkan</Text>
              </TouchableOpacity>
          </View>
        </LinearGradient>
        </KeyboardAvoidingView>
        </ScrollView>
        {isProcessing && <View style={{position: 'absolute', top: 0, left: 0, width: Metrics.screenWidth, height: Metrics.screenHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <ActivityIndicator size="large" color={Colors.mooimom} />
        </View>}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    register: state.register,
    login: state.login,
    sendOtp: state.sendOtp
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signUpProcess: data => {
      dispatch(SignUpActions.signUpRequest(data))
    },
    sendOtpProcess: data => {
      dispatch(SendOtpActions.sendOtpRequest(data))
    },
    loginProcess: data => {
      dispatch(LoginActions.loginRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)
