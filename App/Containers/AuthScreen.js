import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Alert, Keyboard } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Images, Colors } from '../Themes'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
import SendOtpActions from '../Redux/SendOtpRedux'
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
// Styles
import styles from './Styles/AuthScreenStyles'

const codeLength = 4
var isSendAuth = false
var timeoutOtp
class AuthScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codeArr: new Array(codeLength).fill(''),
      currentIndex: 0,
      isRequestOtp: true
    };

    this.codeInputRefs = [];
  }

  componentDidMount(){
    let that = this
    timeoutOtp = setTimeout(function(){that.setState({isRequestOtp: false})}, 60000)
  }

  componentWillUnmount(){
    clearTimeout(timeoutOtp)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.auth !== newProps.auth) {
      if (
        newProps.auth.payload !== null &&
        newProps.auth.error === null &&
        !newProps.auth.fetching && isSendAuth
      ) {
          isSendAuth = false
          this.clear()
          this.actNavigate('MainScreen')
        }
      else if (
        newProps.auth.payload === null &&
        newProps.auth.error !== null &&
        !newProps.auth.fetching && isSendAuth
      ) {
        isSendAuth = false
        this.clear()
        Alert.alert(
          '',
          'Tolong Masukkan Kode Verifikasi Dengan Benar',
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

  clear() {
    this.setState({
      codeArr: new Array(codeLength).fill(''),
      currentIndex: 0
    });
  }

  _setFocus(index) {
    this.codeInputRefs[index].focus();
  }

  _blur(index) {
    this.codeInputRefs[index].blur();
  }

  _onFocus(index) {
    let newCodeArr = _.clone(this.state.codeArr);
    const currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this._setFocus(currentEmptyIndex);
    }
    for (const i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    }

    this.setState({
      codeArr: newCodeArr,
      currentIndex: index
    })
  }

  _onInputCode(character, index) {
    let newCodeArr = _.clone(this.state.codeArr);
    newCodeArr[index] = character;

    if (index == codeLength - 1) {
      this._blur(this.state.currentIndex);
      setTimeout(() => {
        this.onFulfill()
      }, 200);
    } else {
      this._setFocus(this.state.currentIndex + 1);
    }

    this.setState(prevState => {
      return {
        codeArr: newCodeArr,
        currentIndex: prevState.currentIndex + 1
      };
    });
  }

  _onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      const { currentIndex } = this.state;
      let newCodeArr = _.clone(this.state.codeArr);
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      for (const i in newCodeArr) {
        if (i >= nextIndex) {
          newCodeArr[i] = '';
        }
      }
      this._setFocus(nextIndex);
    }
  }

  onFulfill(){
    Keyboard.dismiss()
    const code = this.state.codeArr.join('');
    if(code.length < 4){
      Alert.alert(
        '',
        'Tolong masukkan kode verifikasi terlebih dahulu',
        [
          {
            text: 'OK'
          }
        ],
        { cancelable: false }
      )
      return;
    }
    // this.props.navigation.navigate('App');
    let data ={
      data_request: {
        phone_number: this.props.sendOtp.data.data_request.phone_number,
        user_id: this.props.sendOtp.data.data_request.user_id,
        otp_number: code,
      }
    }
    this.props.authProcess(data)
    isSendAuth = true
  }

  requestOtp(){
    let data ={
      data_request: {
        phone_number: this.props.sendOtp.data.data_request.phone_number,
        user_id: this.props.sendOtp.data.data_request.user_id,
      }
    }
    this.setState({
      isRequestOtp: true
    })
    timeoutOtp = setTimeout(() => {
      this.setState({
        isRequestOtp: false
      })
    }, 30000);
    this.props.sendOtpProcess(data)
  }

  render () {
    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      const id = i;
      codeInputs.push(
        <TextInput
          key={id}
          ref={ref => (this.codeInputRefs[id] = ref)}
          style={[
            styles.codeInput
          ]}
          underlineColorAndroid="transparent"
          selectionColor={Colors.mooimom}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          onFocus={() => this._onFocus(id)}
          value={this.state.codeArr[id] ? this.state.codeArr[id].toString() : ''}
          onChangeText={text => this._onInputCode(text, id)}
          onKeyPress={(e) => this._onKeyPress(e)}
          maxLength={1}
        />
      )
    }
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
          <View style={styles.loginContainer}>
            <KeyboardAvoidingView>
              <Text style={styles.caption1}>Masukkan kode SMS verifikasi</Text>
              <View style={styles.textInput}>
                {codeInputs}
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.onFulfill()}
              >
                <Text style={styles.btnText}>Verifikasi</Text>
              </TouchableOpacity>
              <View style={styles.SignUpContainer}>
                {!this.state.isRequestOtp && <TouchableOpacity onPress={() => this.requestOtp()}>
                  <Text style={styles.textSignIn}>Kirim ulang kode verifikasi</Text>
                </TouchableOpacity>}
              </View>
            </KeyboardAvoidingView>
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
    auth: state.auth,
    sendOtp: state.sendOtp
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authProcess: data => {
      dispatch(AuthActions.authRequest(data))
    },
    sendOtpProcess: data => {
      dispatch(SendOtpActions.sendOtpRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen)
