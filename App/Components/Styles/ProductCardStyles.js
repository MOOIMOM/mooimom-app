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
    marginBottom: 20
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
    width: Metrics.screenWidth / 2,
    height: 200 * Metrics.screenWidth / 320,
    marginBottom:5
  },
  name:{
    flexWrap: 'wrap',
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham2,
  },
  priceGroup:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 5
  },
  price:{
    color:Colors.black,
    fontSize: Metrics.fontSize2,
    fontFamily: Fonts.type.gotham4,
  },
  priceDiscount:{
    color:Colors.fire,
    fontSize: Metrics.fontSize1,
    textDecorationLine:'line-through',
    fontFamily: Fonts.type.gotham2,
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
  }
})
