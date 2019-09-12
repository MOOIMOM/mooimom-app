import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
    alignItems: 'center',
    color:Colors.white
  },
  linergradient:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignItems: 'center',
  },
  title:{
    width: Metrics.screenWidth - 150,
    resizeMode: 'contain',
    flex:3,
  },
})
