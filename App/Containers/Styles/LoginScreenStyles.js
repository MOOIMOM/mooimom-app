import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
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
    alignItems: 'center'
  },
  btnText:{
    color: Colors.mooimom,
    fontSize: 18 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
  },
  caption1:{
    color:Colors.white,
    fontSize: 16 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
    textAlign: 'center'
  },
  SignUpContainer:{
    flexDirection: 'row',
    flex:1,
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center'
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
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  number62:{
    color: Colors.white,
    fontSize: 16 * Metrics.screenWidth / 320,
    fontStyle: 'italic',
    fontFamily: Fonts.type.gotham1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width:50,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    height:45,
    paddingTop:10,
    marginLeft:-60,
    marginRight:10
  },
  textTextInput:{
    color: Colors.white,
    fontSize: 16 * Metrics.screenWidth / 320,
    fontStyle: 'italic',
    fontFamily: Fonts.type.gotham1,
  },
})
