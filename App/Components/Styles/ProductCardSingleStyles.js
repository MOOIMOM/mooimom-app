import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  item: {
    width: Metrics.screenWidth - 40,
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
    borderBottomColor: Colors.black
  },
  topItem:{
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:Metrics.screenHeight / 4
  },
  topLeftItem:{
    flex:2,
    justifyContent: 'center',
  },
  topRightItem:{
    flex:3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  wishlist:{
    position: 'absolute',
    right: 10,
    top: 5
  },
  wishlistImage:{
    width: 15 * Metrics.screenWidth / 320,
    height: 15 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  image:{
    flex:1
  },
  name:{
    flexWrap: 'wrap',
    fontSize: Metrics.fontSize1,
    fontFamily: Fonts.type.gotham2,
    color: Colors.black,
    lineHeight: Metrics.fontSize2,
  },
  priceGroup:{
    alignSelf: 'flex-start',
    paddingBottom: 20,
  },
  price:{
    color:Colors.black,
    fontSize: Metrics.fontSize3,
    fontFamily: Fonts.type.gotham4
  },
  priceDiscount:{
    color:Colors.fire,
    fontSize: Metrics.fontSize2,
    textDecorationLine:'line-through',
    fontFamily: Fonts.type.gotham2
  },
  bottomItem:{
    flexDirection: 'row',
    justifyContent: 'center',
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
    width: 20 * Metrics.screenWidth / 320,
    height: 20 * Metrics.screenWidth / 320,
  },
  textBtnExtra:{
    fontSize: Metrics.fontSize0
  },
  bottomRightItem:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn:{
    backgroundColor: Colors.mooimom,
    height: 35 * Metrics.screenWidth / 320,
    width: Metrics.screenWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  imageBtn:{
    resizeMode: 'contain',
    width: 20 * Metrics.screenWidth / 320,
    height: 20 * Metrics.screenWidth / 320,
    marginRight: 10
  },
  textBtn:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1
  },
  modalView:{
    width: Metrics.screenWidth - 80,
    height: 25 * Metrics.screenWidth / 320,
    backgroundColor: Colors.modal,
    borderRadius: 20 * Metrics.screenWidth / 320,
    position: 'absolute',
    bottom: 40,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText:{
    fontSize: Metrics.fontSize2,
    color: Colors.white,
    fontFamily: Fonts.type.gotham2,
  },
})
