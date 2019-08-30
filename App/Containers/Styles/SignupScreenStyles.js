import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

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
    fontWeight: 'bold',
    fontSize: 20,
  },
  caption1:{
    color:Colors.white,
    fontSize: 20
  },
  SignInContainer:{
    flexDirection: 'row',
    flex:1,
    marginTop: 20
  },
  caption2:{
    color:Colors.white,
    fontSize: 20
  },
  textSignUp:{
    color:Colors.white,
    fontSize: 20,
    textDecorationLine:'underline'
  },
  textInput: {
    width: Metrics.screenWidth * 0.8,
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    marginBottom: 50,
  },
  textTextInput:{
    color: Colors.white,
    fontSize: 18
  },
})
