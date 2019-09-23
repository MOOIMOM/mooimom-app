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
  itemHeroBanner: {
    width: Metrics.screenWidth,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageHeroBanner: {
    resizeMode: 'contain',
    width: Metrics.screenWidth,
    height: Metrics.screenWidth - 60,
  },
  title:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize:18,
    textAlign: 'center',
    marginBottom: 20
  },
  desc:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize:14,
    textAlign: 'center'
  },
  paginationDotStyleHeroBanner: {
      width: 8,
      height: 8,
      borderRadius: 5,
      backgroundColor: Colors.mooimom
  },
  paginationContainerStyleHeroBanner: {
    marginTop: 40,
    paddingHorizontal: 0,
  },
  paginationDotContainerStyleHeroBanner: {
    marginHorizontal:2
  },
})
