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
    marginTop: 10,
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
    fontSize:Metrics.fontSize1
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
    width: 60 * Metrics.screenWidth / 320,
    height: 60 * Metrics.screenWidth / 320,
    borderRadius: 30 * Metrics.screenWidth / 320
  },
  textPhone:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3
  },
  btnEditProfile:{
    backgroundColor: Colors.mooimom,
    width: Metrics.screenWidth / 3,
    height:30 * Metrics.screenWidth / 320,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textEditProfile:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2
  },
  saldoContainer:{
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    width: Metrics.screenWidth - 40,
    paddingVertical: 10,
    justifyContent: 'center',
    paddingLeft: 20
  },
  textSaldo:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize4,
    marginVertical: 3
  },
  textSaldoAmount:{
    color:Colors.mooimom,
    fontSize: Metrics.fontSize5,
    fontFamily: Fonts.type.gotham4,
    marginVertical: 3
  },
  containerMenu:{

  },
  menu:{
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 10,
    paddingLeft: 20,
  },
  btnMenu:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgMenu:{
    width: 20* Metrics.screenWidth / 320,
    height:20* Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  leftContainerMenu:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgMenu2:{
    width: 10 * Metrics.screenWidth / 320,
    height: 10 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    marginRight: 10
  },
  imgText:{
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
    marginLeft: 20
  },
  viewOut:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  viewIn:{
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight / 2,
    top:Metrics.screenHeight / 4,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20
  },
  viewTextLine:{
    alignItems: 'center',
    marginBottom: 30,
  },
  textModalLine:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize3,
  },
  viewBtn:{
    backgroundColor: Colors.mooimom,
    borderRadius: 5,
    height: 30* Metrics.screenWidth / 320,
    width: Metrics.screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  viewBtn2:{
    backgroundColor: Colors.fire,
    borderRadius: 5,
    height: 30* Metrics.screenWidth / 320,
    width: Metrics.screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textModal:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
  }
})
