import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 160
  },
  wrapperSeparator:{
    marginTop: 20,
  },
  headerWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: Metrics.screenWidth,
    marginTop: 20,
    height: 40
  },
  searchButton:{
    width: Metrics.screenWidth - 100,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSearch:{
    height:20,
    width:20,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  textSearch:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham5,
  },
  btnHeader:{
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader:{
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  contentContainer:{
    flexDirection:'row',
    width: Metrics.screenWidth,
  },
  topContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 6,
    paddingVertical: 10
  },
  textTarget:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 16,
    textAlign: 'center'
  },
  textTargetAmount:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 20,
    paddingVertical: 5,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 5,
    width: (Metrics.screenWidth - 40) / 2,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  textTargetMore:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14,
    textAlign: 'center'
  },
  iconRight:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute',
    right: -30,
    top:(Metrics.screenHeight / 12) - 30
  },
  bottomContainer:{
    width: Metrics.screenWidth - 40,
    marginLeft: 20
  },
  textMenuStatus:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham3,
    fontSize: 20,
    fontWeight: 'bold'
  },
  menuStatus:{
    marginTop:10
  },
  menuBtn:{
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14,
  },
  menuBtn2:{
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.mooimom,
    backgroundColor: Colors.mooimom,
    borderRadius: 5
  },
  menuText2:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14,
  },
  listOrders:{

  },
  orderContainer:{
    borderColor: Colors.gray,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  orderContainerTop:{
    backgroundColor: Colors.mooimom,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: Colors.mooimom,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 5
  },
  orderStatusText:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: 14,
    paddingVertical: 5
  },
  orderContainerMid:{
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 5
  },
  orderDateText:{
    color:Colors.gray,
    fontFamily: Fonts.type.gotham2,
    fontSize: 12,
  },
  orderIDText:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: 12,
  },
  orderContainerBottom:{
    marginHorizontal: 20
  },
  orderContainerProductWrapper:{
    flexDirection: 'row',
    paddingVertical: 5
  },
  orderContainerLeft:{
    flex:1,
    height: Metrics.screenHeight / 6,
  },
  productImage:{
    flex:1,
    resizeMode: 'contain'
  },
  orderContainerRight:{
    flex:2,
    justifyContent: 'space-between'
  },
  productName:{
    color:Colors.black,
    fontFamily: Fonts.type.gotham1,
    fontSize: 14,
  },
  productPrice:{
    color:Colors.mooimom,
    fontFamily: Fonts.type.gotham4,
    fontSize: 16,
  },
})
