import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

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
    height: Metrics.screenHeight - 80,
    marginHorizontal: 20,
    marginTop: 5
  },
  productSubtitle:{
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  productSubtitle2:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.gray
  },
  deliveryAddressContainer:{
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  deliveryAddressContainer2:{
    borderWidth: 1,
    borderColor: Colors.mooimom,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.mooimom,
    marginBottom: 10
  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  btnContainer2:{
    flexDirection: 'row'
  },
  btnEditAddress:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
    marginLeft: 10
  },
  addressName:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  address:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
  },
  chooseAddressBtn:{
    backgroundColor: Colors.lightGray,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseAddressText:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
  },
})
