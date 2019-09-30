import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    height: Metrics.screenHeight - 120
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
    fontSize:Metrics.fontSize1
  },
  btnHeader:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader:{
    height: 20 * Metrics.screenWidth / 320,
    width: 20 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  contentContainer:{
    flexDirection:'row',
    width: Metrics.screenWidth,
  },
  topContainer:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: Metrics.screenWidth,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  textTarget:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    textAlign: 'center'
  },
  textBonus:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    textAlign: 'left',
    width: (Metrics.screenWidth - 40),
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },
  amountContainer:{
    borderRadius: 5,
    marginVertical: 20,
    marginLeft: 20,
    width: (Metrics.screenWidth - 80),
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
  },
  textTargetAmount:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize4,
    textAlign: 'center',
    alignSelf: 'center',
  },
  textTargetMore:{
    color:Colors.white,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  calculateBonusWrapper:{
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textString:{
    flex:1,
    color:Colors.white,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
    marginVertical: 10
  },
  textAmount:{
    flex:2,
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
  },
  textMath:{
    flex:1,
    color:Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    textAlign: 'center'
  },
  bottomContainer:{
    width: Metrics.screenWidth - 40,
    marginHorizontal: 20
  },
  infoWithBGContainer:{
    flexDirection: 'row',
    paddingRight: 30,
    backgroundColor: Colors.lightGray,
    padding: 10,
    alignItems: 'center'
  },
  infoContainer:{
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  imgInfo:{
    height: 30 * Metrics.screenWidth / 320,
    width: 30 * Metrics.screenWidth / 320,
    resizeMode: 'contain'
  },
  textInfo:{
    marginLeft: 20,
    textAlign: 'justify',
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    flex:1
  },
  textBonusWeekly:{
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize2,
    fontWeight: 'bold'
  },
  penjualanCalculator:{
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 5
  },
  penjualanCalculator2:{
    flexDirection: 'row',
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 5
  },
  textInfo2:{
    textAlign: 'justify',
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    flex:2
  },
  textPenjualan1:{
    textAlign: 'left',
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    flex:1,
    color:Colors.mooimom
  },
  textPenjualan2:{
    textAlign: 'left',
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    flex:1,
    color:Colors.fire
  },
  textPenjualan3:{
    textAlign: 'left',
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    flex:1
  },
  tablesimulationHeader:{
    flexDirection: 'row',
    backgroundColor: Colors.mooimom,
    paddingVertical: 10
  },
  tableHeaderText:{
    flex:3,
    textAlign: 'center',
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    color: Colors.white
  },
  tableHeaderText2:{
    flex:2,
    textAlign: 'center',
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    color: Colors.white
  },
  itemSimulation:{
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray
  },
  textSimulation:{
    flex:3,
    textAlign: 'center',
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
    color: Colors.gray
  },
  textSimulation2:{
    flex:2,
    textAlign: 'center',
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
    color: Colors.gray
  }
})
