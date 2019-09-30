import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import SignUpActions from '../Redux/SignUpRedux'
import SendOtpActions from '../Redux/SendOtpRedux'
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
        isProcessing = false
          Alert.alert(
            '',
            newProps.register.error.human_message,
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
        } else if(!newProps.sendOtp.fetching &&
          newProps.sendOtp.error !== null
        ){
          isProcessing = false
          Alert.alert(
            '',
            newProps.sendOtp.error.human_message,
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


  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  signUp(){
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
              <Text style={styles.caption1}>Buat Akun Mooimom Sekarang</Text>
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
                  onSubmitEditing={() => this.signUp()}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.signUp()}
              >
                <Text style={styles.btnText}>Daftar</Text>
              </TouchableOpacity>
              <View style={styles.SignInContainer}>
                <Text style={styles.caption2}>Sudah Punya Akun? </Text>
                <TouchableOpacity
                  onPress={() => this.actNavigate('LoginScreen')}
                >
                  <Text style={styles.textSignUp}>Sign In</Text>
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
    register: state.register,
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
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)
