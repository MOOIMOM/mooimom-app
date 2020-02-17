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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: Metrics.screenWidth,
    marginTop: 10,
    height: 40
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
    height: Metrics.screenHeight - 120,
    marginHorizontal: 20,
    marginTop: 5
  },
  productSubtitle: {
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  menuWrapper: {
    position: 'absolute',
    bottom: isIphoneXorAbove() ? 20 : 5,
    left: 0,
    width: Metrics.screenWidth
  },
  deliveryAddressContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderColor: Colors.mooimom
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
  saldoContainer: {
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    width: Metrics.screenWidth - 40,
    paddingVertical: 10,
    justifyContent: 'center',
    paddingLeft: 20
  },
  textSaldo: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    marginVertical: 3
  },
  textSaldoAmount: {
    color: Colors.mooimom,
    fontSize: Metrics.fontSize5,
    fontFamily: Fonts.type.gotham4,
    marginVertical: 3
  },
  inputCustom: {
    flexDirection: 'column-reverse',
    marginTop: 10
  },
  inputLabelWrapper: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    height: 20,
    marginBottom: -10,
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.mooimom,
  },
  inputLabel: {
    color: 'gray',
    fontFamily: Fonts.type.gotham4,
    marginTop: Platform.OS === 'ios' ? 3 : 0
  },
  chooseAddressBtn: {
    backgroundColor: Colors.mooimom,
    width: Metrics.screenWidth - 40,
    marginLeft: 20,
    height: 40 * Metrics.screenWidth / 320,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseAddressText: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.white
  },
  cardBallanceContainer: {
    alignSelf: 'center',
    width: Metrics.screenWidth - 40,
    height: 150,
  },
  containerBallanceTittle: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: Colors.mediumGray
  },
  wrapperBallanceArea: {
    marginTop: 20,
    flexDirection: 'row',
    height: 110
  },
  centerizedWrapper: {
    alignItems: 'center'
  },
  wrapperBallanceHeader: {
    paddingHorizontal: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textMooimomBallance: {
    fontSize: Metrics.fontSize0,
    fontFamily: Fonts.type.gotham2,
    color: Colors.black,
  },
  textBallanceNumber: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    fontWeight: 'bold',
    color: Colors.black
  },
  ballanceSizedHorizontalMargin: {
    marginHorizontal: 2.5 * Metrics.screenWidth / 320,
  },
  ballanceSizedVerticalMargin: {
    marginVertical: 5 * Metrics.screenWidth / 320,
  },
  textBallanceCurrency: {
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  textBallanceCardTitle: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    fontWeight: 'bold',
    color: Colors.black
  },
  imgMooimomCash: {
    width: 30 * Metrics.screenWidth / 320,
    height: 30 * Metrics.screenWidth / 320,
    marginRight: 10 * Metrics.screenWidth / 320,
  },
  imgMooimomPoints: {
    width: 24 * Metrics.screenWidth / 320,
    height: 24 * Metrics.screenWidth / 320,
    marginRight: 5 * Metrics.screenWidth / 320
  },
  btnHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader: {
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
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
  rowAlign: {
    flexDirection: 'row'
  }
})
