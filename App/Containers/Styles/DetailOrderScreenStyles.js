import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
import { isIphoneXorAbove } from '../../Lib/utils'

export default StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'flex-start'
  },
  wrapperSeparator: {
    marginVertical: 5,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  headerButtonLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonHeader: {
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  cartContainer: {
    width: Metrics.screenWidth - 40,
    // height: Metrics.screenHeight - 100,
    flex: 1,
    marginHorizontal: 20,
    marginTop: 5,

  },
  productSubtitle: {
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  productSubtitle2: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.gray
  },
  deliveryAddressContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: Colors.black,
  },
  addressName: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  address: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
  },
  chooseAddressBtn: {
    backgroundColor: Colors.lightGray,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseAddressText: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
  },
  productContainer: {
    width: (Metrics.screenWidth - 40),
    height: Metrics.screenHeight / 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: Colors.black
  },
  productImageWrapper: {
    flex: 1,
    marginRight: 20,
  },
  productImage: {
    width: (Metrics.screenWidth - 40) / 3 - 5,
    height: Metrics.screenHeight / 4,
  },
  productDescriptionWrapper: {
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 4,
    justifyContent: 'space-around',
    marginLeft: 10,
    flex: 2
  },
  itemText: {
    fontSize: Metrics.fontSize1,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  itemText2: {
    fontSize: Metrics.fontSize2,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  nameWrapper: {
  },
  productName: {
    fontSize: Metrics.fontSize1,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
  },
  propertyWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10
  },
  sizeWrapper: {
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  colorWrapper: {
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyWrapper: {
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  chooseDeliveryWrapper: {
    marginTop: 15,
    borderTopWidth: 1,
    paddingTop: 15
  },
  chooseDeliveryBtn: {
    backgroundColor: Colors.mooimom,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseDeliveryText: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.white,
  },
  menuWrapper: {
    bottom: isIphoneXorAbove() ? 20 : 0,
    left: 0,
    width: Metrics.screenWidth,
    flex: 1
  },
  buyBtn: {
    backgroundColor: Colors.mooimom,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth - 40,
    paddingVertical: isIphoneXorAbove() ? 10 * Metrics.screenWidth / 320 : 5 * Metrics.screenWidth / 320
  },
  buyText: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: isIphoneXorAbove() ? Metrics.fontSize3 : Metrics.fontSize1,
  },
  subtotalWrapper: {
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    paddingVertical: isIphoneXorAbove() ? 20 * Metrics.screenWidth / 320 : 10,
    width: Metrics.screenWidth - 40,
    alignItems: 'center',
    flexDirection: 'column'
  },
  subtotalWrapper2: {
    paddingVertical: isIphoneXorAbove() ? 20 : 10,
    width: Metrics.screenWidth - 40,
    alignItems: 'center',
    flexDirection: 'column'
  },
  subtotalText: {
    color: Colors.gray,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    marginVertical: Platform.OS === 'ios' ? 0 : -3,
  },
  priceText: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize4,
    marginVertical: Platform.OS === 'ios' ? 0 : -3,
  },
  commissionText: {
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
    marginVertical: Platform.OS === 'ios' ? 0 : -3,
  },
  menuTextTopWrapper: {
    width: Metrics.screenWidth - 40,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  commissionText2: {
    color: Colors.blueMooimom,
    fontFamily: Fonts.type.gotham3,
    fontSize: Metrics.fontSize1,
  },
  selectedDeliveryWrapper: {
    borderColor: Colors.black,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    flex: 1
  },
  selectedDeliveryTextWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  deliveryText: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
  },
  decreasedMooimomPoints: {
    color: Colors.fire,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
  },
  deliveryText2: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    textAlign: 'center'
  },
  deliveryText3: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
    textAlign: 'center'
  },
  paymentGuideContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.white,
    paddingBottom: 25
  },
  priceText2: {
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize5,
    textAlign: 'center'
  },
  btnOrderAgain: {
    backgroundColor: Colors.fire,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth - 40,
    paddingVertical: isIphoneXorAbove() ? 10 * Metrics.screenWidth / 320 : 5 * Metrics.screenWidth / 320
  },
  textOrderAgain: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: isIphoneXorAbove() ? Metrics.fontSize3 : Metrics.fontSize1,
  },
  sizedVerticalMargin: {
    marginVertical: 10
  },
  imgMooimomPoints: {
    width: 18 * Metrics.screenWidth / 320,
    height: 18 * Metrics.screenWidth / 320,
    marginRight: 5 * Metrics.screenWidth / 320
  },
})
