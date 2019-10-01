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
    height: Metrics.screenHeight - 130,
    marginHorizontal: 20,
    marginTop: 5
  },
  productContainer:{
    width: (Metrics.screenWidth - 40),
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop:10
  },
  productImageWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
  },
  productImage:{
    width: (Metrics.screenWidth - 40) / 2 - 5,
    height: Metrics.screenHeight / 3 - 5,
  },
  removeBtn:{
    position: 'absolute',
    top: 5,
    left: 5
  },
  removeImg:{
    height: 15 * Metrics.screenWidth / 320,
    width: 15 * Metrics.screenWidth / 320,
    resizeMode: 'contain',
  },
  productDescriptionWrapper:{
    width: (Metrics.screenWidth - 40) / 2,
    height: Metrics.screenHeight / 3,
    flex: 1
  },
  itemText:{
    fontSize: Metrics.fontSize1,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  itemText2:{
    fontSize: Metrics.fontSize2,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  nameWrapper:{
    marginBottom: 5
  },
  productName:{
    fontSize: Metrics.fontSize1,
    color: Colors.gray,
    fontFamily: Fonts.type.gotham2,
  },
  propertyWrapper:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  sizeWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  size_dropdown: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdown_text: {
    fontSize: Metrics.fontSize3,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  dropdown_dropdown: {
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: Colors.black,
  },
  sizeBtn:{
    width: Metrics.screenWidth / 5,
    height: 20,
    alignItems: 'center'
  },
  sizeText:{
    fontSize: Metrics.fontSize3,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
  },
  colorWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  colorBtn:{
    width: Metrics.screenWidth / 5,
    height: 30,
    alignItems: 'center'
  },
  colorPick:{
    width: 20,
    height: 20,
  },
  qtyWrapper:{
    flex:1,
    width: (Metrics.screenWidth - 40) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyContainer:{
    width: Metrics.screenWidth / 5 + 1,
    height: 27,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingRight: 1,
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
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  productSubtitle:{
    fontSize: Metrics.fontSize3,
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
    fontSize: Metrics.fontSize3,
  },
  subtotalWrapper:{
    backgroundColor: Colors.white,
    borderWidth: 1,
    paddingLeft: 20,
    paddingVertical: 10,
    width: Metrics.screenWidth / 2,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  subtotalText:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    marginVertical: -3,
  },
  priceText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    marginVertical: -3,
  },
  commissionText:{
    color:Colors.blueMooimom,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    marginVertical: 0,
  },
})
