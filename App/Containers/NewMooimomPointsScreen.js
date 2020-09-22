import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'


export default class NewMooimomPointsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
        }
    }

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
                        <TouchableOpacity onPress={() => this.goBack()} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 20, paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }], marginRight: 40 }} />
                            </View>
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Mooimom Points</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', backgroundColor: Colors.lightGray }}>
                        <View style={{ width: '90%', paddingVertical: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Silver Member</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold', fontSize: Metrics.fontSize2 }}>99.000 points</Text>
                            </View>
                            <LinearGradient colors={[Colors.mediumGray, Colors.gray]} style={{ width: Metrics.screenWidth - 20, height: Metrics.screenWidth / 2 + 20, borderRadius: 10, marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'space-between', padding: 20 }}>
                                <View style={{ width: '100%', justifyContent: 'flex-start' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 50 / 2, borderWidth: 5, borderColor: Colors.white, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize2 }}>M</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ marginLeft: 20 }}>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize2 }}>Username</Text>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize2, fontWeight: 'bold' }}>yonathanwijaya</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize2 }}>Valid Until</Text>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize2, fontWeight: 'bold' }}>1/1/2021</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, margin: 10, borderRadius: 10 }}>
                                        <View style={{ width: 100, height: 100, backgroundColor: Colors.black }} />
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={{ width: '90%', paddingVertical: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                        <View style={{ width: '100%', height: 50, backgroundColor: Colors.black, marginBottom: 10 }} />
                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>343</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>3445</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>5220</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>7860</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>3488</Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', paddingVertical: 10, alignSelf: 'center' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: '#FFC627', fontSize: Metrics.fontSize1, fontWeight: 'bold', marginBottom: 20 }}>Unlock Gold Member</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 40 / 2, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Total purchase Rp7.000.000 to unlock Gold</Text>
                                <View style={{ width: '100%', height: 20, backgroundColor: Colors.mediumGray, borderRadius: 10, marginTop: 10, alignSelf: 'center', justifyContent: 'center' }}>
                                    <View style={{
                                        width: '50%', height: 20, backgroundColor: '#FFC627', position: 'absolute', left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        zIndex: -1,
                                        borderRadius: 10
                                    }} />
                                    <Text style={{ textAlign: 'center', fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize0 }}>Rp2.100.000</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 40 / 2, backgroundColor: '#FFC627', marginRight: 20 }} />
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: '#FFC627', fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Free Shipping</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Get more free shipping voucher</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 40 / 2, backgroundColor: '#FFC627', marginRight: 20 }} />
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: '#FFC627', fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Gold Cashback</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Get more cashback points</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}