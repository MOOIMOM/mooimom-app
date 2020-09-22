import React, { Component } from 'react'
import { Modal, Text, View } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import { NetworkContext } from '../Components/NetworkProvider'

export default class LowConnectionAlert extends Component {
  static contextType = NetworkContext

  render() {
    if (!this.context.isConnected) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!this.context.isConnected}
        >
          <View style={{ width: Metrics.screenWidth, height: Metrics.screenHeight, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: Colors.fire, width: '70%', borderRadius: 5, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white }}>Koneksi Internet Anda Bermasalah</Text>
            </View>
          </View>
        </Modal>
      )
    }
    else { return (<View />) }
  }
}