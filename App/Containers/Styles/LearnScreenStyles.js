import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:1,
  },
  containerScroll:{
    paddingTop: 0,
    flex: 1,
  },
  headerWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: Metrics.screenWidth,
    marginTop: 10,
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
  menuContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.white,
    width: (Metrics.screenWidth - 80) / 3,
    height: 35 * Metrics.screenWidth / 320,
    borderWidth: 1,
    borderColor: Colors.mooimom
  },
  menuText:{
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2,
    paddingHorizontal: 5
  },
  itemContainer:{
    marginTop:20,
    paddingHorizontal: 20
  },
  videoItem:{
    flexDirection:'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    flex: 1
  },
  imageItem:{
    width: 50 * Metrics.screenWidth / 320,
    height: 50 * Metrics.screenWidth / 320,
  },
  descItem:{
    marginLeft: 10 * Metrics.screenWidth / 320,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1
  },
  titleText:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2
  },
  titleText2:{
    color: Colors.gray,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize1,
    textAlign: 'right'
  },
  containerModal:{
    position: 'absolute',
    top:0,
    left : 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBtn:{
    alignSelf: 'flex-end',
    marginVertical: 20
  },
  closeImage:{
    width: 20 * Metrics.screenWidth / 320,
    height: 20 * Metrics.screenWidth / 320,
  },
  videoWrapper:{
    width: Metrics.screenWidth - 40
  },
  videoTitle:{
    color: Colors.white,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    lineHeight: Metrics.fontSize4,
    textAlign: 'center'
  },
  videoPlayer:{
    height: Metrics.screenHeight / 2,
    width: Metrics.screenWidth - 40
  },
  containerModal2:{
    position: 'absolute',
    top:0,
    left : 0,
    backgroundColor: Colors.white,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  headerArticle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  articleTitle:{
    flex: 8,
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    lineHeight: Metrics.fontSize4,
    textAlign: 'center'
  },
  closeBtn2:{
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  headerQA:{
    flexDirection: 'row',
    width: Metrics.screenWidth - 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  qaTitle:{
    color: Colors.black,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize3,
    lineHeight: Metrics.fontSize4,
    textAlign: 'left',
    marginLeft: 10
  },
  questionItem:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    flex: 1
  },
  imgMenu2:{
    width: 10 * Metrics.screenWidth / 320,
    height: 10 * Metrics.screenWidth / 320,
  },
  imageItem2:{
    width: 20 * Metrics.screenWidth / 320,
    height: 20 * Metrics.screenWidth / 320,
  },
  closeBtn3:{

  }
})
