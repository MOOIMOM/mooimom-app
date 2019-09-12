import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native'
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
    const { navigate } = this.props.navigation
    setTimeout(() => {
      navigate('LaunchScreen')
    }, 1000);
  }

  render () {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#82DED2', '#66CCCC']} style={styles.linergradient}>
          <Image source={Images.mooimomLogoWhite} style={styles.title}/>
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
)(SplashScreen)
