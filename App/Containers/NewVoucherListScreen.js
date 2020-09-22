import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'
import { T } from 'ramda'

import VoucherList from '../Components/VoucherList'

export default class NewVoucherListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedVoucherId: '',
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
            ]
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
                        <TouchableOpacity onPress={() => this.goBack()} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginTop: 20 }}>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }], marginRight: 40 }} />
                            </View>
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>My Vouchers</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40, borderRadius: 10, borderWidth: 1, borderColor: Colors.mediumGray, marginVertical: 20 }}>
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

                    <VoucherList
                        options={this.state.myVouchers}
                        onSelected={(value) => this.setState({ selectedVoucherId: value })}
                    />

                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}