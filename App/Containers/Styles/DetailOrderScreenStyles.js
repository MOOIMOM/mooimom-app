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
    height: Metrics.screenHeight - 130,
    marginHorizontal: 20,
    marginTop: 5
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
    height: Metrics.screenHeight / 4,
  },
  productDescriptionWrapper:{
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 4,
    flex: 2
  },
  itemText:{
    fontSize: Metrics.fontSize1,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  itemText2:{
    fontSize: Metrics.fontSize2,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  nameWrapper:{
    flex:1,
  },
  productName:{
    fontSize: Metrics.fontSize1,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
  },
  propertyWrapper:{
    flex:2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical:21
  },
  sizeWrapper:{
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  colorWrapper:{
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyWrapper:{
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
    paddingTop:15
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
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    width: Metrics.screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  subtotalWrapper2:{
    borderWidth: 1,
    paddingVertical: 10,
    width: Metrics.screenWidth,
    backgroundColor: Colors.lightGray,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
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
    marginVertical: -3,
  },
  menuTextTopWrapper:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  commissionText2:{
    color:Colors.blueMooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
  },
  selectedDeliveryWrapper:{
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
    flex: 1
  },
  selectedDeliveryTextWrapper:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  deliveryText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
  },
  deliveryText2:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    textAlign: 'center'
  },
  deliveryText3:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
    textAlign: 'center'
  },
  paymentGuideContainer:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.white,
    paddingBottom: 25
  },
  priceText2:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize5,
    textAlign: 'center'
  },
  btnOrderAgain:{
    backgroundColor: Colors.fire,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth / 4,
    paddingVertical: 5 * Metrics.screenWidth / 320
  },
  textOrderAgain:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
  }
})
