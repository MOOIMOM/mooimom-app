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
  backgroundImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3,
    position:'absolute',
    resizeMode: 'cover',
    top: 0,
    left: 0
  },
  wrapperSeparator:{
    marginTop: 10,
  },
  subTitleWrapper:{
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.mooimom,
    marginBottom: 10
  },
  headerWrapper:{
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10
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
    height: 25,
    width: 25,
    marginLeft: 10,
    resizeMode: 'contain'
  },
  headerWrapper2:{
    alignItems: 'center'
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
    fontStyle: 'italic'
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
    justifyContent: 'space-around',
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20
  },
  catButton:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: Metrics.screenWidth / 5
  },
  catImage:{
    height: 35,
    resizeMode: 'contain'
  },
  catText:{
    color:Colors.gray,
    flexWrap: 'wrap',
    textAlign: 'center',
    maxWidth: 70,
    fontSize: 10,
    marginTop: 10
  },
  productWrapper:{
    flex:1,
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20
  },
  menuWrapper:{
    position:'absolute',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    bottom: 0,
    left: 0,
    height: 70,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  menuButton:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuText:{
    color:Colors.gray
  },
  menuImage:{
    height: 25,
    resizeMode: 'contain'
  }
})
