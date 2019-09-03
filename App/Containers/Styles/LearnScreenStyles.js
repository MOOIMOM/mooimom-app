import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 100
  },
  backgroundImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 3,
    position:'absolute',
    resizeMode: 'cover',
    top: 0,
    left: 0
  },
})
