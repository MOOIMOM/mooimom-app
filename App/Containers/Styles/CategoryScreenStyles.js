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
    top: Metrics.screenHeight * -0.37,
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
  contentContainer:{
    flexDirection:'row',
    width: Metrics.screenWidth - 20,
    marginHorizontal: 10
  },
  leftContainer:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    minHeight: Metrics.screenHeight,
    borderRadius: 15
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
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
  },

  rightContainer:{
    flex:2,
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: Metrics.screenHeight - (120 * Metrics.screenWidth / 320)
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
  }
})
