import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'


export default class NewContactUsScreen extends React.Component {
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
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Contact Us</Text>
                        </TouchableOpacity>

                        <View style={{ width: '90%', marginTop: 20 }}>
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: Colors.mooimom, marginRight: 20 }} />
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Whatsapp</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>081288446533</Text>
                                </View>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: Colors.mooimom, marginRight: 20 }} />
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Line</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>@mooimom</Text>
                                </View>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: Colors.mooimom, marginRight: 20 }} />
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Instagram</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>mooimom.id</Text>
                                </View>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: Colors.mooimom, marginRight: 20 }} />
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Telephone</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>(021) 29375214</Text>
                                </View>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: Colors.mooimom, marginRight: 20 }} />
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Email</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>cs@mooimom.id</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}