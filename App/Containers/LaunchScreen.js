import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alreadySeenHowTo: 'not_yet'
    }
  }

  componentDidMount() {
    this.getData()
  }

  actionGo() {
    if (this.state.alreadySeenHowTo === 'already') {
      const { navigate } = this.props.navigation
      navigate('SignupScreen', {})
    }
    else {
      const { navigate } = this.props.navigation
      navigate('HowtoScreen', {})
    }
  }

  async getData() {
    AsyncStorage.getItem('already_seen_howtoscreen').then((value) => {
      if (value !== '' || value) {
        if (value === 'already') {
          this.setState({ alreadySeenHowTo: 'already' })
        }
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={Images.opening} style={styles.backgroundImage}>
          <Image source={Images.mooimomLogo} style={styles.title} />
          <View style={styles.container2}>
            <Text style={styles.caption1}>
              Work From
              </Text>
            <Text style={styles.caption2}>
              Home
              </Text>
            <Text style={styles.caption3}>
              Berbagi & Dapatkan Gaji
              </Text>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.actionGo()}
              >
                <Text style={styles.btnText}>Mulai</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}
