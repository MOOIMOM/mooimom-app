import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes'
import GetNotificationActions from '../Redux/GetNotificationRedux'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/NotificationScreenStyles'

class NotificationScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notification: []
    }
  }

  componentDidMount(){
    let data ={
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
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
          notification: newProps.notification.payload,
        })
      }
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
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
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >

            </ScrollView>
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen)
