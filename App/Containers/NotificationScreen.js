import React, { Component } from 'react'
import { SafeAreaView, AsyncStorage, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import GetNotificationActions from '../Redux/GetNotificationRedux'
import DeleteNotifActions from '../Redux/DeleteNotifRedux'
import LastNotificationTimeActions from '../Redux/LastNotificationTimeRedux'
import { connect } from 'react-redux'
import { convertToRupiah, getDateFromString, saveLatestNotificationTime } from '../Lib/utils'

import { DotIndicator } from 'react-native-indicators'
// import Swipeout from 'react-native-swipeout'
// Styles
import styles from './Styles/NotificationScreenStyles'

class NotificationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: [],
      fcmToken: this.props.navigation.state.params.fcmToken
    }
  }

  componentDidMount() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcmToken: this.state.fcmToken
      }
    }
    this.props.getNotificationProcess(data)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.notification !== newProps.notification) {
      if (
        newProps.notification.payload !== null &&
        newProps.notification.error === null &&
        !newProps.notification.fetching
      ) {
        this.setState({
          notification: newProps.notification.payload.all_notifications,
        })
        this.props.saveLastNotificationProcess(newProps.notification.payload.all_notifications)
      }
    }
    if (this.props.deleteNotif !== newProps.deleteNotif) {
      if (
        newProps.deleteNotif.payload !== null &&
        newProps.deleteNotif.error === null &&
        !newProps.deleteNotif.fetching
      ) {
        this.componentDidMount()
      }
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  onPress(item) {
    switch (item.the_type) {
      case 'create_order':
      case 'order_pending_notification':
        this.actNavigate('DetailOrderScreen', { order_id: item.slug })
        break;
      case 'shopping_cart_pending_notification':
        this.actNavigate('CartScreen')
        break;
      case 'create_event_form':
        this.actNavigate('EventRegistrationScreen')
        break;
      case 'order_status_change':
        if (item.slug)
          this.actNavigate('DetailOrderScreen', { order_id: item.slug })
        break;
      case 'withdraw_status_change':
        this.actNavigate('PaymentScreen')
        break;
      case 'product_have_stock_again':
        this.actNavigate('ProductScreen', {
          product_slug: item.slug,
          auth: this.props.auth
        })
        break;
    }
  }
  onDeleteNotif(notifId) {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        notification_id_to_delete: notifId
      }
    }
    this.props.deleteNotifProcess(data)
  }

  _renderNotification({ item, index }) {
    const swipeoutBtns = [
      {
        text: 'Hapus',
        backgroundColor: Colors.fire,
        onPress: () => { this.onDeleteNotif(item.id) }
      }
    ]
    return (

      <TouchableWithoutFeedback onPress={() => this.onPress(item)}>
        {/* <Swipeout right={swipeoutBtns} backgroundColor='transparent' autoClose={true}> */}
        <View style={styles.notificationContainer}>
          <View style={styles.leftNotif}>
            <View style={[styles.colorNotif, this.getStyle(item)]} />
          </View>
          <View style={styles.rightNotif}>
            <Text style={styles.textNotif}>{item.the_message}</Text>
            <Text style={styles.textDateNotif}>{getDateFromString(item.created, true, false, true, false)}</Text>
          </View>
          <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
        </View>
        {/* </Swipeout> */}
      </TouchableWithoutFeedback >
    )
  }

  getStyle(item) {
    switch (item.the_type) {
      case 'create_order':
        return { backgroundColor: Colors.notifordercreated }
      case 'order_status_change':
        switch (item.status) {
          case 'cancelled':
            return { backgroundColor: Colors.notifordercancelled }
          case 'pending':
            return { backgroundColor: Colors.notifordercreated }
          case 'processing':
            return { backgroundColor: Colors.notiforderprocessing }
          case 'completed':
            return { backgroundColor: Colors.notifordercompleted }
          case 'not_yet_checkout':
            return { backgroundColor: Colors.notifordercreated }
          case 'False':
            return { backgroundColor: Colors.notifordercreated }
          default:
            return { backgroundColor: Colors.steel }
        }
        break;
      case 'withdraw_status_change':
        return { backgroundColor: Colors.notifwithdrawstatus }
      case 'product_have_stock_again':
        return { backgroundColor: Colors.notifproductbackinstock }
      default:
        return { backgroundColor: Colors.steel }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btnHeader} onPress={
              () => this.props.navigation.goBack()
            }>
              <Image source={Images.back} style={styles.imgHeader} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch} />
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader} />
              {this.props.cart.data.length > 0 && <View style={styles.notifContainer}>
                <Text style={styles.textNotif2}>{this.props.cart.data.length}</Text>
              </View>}
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator} />
          {this.props.notification.fetching &&
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100, margin: 'auto' }}>
              <DotIndicator size={12} color={Colors.mooimom} />
            </View>}
          <View style={styles.contentContainer}>
            <FlatList
              data={this.state.notification}
              renderItem={this._renderNotification.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {
  return {
    notification: state.notification,
    auth: state.auth,
    cart: state.cart,
    deleteNotif: state.deleteNotif
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getNotificationProcess: data => {
      dispatch(GetNotificationActions.getNotificationRequest(data))
    },
    saveLastNotificationProcess: data => {
      dispatch(LastNotificationTimeActions.lastNotificationTimeRequest(data))
    },
    deleteNotifProcess: data => {
      dispatch(DeleteNotifActions.deleteNotifRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen)
