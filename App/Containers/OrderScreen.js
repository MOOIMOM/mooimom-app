import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator} from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import GetAllOrderActions from '../Redux/GetAllOrderRedux';
import GetCommissionSummaryActions from '../Redux/GetCommissionSummaryRedux';
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/OrderScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'
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
      menuStatus: ['all', 'pending', 'processing', 'completed', 'cancelled'],
      menuStatusName: ['Semua', 'Pembayaran', 'Diproses', 'Selesai', 'Dibatalkan'],
      selectedMenuIdx: 0,
      orders:[],
      fcmToken: ''
    }
  }

  async componentDidMount(){
    this.setState({ fcmToken: await AsyncStorage.getItem('fcmToken') })
    this.reloadData()
  }

  reloadData(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcmToken: this.state.fcmToken,
        selected_status : this.state.menuStatus[this.state.selectedMenuIdx]
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
        !newProps.allOrder.fetching
      ) {
        this.setState({
          orders: newProps.allOrder.payload.all_orders,
        })
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
      orders: []
    })
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcmToken: this.state.fcmToken,
        selected_status : this.state.menuStatus[index]
      }
    }
    this.props.getAllOrderProcess(data)
  }

  _renderMenuStatus({item, index}){
    var style = styles.menuBtn
    var styleText = styles.menuText
    if(index === this.state.selectedMenuIdx){
      style = styles.menuBtn2
      styleText = styles.menuText2
    }
    return(
      <TouchableOpacity onPress={() => this.pressStatus(index)}>
        <View style={style}>
            <Text style={styleText}>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderOrders({item, index}){
    if(item.status === this.state.menuStatus[this.state.selectedMenuIdx] || this.state.selectedMenuIdx === 0){
      var image = Images.default
      if(item.products[0].images[0].url && item.products[0].images[0].url !== '')
        image = {uri:item.products[0].images[0].url}
      return (
        <TouchableOpacity onPress={() => this.actNavigate('DetailOrderScreen', {order:item})}>
          <View style={styles.orderContainer}>
            <View style={styles.orderContainerTop}>
              <Text style={styles.orderStatusText}>{item.statusname}</Text>
            </View>
            <View style={styles.orderContainerMid}>
              <Text style={styles.orderDateText}>{item.orderDate}</Text>
              <Text style={styles.orderIDText}>No Order {item.orderID}</Text>
            </View>
            <View style={styles.orderContainerBottom}>
              <View style={styles.orderContainerProductWrapper}>
                <View style={styles.orderContainerLeft}>
                  <Image source={image} style={styles.productImage}/>
                </View>
                <View style={styles.orderContainerRight}>
                  <Text style={styles.productName}>{item.products[0].name}</Text>
                  <Text style={styles.productPrice}>{convertToRupiah(item.products[0].price)}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return <View/>
    }
  }

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
                  <FlatList
                    data={this.state.menuStatusName}
                    renderItem={this._renderMenuStatus.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    extraData={this.state.selectedMenuIdx}
                  />
                </View>
                <View style={styles.wrapperSeparator}/>
                <View style={styles.listOrders}>
                  {this.props.allOrder.fetching && <View style={styles.containerLoading}>
                    <ActivityIndicator size="large" color={Colors.mooimom} />
                  </View>}
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
