import React from 'react'

import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import { convertToRupiah, getDateFromString, convertToThousandOrHigher } from '../Lib/utils'
import { connect } from 'react-redux'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import GetMooimomPointsActions from '../Redux/GetMooimomPointsRedux'
import FastImage from 'react-native-fast-image'
import { DotIndicator } from 'react-native-indicators'

import styles from './Styles/PointsHistoryScreenStyles'

class PointsHistoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: 0,
      pointsHistory: []
    }
  }

  componentDidMount() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getMooimomPointsProcess(data)
  }

  componentWillReceiveProps(newProps) {

    if (this.props.mooimomPoints !== newProps.mooimomPoints) {
      if (
        newProps.mooimomPoints.payload !== null &&
        newProps.mooimomPoints.error === null &&
        !newProps.mooimomPoints.fetching
      ) {
        this.setState({
          points: newProps.mooimomPoints.payload.how_many_points,
          pointsHistory: newProps.mooimomPoints.payload.order_point_history
        })
      }
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  checkNegativeNumber(num) {
    let pattern = /^-[0-9]?/gm;
    pattern.test(num)
  }

  renderPointsHistory() {
    if (this.state.pointsHistory.length > 0)
      return (
        this.state.pointsHistory.map((item, index) => {
          return (
            <View style={styles.menu} key={index.toString()}>
              <View style={styles.menuItem}>
                {
                  item.promo_expire_date && !this.checkNegativeNumber(item.total_points) &&
                  <>
                    <View>
                      <Text style={styles.imgText}>Incoming points</Text>
                      <Text style={styles.imgText}>Expired : {item.promo_expire_date}</Text>
                    </View>
                    <Text style={[styles.imgTextBold, { color: Colors.mooimom }]}>{item.total_points}</Text>
                  </>
                }
                {
                  item.order_id &&
                  <>
                    <Text style={styles.imgText}>Poin terpakai pada order # <Text style={[styles.imgText, { color: Colors.mooimom }]}>{item.order_id}</Text></Text>
                    <Text style={[styles.imgTextBold, { color: Colors.fire }]}>{item.total_points}</Text>
                  </>
                }
              </View>
            </View>
          )
        })
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
        <View style={styles.cardBallanceContainer} >
          <View style={styles.containerBallanceTittle}>
            <Text style={styles.textBallanceCardTitle}>Saldo Anda Saat Ini</Text>
          </View>
          <View style={styles.wrapperBallanceArea}>
            <View>
              <View style={styles.wrapperBallanceHeader}>
                <FastImage source={Images.mooimomPoints} style={styles.imgMooimomCash} resizeMode={FastImage.resizeMode.contain} />
                <View>
                  <Text style={styles.textMooimomBallance}>Mooimom</Text>
                  <Text style={styles.textMooimomBallance}>Points</Text>
                </View>
              </View>
              <View style={styles.ballanceSizedVerticalMargin} />
              <View style={{ width: Metrics.screenWidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, paddingBottom: 10, borderColor: Colors.mediumGray }}>
                <Text style={styles.textBallanceNumber}>Total</Text>
                <View style={styles.rowAlign}>
                  <Text style={styles.textBallanceNumber}>{convertToThousandOrHigher(this.state.points)}</Text>
                  <View style={styles.ballanceSizedHorizontalMargin} />
                  <Text style={styles.textBallanceCurrency}>points</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.wrapperSeparator} />
        <View style={{ width: Metrics.screenWidth - 40, alignSelf: 'center' }}>
          {this.state.pointsHistory.length > 0 && <Text style={[styles.textBallanceCardTitle, { marginBottom: 10 }]}>Riwayat</Text>}
          {this.props.mooimomPoints.fetching ?
            <DotIndicator color={Colors.mooimom} size={8} />
            :
            this.renderPointsHistory()
          }
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    mooimomPoints: state.mooimomPoints,
    auth: state.auth,
    cartt: state.cartt,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getMooimomPointsProcess: data => {
      dispatch(GetMooimomPointsActions.getMooimomPointsRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsHistoryScreen)
