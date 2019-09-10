import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  // menu
  viewInputMenu: {
    height: Metrics.screenHeight - 190,
    width: Metrics.screenWidth,
    backgroundColor: '#00eebb'
  },
  inputCustom: {
    width: Metrics.screenWidth,
    backgroundColor: 'white',
    flexDirection: 'column-reverse'
  },
  inputText: {
    width: Metrics.screenWidth - 40,
    backgroundColor: 'rgba(230,230,230,0.5)',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'left',
    fontSize: 18,
    fontFamily: Fonts.type.gotham1,
    color: 'gray'
  },
  inputLabelWrapper: {
    // backgroundColor: 'rgb(50, 50, 200)',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    height: 24,
    marginBottom: -12,
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'gray',
    fontFamily: Fonts.type.gotham4,
  },
  labelRP: {
    // zIndex: 2,
    // height: 30,
    fontSize: 18,
    fontFamily: Fonts.type.gotham1,
    color: 'gray',
    width: 30,
    // backgroundColor: 'red',
    marginLeft: 40,
    marginBottom: -52
  }
});
