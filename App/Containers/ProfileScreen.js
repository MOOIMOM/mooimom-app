import React, { Component } from 'react'
import { ScrollView, SafeAreaView, Text, View, Image, TouchableOpacity, Alert, PermissionsAndroid, Modal, TouchableWithoutFeedback, Platform, AsyncStorage } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import FastImage from 'react-native-fast-image'
import CarttActions from '../Redux/CarttRedux'
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux'
import { convertToRupiah, convertToThousandOrHigher } from '../Lib/utils'
import ImagePicker from 'react-native-image-crop-picker'
import AuthActions from '../Redux/AuthRedux'
import SendOtpActions from '../Redux/SendOtpRedux'
import CartActions from '../Redux/CartRedux'
import LastNotificationTimeActions from '../Redux/LastNotificationTimeRedux'
import ProfileActions from '../Redux/ProfileRedux'
import BalanceActions from '../Redux/BalanceRedux'
import EditProfileActions from '../Redux/EditProfileRedux'
import GetMooimomPointsActions from '../Redux/GetMooimomPointsRedux'

import { DotIndicator } from 'react-native-indicators'

// Styles
import styles from './Styles/ProfileScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Akun',
    tabBarIcon: ({ focused, tintColor }) => {
      const iconName = (focused ? Images.account2 : Images.account)
      return <Image source={iconName} style={menuStyles.menuImage} />
    },
  };
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      phone_number: '',
      balance: 0,
      points: 0,
      modalUpImage: false,
      fcm_token: ''
    }
    this.selectPhoto = this.selectPhoto.bind(this)
    this.selectGalery = this.selectGalery.bind(this)
  }

  async componentDidMount() {
    this.setState({ fcm_token: await AsyncStorage.getItem('fcmToken') })
    this.reloadData()
  }

  componentWillReceiveProps(newProps) {
    if (this.props.profile !== newProps.profile) {
      if (
        newProps.profile.payload !== null &&
        newProps.profile.error === null &&
        !newProps.profile.fetching
      ) {
        this.setState({
          profile: newProps.profile.payload,
          phone_number: '+62' + newProps.profile.payload.phone_number
        })
      }
    }

    if (this.props.editprofile !== newProps.editprofile) {
      if (
        newProps.editprofile.payload !== null &&
        newProps.editprofile.error === null &&
        !newProps.editprofile.fetching
      ) {
        this.reloadData()
      }
    }

    if (this.props.balance !== newProps.balance) {
      if (
        newProps.balance.payload !== null &&
        newProps.balance.error === null &&
        !newProps.balance.fetching
      ) {
        this.setState({
          balance: newProps.balance.payload.total_saldo_left
        })
      }
    }

    if (this.props.mooimomPoints !== newProps.mooimomPoints) {
      if (
        newProps.mooimomPoints.payload !== null &&
        newProps.mooimomPoints.error === null &&
        !newProps.mooimomPoints.fetching
      ) {
        this.setState({
          points: newProps.mooimomPoints.payload.how_many_points
        })
      }
    }
  }

  reloadData() {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    let data2 = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        fcm_token: this.state.fcm_token
      }
    }
    this.props.getProfileProcess(data)
    this.props.getBalanceProcess(data)
    this.props.getMooimomPointsProcess(data2)
  }

  async selectPhoto() {
    const alloweStorage = Platform.OS === 'ios' ? 'granted' : await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )
    if (alloweStorage === 'granted') {
      const alloweCamera = Platform.OS === 'ios' ? 'granted' : await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )
      if (alloweCamera === 'granted') {
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          cropping: true,
          includeBase64: true,
          enableRotationGesture: true
        }).then(image => {
          var img = image.path
          var convert = img.split('/')
          var nameImg = convert[convert.length - 1]
          this.setState({
            modalUpImage: false
          })
          const form = new FormData()
          form.append('profile_picture_file', {
            name: nameImg,
            uri: image.path,
            type: 'image/jpg'
          })
          form.append(
            'user_id',
            this.props.auth.payload.user_id,
          )
          form.append(
            'unique_token',
            this.props.auth.payload.unique_token,
          )
          let data = {
            data_request: form
          }
          console.info(data)
          this.props.updateProfilePictureProcess(data)
        })
      } else {
        Alert.alert('Please allow permission to take picture')
      }
    } else {
      Alert.alert('Please allow permission to access gallery')
    }
  }

  async selectGalery() {
    const alloweStorage = Platform.OS === 'ios' ? 'granted' : await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )
    if (alloweStorage === 'granted') {
      const alloweCamera = Platform.OS === 'ios' ? 'granted' : await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )
      if (alloweCamera === 'granted') {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true
        }).then(image => {
          var img = image.path
          var convert = img.split('/')
          var nameImg = convert[convert.length - 1]
          this.setState({
            modalUpImage: false
          })
          const form = new FormData()
          form.append('profile_picture_file', {
            name: nameImg,
            uri: image.path,
            type: 'image/jpg'
          })
          form.append(
            'user_id',
            this.props.auth.payload.user_id,
          )
          form.append(
            'unique_token',
            this.props.auth.payload.unique_token,
          )
          let data = {
            data_request: form
          }
          this.props.updateProfilePictureProcess(data)
        })
      } else {
        Alert.alert('Please allow permission to take picture')
      }
    } else {
      Alert.alert('Please allow permission to access gallery')
    }
  }

  actNavigate(screen, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  logout() {
    const { dispatch } = this.props.navigation
    Alert.alert(
      'Logout',
      'Are you sure to log out?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.logoutProcess()
            this.props.navigation.navigate('LaunchScreen');
          }
        },
        {
          text: 'No'
        }
      ],
      { cancelable: true }
    )
  }

  render() {
    var imageprofile = Images.profile
    var mooimomCash = Images.mooimomCash
    var mooimomPoints = Images.mooimomPoints

    if (this.state.profile.profile_picture_thumb_url)
      imageprofile = { uri: this.state.profile.profile_picture_thumb_url }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch} />
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader} />
              {this.props.cartt.data.length > 0 && <View style={styles.notifContainer}>
                <Text style={styles.textNotif}>{this.props.cartt.data.length}</Text>
              </View>}
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator} />
          <View style={styles.contentContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.topView}>
                {
                  this.props.profile.fetching ?
                    <DotIndicator color={Colors.mooimom} size={8} />
                    :
                    <View style={styles.topLeftView}>
                      <Text style={styles.textPhone}>{this.state.phone_number}</Text>
                      <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize3 }}>{this.state.profile.name}</Text>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize1 }}>Bergabung sejak : {this.state.profile.created_at}</Text>
                      </View>
                      <TouchableOpacity style={styles.btnEditProfile} onPress={() => this.actNavigate('EditProfileScreen', { profile: this.state.profile })}>
                        <Text style={styles.textEditProfile}>Edit Profile</Text>
                      </TouchableOpacity>
                    </View>
                }
                <View style={styles.topRightView}>
                  <TouchableOpacity onPress={() => this.setState({ modalUpImage: true })}>
                    <FastImage source={imageprofile} style={styles.imgProfile} resizeMode={FastImage.resizeMode.contain} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.wrapperSeparator} />
              <View style={styles.cardBallanceContainer} >
                <View style={styles.containerBallanceTittle}>
                  <Text style={styles.textBallanceCardTitle}>Saldo Anda Saat Ini</Text>
                </View>
                <View style={styles.wrapperBallanceArea}>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => this.actNavigate('PaymentScreen')} style={styles.centerizedWrapper}>
                    <View style={styles.wrapperBallanceHeader}>
                      <FastImage source={mooimomCash} style={styles.imgMooimomCash} resizeMode={FastImage.resizeMode.contain} />
                      <View>
                        <Text style={styles.textMooimomBallance}>Mooimom</Text>
                        <Text style={styles.textMooimomBallance}>Cash</Text>
                      </View>
                    </View>
                    <View style={styles.ballanceSizedVerticalMargin} />
                    <Text style={styles.textBallanceNumber}>{convertToRupiah(this.state.balance)}</Text>
                  </TouchableOpacity>

                  <View style={styles.boundariesLine} />

                  <TouchableOpacity activeOpacity={0.5} onPress={() => this.actNavigate('PointsHistoryScreen')} style={styles.centerizedWrapper}>
                    <View style={styles.wrapperBallanceHeader}>
                      <FastImage source={mooimomPoints} style={styles.imgMooimomPoints} resizeMode={FastImage.resizeMode.contain} />
                      <View>
                        <Text style={styles.textMooimomBallance}>Mooimom</Text>
                        <Text style={styles.textMooimomBallance}>Points</Text>
                      </View>
                    </View>
                    <View style={styles.ballanceSizedVerticalMargin} />
                    <View style={styles.rowAlign}>
                      <Text style={styles.textBallanceNumber}>{convertToThousandOrHigher(this.state.points)}</Text>
                      <View style={styles.ballanceSizedHorizontalMargin} />
                      <Text style={styles.textBallanceCurrency}>points</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.wrapperSeparator} />
              <View style={styles.containerMenu}>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('VoucherScreen')}>
                    <View style={styles.leftContainerMenu}>
                      <Image source={Images.discountVoucher} style={styles.imgMenu} />
                      <Text style={styles.imgText}>Voucher</Text>
                    </View>
                    <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                  </TouchableOpacity>
                </View>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('PaymentScreen')}>
                    <View style={styles.leftContainerMenu}>
                      <Image source={Images.card} style={styles.imgMenu} />
                      <Text style={styles.imgText}>Pembayaran Saya</Text>
                    </View>
                    <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                  </TouchableOpacity>
                </View>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('SharedProductScreen', { selectedMenuIdx: 1 })}>
                    <View style={styles.leftContainerMenu}>
                      <Image source={Images.share} style={styles.imgMenu} />
                      <Text style={styles.imgText}>Produk Dibagikan</Text>
                    </View>
                    <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                  </TouchableOpacity>
                </View>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('AddressListScreen')}>
                    <View style={styles.leftContainerMenu}>
                      <Image source={Images.address} style={styles.imgMenu} />
                      <Text style={styles.imgText}>Daftar Alamat</Text>
                    </View>
                    <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                  </TouchableOpacity>
                </View>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('AccountListScreen')}>
                    <View style={styles.leftContainerMenu}>
                      <Image source={Images.bank} style={styles.imgMenu} />
                      <Text style={styles.imgText}>Daftar Rekening Bank</Text>
                    </View>
                    <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                  </TouchableOpacity>
                </View>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.btnMenu} onPress={() => this.actNavigate('ContactScreen')}>
                    <View style={styles.leftContainerMenu}>
                      <Image source={Images.contact} style={styles.imgMenu} />
                      <Text style={styles.imgText}>Hubungi Kami</Text>
                    </View>
                    <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                  </TouchableOpacity>
                </View>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.btnMenu} onPress={() => this.logout()}>
                    <View style={styles.leftContainerMenu}>
                      <Image source={Images.logout} style={styles.imgMenu} />
                      <Text style={styles.imgText}>Log out</Text>
                    </View>
                    <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginVertical: 30 }}>
                <Text style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.mediumGray, alignSelf: 'center' }}>Version {Platform.OS === 'ios' ? '1.2.20' : '1.2.22'}</Text>
              </View>
              <View style={{ marginVertical: 20 }} />
            </ScrollView>
            <Modal
              animationType='fade'
              transparent
              visible={this.state.modalUpImage}
              onRequestClose={() => {
                this.setState({ modalUpImage: false })
              }}
            >
              <TouchableWithoutFeedback onPress={() => this.setState({ modalUpImage: false })}>
                <View style={styles.viewOut}>
                  <View style={styles.viewIn}>
                    <View style={styles.viewTextLine}>
                      <Text style={styles.textModalLine}>Select New Profile Picture</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.viewBtn}
                      onPress={() => this.selectPhoto()}
                    >
                      <Text style={styles.textModal}>Take from camera...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.viewBtn}
                      onPress={() => this.selectGalery()}
                    >
                      <Text style={styles.textModal}>Select from library...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.viewBtn2}
                      onPress={() => {
                        this.setState({ modalUpImage: false })
                      }}
                    >
                      <Text style={styles.textModal}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>
      </SafeAreaView >
    )
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    balance: state.balance,
    editprofile: state.editprofile,
    cartt: state.cartt,
    mooimomPoints: state.mooimomPoints
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logoutProcess: () => {
      dispatch(AuthActions.logout(null)),
        dispatch(SendOtpActions.logout(null))
      dispatch(CartActions.logout(null))
      dispatch(CarttActions.emptyCarttRequest())
      dispatch(LastNotificationTimeActions.logout(null))
    },
    getProfileProcess: data => {
      dispatch(ProfileActions.getProfileRequest(data))
    },
    getBalanceProcess: data => {
      dispatch(BalanceActions.getBalanceRequest(data))
    },
    getMooimomPointsProcess: data => {
      dispatch(GetMooimomPointsActions.getMooimomPointsRequest(data))
    },
    updateProfilePictureProcess: data => {
      dispatch(EditProfileActions.editProfilePictureRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)
