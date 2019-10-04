import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 100
  },
  wrapperSeparator:{
    marginTop: 10,
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
    fontSize: Metrics.fontSize1
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
  notificationContainer:{
    width: Metrics.screenWidth - 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  leftNotif:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  colorNotif:{
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  rightNotif:{
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex:1
  },
  textDateNotif:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham5,
    fontSize: Metrics.fontSize1,
    textAlign: 'right',
    paddingTop: 10
  },
  textNotif:{
    marginLeft: 10,
    color:Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
  },
  imgMenu2:{
    width: 10 * Metrics.screenWidth / 320,
    height: 10 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    marginHorizontal: 10
  },
  notifContainer:{
    width: 16 * Metrics.screenWidth / 320,
    height: 16 * Metrics.screenWidth / 320,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -7,
    top: -7,
    borderRadius: 8 * Metrics.screenWidth / 320,
    backgroundColor: Colors.fire,
    flex: 1,
    flexWrap: 'nowrap'
  },
  textNotif2:{
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham2,
    color: Colors.white,
  },
})
