import { StyleSheet, Platform } from 'react-native';
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
    borderColor: Colors.mooimom,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'left',
    fontSize: 14,
    paddingTop:12,
    fontFamily: Fonts.type.gotham2,
    color: Colors.black
  },
  inputLabelWrapper: {
    // backgroundColor: 'rgb(50, 50, 200)',
  },
  inputLabelContainer:{
    backgroundColor: Colors.mooimom,
      alignSelf: 'flex-start',
      borderRadius: 20,
      height: 20,
      marginBottom: -10,
      marginLeft: 20,
      paddingLeft: 20,
      paddingRight: 20,
  },
  inputLabel: {
    color: 'gray',
    fontFamily: Fonts.type.gotham4,
    marginTop:Platform.OS === 'ios' ? 3: 0
  },
  labelPhone: {
    // zIndex: 2,
    // height: 30,
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham2,
    color: Colors.white,
    width: 30,
    // backgroundColor: 'red',
    marginLeft: 20,
    marginBottom: -50,
    backgroundColor: 'gray',
    paddingVertical: 5
  },
  placeholderIOS:{
    textAlign: 'left',
    fontSize: 14,
    paddingTop:20,
    fontFamily: Fonts.type.gotham2,
    color: Colors.black
  }
});
