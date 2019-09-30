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
    bottom: 5,
    left: 0,
    width: Metrics.screenWidth
  },
  deliveryAddressContainer:{
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderColor: Colors.mooimom
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
  saldoContainer:{
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    width: Metrics.screenWidth - 40,
    paddingVertical: 10,
    justifyContent: 'center',
    paddingLeft: 20
  },
  textSaldo:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    marginVertical: 3
  },
  textSaldoAmount:{
    color:Colors.mooimom,
    fontSize: Metrics.fontSize5,
    fontFamily: Fonts.type.gotham4,
    marginVertical: 3
  },
  inputCustom:{
    flexDirection: 'column-reverse',
    marginTop: 10
  },
  inputLabel: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 20,
    marginBottom: -10,
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'gray',
    fontFamily: Fonts.type.gotham4,
  },
  chooseAddressBtn:{
    backgroundColor: Colors.mooimom,
    width: Metrics.screenWidth - 40,
    marginLeft: 20,
    height: 40* Metrics.screenWidth / 320,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chooseAddressText:{
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    color:Colors.white
  },
})
