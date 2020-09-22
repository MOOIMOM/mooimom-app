import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput, Modal } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'
import { T } from 'ramda'

import AddressList from '../Components/AddressList'
import VoucherList from '../Components/VoucherList'
import ShipmentServiceList from '../Components/ShipmentServiceList'
import NewPaymentMethod from '../Components/NewPaymentMethod'


export default class NewCheckoutScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAddressId: '0',
            selectedShipmentServiceId: '',
            selectedVoucherId: '',
            addressList: [
                {
                    id: '1',
                    name: 'Yonathan',
                    phone: '081823908879',
                    address: 'Graha Boulevard B05 Kelapa Gading Timur, Kelapa Gading, Jakarta Utara, DKI Jakarta 14240'
                },
                {
                    id: '2',
                    name: 'Yonathan',
                    phone: '081287128507',
                    address: '(Home) Pelepah Kuning 2 WT 2 no. 16 Kelapa Gading, Jakarta Utara DKI Jakarta 14240'
                },
                {
                    id: '3',
                    name: 'Yonathan',
                    phone: '081287128507',
                    address: '(Home) Pelepah Kuning 2 WT 2 no. 16 Kelapa Gading, Jakarta Utara DKI Jakarta 14240'
                },
            ],
            paymentMethodEnum: [
                {
                    id: 1,
                    name: 'ATM Transfer'
                },
                {
                    id: 2,
                    name: 'Credit Card'
                },
                {
                    id: 3,
                    name: 'Cicilan 0%'
                },
                {
                    id: 4,
                    name: 'Virtual Account'
                },
                {
                    id: 5,
                    name: 'Alfamart'
                },
                {
                    id: 6,
                    name: 'Indomaret'
                },
                {
                    id: 7,
                    name: ''
                },
                {
                    id: 8,
                    name: ''
                },
                {
                    id: 9,
                    name: ''
                },
            ],
            myVouchers: [
                {
                    id: '1',
                    bannerColor: '#B4F5EA',
                    amount: '10',
                    expiredDate: '30 Sept 2020',
                    minOrder: 0
                },
                {
                    id: '2',
                    bannerColor: '#E8C7F0',
                    amount: '25',
                    expiredDate: '30 Sept 2020',
                    minOrder: 500
                },
                {
                    id: '3',
                    bannerColor: '#E8C7F0',
                    amount: '25',
                    expiredDate: '30 Sept 2020',
                    minOrder: 500
                },
                {
                    id: '4',
                    bannerColor: '#ECD896',
                    amount: '50',
                    expiredDate: '30 Sept 2020',
                    minOrder: 700
                },
            ],
            regularServiceEnum: [
                {
                    id: 1,
                    name: 'jne',
                    subService: [
                        {
                            id: 1,
                            name: 'JNE Reguler',
                            arrival: '(1-2 days)',
                            price: '18.000'
                        },
                        {
                            id: 2,
                            name: 'JNE YES',
                            arrival: '(1 day)',
                            price: '36.000'
                        },
                    ]
                },
                {
                    id: 2,
                    name: 'sicepat',
                    subService: [
                        {
                            id: 1,
                            name: 'Sicepat Reguler',
                            arrival: '(1-2 days)',
                            price: '20.000'
                        },
                        {
                            id: 2,
                            name: 'Sicepat Best',
                            arrival: '(1 day)',
                            price: '30.000'
                        },
                    ]
                },
                {
                    id: 3,
                    name: 'j&t',
                    subService: [
                        {
                            id: 1,
                            name: 'J&T Reguler',
                            arrival: '(1-2 days)',
                            price: '15.000'
                        },
                        {
                            id: 2,
                            name: 'J&T Express',
                            arrival: '(1 day)',
                            price: '20.000'
                        },
                    ]
                },
            ],
            showPaymentMethodModal: false,
            showChooseAddressModal: false,
            showVoucherModal: false,
            showAddAddressModal: false,
            showShipmentServiceModal: false,
            showRegularNextDayShipmentModal: false
        }

        this.renderChooseAddressModal = this.renderChooseAddressModal.bind(this)
        this.renderOrderItems = this.renderOrderItems.bind(this)
    }

    goBack() {
        this.props.navigation.goBack()
    }

    navigate_to(page, obj = {}) {
        const { navigate } = this.props.navigation
        navigate(page, obj)
    }

    renderChooseAddressModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.4, top: Metrics.screenHeight / 4, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showChooseAddressModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 10 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: Metrics.fontSize2, color: Colors.black }}>Choose Address</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <AddressList
                        options={this.state.addressList}
                        version='second'
                        onSelected={(value) => this.setState({ selectedAddressId: value })}
                    />
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.setState({ showAddAddressModal: true, showChooseAddressModal: false })} style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>+ Add Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ showChooseAddressModal: false })} style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Choose</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    renderAddAddressModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.2, top: Metrics.screenHeight / 8, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showAddAddressModal: false, showChooseAddressModal: true })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: Metrics.fontSize2, color: Colors.black }}>Add Address</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 6, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Name'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 6, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Address'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 6, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Choose Province'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 6, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Choose City'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 6, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Choose Sub District'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 6, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Choose Kelurahan/Village'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 6, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Post Code'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', height: 40, borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginBottom: 20, justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '100%', fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                underlineColorAndroid='transparent'
                                placeholder='Phone Number'
                                placeholderTextColor={Colors.black}
                            />
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 15, height: 15, borderRadius: 2, borderWidth: 1, borderColor: Colors.black, marginRight: 10 }} />
                            <Text>Use as primary address</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.setState({ showAddAddressModal: false, showChooseAddressModal: true })} style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    renderChooseShipmentModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.3, top: Metrics.screenHeight / 5, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showShipmentServiceModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: Metrics.fontSize2, color: Colors.black }}>Choose Shipment</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <TouchableOpacity style={{
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: Colors.gray,
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            // shadowColor: "#000",
                            // shadowOffset: {
                            //     width: 0,
                            //     height: 3,
                            // },
                            // shadowOpacity: 0.27,
                            // shadowRadius: 4.65,
                            // elevation: 6,
                            marginBottom: 10
                        }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Free Shipping</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize0 }}>Rp0</Text>
                            </View>
                            <View style={{ width: '5%' }}>
                                <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ showShipmentServiceModal: false }), this.navigate_to('OpenMapScreen') }} style={{
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            // shadowColor: "#000",
                            // shadowOffset: {
                            //     width: 0,
                            //     height: 3,
                            // },
                            // shadowOpacity: 0.27,
                            // shadowRadius: 4.65,
                            // elevation: 6,
                            marginBottom: 10
                        }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Same Day</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize0 }}>From Rp30.000 - Rp50.000</Text>
                            </View>
                            <View style={{ width: '5%' }}>
                                <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ showRegularNextDayShipmentModal: true, showShipmentServiceModal: false })} style={{
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            // shadowColor: "#000",
                            // shadowOffset: {
                            //     width: 0,
                            //     height: 3,
                            // },
                            // shadowOpacity: 0.27,
                            // shadowRadius: 4.65,
                            // elevation: 6,
                            marginBottom: 10
                        }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Next Day (1 day)</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize0 }}>From Rp15.000 - Rp20.000</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ showRegularNextDayShipmentModal: true, showShipmentServiceModal: false })} style={{
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            // shadowColor: "#000",
                            // shadowOffset: {
                            //     width: 0,
                            //     height: 3,
                            // },
                            // shadowOpacity: 0.27,
                            // shadowRadius: 4.65,
                            // elevation: 6,
                            marginBottom: 10
                        }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Regular (2-4 days)</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize0 }}>From Rp10.000 - Rp15.000</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            // shadowColor: "#000",
                            // shadowOffset: {
                            //     width: 0,
                            //     height: 3,
                            // },
                            // shadowOpacity: 0.27,
                            // shadowRadius: 4.65,
                            // elevation: 6,
                            marginBottom: 10
                        }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>International (10-14 days)</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize0 }}>From Rp184.000</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
            </View>
        )
    }

    renderRegularNextDayShipmentModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.3, top: Metrics.screenHeight / 5, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showRegularNextDayShipmentModal: false, showShipmentServiceModal: true })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setState({ showRegularNextDayShipmentModal: false, showShipmentServiceModal: true })} style={{ width: '90%', alignSelf: 'center', paddingBottom: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, marginBottom: 10 }}>
                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }] }} />
                    </View>
                    <Text style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.black }}>Back</Text>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: Metrics.fontSize2, color: Colors.black }}>Regular (2-4 days)</Text>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <FlatList
                            data={this.state.regularServiceEnum}
                            showsVerticalScrollIndicator={false}
                            renderItem={(parentItem, index) => (
                                <View style={{ width: '100%', marginBottom: 10 }}>
                                    <View style={{ width: '30%', height: 30, marginBottom: 10, backgroundColor: Colors.lightGray }}>

                                    </View>
                                    <ShipmentServiceList
                                        options={parentItem.item.subService}
                                        onSelected={(value) => this.setState({ selectedShipmentServiceId: value })}
                                    />
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.setState({ showRegularNextDayShipmentModal: false, showShipmentServiceModal: true })} style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ showRegularNextDayShipmentModal: false })} style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderVoucherModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.3, top: Metrics.screenHeight / 5, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showVoucherModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: Metrics.fontSize2, color: Colors.black }}>Voucher</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40, borderRadius: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginVertical: 10 }}>
                            <View style={{ width: '40%', marginLeft: 10 }}>
                                <TextInput
                                    placeholder="Input voucher code"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.black }}
                                />
                            </View>
                            <TouchableOpacity style={{ width: '30%', height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom, borderRadius: 10, marginRight: 5 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.white, fontWeight: 'bold' }}>Add Voucher</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <VoucherList
                        options={this.state.myVouchers}
                        onSelected={(value) => this.setState({ selectedVoucherId: value })}
                    />
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <TouchableOpacity onPress={() => this.setState({ showVoucherModal: false })} style={{ width: '90%', alignSelf: 'center', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom, marginTop: 10, marginBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize2 }}>Use Voucher</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderPaymentMethodModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.3, top: Metrics.screenHeight / 5, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showPaymentMethodModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: Metrics.fontSize2, color: Colors.black }}>Payment Method</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <NewPaymentMethod
                        options={this.state.paymentMethodEnum}
                        onSelected={(value) => this.setState({ selectedPaymentMethodId: '' })}
                    />
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <TouchableOpacity onPress={() => this.setState({ showPaymentMethodModal: false })} style={{ width: '90%', alignSelf: 'center', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom, marginTop: 10, marginBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize2 }}>Proceed</Text>
                </TouchableOpacity>
            </View >
        )
    }

    renderOrderItems() {
        return (
            <View style={{ width: '100%', paddingBottom: 20, borderBottomWidth: 5, borderColor: Colors.lightGray, marginBottom: 20 }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Hamako</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <View style={{ width: 20, height: 20, backgroundColor: Colors.mediumGray, marginRight: 10 }} />
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>From <Text style={{ fontWeight: 'bold' }}>Taiwan</Text> (shipping time 10-14days)</Text>
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', marginVertical: 20 }}>
                    <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                    <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 80, marginLeft: 40 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Unisex Top and Sort</Text>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                            <View>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 10 }}>Qty: 1</Text>
                                <Text style={{ fontSize: Metrics.fontSize2, fontFamily: Fonts.type.gotham4, color: Colors.black }}>Rp199.000</Text>
                            </View>
                        </View>
                        <View style={{ width: Metrics.screenWidth / 2.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity style={{ width: '48%', height: 40, }}>
                                <LinearGradient colors={[Colors.gray, Colors.lightGray]} style={{ width: '100%', height: '100%', borderRadius: 5, justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Rp39.000</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize0, opacity: .4 }}>Silver Member</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '48%', height: 40, }}>
                                <LinearGradient colors={['#D4B450', '#FDDE94']} style={{ width: '100%', height: '100%', borderRadius: 5, justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Rp50.000</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize0, opacity: .4 }}>Gold Member</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', borderBottomWidth: 2, borderColor: Colors.lightGray, borderStyle: 'dashed', marginBottom: 20 }} />
                <View>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 20 }}>Shipping Address</Text>

                    <TouchableOpacity onPress={() => this.setState({ showShipmentServiceModal: true })} style={{ width: '100%', borderRadius: 10, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Choose Shipment</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    renderVoucher() {
        return (
            <View style={{ width: '100%', paddingBottom: 20, borderBottomWidth: 5, borderColor: Colors.lightGray, marginBottom: 20 }}>
                <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '30%', height: 30, marginRight: 10, backgroundColor: Colors.lightGray }}>

                        </View>
                        <View style={{ width: '70%' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Voucher</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', alignSelf: 'center', backgroundColor: '#F9A2A2', flexDirection: 'row', borderRadius: 10, height: 40, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1, marginLeft: 20 }}>You have 2 voucher!</Text>
                    <TouchableOpacity onPress={() => this.setState({ showVoucherModal: true })} style={{ backgroundColor: '#CC5B5A', width: '30%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 5 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>See all</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderPoints() {
        return (
            <View style={{ width: '100%', paddingBottom: 20, borderBottomWidth: 5, borderColor: Colors.lightGray, marginBottom: 20 }}>
                <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
                    <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '30%', height: 30, marginRight: 10, backgroundColor: Colors.lightGray }}>

                        </View>
                        <View style={{ width: '70%' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Mooimom Points</Text>
                        </View>
                    </View>
                    <View style={{ width: '40%', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: '#F9A2A2' }}>Rp335.900</Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', borderRadius: 10, borderWidth: 1, borderColor: Colors.mediumGray, height: 40, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        placeholder='Input your points'
                        style={{ width: '60%', marginLeft: 20, fontFamily: Fonts.type.gotham2, fontSize: Metrics.fontSize1, color: Colors.black }}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#CC5B5A', width: '30%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 5 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Use Points</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <LinearGradient colors={['#8df2e5', '#28C9B9']} style={{ width: '100%', height: 60 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: Metrics.screenWidth - 40,
                        marginHorizontal: 20,
                        alignItems: 'center',
                        height: 60
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={() => this.navigate_to('NewCategoryScreen')}>
                                <Image source={Images.menuLogo} style={{
                                    height: 16 * Metrics.screenWidth / 320,
                                    width: 16 * Metrics.screenWidth / 320,
                                    marginRight: 20,
                                    marginTop: 5,
                                    resizeMode: 'contain'
                                }} />
                            </TouchableOpacity>
                            <Image source={Images.mooimomLogoWhite} style={{
                                width: Metrics.screenWidth / 3,
                                maxHeight: 30,
                                resizeMode: 'contain'
                            }} />
                        </View>
                        <View style={{
                            flex: 2,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => this.navigate_to('SearchScreen')}>
                                <Image source={Images.search2} style={{
                                    height: 18 * Metrics.screenWidth / 320,
                                    width: 18 * Metrics.screenWidth / 320,
                                    marginLeft: 18,
                                    resizeMode: 'contain'
                                }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '90%', alignItems: 'flex-start', alignSelf: 'center', paddingBottom: 10, borderBottomWidth: 5, borderColor: Colors.lightGray, marginVertical: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>CHECK OUT</Text>
                    </View>

                    <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20, borderBottomWidth: 5, borderColor: Colors.lightGray, marginBottom: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 10 }}>Shipping Address</Text>
                        <View
                            style={{
                                width: '100%',
                                height: Metrics.screenWidth / 2.8,
                                borderRadius: 20,
                                backgroundColor: Colors.white,
                                borderColor: Colors.mediumGray,
                                borderWidth: 1,
                                marginBottom: 10,
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }} >
                            <View style={{ width: '90%', height: '100%', justifyContent: 'space-around' }}>
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>{this.state.addressList[this.state.selectedAddressId].name}</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.addressList[this.state.selectedAddressId].phone}</Text>
                                </View>

                                <View style={{ width: '70%', paddingRight: 10 }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.addressList[this.state.selectedAddressId].address}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => this.setState({ showChooseAddressModal: true })} style={{ width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize0 }}>Choose Address</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize0 }}>Send to Several Addresses</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <FlatList
                            data={[1, 2]}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderOrderItems}
                        />

                        {this.renderVoucher()}
                        {this.renderPoints()}

                        <View>
                            <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: 20 }}>Shipping Address</Text>

                            <TouchableOpacity onPress={() => this.setState({ showPaymentMethodModal: true })} style={{ width: '100%', borderRadius: 10, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Select Payment Method</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showChooseAddressModal}
                    onRequestClose={() => {
                        this.setState({
                            showChooseAddressModal: false
                        })
                    }}>
                    <TouchableOpacity
                        style={{
                            width: Metrics.screenWidth,
                            height: Metrics.screenHeight,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'flex-end'
                        }}
                        activeOpacity={1}
                        onPressOut={() => {
                            this.setState({
                                showChooseAddressModal: false
                            })
                        }}
                    />
                    {this.renderChooseAddressModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showAddAddressModal}
                    onRequestClose={() => {
                        this.setState({
                            showAddAddressModal: false
                        })
                    }}>
                    <TouchableOpacity
                        style={{
                            width: Metrics.screenWidth,
                            height: Metrics.screenHeight,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'flex-end'
                        }}
                        activeOpacity={1}
                        onPressOut={() => {
                            this.setState({
                                showAddAddressModal: false,
                                showChooseAddressModal: true
                            })
                        }}
                    />
                    {this.renderAddAddressModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showShipmentServiceModal}
                    onRequestClose={() => {
                        this.setState({
                            showShipmentServiceModal: false
                        })
                    }}>
                    <TouchableOpacity
                        style={{
                            width: Metrics.screenWidth,
                            height: Metrics.screenHeight,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'flex-end'
                        }}
                        activeOpacity={1}
                        onPressOut={() => {
                            this.setState({
                                showShipmentServiceModal: false
                            })
                        }}
                    />
                    {this.renderChooseShipmentModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showRegularNextDayShipmentModal}
                    onRequestClose={() => {
                        this.setState({
                            showRegularNextDayShipmentModal: false
                        })
                    }}>
                    <TouchableOpacity
                        style={{
                            width: Metrics.screenWidth,
                            height: Metrics.screenHeight,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'flex-end'
                        }}
                        activeOpacity={1}
                        onPressOut={() => {
                            this.setState({
                                showRegularNextDayShipmentModal: false,
                                showShipmentServiceModal: true
                            })
                        }}
                    />
                    {this.renderRegularNextDayShipmentModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showVoucherModal}
                    onRequestClose={() => {
                        this.setState({
                            showVoucherModal: false
                        })
                    }}>
                    <TouchableOpacity
                        style={{
                            width: Metrics.screenWidth,
                            height: Metrics.screenHeight,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'flex-end'
                        }}
                        activeOpacity={1}
                        onPressOut={() => {
                            this.setState({
                                showVoucherModal: false
                            })
                        }}
                    />
                    {this.renderVoucherModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showPaymentMethodModal}
                    onRequestClose={() => {
                        this.setState({
                            showPaymentMethodModal: false
                        })
                    }}>
                    <TouchableOpacity
                        style={{
                            width: Metrics.screenWidth,
                            height: Metrics.screenHeight,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'flex-end'
                        }}
                        activeOpacity={1}
                        onPressOut={() => {
                            this.setState({
                                showPaymentMethodModal: false
                            })
                        }}
                    />
                    {this.renderPaymentMethodModal()}
                </Modal>
            </SafeAreaView >
        )
    }
}