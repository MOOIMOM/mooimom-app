import React from 'react'

import { connect } from 'react-redux'
import { View, SafeAreaView, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'

import styles from './Styles/VoucherScreenStyles'

import GetVouchersActions from '../Redux/GetVouchersRedux'

import VoucherCard from '../Components/VoucherCard'

import { DotIndicator } from 'react-native-indicators'


class VoucherScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vouchers: []
    }
  }

  componentDidMount() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token
      }
    }
    this.props.getVouchersProcess(data)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.getVouchers !== newProps.getVouchers) {
      if (
        newProps.getVouchers.payload !== null &&
        newProps.getVouchers.error === null &&
        !newProps.getVouchers.fetching
      ) {
        this.setState({
          vouchers: newProps.getVouchers.payload.all_app_events,
        })
      }
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  renderVoucherList({ item }) {
    image = { uri: item.the_app_event_image }

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.actNavigate('VoucherDetailScreen', { voucherId: item.app_event_id })}>
        <VoucherCard
          voucherImage={image}
          expireDate={item.expire_date}
          minimalTransaction={item.minimal_transaction}
        />
      </TouchableOpacity>
    )
  }

  renderHeader() {
    return (
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
          {this.props.cartt.data.length > 0 && <View style={styles.notifContainer}>
            <Text style={styles.textNotif2}>{this.props.cartt.data.length}</Text>
          </View>}
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView>
        {this.renderHeader()}
        <View style={{ width: '94%', alignSelf: 'center', marginVertical: 20 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, fontSize: Metrics.fontSize3, fontWeight: 'bold' }}>Voucher</Text>
        </View>
        {
          this.props.getVouchers.fetching ?
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <DotIndicator color={Colors.mooimom} size={12} />
            </View>
            :
            <FlatList
              data={this.state.vouchers}
              renderItem={this.renderVoucherList.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
        }
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cartt: state.cartt,
    getVouchers: state.getVouchers
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getVouchersProcess: data => {
      dispatch(GetVouchersActions.getVouchersRequest(data))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoucherScreen)
