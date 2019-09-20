import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  item: {
    width: Metrics.screenWidth / 2 - 20,
    height: Metrics.screenHeight / 2,
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
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  image:{
    width: Metrics.screenWidth / 2,
    maxHeight: 200,
    resizeMode: 'contain',
    flex: 5,
    marginBottom:5
  },
  name:{
    flexWrap: 'wrap',
    flex: 1,
    fontSize: 9 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham2,
  },
  priceGroup:{
    flex:1,
    alignSelf: 'flex-start',
    paddingBottom: 20,
  },
  price:{
    color:Colors.black,
    fontSize: 12 * Metrics.screenWidth / 320,
    fontFamily: Fonts.type.gotham4,
    flex:1
  },
  priceDiscount:{
    color:Colors.fire,
    fontSize: 10 * Metrics.screenWidth / 320,
    textDecorationLine:'line-through',
    fontFamily: Fonts.type.gotham2,
    flex:1
  },
  extra:{
    flex:1
  },
  btn:{
    backgroundColor: Colors.mooimom,
    height: 30,
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
