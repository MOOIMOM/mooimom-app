import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'
import { T } from 'ramda'

export default class NewReferralScreen extends React.Component {
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
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Refer a Friend</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', height: Metrics.screenWidth / 2, backgroundColor: Colors.mediumGray, marginBottom: 20 }} />

                    <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize2 }}>Tell your friends about MOOIMOM & get points for you and your friend!</Text>
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Treat your friends to 50% cashback of their first order and get 50.000 Mooimom points once they use your Referral voucher code!</Text>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'flex-start', marginBottom: 10 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black, fontWeight: 'bold', fontSize: Metrics.fontSize0 }}>Your Referral Code</Text>
                        </View>
                        <View style={{ width: '100%', backgroundColor: Colors.lightGray, marginBottom: 20, borderRadius: 15, height: 40, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize3, marginLeft: 20 }}>MMO1FGH17</Text>
                            <TouchableOpacity style={{ width: '30%', borderRadius: 10, backgroundColor: Colors.mooimom, height: '100%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white, fontSize: Metrics.fontSize1 }}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize2, fontWeight: 'bold' }}>Share Referral Code</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}