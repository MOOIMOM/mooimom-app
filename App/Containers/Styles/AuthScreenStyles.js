import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
    backgroundColor: Colors.mooimom,
    alignItems: 'center',
    color:Colors.white
  },
  linergradient:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignItems: 'center',
  },
  title:{
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
    flex:3,
  },
  loginContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:4,
    marginBottom: 20
  },
  button:{
    backgroundColor: Colors.white,
    height: 40 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    color: Colors.mooimom,
    fontSize: 15 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
  },
  caption1:{
    color:Colors.white,
    fontSize: 16 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
    textAlign: 'center',
    alignItems: 'center'
  },
  SignUpContainer:{
    flexDirection: 'row',
    flex:1,
    marginTop: 10,
    justifyContent: 'center'
  },
  caption2:{
    color:Colors.white,
    fontSize: 15 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
  },
  textSignIn:{
    color:Colors.white,
    fontSize: 15 * Metrics.screenWidth / 320,
    textDecorationLine:'underline',
    fontFamily: Fonts.type.gotham2,
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
    justifyContent: 'space-around'
  },
  codeInput:{
    flex:1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.mooimom,
    fontSize: 20 * Metrics.screenWidth / 320,
    backgroundColor: Colors.white,
    borderRadius: 10,
    fontFamily: Fonts.type.gotham4,
  },
})
