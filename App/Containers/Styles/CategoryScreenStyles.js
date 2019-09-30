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
    top: Metrics.screenHeight * -0.27,
    backgroundColor: Colors.mooimom,
    borderRadius: Metrics.screenWidth / 2,
    transform: [{ scaleX: 2 }, { scaleY: 0.25}],
    flex: 1
  },
  wrapperSeparator:{
    marginTop: 10,
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
  contentContainer:{
    flexDirection:'row',
    width: Metrics.screenWidth - 20,
    marginHorizontal: 10,
  },
  leftContainer:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
    paddingRight: 1
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
    fontSize: Metrics.fontSize2,
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
    width: Metrics.screenWidth / 5,
    height: Metrics.screenWidth / 5,
    marginBottom:10
  },
  productText:{
    fontSize: Metrics.fontSize1,
    lineHeight: 11 * Metrics.screenWidth / 320,
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 6,
    fontFamily: Fonts.type.gotham2,
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
    fontSize: Metrics.fontSize1
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
    fontSize: Metrics.fontSize1,
    textShadowRadius:0,
  },
  bottomContainer:{
    marginHorizontal: 10,
    height: Metrics.screenHeight - 200
  },
  subtitleCategory:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    marginVertical: 10
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
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoading2:{
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
