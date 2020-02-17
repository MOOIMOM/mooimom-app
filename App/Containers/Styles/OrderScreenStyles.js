import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    paddingTop: 0,
    flex: 1
  },
  wrapperSeparator: {
    marginTop: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: Metrics.screenWidth,
    marginTop: 10,
    height: 40
  },
  searchButton: {
    width: Metrics.screenWidth - 100,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSearch: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  textSearch: {
    color: Colors.gray,
    fontFamily: Fonts.type.gotham5,
    fontSize: Metrics.fontSize1
  },
  btnHeader: {
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader: {
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  contentContainer: {
    flexDirection: 'row',
    width: Metrics.screenWidth
  },
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Metrics.screenWidth,
    paddingVertical: 10
  },
  textTarget: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    textAlign: 'center'
  },
  textTargetAmountContainer: {
    paddingVertical: 5,
    marginVertical: 5,
    width: (Metrics.screenWidth - 20) / 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTargetAmount: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize4,
    textAlign: 'center',
  },
  textTargetMore: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    textAlign: 'center',
  },
  iconRight: {
    width: 15 * Metrics.screenWidth / 320,
    height: 15 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: '38%'
  },
  bottomContainer: {
    width: Metrics.screenWidth - 40,
    marginLeft: 20
  },
  textMenuStatus: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham3,
    fontSize: Metrics.fontSize3,
    fontWeight: 'bold'
  },
  menuStatus: {
    marginTop: 10,
    flexDirection: 'row'
  },
  menuBtn: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
  },
  menuBtn2: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.mooimom,
    backgroundColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText2: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
  },
  listOrders: {
    marginTop: 10
  },
  orderContainer: {
    borderColor: Colors.gray,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  orderContainerTop: {
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: Colors.mooimom,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 5
  },
  orderStatusText: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    paddingVertical: 5
  },
  orderContainerMid: {
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
    paddingVertical: 5
  },
  orderDateText: {
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
  },
  orderIDText: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
  },
  orderAmount: {
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 7 : 0
  },
  orderContainerTotal: {
    width: Metrics.screenWidth - 40,
    paddingHorizontal: 20,
    borderColor: Colors.gray,
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  orderContainerBottom: {
    marginHorizontal: 20,
    paddingTop: 5
  },
  orderContainerProductWrapper: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  orderContainerLeft: {
    flex: 1,
    height: Metrics.screenHeight / 6,
  },
  productImage: {
    flex: 1,
    marginBottom: 5
  },
  orderContainerRight: {
    flex: 2,
    justifyContent: 'space-between',
    marginLeft: 10
  },
  productName: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    lineHeight: Metrics.fontSize2,
  },
  productPrice: {
    color: Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
  },
  containerLoading: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notifContainer: {
    width: 16 * Metrics.screenWidth / 320,
    height: 16 * Metrics.screenWidth / 320,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -7,
    top: -7,
    borderRadius: 8 * Metrics.screenWidth / 320,
    backgroundColor: Colors.fire,
    flex: 1,
    flexWrap: 'nowrap'
  },
  textNotif: {
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham2,
    color: Colors.white,
  },
  orderAgainBtn: {
    backgroundColor: '#43aea0',
    borderRadius: 5,
    width: Metrics.screenWidth / 4,
    height: 25 * Metrics.screenWidth / 320,
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderAgainText: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.white,
  },
  sizedVerticalMargin: {
    marginBottom: 50 * Metrics.screenHeight / 320
  }
})
