import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 110
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
    marginTop:20 *Metrics.screenWidth / 320,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 2,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHeroBanner: {
    resizeMode: 'contain',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 2,
  },
  title:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize:Metrics.fontSize4,
    textAlign: 'center',
    marginBottom: 20
  },
  desc:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
    textAlign: 'center'
  },
  paginationDotStyleHeroBanner: {
      width: 8 * Metrics.screenWidth / 320,
      height: 8 * Metrics.screenWidth / 320,
      borderRadius: 4 * Metrics.screenWidth / 320,
      backgroundColor: Colors.mooimom
  },
  paginationContainerStyleHeroBanner: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
  paginationDotContainerStyleHeroBanner: {
    marginHorizontal:2
  },
})
