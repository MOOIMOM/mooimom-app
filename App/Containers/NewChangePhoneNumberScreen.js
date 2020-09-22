import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'


export default class NewChangePhoneNumberScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
        }
    }

    goBack() {
        this.props.navigation.goBack()
    }

    navigate_to(page, obj = {}) {
        const { navigate } = this.props.navigation
        navigate(page, obj)
    }

    onPressSavePhone() {
        var numRgx = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g

        if (this.state.phone !== '') {
            if (numRgx.test(this.state.phone)) {
                this.navigate_to('NewEditProfileScreen', { newPhoneNumber: this.state.phone })
            }
            else {
                alert('Phone number that you input was not valid!')
            }
        }
        else {
            alert('Phone number can not be empty!')
        }

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
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Phone Number</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', marginVertical: 20, justifyContent: 'flex-start' }}>
                            <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    placeholder="please type here"
                                    underlineColorAndroid='transparent'
                                    keyboardType='phone-pad'
                                    onChangeText={(value) => this.setState({ phone: value })}
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}
                                />
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => this.onPressSavePhone()} style={{ marginTop: 10, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}