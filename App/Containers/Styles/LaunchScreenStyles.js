import { StyleSheet } from 'react-native'
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
    flex:1,
    marginBottom: 20
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
  title:{
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
    flex:3,
    justifyContent: 'center',
  },
  caption1:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham3,
    fontSize: 35 * Metrics.screenWidth / 320,
    letterSpacing: -3,
    marginLeft:40,
    alignSelf:'flex-start',
  },
  caption2:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham1,
    fontWeight:'500',
    letterSpacing: -1,
    alignSelf:'flex-start',
    marginLeft:40,
    marginTop:-5,
    fontSize: 40 * Metrics.screenWidth / 320,
  },
  caption3:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham3,
    alignSelf:'flex-start',
    marginLeft:40,
    letterSpacing: -1,
    marginTop:35,
    fontSize: 21 * Metrics.screenWidth / 320,
  },
})
