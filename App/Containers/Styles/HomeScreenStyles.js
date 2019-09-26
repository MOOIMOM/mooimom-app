import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    flex: 1,
    paddingTop: 0,
  },
  backgroundHeader: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
    position:'absolute',
    alignSelf: "center",
    alignContent: "center",
    top: Metrics.screenHeight * -0.17,
    backgroundColor: Colors.mooimom,
    borderRadius: Metrics.screenWidth / 2,
    transform: [{ scaleX: 2 }, { scaleY: 0.5 }],
    flex: 1
  },
  wrapperSeparator:{
    marginTop: 10,
    flex: 1
  },
  subTitleWrapper:{
    fontSize: 16 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    color: Colors.mooimom,
    marginBottom: 10
  },
  headerWrapper:{
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    flex: 1
  },
  headerWrapper1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20
  },
  logo:{
    width: Metrics.screenWidth / 3,
    maxHeight: 30,
    resizeMode: 'contain',
  },
  headerButtonLeft:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerButtonRight:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonHeader:{
    height: 18 * Metrics.screenWidth / 320,
    width: 18 * Metrics.screenWidth / 320,
    marginLeft: 18,
    resizeMode: 'contain'
  },
  buttonHeader2:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    marginLeft: 15,
    resizeMode: 'contain'
  },
  headerWrapper2:{
    alignItems: 'center',
    backgroundColor: Colors.mooimom,
    paddingBottom: 10
  },
  searchButton:{
    width: Metrics.screenWidth - 40,
    height: 40,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center'
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
  heroBannerWrapper:{
    flex:1
  },
  itemHeroBanner: {
    width: Metrics.screenWidth - 60,
    height: 180,
  },
  imageContainerHeroBanner: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  imageHeroBanner: {
    resizeMode: 'contain',
  },
  paginationDotStyleHeroBanner: {
      width: 8,
      height: 8,
      borderRadius: 5,
      backgroundColor: Colors.black
  },
  paginationContainerStyleHeroBanner: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    top: -15
  },
  paginationDotContainerStyleHeroBanner: {
    marginHorizontal:2
  },
  categoryWrapper:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.screenWidth - 40,
    marginLeft: 20
  },
  catButton:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: (Metrics.screenWidth - 40) / 4
  },
  catImage:{
    height: 50,
    width:50,
    resizeMode: 'contain'
  },
  catText:{
    color:Colors.gray,
    flexWrap: 'wrap',
    textAlign: 'center',
    maxWidth: (Metrics.screenWidth - 40) / 4,
    paddingHorizontal: 9,
    fontSize: 10,
    marginTop: 10,
    fontFamily: Fonts.type.gotham2,
  },
  productWrapper:{
    flex:1,
    width: Metrics.screenWidth - 40,
    flexGrow: 1,
    marginHorizontal: 20
  },
  productContainer:{
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})
