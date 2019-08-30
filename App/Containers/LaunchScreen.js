import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableOpacity, Image } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  actionGo () {
    const { navigate } = this.props.navigation
    navigate('SignupScreen', {})
  }
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={Images.opening} style={styles.backgroundImage}>
            <Image source={Images.mooimomLogo} style={styles.title}/>
            <Text style={styles.caption1}>
            Mulai Berbagi{"\n"}
            & Dapatkan
            </Text>
            <Text style={styles.caption2}>
            Penghasilan!
            </Text>
            <Text style={styles.caption3}>
            Sharing & Earn The Money
            </Text>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.actionGo()}
              >
                <Text style={styles.btnText}>Mulai</Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
    )
  }
}
