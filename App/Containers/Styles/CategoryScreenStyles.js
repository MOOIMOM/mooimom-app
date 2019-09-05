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
  backgroundHeader: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
    position:'absolute',
    alignSelf: "center",
    alignContent: "center",
    top: Metrics.screenHeight * -0.17,
    backgroundColor: Colors.mooimom,
    borderRadius: Metrics.screenWidth / 2,
    transform: [{ scaleX: 2 }, { scaleY: 0.5 }]
  },
  wrapperSeparator:{
    marginTop: 10,
  },
  headerWrapper:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  searchButton:{
    width: Metrics.screenWidth - 20,
    height: 40,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
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
  },
  headerWrapper2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    width: Metrics.screenWidth,
    marginTop: 20,
    height: 40
  },
  searchButton2:{
    width: Metrics.screenWidth - 100,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnHeader:{
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader:{
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  contentContainer:{
    flexDirection:'row',
    width: Metrics.screenWidth - 20,
    marginHorizontal: 10,
  },
  leftContainer:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    height: Metrics.screenHeight - 150,
    borderRadius: 10
  },
  categoryView:{
    paddingVertical: 10 * Metrics.screenWidth / 320,
    paddingLeft: 10 * Metrics.screenWidth / 320,
    flexWrap: 'wrap'
  },
  categoryView2:{
    paddingVertical: 10 * Metrics.screenWidth / 320,
    paddingLeft: 10 * Metrics.screenWidth / 320,
    flexWrap: 'wrap',
    borderRightWidth: 3,
    borderRightColor: Colors.mooimom,
    backgroundColor: Colors.white
  },
  categoryText:{
    fontSize: 11 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
  },
  rightContainer:{
    flex:2,
    marginLeft: 5,
    paddingLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: Metrics.screenHeight - 150,
    backgroundColor: Colors.white,
    borderRadius: 10
  },
  subCategoryHeaderText:{
    fontFamily: Fonts.type.gotham4,
    color: Colors.mooimom,
    fontSize: 12 * Metrics.screenWidth / 320,
    marginBottom: 10
  },
  productRow:{
    flexDirection: 'row',
    marginBottom: 10
  },
  productContainer:{
    width: Metrics.screenWidth / 5,
  },
  productImage:{
    resizeMode: 'contain',
    width: Metrics.screenWidth / 5,
    height: Metrics.screenWidth / 5,
  },
  productText:{
    fontSize: 9 * Metrics.screenWidth / 320,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  contentContainer2:{
    width: Metrics.screenWidth - 20,
    marginHorizontal: 10,
  },
  topContainer:{
    height:65,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gray
  },
  btnTopCategories:{
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    maxWidth: Metrics.screenWidth / 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.mooimom
  },
  textBtnTopCategories:{
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 9 * Metrics.screenWidth / 320
  },
  btnTopCategoriesSelected:{
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mooimom,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    maxWidth: Metrics.screenWidth / 4,
    height: 50
  },
  textBtnTopCategoriesSelected:{
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 9 * Metrics.screenWidth / 320
  },
  bottomContainer:{
    marginHorizontal: 10,
    height: Metrics.screenHeight - 200
  },
  subtitleCategory:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 18 * Metrics.screenWidth / 320,
    marginVertical: 10
  }
})
