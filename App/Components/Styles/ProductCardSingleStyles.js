import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  item: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight / 3,
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 15,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black
  },
  topItem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1
  },
  topLeftItem:{
    flex:2
  },
  topRightItem:{
    flex:3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingTop: 15
  },
  wishlist:{
    position: 'absolute',
    right: 15,
    top: 0,
  },
  wishlistImage:{
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  image:{
    resizeMode: 'contain',
    flex:1
  },
  name:{
    flexWrap: 'wrap',
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
  },
  priceGroup:{
    alignSelf: 'flex-start',
    paddingBottom: 20,
  },
  price:{
    color:Colors.black,
    fontSize: 14 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4
  },
  priceDiscount:{
    color:Colors.fire,
    fontSize: 12 * Metrics.screenWidth / 320,
    textDecorationLine:'line-through',
    fontFamily: Fonts.type.gotham2
  },
  bottomItem:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomLeftItem:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnExtra:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageExtra:{
    resizeMode: 'contain',
    width: 25,
    height: 25
  },
  textBtnExtra:{
    fontSize: 8 * Metrics.screenWidth / 320
  },
  bottomRightItem:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn:{
    backgroundColor: Colors.mooimom,
    height: 40,
    width: Metrics.screenWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  imageBtn:{
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginRight: 10
  },
  textBtn:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 12 * Metrics.screenWidth / 320
  },
  modalView:{
    width: Metrics.screenWidth - 80,
    height: 40,
    backgroundColor: Colors.modal,
    borderRadius: 20,
    position: 'absolute',
    bottom: 40,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText:{
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  },
})
