import React from 'react'

import LinearGradient from 'react-native-linear-gradient'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Metrics, Images, Colors, Fonts } from '../Themes'
import { isIphoneXorAbove } from '../Lib/utils'

export default class BeOurMerchantScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#28C9B9',
        alignItems: 'center',
        color: Colors.white
      }}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#7CE0D3', '#28C9B9']} style={{
            width: Metrics.screenWidth,
            height: Metrics.screenHeight,
            alignItems: 'center',
          }}>
            <View style={{ width: '96%', alignItems: 'flex-start', alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
                position: 'absolute', zIndex: 1,
                marginTop: isIphoneXorAbove() ? 40 : 20, marginLeft: 10,
                width: 30, height: 30, borderRadius: 20,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: Colors.white, shadowColor: '#CCCCCC', shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <Image source={Images.back} style={{
                  height: 12 * Metrics.screenWidth / 320,
                  width: 12 * Metrics.screenWidth / 320,
                  resizeMode: 'contain'
                }} />
              </TouchableOpacity>
            </View>
            <View style={{ height: Metrics.screenHeight, width: Metrics.screenWidth, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize5, marginBottom: 20 }}>Be Our Merchant!</Text>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize4, marginBottom: 10 }}>Contact:</Text>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize4 }}>Ms Fallin 0818-681-948</Text>
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize4 }}>Ms Nurus 0811-8701-562</Text>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    )
  }
}