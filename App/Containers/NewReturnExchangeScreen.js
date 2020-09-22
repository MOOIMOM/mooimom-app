import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'


export default class NewReturnExchangeScreen extends React.Component {
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
                        <TouchableOpacity onPress={() => this.goBack()} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginTop: 20 }}>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }], marginRight: 40 }} />
                            </View>
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Return Exchange</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', marginVertical: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Order Number</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    placeholder="please type here"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}
                                />
                            </View>
                        </View>

                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Product Name</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    placeholder="please type here"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}
                                />
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                <TouchableOpacity style={{ width: '30%', borderRadius: 10, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Size</Text>
                                    <View style={{ width: 10, height: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={Images.downArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '30%', borderRadius: 10, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Color</Text>
                                    <View style={{ width: 10, height: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={Images.downArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '30%', borderRadius: 10, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Qty</Text>
                                    <View style={{ width: 10, height: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={Images.downArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Reason</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40 * 3, paddingHorizontal: 10, paddingBottom: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    multiline={true}
                                    placeholder="please type here"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}
                                />
                            </View>
                        </View>

                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Photo of the Product</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40 * 3, justifyContent: 'space-between', padding: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <View style={{ width: '100%', height: 40 }} />
                                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={{ width: '30%', height: 30, backgroundColor: Colors.mooimom, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize1 }}>upload</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={{ marginTop: 10, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}