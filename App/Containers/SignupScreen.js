import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
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
        <LinearGradient colors={['#82DED2', '#66CCCC']} style={styles.linergradient}>
          <Image source={Images.mooimomLogoWhite} style={styles.title}/>
          <View style={styles.signUpContainer}>
            <KeyboardAvoidingView>
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
        </LinearGradient>
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
