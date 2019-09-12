import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'
import { NavigationActions, StackActions } from 'react-navigation'

// Styles
import styles from './Styles/ProfileScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

class ProfileScreen extends Component {
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

  logout(){
    const { dispatch } = this.props.navigation
    Alert.alert(
      'Logout',
      'Are you sure to log out?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'LaunchScreen'
                  })
                ]
              })
            )
          }
        },
        {
          text: 'No'
        }
      ],
      { cancelable: true }
    )
  }

  render () {
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
            <View style={styles.topView}>
              <View style={styles.topLeftView}>
                <Text style={styles.textPhone}>{this.state.phone}</Text>
                <TouchableOpacity style={styles.btnEditProfile} onPress={() => this.actNavigate('EditProfileScreen', {})}>
                  <Text style={styles.textEditProfile}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.topRightView}>
                <TouchableOpacity>
                  <Image source={Images.profile} style={styles.imgProfile}/>
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('PaymentScreen')}>
                  <Image source={Images.card} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Pembayaran Saya</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('SharedProductScreen', {selectedMenuIdx:1})}>
                  <Image source={Images.share} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Produk Dibagikan</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('AddressListScreen', {})}>
                  <Image source={Images.address} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Daftar Alamat</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('AccountListScreen')}>
                  <Image source={Images.bank} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Daftar Rekening Bank</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('ContactScreen', {})}>
                  <Image source={Images.contact} style={styles.imgMenu}/>
                  <Text style={styles.imgText}>Hubungi Kami</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.logout()}>
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
)(ProfileScreen)
