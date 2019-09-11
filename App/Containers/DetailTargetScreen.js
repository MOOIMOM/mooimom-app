import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, FlatList} from 'react-native'
import { Images, Metrics } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/DetailTargetScreenStyles'

class DetailTargetScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      simulations:[
        {name:'Target 1', min:1000000, bonus:'10%'},
        {name:'Target 2', min:1750000, bonus:'15%'},
        {name:'Target 3', min:3000000, bonus:'18%'},
        {name:'Target 4', min:6000000, bonus:'20%'},
      ]
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  _renderSimulation({item, index}){
    return(
      <View style={styles.itemSimulation}>
        <Text style={styles.textSimulation}>{item.name}</Text>
        <Text style={styles.textSimulation}>{convertToRupiah(item.min)}</Text>
        <Text style={styles.textSimulation2}>{item.bonus}</Text>
      </View>
    )
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
              <LinearGradient colors={['#82DED2', '#66CCCC']} style={styles.topContainer}>
                  <Text style={styles.textTarget}>Target Bonus Minggu Ini (2 Sept 2019)</Text>
                  <Text style={styles.textBonus}>Bonus Saat ini: 0%</Text>
                  <View style={styles.calculateBonusWrapper}>
                    <Text style={styles.textString}>Target bonus 10%</Text>
                    <Text style={styles.textString}>Penjualan minggu ini</Text>
                  </View>
                  <View style={styles.calculateBonusWrapper}>
                    <Text style={styles.textAmount}>{convertToRupiah(1000000)}</Text>
                    <Text style={styles.textMath}>-</Text>
                    <Text style={styles.textAmount}>{convertToRupiah(500000)}</Text>
                    <Text style={styles.textMath}>=</Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.textTargetAmount}>Rp500.000</Text>
                    <Text style={styles.textTargetMore}>Jumlah yang diperlukan untuk bonus 10%</Text>
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
                <Text style={styles.textBonusWeekly}>Program Bonus Minggu ini (2 Sept - 8 Sept)</Text>
                <View style={styles.wrapperSeparator}/>
                <View style={styles.penjualanCalculator}>
                  <Text style={styles.textInfo2}>Total Penjualan (Semua Pesanan)</Text>
                  <Text style={styles.textPenjualan1}>{convertToRupiah(0)}</Text>
                </View>
                <View style={styles.penjualanCalculator}>
                  <Text style={styles.textInfo2}>Total Penjualan (Belum Selesai)</Text>
                  <Text style={styles.textPenjualan2}>{convertToRupiah(0)}</Text>
                </View>
                <View style={styles.penjualanCalculator}>
                  <Text style={styles.textInfo2}>Total Penjualan (Sudah Diverifikasi)</Text>
                  <Text style={styles.textPenjualan3}>{convertToRupiah(0)}</Text>
                </View>
                <View style={styles.penjualanCalculator2}>
                  <Text style={styles.textInfo2}>Estimasi Bonus yang Diterima</Text>
                  <Text style={styles.textPenjualan3}>{convertToRupiah(0)} (0%)</Text>
                </View>
                <View style={styles.wrapperSeparator}/>
                <View style={styles.tableSimulation}>
                  <View style={styles.tablesimulationHeader}>
                    <Text style={styles.tableHeaderText}>Target Penjualan</Text>
                    <Text style={styles.tableHeaderText}>Min. Pesanan</Text>
                    <Text style={styles.tableHeaderText2}>Bonus</Text>
                  </View>
                  <FlatList
                    data={this.state.simulations}
                    renderItem={this._renderSimulation.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
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

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailTargetScreen)
