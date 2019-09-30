import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  fontSize0: (width < height ? width : height) <= 320 ? (6 * (width < height ? width : height) / 320) : 8 * (width < height ? width : height) / 320,
  fontSize1: (width < height ? width : height) <= 320 ? (8 * (width < height ? width : height) / 320) : 10 * (width < height ? width : height) / 320,
  fontSize2: (width < height ? width : height) <= 320 ? (10 * (width < height ? width : height) / 320) : 12 * (width < height ? width : height) / 320,
  fontSize3: (width < height ? width : height) <= 320 ? (12 * (width < height ? width : height) / 320) : 14 * (width < height ? width : height) / 320,
  fontSize4: (width < height ? width : height) <= 320 ? (14 * (width < height ? width : height) / 320) : 16 * (width < height ? width : height) / 320,
  fontSize5: (width < height ? width : height) <= 320 ? (16 * (width < height ? width : height) / 320) : 20 * (width < height ? width : height) / 320,
  fontSize6: (width < height ? width : height) <= 320 ? (20 * (width < height ? width : height) / 320) : 24 * (width < height ? width : height) / 320,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics
