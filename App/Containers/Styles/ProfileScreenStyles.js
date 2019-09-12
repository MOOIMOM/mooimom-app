import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 160
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
  topView:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topLeftView:{
    justifyContent: 'center'
  },
  topRightView:{
    justifyContent: 'center'
  },
  imgProfile:{
    width: 90,
    height: 90,
    resizeMode: 'contain'
  },
  textPhone:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 20
  },
  btnEditProfile:{
    backgroundColor: Colors.mooimom,
    width: Metrics.screenWidth / 3,
    height:35,
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
  menu:{
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
    paddingLeft: 20,
  },
  btnMenu:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imgMenu:{
    width: 35,
    height:35,
    resizeMode: 'contain'
  },
  imgText:{
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: 16,
    marginLeft: 20
  }
})
