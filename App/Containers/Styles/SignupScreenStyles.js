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
  signUpContainer:{
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
  },
  SignInContainer:{
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
  textSignUp:{
    color:Colors.white,
    fontSize: 20,
    textDecorationLine:'underline',
    fontFamily: Fonts.type.gotham2,
  },
  textInput: {
    width: Metrics.screenWidth * 0.8,
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    marginTop: 30,
    marginBottom: 50
  },
  textTextInput:{
    color: Colors.white,
    fontSize: 18,
    fontStyle: 'italic',
    fontFamily: Fonts.type.gotham3,
  },
})
