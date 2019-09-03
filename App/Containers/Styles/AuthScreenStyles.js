import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
    backgroundColor: Colors.mooimom,
    alignItems: 'center',
    color:Colors.white
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
    height: 60,
    width: Metrics.screenWidth - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    color: Colors.mooimom,
    fontSize: 20,
    fontFamily: Fonts.type.gotham4,
  },
  caption1:{
    color:Colors.white,
    fontSize: 20,
    fontFamily: Fonts.type.gotham3,
    textAlign: 'center',
    alignItems: 'center'
  },
  SignUpContainer:{
    flexDirection: 'row',
    flex:1,
    marginTop: 20,
    justifyContent: 'center'
  },
  caption2:{
    color:Colors.white,
    fontSize: 20,
    fontFamily: Fonts.type.gotham2,
  },
  textSignIn:{
    color:Colors.white,
    fontSize: 20,
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
    fontSize: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    fontFamily: Fonts.type.gotham4,
  },
})