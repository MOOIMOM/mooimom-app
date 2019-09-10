import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/AccountScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

class AccountScreen extends Component {
  static navigationOptions = {
      title: 'Akun',
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.account2 : Images.account)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0,
      phone:'+6281234567890',
      balance:0
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
            <TouchableOpacity style={styles.searchButton}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.topView}>
              <View style={styles.topLeftView}>
                <Text style={styles.textPhone}>{this.state.phone}</Text>
                <TouchableOpacity style={styles.btnEditProfile} onPress={() => this.actNavigate('EditProfileScreen', {})}>
                  <Text style={styles.textEditProfile}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.topRightView}>
                <Image source={Images.profile} style={styles.imgProfile}/>
              </View>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.saldoContainer}>
              <Text style={styles.textSaldo}>SALDO</Text>
              <Text style={styles.textSaldoAmount}>{convertToRupiah(this.state.balance)}</Text>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.containerMenu}>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu}>
                  <Image source={Images.bank} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Detail Bank</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu}>
                  <Image source={Images.card} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Pembayaran Saya</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu}>
                  <Image source={Images.share} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Produk Dibagikan</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu}>
                  <Image source={Images.refer} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Refer & Earn</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu}>
                  <Image source={Images.address} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Daftar Alamat</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu}>
                  <Image source={Images.contact} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Hubungi Kami</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu}>
                  <Image source={Images.logout} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Log out</Text>
                </TouchableOpacity>
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
)(AccountScreen)
