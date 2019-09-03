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
    height: 60,
    width: Metrics.screenWidth - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 24,
  },
  title:{
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
    flex:3,
    justifyContent: 'center',
  },
  caption1:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
    fontSize: 50,
  },
  caption2:{
    color: Colors.white,
    fontWeight: 'bold',
    fontFamily: Fonts.type.gotham1,
    fontSize: 54,
  },
  caption3:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham3,
    fontSize: 25,
  },
})
