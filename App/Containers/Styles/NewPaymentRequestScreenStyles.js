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
    fontSize: 14 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  menuWrapper:{
    position:'absolute',
    bottom: 0,
    left: 0,
    width: Metrics.screenWidth
  },
  deliveryAddressContainer:{
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  addressName:{
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    color: Colors.black
  },
  address:{
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
  },
  saldoContainer:{
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    width: Metrics.screenWidth - 40,
    height: 100,
    justifyContent: 'center',
    paddingLeft: 20
  },
  textSaldo:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 16,
    marginVertical: 3
  },
  textSaldoAmount:{
    color:Colors.mooimom,
    fontSize: 24,
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
    fontSize: 14 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    color:Colors.white
  },
})
