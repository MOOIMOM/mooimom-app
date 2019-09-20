import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - (Metrics.screenHeight / 3)
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
    fontSize:12
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
  menuStatus:{
    marginTop:10
  },
  menuBtn:{
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14,
  },
  menuBtn2:{
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.mooimom,
    backgroundColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText2:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14,
  },
})
