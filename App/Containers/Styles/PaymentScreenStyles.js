import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 100,
  },
  wrapperSeparator:{
    marginTop: 20,
  },
  headerWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: Metrics.screenWidth,
    marginTop: 20,
    height: 40
  },
  btnHeader:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  searchButton:{
    width: Metrics.screenWidth - 100,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSearch:{
    height:20,
    width:20,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  textSearch:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham5,
    fontSize: 12
  },
  btnHeader:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  contentContainer:{
    flexDirection:'row',
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20,
  },
  saldoContainer:{
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    width: Metrics.screenWidth - 40,
    height: 100,
    justifyContent: 'center',
    paddingLeft: 20
  },
  textSaldo:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 16,
    marginVertical: 3
  },
  textSaldoAmount:{
    color:Colors.mooimom,
    fontSize: 24,
    fontFamily: Fonts.type.gotham4,
    marginVertical: 3
  },
  containerMenu:{
  },
  btnEditProfile:{
    backgroundColor: Colors.mooimom,
    width: Metrics.screenWidth - 40,
    height:40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textEditProfile:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14
  },
  menu:{
    borderTopWidth: 0.5,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItem:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 20
  },
  btnMenu:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imgText:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: 13,
    marginBottom: 5,
  },
  imgTextBold:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 13,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 5,
  }
})
