import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  menuWrapper:{
    position:'absolute',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    bottom: 0,
    left: 0,
    height: 50 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  menuButton:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuText:{
    color:Colors.gray,
    fontSize: 10 * Metrics.screenWidth / 320
  },
  menuImage:{
    height: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  }
})
