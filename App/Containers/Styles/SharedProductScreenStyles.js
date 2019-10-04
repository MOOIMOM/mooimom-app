import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 140
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
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20,
  },
  productContainer:{
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  menuStatus:{
    marginTop:10,
    flexDirection: 'row'
  },
  menuBtn:{
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
  },
  menuBtn2:{
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.mooimom,
    backgroundColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText2:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
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
  textNotif:{
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham2,
    color: Colors.white,
  },
})
