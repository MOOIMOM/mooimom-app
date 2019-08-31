import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

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
    marginHorizontal: 20,
    marginTop: 10,
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
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonHeader:{
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  searchButton:{
    width: Metrics.screenWidth / 1.8,
    height: 40,
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
    fontStyle: 'italic',
    fontSize: 12
  },
  productContainer:{
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight - 150,
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
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  productDescriptionWrapper:{

  },
  productCode:{
    fontSize: 12,
    color: Colors.lightGray
  },
  productName:{
    fontSize: 20,
    color: Colors.black,
    fontWeight: 'bold',
    marginTop: 5
  },
  priceGroup:{
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  productPrice:{
    fontSize: 20,
    color: Colors.mooimom,
    fontWeight: 'bold',
  },
  productPriceDiscount:{
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    marginLeft: 20
  },
  shareSocialWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareSocialButton:{
    width: Metrics.screenWidth / 3.5,
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  shareSocialImage:{
    width: 30,
    height: 30,
    paddingHorizontal: 5
  },
  shareSocialText:{
    paddingHorizontal: 5,
    fontSize: 12
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black
  },
  btnCopy:{
    width: 90,
    height: 30,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textCopy:{
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold'
  },
  productDescriptionText:{
    flexWrap: 'wrap',
    fontSize: 16,
    color: Colors.gray
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
    width:40,
    height:40,
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
    width:60,
    height:40,
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
    fontSize: 20,
    fontWeight: 'bold'
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
    width: 50,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 20
  },
  sizeGuideRight:{
    justifyContent: 'flex-end'
  },
  buttonSizeGuide:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  menuWrapper:{
    position:'absolute',
    bottom: 0,
    left: 0,
    height: 60,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
  },
  btnAddToCart:{
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAddToCart:{
    color:Colors.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnShare:{
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textShare:{
    color:Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
})
