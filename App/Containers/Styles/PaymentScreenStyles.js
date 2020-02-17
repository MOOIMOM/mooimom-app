import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    paddingTop: 0,
    height: Metrics.screenHeight - 100,
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
  textSearch: {
    color: Colors.gray,
    fontFamily: Fonts.type.gotham5,
    fontSize: Metrics.fontSize1
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
  contentContainer: {
    flexDirection: 'row',
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20,
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
  containerMenu: {
  },
  btnEditProfile: {
    backgroundColor: Colors.mooimom,
    width: Metrics.screenWidth - 40,
    height: 30 * Metrics.screenWidth / 320,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  textEditProfile: {
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2
  },
  menu: {
    borderTopWidth: 0.5,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3
  },
  btnMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imgText: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    marginBottom: 5,
  },
  imgTextBold: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 5,
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
  boundariesLine: {
    width: 1,
    height: 60,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 40
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
  rowAlign: {
    flexDirection: 'row'
  }
})
