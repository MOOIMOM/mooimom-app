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
    paddingHorizontal: 20
  },
  imageSearch:{
    height:20,
    width:20,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  textSearch:{
    width: Metrics.screenWidth - 140,
    height: 40,
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
  modalShareView:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.modal,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalShareContainer:{
    width: Metrics.screenWidth / 2,
    height: Metrics.screenHeight / 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center'
  },
  modalShareText:{
    fontFamily: Fonts.type.gotham4,
    color: Colors.mooimom
  },
  modalShareText2:{
    fontFamily: Fonts.type.gotham4,
    color: Colors.gray
  },
  containerLoading:{
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
