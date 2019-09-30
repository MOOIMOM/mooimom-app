import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import GetNotificationActions from '../Redux/GetNotificationRedux'
import LastNotificationTimeActions from '../Redux/LastNotificationTimeRedux'
import { connect } from 'react-redux'
import {convertToRupiah, getDateFromString, saveLatestNotificationTime} from '../Lib/utils'

// Styles
import styles from './Styles/NotificationScreenStyles'

class NotificationScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notification: [],
      fcmToken: this.props.navigation.state.params.fcmToken
    }
  }

  componentDidMount(){
    let data ={
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcmToken: this.state.fcmToken
      }
    }
    this.props.getNotificationProcess(data)
  }

  componentWillReceiveProps(newProps){
    if(this.props.notification !== newProps.notification){
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
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  onPress(item){
    switch(item.the_type){
      case 'create_order':
      case 'order_status_change':
        if(item.slug)
          this.actNavigate('DetailOrderScreen', {order_id:item.slug})
      break;
      case 'withdraw_status_change':
        this.actNavigate('PaymentScreen')
      break;
    }
  }

  _renderNotification({item, index}){
    return (
      <TouchableWithoutFeedback onPress={() => this.onPress(item)}>
        <View style={[styles.notificationContainer, this.getStyle(item.the_type)]}>
          <Text style={styles.textNotif}>{item.the_message}</Text>
          <Text style={styles.textDateNotif}>{getDateFromString(item.created, true, false, true, false)}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  getStyle(type){
    switch(type){
      case 'create_order':
        return {borderLeftColor:Colors.mooimom, borderRightColor: Colors.mooimom}
      case 'order_status_change':
        return {borderLeftColor:Colors.ember, borderRightColor: Colors.ember}
      case 'withdraw_status_change':
        return {borderLeftColor:Colors.banner, borderRightColor: Colors.banner}
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btnHeader} onPress={
              () => this.props.navigation.goBack()
            }>
              <Image source={Images.back} style={styles.imgHeader}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          {this.props.notification.fetching &&
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100, margin: 'auto'}}>
            <ActivityIndicator size="large" color={Colors.mooimom} />
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
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    notification: state.notification,
    auth: state.auth
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen)
