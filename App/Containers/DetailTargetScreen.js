import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity} from 'react-native'
import { Images, Metrics } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import GetCommissionSummaryActions from '../Redux/GetCommissionSummaryRedux';
import SettingActions from '../Redux/SettingRedux';
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/DetailTargetScreenStyles'
var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

class DetailTargetScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      simulations:[],
      commissionSummary: {}
    }
  }

  componentDidMount(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getCommissionSummaryProcess(data)
    this.props.getSettingRequest(data)
  }

  componentWillReceiveProps (newProps) {
    if(this.props.commissionSummary !== newProps.commissionSummary){
      if (
        newProps.commissionSummary.payload !== null &&
        newProps.commissionSummary.error === null &&
        !newProps.commissionSummary.fetching
      ) {
        this.setState({
          commissionSummary: newProps.commissionSummary.payload,
        })
      }
    }

    if(this.props.setting !== newProps.setting){
      if (
        newProps.setting.payload !== null &&
        newProps.setting.error === null &&
        !newProps.setting.fetching
      ) {
        this.setState({
          simulations: newProps.setting.payload.sales_target,
        })
      }
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  _renderSimulation(){
    if(this.state.simulations.length > 0)
    return (
      this.state.simulations.map((item, index) => {
        return(
          <View style={styles.itemSimulation} key={index.toString()}>
            <Text style={styles.textSimulation}>{item.name}</Text>
            <Text style={styles.textSimulation}>{convertToRupiah(item.minimal)}</Text>
            <Text style={styles.textSimulation2}>{item.commission}%</Text>
          </View>
        )
      })
    )
  }

  render () {
    var target = 0
    var achieve = 0
    var processing = 0
    var curBonus = 0
    var nextBonus = 0
    var bonus_val = 0
    var date_start = ''
    var date_end = ''
    if(this.state.commissionSummary.all_orders_completed_total_spending >= 0)
      achieve = this.state.commissionSummary.all_orders_completed_total_spending
    if(this.state.commissionSummary.how_much_commission_user_need_to_get_to_get_next_commission_target_percentage >= 0)
      target = this.state.commissionSummary.how_much_commission_user_need_to_get_to_get_next_commission_target_percentage
    if(this.state.commissionSummary.all_orders_processing_total_spending >= 0)
      processing = this.state.commissionSummary.all_orders_processing_total_spending
    if(this.state.commissionSummary.what_percentage_commission_user_will_receive_now >= 0)
      curBonus = this.state.commissionSummary.what_percentage_commission_user_will_receive_now
    if(this.state.commissionSummary.what_percentage_commission_user_will_receive_next >= 0)
      nextBonus = this.state.commissionSummary.what_percentage_commission_user_will_receive_next
    if(this.state.commissionSummary.how_much_commission_user_will_receive_this_week >= 0)
      bonus_val = this.state.commissionSummary.how_much_commission_user_will_receive_this_week
    if(this.state.commissionSummary.date_start && this.state.commissionSummary.date_start !== ''){
      var dt = this.state.commissionSummary.date_start.split('-')
      date_start = parseInt(dt[2], 10) +' '+ months[parseInt(dt[1], 10) - 1]
    }
    if(this.state.commissionSummary.date_end && this.state.commissionSummary.date_end !== ''){
      var dt = this.state.commissionSummary.date_end.split('-')
      date_end = parseInt(dt[2], 10) +' '+ months[parseInt(dt[1], 10) - 1]
    }
    var need = target - achieve
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
              <LinearGradient colors={['#82DED2', '#66CCCC']} style={styles.topContainer}>
                  <Text style={styles.textTarget}>Target Bonus Minggu Ini</Text>
                  <Text style={styles.textBonus}>Bonus Saat ini: {curBonus}%</Text>
                  <View style={styles.calculateBonusWrapper}>
                    <Text style={styles.textString}>Target bonus {nextBonus}%</Text>
                    <Text style={styles.textString}>Penjualan minggu ini</Text>
                  </View>
                  <View style={styles.calculateBonusWrapper}>
                    <Text style={styles.textAmount}>{convertToRupiah(target)}</Text>
                    <Text style={styles.textMath}>-</Text>
                    <Text style={styles.textAmount}>{convertToRupiah(achieve)}</Text>
                    <Text style={styles.textMath}>=</Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.textTargetAmount}>{convertToRupiah(need)}</Text>
                    <Text style={styles.textTargetMore}>Jumlah yang diperlukan untuk bonus {nextBonus}%</Text>
                  </View>
              </LinearGradient>
              <View style={styles.wrapperSeparator}/>
              <View style={styles.bottomContainer}>
                <View style={styles.infoWithBGContainer}>
                  <Image source={Images.caution} style={styles.imgInfo}/>
                  <Text style={styles.textInfo}>Pesanan yang dikembalikan dan dibatalkan TIDAK termasuk dalam program Bonus MOOIMOM</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Image source={Images.check} style={styles.imgInfo}/>
                  <Text style={styles.textInfo}>Bonus akan dikreditkan ke rekening Anda setelah pesanan pelanggan Anda berhasil dikirim tanpa pengembalian/penukaran</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Image source={Images.info} style={styles.imgInfo}/>
                  <Text style={styles.textInfo}>Bonus dihitung berdasarkan harga asli barang, dan tidak termasuk keuntungan Anda</Text>
                </View>
                <View style={styles.wrapperSeparator}/>
                <Text style={styles.textBonusWeekly}>Program Bonus Minggu ini ({date_start} - {date_end})</Text>
                <View style={styles.wrapperSeparator}/>
                <View style={styles.penjualanCalculator}>
                  <Text style={styles.textInfo2}>Total Penjualan (Semua Pesanan)</Text>
                  <Text style={styles.textPenjualan1}>{convertToRupiah(achieve)}</Text>
                </View>
                <View style={styles.penjualanCalculator}>
                  <Text style={styles.textInfo2}>Total Penjualan (Belum Selesai)</Text>
                  <Text style={styles.textPenjualan2}>{convertToRupiah(processing)}</Text>
                </View>
                <View style={styles.penjualanCalculator}>
                  <Text style={styles.textInfo2}>Total Penjualan (Sudah Diverifikasi)</Text>
                  <Text style={styles.textPenjualan3}>{convertToRupiah(achieve)}</Text>
                </View>
                <View style={styles.penjualanCalculator2}>
                  <Text style={styles.textInfo2}>Estimasi Bonus yang Diterima</Text>
                  <Text style={styles.textPenjualan3}>{convertToRupiah(bonus_val)} ({curBonus}%)</Text>
                </View>
                <View style={styles.wrapperSeparator}/>
                <View style={styles.tableSimulation}>
                  <View style={styles.tablesimulationHeader}>
                    <Text style={styles.tableHeaderText}>Target Penjualan</Text>
                    <Text style={styles.tableHeaderText}>Min. Pesanan</Text>
                    <Text style={styles.tableHeaderText2}>Bonus</Text>
                  </View>
                  {this._renderSimulation()}
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
    commissionSummary: state.commissionSummary,
    auth: state.auth,
    setting: state.setting
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCommissionSummaryProcess: data => {
      dispatch(GetCommissionSummaryActions.getCommissionSummaryRequest(data))
    },
    getSettingRequest: data => {
      dispatch(SettingActions.getSettingRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailTargetScreen)
