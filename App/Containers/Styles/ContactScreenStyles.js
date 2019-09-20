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
    fontSize:12
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
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight:10
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
    width: 25,
    height:25,
    resizeMode: 'contain'
  },
  imgMenu2:{
    width: 10,
    height:10,
    resizeMode: 'contain'
  },
  imgText:{
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: 13,
  },
  imgText2:{
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: 13,
  },
  imgText3:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: 13,
  },
  menuBottom:{
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
