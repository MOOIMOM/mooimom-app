import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
    alignItems: 'flex-start'
  },
  wrapperSeparator:{
    marginVertical: 5,
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
  buttonHeader:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  cartContainer:{
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight - (120 * Metrics.screenWidth / 320),
    marginHorizontal: 20,
    marginTop: 5,
  },
  productSubtitle:{
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  productSubtitle2:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.gray
  },
  deliveryAddressContainer:{
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  addressName:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  address:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
  },
  chooseAddressBtn:{
    backgroundColor: Colors.lightGray,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseAddressText:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
  },
  productContainer:{
    width: (Metrics.screenWidth - 40),
    height: Metrics.screenHeight / 4,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 15,
    paddingTop: 15,
    borderTopWidth: 1
  },
  productImageWrapper:{
    flex:1,
  },
  productImage:{
    width: (Metrics.screenWidth - 40) / 3 - 5,
    height: Metrics.screenHeight / 4 - 5,
  },
  productDescriptionWrapper:{
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 4,
    flex: 2
  },
  itemText:{
    fontSize: Metrics.fontSize2,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  nameWrapper:{
    flex:1,
  },
  productName:{
    fontSize: Metrics.fontSize2,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
  },
  propertyWrapper:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sizeWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  colorWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceWrapper:{
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  chooseDeliveryWrapper:{
    marginTop: 15,
    borderTopWidth: 1,
    paddingTop:15,
  },
  containerModal:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  chooseDeliveryWrapper2:{
    backgroundColor: Colors.white,
    top:Metrics.screenHeight / 2,
    height: Metrics.screenHeight / 2 - 20,
    width: Metrics.screenWidth,
  },
  chooseDeliveryBtn:{
    backgroundColor: Colors.mooimom,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseDeliveryText:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.white,
  },
  deliveryOptionWrapper:{
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: Colors.black,
    paddingHorizontal: 20
  },
  chooseDeliveryBtn2:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20
  },
  imageClose:{
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  chooseDeliveryText2:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black,
    marginLeft: 10
  },
  deliveryNameText:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham1,
    color: Colors.black,
    fontWeight: 'bold'
  },
  deliveryPriceText:{
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham1,
    color: Colors.black,
  },
  selectedDeliveryWrapper:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0.5,
    marginBottom: 10
  },
  menuWrapper:{
    position:'absolute',
    bottom: 0,
    left: 0,
    height: 60 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
  },
  buyBtn:{
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyText:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
  },
  subtotalWrapper:{
    borderWidth: 1,
    paddingLeft: 20,
    paddingVertical: 10,
    width: Metrics.screenWidth / 2,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white
  },
  subtotalText:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    marginVertical: -3,
  },
  priceText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    marginVertical: -3,
  },
  commissionText:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
  },
  containerLoading:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreenModal:{
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
