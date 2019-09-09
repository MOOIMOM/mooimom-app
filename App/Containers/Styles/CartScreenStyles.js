import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
    alignItems: 'flex-start'
  },
  wrapperSeparator:{
    marginVertical: 10,
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
    height: Metrics.screenHeight - 160,
    marginHorizontal: 20,
    marginTop: 5
  },
  productContainer:{
    width: (Metrics.screenWidth - 40),
    height: Metrics.screenHeight / 3,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  productImageWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 3,
  },
  productImage:{
    width: (Metrics.screenWidth - 40) / 2 - 5,
    height: Metrics.screenHeight / 3 - 5,
    resizeMode: 'contain'
  },
  removeBtn:{
    position: 'absolute',
    top: 0,
    left: 0
  },
  removeImg:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  productDescriptionWrapper:{
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 3,
    flex: 1
  },
  itemText:{
    fontSize: 12 * Metrics.screenWidth / 320,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  nameWrapper:{
    flex:1,
  },
  productName:{
    fontSize: 12 * Metrics.screenWidth / 320,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
  },
  propertyWrapper:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sizeWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  size_dropdown: {
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdown_text: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  dropdown_dropdown: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.black,
  },
  sizeBtn:{
    width: Metrics.screenWidth / 5,
    height: 20,
    alignItems: 'center'
  },
  sizeText:{
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  colorWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  colorBtn:{
    width: Metrics.screenWidth / 5,
    height: 30,
    alignItems: 'center'
  },
  colorPick:{
    width: 30,
    height: 30,
  },
  qtyWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyContainer:{
    width: Metrics.screenWidth / 5 + 2,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.black
  },
  btnQty:{
    backgroundColor: Colors.lightGray,
    width: Metrics.screenWidth / 5 / 3,
    height: 28,
    justifyContent: 'center',
    flex:1,
    alignItems: 'center'
  },
  qtyText:{
    flex:1,
    alignItems: 'center'
  },
  priceWrapper:{
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
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
    height: 60 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
  },
  buyBtn:{
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyText:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 15 * Metrics.screenWidth / 320,
  },
  subtotalWrapper:{
    borderWidth: 1,
    paddingLeft: 30,
    paddingVertical: 10,
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  subtotalText:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham4,
    fontSize: 12 * Metrics.screenWidth / 320,
    marginVertical: -3,
  },
  priceText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 16 * Metrics.screenWidth / 320,
    marginVertical: -3,
  },
  commissionText:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: 10 * Metrics.screenWidth / 320,
    marginVertical: -3,
  },
})
