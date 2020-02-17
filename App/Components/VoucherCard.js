import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Colors, Fonts, Metrics } from '../Themes'
import FastImage from 'react-native-fast-image'
import { isIphoneXorHigher } from '../Lib/utils'


export default class VoucherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={{
        alignSelf: 'center',
        width: '88%', height: 180 * Metrics.screenWidth / 320,
        backgroundColor: Colors.white,
        borderRadius: 10,
        shadowColor: '#CCCCCC',
        marginBottom: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <FastImage source={this.props.voucherImage} style={{ width: '100%', height: 140 * Metrics.screenWidth / 320, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
        <View style={{ height: 40 * Metrics.screenWidth / 320, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', width: '90%', alignItems: 'center' }}>
          <View style={{ flex: 2 }}>
            <Text style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.black }}>Masa berlaku</Text>
            <Text style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.black }}>{this.props.expireDate}</Text>
          </View>

          <View style={{ flex: 0.5, height: 30, borderLeftWidth: 0.5, borderColor: Colors.mediumGray }} />

          <View style={{ flex: 1.5 }}>
            <Text style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.black }}>{this.props.minimalTransaction}</Text>
          </View>
        </View>
      </View>
    )
  }
}
