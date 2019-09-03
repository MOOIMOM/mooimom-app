import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
    alignItems: 'flex-start'
  },
  wrapperSeparator:{
    marginVertical: 10,
  },
  headerWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  headerButtonLeft:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerButtonCenter:{
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerButtonRight:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonHeader:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  searchButton:{
    width: Metrics.screenWidth / 1.8,
    height: 30 * Metrics.screenWidth / 320,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageSearch:{
    height:15 * Metrics.screenWidth / 320,
    width:15 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  textSearch:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham5,
    fontSize: 9 * Metrics.screenWidth / 320
  },
  productContainer:{
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight - (110 * Metrics.screenWidth / 320),
    marginHorizontal: 20,
    paddingTop: 0,
  },
  productImageWrapper:{

  },
  productImage:{
    width: Metrics.screenWidth - 40,
    height: Metrics.screenWidth - 40,
    resizeMode: 'contain'
  },
  paginationDotStyleImage: {
      width: 8,
      height: 8,
      borderRadius: 5,
      backgroundColor: Colors.black
  },
  paginationContainerStyleImage: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    top: -15
  },
  paginationDotContainerStyleImage: {
    marginHorizontal:2
  },
  wishlistBtn:{
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  wishlistImage:{
    width: 50 * Metrics.screenWidth / 320,
    height: 50 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  productDescriptionWrapper:{

  },
  productCode:{
    fontSize: 10 * Metrics.screenWidth / 320,
    color: Colors.lightGray,
    fontFamily: Fonts.type.gotham2,
  },
  productName:{
    fontSize: 14 * Metrics.screenWidth / 320,
    color: Colors.black,
    marginTop: 5,
    fontFamily: Fonts.type.gotham4,
  },
  priceGroup:{
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  productPrice:{
    fontSize: 14 * Metrics.screenWidth / 320,
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
  },
  productPriceDiscount:{
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    textDecorationLine: 'line-through',
    marginLeft: 20
  },
  shareSocialWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareSocialButton:{
    width: Metrics.screenWidth / 3.5,
    height: 50 * Metrics.screenWidth / 320,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5
  },
  shareSocialImage:{
    width: 25 * Metrics.screenWidth / 320,
    height: 25 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  shareSocialText:{
    fontSize: 10 * Metrics.screenWidth / 400,
    fontFamily: Fonts.type.gotham2,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    flex:2
  },
  descriptionWrapper:{
    borderTopWidth: 1,
    borderColor: Colors.gray,
    paddingVertical: 20,
    borderBottomWidth: 1
  },
  descriptionHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productSubtitle:{
    fontSize: 14 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  btnCopy:{
    width: 60 * Metrics.screenWidth / 320,
    height: 25 * Metrics.screenWidth / 320,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textCopy:{
    fontSize: 14 * Metrics.screenWidth / 320,
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
  },
  productDescriptionText:{
    flexWrap: 'wrap',
    fontSize: 12 * Metrics.screenWidth / 320,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham3,
  },
  colorWrapper:{
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingVertical: 20,
  },
  colorContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  colorButton:{
    width:30 * Metrics.screenWidth / 320,
    height:30 * Metrics.screenWidth / 320,
    marginRight: 10,
    marginVertical: 5,
  },
  colorButtonSelected:{
    borderWidth: 3,
    borderColor: Colors.black
  },
  sizeWrapper:{
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 20,
  },
  sizeContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  sizeButton:{
    width: 50 * Metrics.screenWidth / 320,
    height: 30 * Metrics.screenWidth / 320,
    marginRight: 10,
    marginVertical: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.gray
  },
  sizeButtonSelected:{
    borderColor: Colors.black,
    borderWidth: 2
  },
  sizeText:{
    color: Colors.gray,
    fontSize: 14 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham1,
  },
  sizeGuideWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 20,
  },
  sizeGuideLeft:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageSizeGuide:{
    width: 40 * Metrics.screenWidth / 320,
    height: 30 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    marginLeft: 20
  },
  sizeGuideRight:{
    justifyContent: 'flex-end'
  },
  buttonSizeGuide:{
    width: 20 * Metrics.screenWidth / 320,
    height: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
  },
  reviewWrapper:{

  },
  reviewContainer:{
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingVertical: 20,
  },
  nameWrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  reviewName1:{
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
  },
  reviewName2:{
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
  },
  reviewStarWrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  reviewStar:{
    width: 15 * Metrics.screenWidth / 320,
    height: 15 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    marginRight: 5 * Metrics.screenWidth / 320
  },
  reviewTitle:{
    marginLeft: 10 * Metrics.screenWidth / 320,
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
  },
  reviewDescriptionWrapper:{
    flexWrap: 'wrap'
  },
  textReview:{
    fontSize: 10 * Metrics.screenWidth / 320,
    color: Colors.gray,
    textAlign:  'left',
    fontFamily: Fonts.type.gotham3,
  },
  reviewImageWrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5
  },
  reviewImage:{
    width: 50 * Metrics.screenWidth / 320,
    height: 50 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  menuWrapper:{
    position:'absolute',
    bottom: 0,
    left: 0,
    height: 40 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
  },
  btnAddToCart:{
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAddToCart:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 20,
  },
  btnShare:{
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textShare:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 20,
  },
  modalView:{
    width: Metrics.screenWidth - 80,
    height: 40,
    backgroundColor: Colors.modal,
    borderRadius: 20,
    position: 'absolute',
    bottom: 40,
    left: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText:{
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  }
})
