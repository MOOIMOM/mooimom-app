import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, FlatList, AsyncStorage, RefreshControl} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Images, Metrics, Colors } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import GetAllOrderActions from '../Redux/GetAllOrderRedux';
import GetCommissionSummaryActions from '../Redux/GetCommissionSummaryRedux';
import { connect } from 'react-redux'
import {convertToRupiah, getDateFromString} from '../Lib/utils'

// Styles
import styles from './Styles/OrderScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

var isReloadPage = false
class OrderScreen extends Component {
  static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.order2 : Images.order)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)
    this.state = {
      menuStatus: [
        {status:'all', status_name:'Semua', status_name_proses: ''},
        {status:'pending', status_name:'Pembayaran', status_name_proses: 'Menunggu Pembayaran'},
        {status:'processing', status_name:'Diproses', status_name_proses: 'Sedang Diproses'},
        {status:'completed', status_name:'Selesai', status_name_proses: 'Selesai'},
        {status:'cancelled', status_name:'Dibatalkan', status_name_proses: 'Dibatalkan'}
      ],
      selectedMenuIdx: 0,
      orders:[],
      fcmToken: '',
      currentPage: 1,
      refreshing: false
    }

    this._renderProductCart = this._renderProductCart.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
  }

  async componentDidMount(){
    this.setState({ fcmToken: await AsyncStorage.getItem('fcmToken') })
    this.refreshPage()
  }

  refreshPage(){
    if(!this.state.refreshing){
      this.setState({
        refreshing: true
      });
      this.reloadData()
    }
  }

  reloadData(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcmToken: this.state.fcmToken,
        selected_status : this.state.menuStatus[this.state.selectedMenuIdx].status
      }
    }
    this.props.getAllOrderProcess(data)
    let data2 = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getCommissionSummaryProcess(data2)
  }

  componentWillReceiveProps (newProps) {
    if(this.props.allOrder !== newProps.allOrder){
      if (
        newProps.allOrder.payload !== null &&
        newProps.allOrder.error === null &&
        !newProps.allOrder.fetching && !isReloadPage
      ) {
        this.setState({
          orders: newProps.allOrder.payload.all_orders_data,
          refreshing: false
        })
      } else if(
        newProps.allOrder.payload !== null &&
        newProps.allOrder.error === null &&
        !newProps.allOrder.fetching && isReloadPage
      ){
        var arr = [...this.state.orders]
        arr = arr.concat(newProps.allOrder.payload.all_orders_data)
        this.setState({
          currentPage: this.state.currentPage + 1,
          orders: arr,
          refreshing: false
        })
        isReloadPage = false
      }
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  pressStatus(index){
    this.setState({
      selectedMenuIdx: index,
      currentPage: 1,
      orders: []
    })
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcmToken: this.state.fcmToken,
        selected_status : this.state.menuStatus[index].status
      }
    }
    this.props.getAllOrderProcess(data)
  }

  onEndReached(){
    if (!isReloadPage) {
      if (this.state.currentPage + 1 <= this.props.allOrder.payload.how_many_pages) {
        isReloadPage = true
        let data = {
          data_request:{
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            selected_status: this.state.menuStatus[this.state.selectedMenuIdx].status,
            current_page: this.state.currentPage + 1,
            fcmToken: this.state.fcmToken,
          }
        }
        this.props.getAllOrderProcess(data)
      }
    }
  }

  _renderMenuStatus(){
    if(this.state.menuStatus.length > 0)
    return (
      this.state.menuStatus.map((item, index) => {
        var style = styles.menuBtn
        var styleText = styles.menuText
        if(index === this.state.selectedMenuIdx){
          style = styles.menuBtn2
          styleText = styles.menuText2
        }
        return(
          <TouchableOpacity onPress={() => this.pressStatus(index)} key={index.toString()}>
            <View style={style}>
                <Text style={styleText}>{item.status_name}</Text>
            </View>
          </TouchableOpacity>
        )
      })
    )
  }

  _renderProductCart(items){
    if(items.length > 0){
      return items.map((item, index) => {
        var image = Images.default
        if(item.main_image && item.main_image !== '')
          image = {uri:item.main_image}
        return (
          <View style={styles.orderContainerProductWrapper} key={index.toString()}>
            <View style={styles.orderContainerLeft}>
              <FastImage source={image} style={styles.productImage} resizeMode={FastImage.resizeMode.contain}/>
            </View>
            <View style={styles.orderContainerRight}>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.productPrice}>{convertToRupiah(item.price)}</Text>
            </View>
          </View>
        )
      })
    }
  }

  _renderOrders({item, index}){
  const {menuStatus} = this.state
  var status = ''
  var idx = menuStatus.findIndex(status => status.status === item.order_status)
  if(idx >= 0)
    status = menuStatus[idx].status_name_proses
  return (
     <TouchableOpacity onPress={() => this.actNavigate('DetailOrderScreen', {order_id:item.order_id})} key={index.toString()}>
       <View style={styles.orderContainer}>
         <View style={styles.orderContainerTop}>
           <Text style={styles.orderStatusText}>{status}</Text>
         </View>
         <View style={styles.orderContainerMid}>
           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.orderIDText}>Order #{item.order_id}</Text>
            <Text style={styles.orderDateText}>{getDateFromString(item.order_date, true, false, true, false)}</Text>
            </View>
         </View>
         <View style={styles.orderContainerBottom}>
           {this._renderProductCart(item.order_items)}
         </View>
         <View style={styles.orderContainerTotal}>
           <Text style={styles.orderAmount}>Total</Text>
           <Text style={styles.orderAmount}>{convertToRupiah(item.order_total)}</Text>
         </View>
       </View>
     </TouchableOpacity>
   )
  }

  isCloseToBottom(nativeEvent){
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent
    const paddingToBottom = Metrics.screenHeight;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render () {
    var target = 0
    if(this.props.commissionSummary.payload && this.props.commissionSummary.payload.how_much_commission_user_need_to_get_to_get_next_commission_target_percentage)
      target = this.props.commissionSummary.payload.how_much_commission_user_need_to_get_to_get_next_commission_target_percentage
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={({nativeEvent}) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.onEndReached();
              }
            }}
            scrollEventThrottle={0}
            refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshPage}/>}
            >
              <LinearGradient colors={['#82DED2', '#66CCCC']} style={styles.topContainer}>
                <TouchableOpacity onPress={() => this.actNavigate('DetailTargetScreen')}>
                  <Text style={styles.textTarget}>Target Bonus Minggu Ini</Text>
                  <Text style={styles.textTargetAmount}>{convertToRupiah(target)}</Text>
                  <Text style={styles.textTargetMore}>Raih Target dan dapatkan bonus lebih banyak</Text>
                  <Image source={Images.rightArrow} style={styles.iconRight}/>
                </TouchableOpacity>
              </LinearGradient>
              <View style={styles.wrapperSeparator}/>
              <View style={styles.bottomContainer}>
                <Text style={styles.textMenuStatus}>Pesanan Saya</Text>
                <View style={styles.menuStatus}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                  {this._renderMenuStatus()}
                </ScrollView>
                </View>
                <View style={styles.wrapperSeparator}/>
                <View style={styles.listOrders}>
                  <FlatList
                    data={this.state.orders}
                    renderItem={this._renderOrders.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    allOrder: state.allOrder,
    auth: state.auth,
    commissionSummary: state.commissionSummary
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrderProcess: data => {
      dispatch(GetAllOrderActions.getAllOrderRequest(data))
    },
    getCommissionSummaryProcess: data => {
      dispatch(GetCommissionSummaryActions.getCommissionSummaryRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreen)
