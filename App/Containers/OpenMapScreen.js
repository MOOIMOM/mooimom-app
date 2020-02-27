import React from 'react'
import { View, TouchableOpacity, Text, Modal, TextInput, Image, SafeAreaView, StyleSheet, ScrollView, Dimensions, PermissionsAndroid, Platform } from 'react-native'

import axios from 'axios'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import Config from 'react-native-config'
import { DotIndicator } from 'react-native-indicators'

import { convertToRupiah, isIphoneXorAbove } from '../Lib/utils'
import { Colors, Fonts, Metrics, Images } from '../Themes'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height


import GetGoSendShipmentActions from '../Redux/GetGoSendShipmentRedux'
import PassGosendDataActions from '../Redux/PassGosendDataRedux'
import Geolocation from 'react-native-geolocation-service'


class OpenMapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openSearch: false,
      selectService: false,
      sureButton: false,
      gosendFetching: true,
      isInstantActive: false,
      isSamedayActive: false,
      extraInfo: "",
      selectedPlaceName: "",
      searchInput: '',
      instantPrice: 0,
      samedayPrice: 0,
      predictions: [],
      gosendServices: [
        { 'service': 'Instant Service', 'price': '23000' },
        { 'service': 'Same Day Service', 'price': '12000' }
      ],
      lat: '',
      long: '',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  componentWillReceiveProps(newProps) {
    if (this.props.goSendShipment !== newProps.goSendShipment) {
      if (
        newProps.goSendShipment.payload !== null &&
        newProps.goSendShipment.error === null &&
        !newProps.goSendShipment.fetching
      ) {
        this.setState({
          instantPrice: newProps.goSendShipment.payload.total_price_for_instant,
          samedayPrice: newProps.goSendShipment.payload.total_price_for_sameday,
          isInstantActive: newProps.goSendShipment.payload.active_for_instant,
          isSamedayActive: newProps.goSendShipment.payload.active_for_sameday,
          extraInfo: newProps.goSendShipment.payload.extra_info_to_show
        })
      }
    }
  }


  actNavigate(screen, data = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, data)
  }

  onSelectedService = async (service, price) => {
    let data = {
      lat: this.state.lat,
      lng: this.state.long,
      shippingMode: 'gosend',
      shippingType: service,
      shippingCost: price
    }

    await this.props.passGosendDataProcess(data)
    this.actNavigate('DeliveryScreen')
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG)
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG)
    }

    return false;
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission()

    if (!hasLocationPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
          },
          sureButton: true,
          lat: latitude,
          long: longitude
        })

        this.calculateGoSendPrice(latitude, longitude)
        console.log('init', position)
      },
      (error) => {
        // this.setState({ location: error, loading: false });
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
    )

  }

  calculateGoSendPrice = async (lat, lng) => {
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        customer_latitude: lat,
        customer_longitude: lng
      }
    }
    await this.props.geGoSendShipmentProcess(data)
  }

  openSearchModal() {
    this.setState({ openSearch: true })
  }

  handleSearch() {

    axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        radius: 10000,
        key: Config.GOOGLE_MAPS_API_KEY,
        input: this.state.searchInput,
        language: 'id',
        components: 'country:id'
      }
    })
      .then((res) => {
        this.setState({ predictions: res.data.predictions })
        console.log(res)
      })
  }

  renderPredictions(item, index) {

    format = item.item.structured_formatting
    placeId = item.item.place_id

    return (
      <TouchableOpacity onPress={() => this.handleReversePlace(placeId)} key={index} style={{ width: '96%', alignSelf: 'center', borderBottomWidth: 0.5, borderColor: Colors.mediumGray, paddingVertical: 10 }}>
        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom }}>{format.main_text}</Text>
        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray }}>{format.secondary_text}</Text>
      </TouchableOpacity>
    )
  }

  handleOnChange = async (char) => {
    await this.setState({ searchInput: char })

    if (this.state.searchInput.length < 1) {
      this.state.predictions.splice(0, this.state.predictions.length)
    }

    if (this.state.searchInput.length > 2) {
      this.handleSearch()
    }

  }

  handleReversePlace(placeId, placeName) {
    axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        placeid: placeId,
        key: Config.GOOGLE_MAPS_API_KEY
      }
    })
      .then((res) => {

        latitude = res.data.result.geometry.location.lat
        longitude = res.data.result.geometry.location.lng

        let northeastLat = parseFloat(res.data.result.geometry.viewport.northeast.lat)
        let southwestLat = parseFloat(res.data.result.geometry.viewport.southwest.lat)

        let latDelta = northeastLat - southwestLat
        let lngDelta = latDelta * ASPECT_RATIO

        console.log(res.data.result.geometry)

        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta
          },
          selectedPlaceName: placeName,
          lat: latitude, long: longitude,
          openSearch: false,
          searchInput: '',
          sureButton: true
        })
        this.calculateGoSendPrice(latitude, longitude)
        console.log(latitude, longitude)
      })
  }

  renderSearchModal() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.state.openSearch}
        onRequestClose={() => {
          this.setState({ openSearch: false })
        }}
      >
        <SafeAreaView backgroundColor={Colors.mooimom} />
        <View style={{ width: Metrics.screenWidth, height: Metrics.screenHeight, backgroundColor: Colors.white }}>
          <View style={{ width: Metrics.screenWidth, height: 50, backgroundColor: Colors.mooimom, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ width: '85%', height: 40, backgroundColor: Colors.white, borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
              <View>
                <Image source={Images.search} style={{ width: 14, height: 14, marginHorizontal: 10 }} />
              </View>
              <TextInput
                placeholder='Cari lokasi..'
                style={{ width: '90%', fontFamily: Fonts.type.gotham2 }}
                onChangeText={(char) => this.handleOnChange(char)}
              />
            </View>
            <TouchableOpacity onPress={() => this.setState({ openSearch: false })}>
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontWeight: 'bold', marginLeft: 10 }}>Batal</Text>
            </TouchableOpacity>
          </View>
          {this.state.searchInput.length > 0 &&
            this.state.predictions.map((item, index) => {
              let format = item.structured_formatting
              let placeId = item.place_id

              return (
                <TouchableOpacity onPress={() => this.handleReversePlace(placeId, format.main_text)} key={index} style={{ width: '96%', alignSelf: 'center', borderBottomWidth: 0.5, borderColor: Colors.mediumGray, paddingVertical: 10 }}>
                  <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom }}>{format.main_text}</Text>
                  <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray }}>{format.secondary_text}</Text>
                </TouchableOpacity>
              )
            })}
        </View>
        <SafeAreaView />
      </Modal>
    )
  }

  renderServiceSelectionModal() {
    return (
      <Modal
        animationType='fade'
        transparent
        visible={this.state.selectService}
        onRequestClose={() => {
          this.setState({ selectService: false })
        }}
      >
        <View style={{
          width: Metrics.screenWidth,
          height: Metrics.screenHeight,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View
            style={{
              width: '92%',
              top: Metrics.screenHeight / 2,
              alignSelf: 'center',
              height: Metrics.screenHeight / 2 - 40,
              borderRadius: 10,
              backgroundColor: Colors.white,
              shadowColor: '#CCCCCC',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: Colors.mediumGray, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View />
              <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontWeight: 'bold' }}>Pilih Service</Text>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.setState({ selectService: false })}>
                <Image source={Images.x} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignSelf: 'center', width: '90%' }}>
                <TouchableOpacity onPress={() => this.onSelectedService('instant', this.state.instantPrice)} disabled={this.props.goSendShipment.fetching || !this.state.isInstantActive} style={{ alignItems: 'center', paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: Colors.mediumGray, flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={Images.gosendIcon} style={{ width: 40, height: 40, marginRight: 20, borderRadius: 10 }} />
                  <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>GO-SEND <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>{this.state.gosendServices[0].service}</Text></Text>
                    {this.props.goSendShipment.fetching ?
                      <DotIndicator size={8} color={Colors.mediumGray} />
                      :
                      <Text style={{ fontFamily: Fonts.type.gotham2, color: this.state.isInstantActive ? Colors.gray : Colors.fire, fontSize: Metrics.fontSize0 }}>{this.state.isInstantActive ? convertToRupiah(this.state.instantPrice) : "Tidak Tersedia"}</Text>
                    }
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onSelectedService('sameday', this.state.samedayPrice)} disabled={this.props.goSendShipment.fetching || !this.state.isSamedayActive} style={{ alignItems: 'center', paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: Colors.mediumGray, flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={Images.gosendIcon} style={{ width: 40, height: 40, marginRight: 20, borderRadius: 10 }} />
                  <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>GO-SEND <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>{this.state.gosendServices[1].service}</Text></Text>
                    {this.props.goSendShipment.fetching ?
                      <DotIndicator size={8} color={Colors.mediumGray} />
                      :
                      <Text style={{ fontFamily: Fonts.type.gotham2, color: this.state.isSamedayActive ? Colors.gray : Colors.fire, fontSize: Metrics.fontSize0 }}>{this.state.isSamedayActive ? convertToRupiah(this.state.samedayPrice) : "Tidak Tersedia"}</Text>
                    }
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal >
    )
  }

  render() {
    console.log('Instant', this.state.isInstantActive, 'Sameday', this.state.isSamedayActive)
    return (
      <SafeAreaView>
        <View style={{
          width: '96%',
          position: 'absolute',
          zIndex: 1,
          top: isIphoneXorAbove() ? 50 : 30,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
            backgroundColor: Colors.white,
            width: 40, height: 40,
            borderRadius: 20,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#CCCCCC',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <Image source={Images.back} style={{ width: 14, height: 14 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ openSearch: true })} style={{
            width: '86%',
            backgroundColor: Colors.white,
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#CCCCCC',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <Image source={Images.search} style={{ width: 14, height: 14, marginHorizontal: 10 }} />
            <Text style={{ fontFamily: Fonts.type.gotham2, color: this.state.selectedPlaceName !== '' ? Colors.black : Colors.gray }}>{this.state.selectedPlaceName !== '' ? this.state.selectedPlaceName : "Cari lokasi.."}</Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          region={this.state.region}
          initialRegion={this.state.region}
        >
          <Marker coordinate={this.state.region} title={this.state.selectedPlaceName}>
            <Image source={Images.pin} style={{ width: 44, height: 44 }} />
          </Marker>
        </MapView>
        {this.renderSearchModal()}
        {this.renderServiceSelectionModal()}
        {
          this.state.sureButton &&
          <TouchableOpacity onPress={() => this.setState({ selectService: true })} style={{
            position: 'absolute',
            zIndex: 1,
            top: Metrics.screenHeight / 1.2,
            width: '90%',
            backgroundColor: '#FFBD49',
            borderRadius: 20,
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#CCCCCC',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white }}>Gunakan lokasi ini</Text>
          </TouchableOpacity>
        }
      </SafeAreaView >
    )
  }

}



const styles = StyleSheet.create({
  map: {
    height: Metrics.screenHeight - 20,
    ...StyleSheet.absoluteFillObject,
  },
})

const mapStateToProps = state => {
  return {
    auth: state.auth,
    goSendShipment: state.goSendShipment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    geGoSendShipmentProcess: data => {
      dispatch(GetGoSendShipmentActions.getGoSendShipmentRequest(data))
    },
    passGosendDataProcess: data => {
      dispatch(PassGosendDataActions.passGosendDataRequest(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenMapScreen)
