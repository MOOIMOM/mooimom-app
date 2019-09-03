import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/SignupScreenStyles'

class SignupScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: ''
    }
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.mooimomLogoWhite} style={styles.title}/>
        <View style={styles.signUpContainer}>
          <KeyboardAvoidingView>
            <Text style={styles.caption1}>Buat Akun Mooimom Sekarang</Text>
            <View style={styles.textInput}>
              <TextInput style={styles.textTextInput}
                // onFocus={() => this.onFocus1()}
                // onBlur={() => this.onBlur()}
                onChangeText={phone => this.setState({ phone })}
                autoCapitalize='none'
                keyboardType='phone-pad'
                value={this.state.phone}
                returnKeyType='done'
                placeholder='No Handphone'
                underlineColorAndroid='transparent'
                placeholderTextColor='white'
                selectionColor='white'
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.actNavigate('AuthScreen')}
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
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)
