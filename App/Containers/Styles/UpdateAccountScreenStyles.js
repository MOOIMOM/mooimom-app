import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
import {isIphoneXorAbove} from '../../Lib/utils'

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
    height: Metrics.screenHeight - 120,
    marginHorizontal: 20,
    marginTop: 5
  },
  productSubtitle:{
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  menuWrapper:{
    position:'absolute',
    bottom: isIphoneXorAbove() ? 20 : 5,
    left: 0,
    width: Metrics.screenWidth
  },
  chooseAddressBtn:{
    backgroundColor: Colors.mooimom,
    width: Metrics.screenWidth - 40,
    marginLeft: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseAddressText:{
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color:Colors.white
  },
})
