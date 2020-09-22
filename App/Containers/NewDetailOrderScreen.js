import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'

export default class NewDetailOrderScreen extends React.Component {
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
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Detail Order</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5, fontSize: Metrics.fontSize1 }}>Order ID<Text style={{ marginLeft: 10 }}>2002088MMO</Text></Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Status</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Purchase Date</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Completed Order</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>10 June 2020 18:20 WIB</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Shipping Address</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Yonathan Wijaya</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>081287128507</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>(Home)</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Pelepah Kuning 2 WT 2 no. 16 Kelapa Gading, Jakarta Utara DKI Jakarta 14240</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Payment Details</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>BCA Credit Card Visa</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Track Order</Text>
                                <TouchableOpacity onPress={() => this.navigate_to('NewTrackOrderScreen')} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>See Details</Text>
                                    <View style={{ width: 8, height: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Status</Text>
                                <Text style={{ color: Colors.mooimom, marginLeft: 20 }}>Completed Order</Text>
                            </View>
                            <View>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.mooimom, marginRight: 20 }} />
                                        <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.mooimom, fontSize: Metrics.fontSize0 }}>Friday, 12 June 2020 | 17:55</Text>
                                    </View>
                                    <Text style={{ marginLeft: 30, fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>[JAKARTA] DELIVERED TO [YONATHAN 12-06-2020 | 17:55]</Text>
                                </View>

                                <View style={{ marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                        <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontSize: Metrics.fontSize0 }}>Friday, 12 June 2020 | 16:23</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Hamako</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <View style={{ width: 20, height: 20, backgroundColor: Colors.mediumGray, marginRight: 10 }} />
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>From <Text style={{ fontWeight: 'bold' }}>Taiwan</Text> (shipping time 10-14days)</Text>
                            </View>
                            <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                                    <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Unisex Top and Sort</Text>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp199.000</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                    <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                                    <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Frill Creeper</Text>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp199.000</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                                <View style={{ width: '60%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>Product Subtotal</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp348.000</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>DHL Express</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp184.000</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                                <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mediumGray, fontWeight: 'bold' }}>Total</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontWeight: 'bold' }}>Rp532.000</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={{ marginTop: 20, borderRadius: 10, width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Buy Again</Text>
                            </TouchableOpacity>

                        </View >

                    </View>
                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}