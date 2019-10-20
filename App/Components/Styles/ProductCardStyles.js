import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  item: {
    width: Metrics.screenWidth / 2 - 20,
    height: 320 * Metrics.screenWidth / 320,
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  wishlist:{
    position: 'absolute',
    right: 15,
    top: 0,
  },
  wishlistImage:{
    width: 15 * Metrics.screenWidth / 320,
    height: 15 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  image:{
    width: Metrics.screenWidth / 2 - 30,
    height: 200 * Metrics.screenWidth / 320,
    marginBottom:5
  },
  name:{
    flexWrap: 'wrap',
    fontSize: Metrics.fontSize1,
    lineHeight: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham2,
  },
  priceGroup:{
    flex:1,
    width: Metrics.screenWidth / 2,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  price:{
    color:Colors.black,
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
    textAlign: 'left',
  },
  priceDiscount:{
    color:Colors.fire,
    fontSize: Metrics.fontSize1,
    textDecorationLine:'line-through',
    fontFamily: Fonts.type.gotham2,
    textAlign: 'left',
  },
  extra:{
  },
  btn:{
    backgroundColor: Colors.mooimom,
    height: 30 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  textBtn:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
  },
  modalView:{
    width: Metrics.screenWidth / 2 - 20,
    height: 20 * Metrics.screenWidth / 320,
    backgroundColor: Colors.modal,
    borderRadius: 20 * Metrics.screenWidth / 320,
    position: 'absolute',
    bottom: 40,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText:{
    fontSize: Metrics.fontSize1,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  },
  productEmptyContainer:{
    position: 'absolute',
    top: 150 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth / 2 - 30,
    paddingHorizontal: 10,
    height: 50 * Metrics.screenWidth / 320,
    backgroundColor: Colors.modal,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textSoldContainer:{
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageSad:{
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  textSold1:{
    fontSize: Metrics.fontSize1,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  },
  textSold2:{
    fontSize: Metrics.fontSize0,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  }
})
