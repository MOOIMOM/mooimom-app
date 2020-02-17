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
  imgHeader2: {
    height: 12 * Metrics.screenWidth / 320,
    width: 12 * Metrics.screenWidth / 320,
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
  }

})
