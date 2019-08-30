import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex:6,
    alignItems: 'center'
  },
  headerWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'flex-start'
  },
  buttonHeader:{
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  searchButton:{
    width: Metrics.screenWidth / 1.8,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  imageSearch:{
    height:20,
    width:20,
    marginHorizontal: 10,
    resizeMode: 'contain'
  },
  textSearch:{
    color:Colors.gray,
    fontStyle: 'italic',
    fontSize: 12
  },
})
