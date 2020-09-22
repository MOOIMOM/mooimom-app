import { StyleSheet, Platform } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  item: {
    width: Metrics.screenWidth / 2.6,
    height: 230 * Metrics.screenWidth / 320,
    flex: 1,
    // backgroundColor: Colors.mediumGray,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    // paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  wishlist: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 5,
    top: 0,
    paddingTop: 4 * Metrics.screenWidth / 320,
    width: 28 * Metrics.screenWidth / 320,
    height: 28 * Metrics.screenWidth / 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (28 * Metrics.screenWidth / 320) / 2,

  },
  wishlistImage: {
    width: 15 * Metrics.screenWidth / 320,
    height: 15 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  image: {
    // width: Metrics.screenWidth / 2.2 - 20,
    width: '100%',
    height: 140 * Metrics.screenWidth / 320,
  },
  name: {
    flexWrap: 'wrap',
    fontSize: Metrics.fontSize0,
    lineHeight: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
  },
  productNameContainer: {
    flex: 2,
    // backgroundColor: Colors.bloodOrange,
    marginTop: 5,
    width: Metrics.screenWidth / 2.4,
    bottom: 5,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 5,
  },
  priceGroup: {
    flex: 1,
    width: Metrics.screenWidth / 2.4,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  price: {
    color: Colors.mooimom,
    fontSize: Metrics.fontSize0,
    fontFamily: Fonts.type.gotham2,
    textAlign: 'left',
  },
  priceDiscount: {
    color: Colors.black,
    fontSize: Metrics.fontSize0,
    textDecorationLine: 'line-through',
    fontFamily: Fonts.type.gotham2,
    textAlign: 'left',
  },
  extra: {
  },
  btnShare: {
    backgroundColor: Colors.mooimom,
    height: 20 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth / 2.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  textBtn: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 12,
    marginTop: Platform.OS === 'ios' ? 4 : 0,
  },
  modalView: {
    width: Metrics.screenWidth / 2 - 20,
    height: 20 * Metrics.screenWidth / 320,
    backgroundColor: Colors.modal,
    borderRadius: 20 * Metrics.screenWidth / 320,
    position: 'absolute',
    bottom: 40,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    fontSize: Metrics.fontSize1,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  },
  productEmptyContainer: {
    position: 'absolute',
    top: 150 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth / 2 - 30,
    paddingHorizontal: 10,
    height: 50 * Metrics.screenWidth / 320,
    backgroundColor: Colors.modal,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textSoldContainer: {
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageSad: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  textSold1: {
    fontSize: Metrics.fontSize1,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  },
  textSold2: {
    fontSize: Metrics.fontSize0,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  }
})
