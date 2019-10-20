import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
  },
  backgroundImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignItems: 'center'
  },
  btnArea:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45 * Metrics.screenWidth / 320,
  },
  title:{
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
    marginTop: 30 * Metrics.screenWidth / 320,
    flex:1,
    justifyContent: 'center',
  },
  container2:{
    flex: 5,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth - 80,
  },
  caption1:{
    color: Colors.white,
    width: Metrics.screenWidth - 80,
    fontFamily: Fonts.type.gotham3,
    fontSize: 43 * Metrics.screenWidth / 320,
    letterSpacing: -1,
    marginBottom:Platform.OS === 'ios' ? -10 : -25 * Metrics.screenWidth / 320,
  },
  caption2:{
    color: Colors.white,
    width: Metrics.screenWidth - 80,
    fontFamily: Fonts.type.gotham3,
    fontWeight:'900',
    fontSize: Platform.OS === 'ios' ? 80 * Metrics.screenWidth / 320 : 87 * Metrics.screenWidth / 320,
  },
  caption3:{
    color: Colors.white,
    width: Metrics.screenWidth - 80,
    fontFamily: Fonts.type.gotham3,
    letterSpacing: -1,
    marginTop:-15 * Metrics.screenWidth / 320,
    marginBottom:5,
    fontSize: 21 * Metrics.screenWidth / 320,
  },
  button:{
    backgroundColor: Colors.mooimom,
    height: 40 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 20 * Metrics.screenWidth / 320,
  },
})
