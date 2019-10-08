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
    marginTop: 20,
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
    height: 18 * Metrics.screenWidth / 320,
    width: 18 * Metrics.screenWidth / 320,
    marginRight: 12,
    resizeMode: 'contain'
  },
  buttonHeader2:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    marginRight:5
  },
  searchButton:{
    width: Metrics.screenWidth / 1.8,
    height: 30 * Metrics.screenWidth / 320,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  imageSearch:{
    height:15 * Metrics.screenWidth / 320,
    width:15 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  textSearch:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham5,
    fontSize:Metrics.fontSize0,
    marginLeft: 5
  },
  productContainer:{
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight - (115 * Metrics.screenWidth / 320),
    marginHorizontal: 20,
    marginTop: 5,
  },
  productImageWrapper:{

  },
  productImage:{
    width: Metrics.screenWidth - 40,
    height: Metrics.screenWidth - 40,
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
    width: 40 * Metrics.screenWidth / 320,
    height: 40 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  ratingWrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  ratingStarWrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ratingText:{
    fontFamily: Fonts.type.gotham3,
    fontSize: Metrics.fontSize1,
    fontWeight: 'bold',
    marginLeft: 10
  },
  productDescriptionWrapper:{

  },
  productCode:{
    fontSize: Metrics.fontSize1,
    color: Colors.lightGray,
    fontFamily: Fonts.type.gotham2,
  },
  productName:{
    fontSize: Metrics.fontSize3,
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
    fontSize: Metrics.fontSize3,
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
  },
  productPriceDiscount:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    textDecorationLine: 'line-through',
    color: Colors.fire,
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
    fontSize: Metrics.fontSize1,
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
  descriptionWrapper2:{
    width: Metrics.screenWidth - 40,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionHeader2:{
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.mooimom,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    margin: 'auto'
  },
  productSubtitle2:{
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color: Colors.mooimom
  },
  productSubtitle:{
    fontSize: Metrics.fontSize3,
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
  btnDownload:{
    width: 150 * Metrics.screenWidth / 320,
    height: 25 * Metrics.screenWidth / 320,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  textCopy:{
    fontSize: Metrics.fontSize3,
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
  },
  productDescriptionText:{
    flexWrap: 'wrap',
    fontSize: Metrics.fontSize2,
    color: Colors.black,
    lineHeight:17 * Metrics.screenWidth / 320,
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
    borderWidth: 0.5
  },
  colorButtonSelected:{
    borderWidth: 2,
    borderColor: Colors.mooimom
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
    paddingHorizontal: 10,
    minWidth: 50 * Metrics.screenWidth / 320,
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
    borderColor: Colors.mooimom,
    backgroundColor: 'rgba(124,224,211,0.5)',
    borderWidth: 1
  },
  sizeText:{
    color: Colors.gray,
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham1,
  },
  buttonDisabled:{
    backgroundColor: 'rgba(1,1,1,0.2)',
    borderWidth: 1,
  },
  buttonColorDisabled:{
    backgroundColor: 'rgba(1,1,1,0.5)',
    borderWidth: 2,
    borderColor: Colors.fire,
    width:30 * Metrics.screenWidth / 320,
    height:30 * Metrics.screenWidth / 320,
    marginRight: 10,
    marginVertical: 5,
    top:0,
    left: 0,
    position: 'absolute'
  },
  sizeGuideWrapper:{
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 20,
  },
  sizeGuideWrapper2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 10 * Metrics.screenWidth / 320,
    height: 10 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
  },
  sizeGuideWrapperContainer:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.white,
    paddingBottom: 25
  },
  imageClose:{
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  sizeGuideWrapperContainer2:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRincian:{
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black,
    textAlign: 'center'
  },
  textRincian2:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
    color: Colors.black,
    textAlign: 'center',
    flexWrap: 'wrap',
    marginTop:20
  },
  textRincian3:{
    paddingHorizontal: 20,
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham3,
    color: Colors.black,
    lineHeight: 15 * Metrics.screenWidth / 320,
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  imageHowTo:{
    marginLeft: Metrics.screenWidth/4,
    width: Metrics.screenWidth/2,
    height: Metrics.screenWidth/2,
  },
  headerTable:{
    flexDirection: 'row',
    width: Metrics.screenWidth - 20,
    marginHorizontal: 10,
    backgroundColor: Colors.mooimom,
    alignItems: 'center',
    flex:1,
    paddingVertical: 5,
    marginTop:10
  },
  headerTableText:{
    flex:1,
    fontSize: Metrics.fontSize1,
    textAlign: 'center',
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
  },
  tableContent:{
    flexDirection: 'row',
    width: Metrics.screenWidth - 20,
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    flex:1,
    paddingVertical: 3,
    marginVertical: 0.1
  },
  tableText:{
    flex:1,
    fontSize: Metrics.fontSize1,
    textAlign: 'center',
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
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
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
  },
  reviewName2:{
    fontSize: Metrics.fontSize2,
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
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
  },
  reviewDescriptionWrapper:{
    flexWrap: 'wrap'
  },
  textReview:{
    fontSize: Metrics.fontSize1,
    color: Colors.gray,
    textAlign:  'left',
    fontFamily: Fonts.type.gotham3,
    lineHeight: 14 * Metrics.screenWidth / 320,
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
    fontSize: Metrics.fontSize3,
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
    fontSize: Metrics.fontSize3,
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
    fontSize: Metrics.fontSize3,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
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
  customImagesContainer:{
    width: Metrics.screenWidth - 40,
    alignItems: 'flex-end'
  },
  customImages:{
    width: '100%',
    height:Metrics.screenHeight / 2,
    resizeMode: 'contain'
  },
  containerLoading2:{
    backgroundColor: Colors.white,
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    top: 0,
    left:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifContainer:{
    width: 16 * Metrics.screenWidth / 320,
    height: 16 * Metrics.screenWidth / 320,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: -7,
    borderRadius: 8 * Metrics.screenWidth / 320,
    backgroundColor: Colors.fire,
    flex: 1,
    flexWrap: 'nowrap'
  },
  notifContainer2:{
    width: 16 * Metrics.screenWidth / 320,
    height: 16 * Metrics.screenWidth / 320,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 3,
    top: -5,
    borderRadius: 8 * Metrics.screenWidth / 320,
    backgroundColor: Colors.fire,
    flex: 1,
    flexWrap: 'nowrap'
  },
  textNotif:{
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham2,
    color: Colors.white,
  },
  qtyWrapper:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 20,
  },
  qtyContainer:{
    width: Metrics.screenWidth / 4 + 1,
    marginLeft: 20,
    height: 27,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingRight: 1,
    borderColor: Colors.black
  },
  btnQty:{
    backgroundColor: Colors.lightGray,
    width: Metrics.screenWidth / 5 / 3,
    height: 28,
    justifyContent: 'center',
    flex:1,
    alignItems: 'center'
  },
  qtyText:{
    flex:1,
    alignItems: 'center'
  },
  dropdown_text: {
    fontSize: Metrics.fontSize5,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  emptyContainer:{
    backgroundColor: Colors.lightGray,
    paddingTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth - 40,
    flex: 1
  },
  emptyText1:{
    textAlign: 'center',
    fontSize: Metrics.fontSize4,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    paddingVertical: 5
  },
  emptyText2:{
    textAlign: 'center',
    fontSize: Metrics.fontSize3,
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    paddingVertical: 5
  },
  emptyText3:{
    textAlign: 'center',
    fontSize: Metrics.fontSize1,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
  },
  emptyBtn:{
    marginVertical: 20,
    backgroundColor: Colors.mooimom,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  emptyTextBtn:{
    textAlign: 'center',
    fontSize: Metrics.fontSize2,
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
  },
})
