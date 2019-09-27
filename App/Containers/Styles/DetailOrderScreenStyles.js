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
    fontSize: 14 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  productSubtitle2:{
    fontSize: 12 * Metrics.screenWidth / 320,
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
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  address:{
    fontSize: 12 * Metrics.screenWidth / 320,
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
    fontSize: 12 * Metrics.screenWidth / 320,
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
    resizeMode: 'contain'
  },
  productDescriptionWrapper:{
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 4,
    flex: 2
  },
  itemText:{
    fontSize: 10 * Metrics.screenWidth / 320,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  itemText2:{
    fontSize: 12 * Metrics.screenWidth / 320,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  nameWrapper:{
    flex:1,
  },
  productName:{
    fontSize: 10 * Metrics.screenWidth / 320,
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
    fontSize: 12 * Metrics.screenWidth / 320,
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
    fontSize: 15 * Metrics.screenWidth / 320,
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
    fontSize: 12 * Metrics.screenWidth / 320,
    marginVertical: -3,
  },
  priceText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14 * Metrics.screenWidth / 320,
    marginVertical: -3,
  },
  commissionText:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: 10 * Metrics.screenWidth / 320,
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
    fontSize: 14 * Metrics.screenWidth / 320,
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
    fontSize: 12 * Metrics.screenWidth / 320,
  },
  deliveryText2:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14 * Metrics.screenWidth / 320,
    textAlign: 'center'
  }
})
