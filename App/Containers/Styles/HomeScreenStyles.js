import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
import { isIphoneXorAbove } from '../../Lib/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerScroll: {
    flex: 1,
    paddingTop: 0,
  },
  backgroundHeader: {
    width: Metrics.screenWidth,
    height: 250 * Metrics.screenWidth / 320,
    position: 'absolute',
    alignSelf: "center",
    alignContent: "center",
    top: Metrics.screenHeight * (isIphoneXorAbove() ? -0.15 : -0.25),
    backgroundColor: '#28C9B9',
    borderBottomLeftRadius: Metrics.screenWidth / 2,
    borderBottomRightRadius: Metrics.screenWidth / 2,
    transform: [{ scaleX: (isIphoneXorAbove() ? 3 : 2) }, { scaleY: 0.65 }],
    flex: 1
  },
  wrapperSeparator: {
    marginTop: 10,
    flex: 1
  },
  subTitleWrapper: {
    fontSize: Metrics.fontSize4,
    fontFamily: Fonts.type.gotham4,
    color: Colors.mooimom,
    marginBottom: 10
  },
  headerWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    flex: 1
  },
  headerWrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20,
    alignItems: 'center',
    height: 60
  },
  logo: {
    width: Metrics.screenWidth / 3,
    maxHeight: 30,
    resizeMode: 'contain',
  },
  headerButtonLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerButtonRight: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonHeader: {
    height: 18 * Metrics.screenWidth / 320,
    width: 18 * Metrics.screenWidth / 320,
    marginLeft: 18,
    resizeMode: 'contain'
  },
  buttonMenu: {
    height: 16 * Metrics.screenWidth / 320,
    width: 16 * Metrics.screenWidth / 320,
    marginRight: 20,
    marginTop: 5,
    resizeMode: 'contain'
  },
  buttonHeader2: {
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    marginLeft: 15,
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
  headerWrapper2: {
    alignItems: 'center',
    backgroundColor: Colors.mooimom,
    paddingBottom: 10
  },
  searchButton: {
    width: Metrics.screenWidth - 40,
    height: 30 * Metrics.screenWidth / 320,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageSearch: {
    height: 15 * Metrics.screenWidth / 320,
    width: 15 * Metrics.screenWidth / 320,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  textSearch: {
    color: Colors.gray,
    fontFamily: Fonts.type.gotham5,
    fontSize: Metrics.fontSize1
  },
  heroBannerWrapper: {
    top: 20 * Metrics.screenWidth / 320,
    flex: 1
  },
  itemHeroBanner: {
    width: Metrics.screenWidth - 60,
    height: (Metrics.screenWidth - 60) / 950 * 480,
  },
  imageContainerHeroBanner: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: Colors.white,
    borderRadius: 10 * (Metrics.screenWidth / 320),
  },
  imageHeroBanner: {
    flex: 1,
  },
  paginationDotStyleHeroBanner: {
    width: 8 * (Metrics.screenWidth / 320),
    height: 8 * (Metrics.screenWidth / 320),
    borderRadius: 5 * (Metrics.screenWidth / 320),
    backgroundColor: Colors.black
  },
  paginationContainerStyleHeroBanner: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignSelf: 'flex-start',
    top: 10 * (Metrics.screenWidth / 320),
    left: 20 * (Metrics.screenWidth / 320)
  },
  paginationDotContainerStyleHeroBanner: {
    marginHorizontal: 2
  },
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.screenWidth - 40,
    marginLeft: 20,
    marginTop: 40
  },
  catButton: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: (Metrics.screenWidth - 40) / 4
  },
  catImage: {
    height: 40 * (Metrics.screenWidth / 320),
    width: 40 * (Metrics.screenWidth / 320),
  },
  catText: {
    color: Colors.gray,
    flexWrap: 'wrap',
    textAlign: 'center',
    maxWidth: (Metrics.screenWidth - 40) / 4,
    paddingHorizontal: 7 * (Metrics.screenWidth / 320),
    fontSize: Metrics.fontSize1,
    marginTop: 10,
    fontFamily: Fonts.type.gotham2,
  },
  productWrapper: {
    flex: 1,
    width: Metrics.screenWidth,
    flexGrow: 1,
  },
  productContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  viewOut: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  paginationDotStyleImage: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.white
  },
  paginationContainerStyleImage: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    top: -15
  },
  paginationDotContainerStyleImage: {
    marginHorizontal: 2
  },
})
