import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
    height: Metrics.screenHeight / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemHeroBanner: {
    marginTop:30 *Metrics.screenWidth / 320,
    width: Metrics.screenWidth,
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
    fontSize:Metrics.fontSize6,
    textAlign: 'center',
    marginBottom: 10,
  },
  desc:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham1,
    fontSize: Metrics.fontSize3,
    lineHeight: Metrics.fontSize4,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  bottom:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom3:{
    flex: 1,
    alignItems: 'center',
  },
  gotoText:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize4,
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
