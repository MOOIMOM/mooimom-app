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
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
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
  containerMenu:{

  },
  menu:{
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  leftContainerMenu:{
    flexDirection: 'row'
  },
  contactContainer:{
    flexDirection: 'column',
    marginLeft: 20
  },
  btnMenu:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imgMenu:{
    width: 35,
    height:35,
    resizeMode: 'contain'
  },
  imgMenu2:{
    width: 20,
    height:20,
    resizeMode: 'contain'
  },
  imgText:{
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: 16,
  },
  imgText2:{
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: 14,
  },
  imgText3:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: 16,
  },
  menuBottom:{
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
