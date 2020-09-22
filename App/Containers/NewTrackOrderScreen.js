import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'

export default class NewTrackOrderScreen extends React.Component {
    goBack() {
        this.props.navigation.goBack()
    }

    navigate_to(page, obj = {}) {
        const { navigate } = this.props.navigation
        navigate(page, obj)
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
                    <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => this.goBack()} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginTop: 20 }}>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }], marginRight: 40 }} />
                            </View>
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Track Order</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Tracking Number</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Shipping Date</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Service</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>0998997776659</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>10-06-2020</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>DHL Express</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Status</Text>
                            <Text style={{ color: Colors.mooimom, marginLeft: 20 }}>Completed Order</Text>
                        </View>
                        <View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mooimom, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize1 }}>Friday, 12 June 2020 | 17:55</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>[JAKARTA] DELIVERED TO [YONATHAN 12-06-2020 | 17:55]</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize1 }}>Friday, 12 June 2020 | 16:23</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>[JAKARTA] WITH DELIVERY COURIER</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize1 }}>Friday, 12 June 2020 | 14:56</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>[JAKARTA] RECEIVED AT INBOUND STATION SUNTER</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize1 }}>Friday, 12 June 2020 | 11:21</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>[JAKARTA] SHIPMENT FORWARDED TO DESTINATION, SUNTER</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize1 }}>Thursday, 11 June 2020 | 19:54</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>[JAKARTA] SHIPMENT RECEIVED BY JNE COUNTER OFFICER AT JAKARTA</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize1 }}>Thursday, 11 June 2020 | 12:01</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>[JAKARTA] RECEIVED AT SORTING CENTER</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize1 }}>Wednesday, 10 June 2020 | 11:12</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>YOUR ORDER HAS BEEN SENT FROM MOOIMOM IN TAIWAN</Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize1 }}>Wednesday, 10 June 2020 | 10:11</Text>
                                </View>
                                <Text style={{ marginLeft: 35, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>YOUR ORDER ALREADY PROCESSED</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}