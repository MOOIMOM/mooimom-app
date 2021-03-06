import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Alert, AsyncStorage } from 'react-native'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
// Styles
import styles from './Styles/SplashScreenStyles'

class SplashScreen extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount(){
    AsyncStorage.getItem('reducerVersion').then((localVersion) => {
      if(!localVersion){
        setTimeout(() => {
          this.actNavigate('Auth')
        }, 1000);
      }
    })
  }

  componentWillReceiveProps (newProps) {
    if (this.props.auth !== newProps.auth) {
      if (
        newProps.auth.payload !== null &&
        newProps.auth.error === null &&
        !newProps.auth.fetching
      ) {
        setTimeout(() => {
          this.actNavigate('MainScreen')
        }, 1000);
        return;
        }
      else if (this.props.sendOtp !== newProps.sendOtp) {
          if (
            newProps.sendOtp.payload !== null &&
            newProps.sendOtp.error === null &&
            !newProps.sendOtp.fetching &&
            newProps.sendOtp.payload.success === 1
          ) {
              setTimeout(() => {
                this.actNavigate('AuthScreen')
              }, 1000);
              return;
            } else {
              setTimeout(() => {
                this.actNavigate('Auth')
              }, 1000);
            }
        }
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  render () {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#7CE0D3', '#28C9B9']} style={styles.linergradient}>
          <Image source={Images.mooimomLogoWhite} style={styles.title}/>
        </LinearGradient>
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

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen)
