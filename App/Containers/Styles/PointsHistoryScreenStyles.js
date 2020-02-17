import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
import { isIphoneXorAbove } from '../../Lib/utils'

export default StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    width: Metrics.screenWidth,
    marginTop: 10,
    height: 40
  },
  btnHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader: {
    height: 15 * Metrics.screenWidth / 320,
    width: 15 * Metrics.screenWidth / 320,
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
  textNotif2: {
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
  textBallanceCardTitle: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    fontWeight: 'bold',
    color: Colors.black
  },
  wrapperBallanceArea: {
    marginTop: 20,
    flexDirection: 'row',
    height: 110
  },
  centerizedWrapper: {
    alignItems: 'flex-start'
  },
  wrapperBallanceHeader: {
    paddingHorizontal: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgMooimomCash: {
    width: 20 * Metrics.screenWidth / 320,
    height: 20 * Metrics.screenWidth / 320,
    marginRight: 10 * Metrics.screenWidth / 320,
  },
  textMooimomBallance: {
    fontSize: Metrics.fontSize0,
    fontFamily: Fonts.type.gotham2,
    color: Colors.black,
  },
  ballanceSizedVerticalMargin: {
    marginVertical: 5 * Metrics.screenWidth / 320,
  },
  textBallanceNumber: {
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    fontWeight: 'bold',
    color: Colors.black
  },
  rowAlign: {
    flexDirection: 'row'
  },
  ballanceSizedHorizontalMargin: {
    marginHorizontal: 2.5 * Metrics.screenWidth / 320,
  },
  textBallanceCurrency: {
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  wrapperSeparator: {
    marginVertical: 10
  },
  menu: {
    alignSelf: 'center',
    width: '90%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.mediumGray,
    paddingVertical: 10,
    marginBottom: 10
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
})
