import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
import { isIphoneXorAbove } from '../../Lib/utils'
export default StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'flex-start'
  },
  wrapperSeparator: {
    marginVertical: 10,
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
    height: isIphoneXorAbove() ? (Metrics.screenHeight - (150 * Metrics.screenWidth / 320)) : (Metrics.screenHeight - (120 * Metrics.screenWidth / 320)),
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
    borderColor: Colors.gray,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20
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
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderColor: Colors.mediumGray
  },
  productImageWrapper: {
    flex: 1,
  },
  productImage: {
    width: (Metrics.screenWidth - 40) / 3 - 5,
    height: Metrics.screenHeight / 4 - 5,
  },
  productImage: {
    width: (Metrics.screenWidth - 40) / 3 - 5,
    height: Metrics.screenHeight / 4 - 5,
  },
  productDescriptionWrapper: {
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 4,
    flex: 2
  },
  itemText: {
    fontSize: Metrics.fontSize2,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  nameWrapper: {
    flex: 1,
  },
  productName: {
    fontSize: Metrics.fontSize2,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
  },
  propertyWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sizeWrapper: {
    flex: 1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  colorWrapper: {
    flex: 1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyWrapper: {
    flex: 1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  chooseDeliveryWrapper: {
    marginTop: 15,
    borderTopWidth: 0.5,
    borderColor: Colors.mediumGray,
    paddingTop: 15,
  },
  containerModal: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  chooseDeliveryWrapper2: {
    backgroundColor: Colors.white,
    top: Metrics.screenHeight / 2,
    height: Platform.OS === 'ios' ? Metrics.screenHeight / 2 : Metrics.screenHeight / 2 - 20,
    width: Metrics.screenWidth,
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
  deliveryOptionWrapper: {
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: Colors.mediumGray,
    paddingHorizontal: 20
  },
  chooseDeliveryBtn2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20
  },
  imageClose: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  chooseDeliveryText2: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black,
    marginLeft: 10
  },
  deliveryNameText: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham1,
    color: Colors.black,
    fontWeight: 'bold'
  },
  deliveryPriceText: {
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham1,
    color: Colors.black,
  },
  selectedDeliveryWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0.5,
    marginBottom: 10
  },
  menuWrapper: {
    // position: 'absolute',
    bottom: isIphoneXorAbove() ? 20 : 0,
    left: 0,
    height: 60 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
  },
  buyBtn: {
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyText: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
  },
  subtotalWrapper: {
    borderWidth: 0.5,
    borderColor: Colors.mooimom,
    paddingLeft: 20,
    paddingVertical: 10,
    width: Metrics.screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white
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
    fontSize: Metrics.fontSize3,
    marginVertical: Platform.OS === 'ios' ? 0 : -3,
  },
  commissionText: {
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
  },
  containerLoading: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreenModal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgMooimomPoints: {
    width: 18 * Metrics.screenWidth / 320,
    height: 18 * Metrics.screenWidth / 320,
    marginRight: 5 * Metrics.screenWidth / 320
  },
  imgDiscountVoucher: {
    width: 18 * Metrics.screenWidth / 320,
    height: 18 * Metrics.screenWidth / 320,
    marginLeft: 5 * Metrics.screenWidth / 320
  },
  selectedDeliveryWrapper: {
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    flex: 1
  },
  mooimomPointsWrapper: {
    borderColor: Colors.mediumGray,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
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
  usedPointsTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mooimomPointsTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cancelUsePointButton: {
    alignSelf: 'center',
    backgroundColor: Colors.fire,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10 * Metrics.screenWidth / 320
  },
  usePointButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10 * Metrics.screenWidth / 320
  },
  textUsePointButton: {
    fontFamily: Fonts.type.gotham1,
    fontSize: Metrics.fontSize1,
    color: Colors.white,
    fontWeight: 'bold'
  },
  couponInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '98%',
    height: 50,
    top: 20,
    borderWidth: 0.5,
    borderColor: Colors.mediumGray,
    marginBottom: isIphoneXorAbove() ? 60 : 40,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  couponInput: {
    width: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
