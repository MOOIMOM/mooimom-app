import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TouchableWithoutFeedback } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import menuStyles from './Styles/MenuComponentStyles'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'

export default class NewProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ focused, tintColor }) => {
            const iconName = (focused ? Images.account2 : Images.account)
            return <Image source={iconName} style={menuStyles.menuImage} />
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            myAccountMenuSub: false,
            helpCenterMenuSub: false
        }
    }
    // componentDidMount() {
    //     let proposedDate = '2020-08-15T06:18:00Z'
    //     let momentDate = moment(proposedDate)

    //     let diffDays = moment('2020-08-15T06:18:00Z', 'YYYY-MM-DD hh:mm:ss').fromNow()

    //     console.log('AA', diffDays)

    //     // const oneDay = 24 * 60 * 60 * 1000
    //     // console.log(momentDate.format("YYYY-MM-DD hh:mm:ss A Z"))
    //     // let year = momentDate.year()
    //     // let month = momentDate.month()
    //     // let day = momentDate.date()

    //     // let firstDate = new Date(2020, 8, 9)
    //     // let secondDate = new Date(2020, 8, 15)
    //     // let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))

    //     // console.log(year, month, day)
    //     // let hour = momentDate.hours()
    //     // let minutes = momentDate.minutes()
    //     // let seconds = momentDate.seconds()

    //     // console.log(date, hour, minutes, seconds)
    // }

    navigate_to(page, obj = {}) {
        const { navigate } = this.props.navigation
        navigate(page, obj)
    }

    renderMenu() {
        return (
            <View style={{ width: '90%', alignSelf: 'center' }}>

                <View style={{ borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 20, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <View style={{ width: '20%' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray }} />
                        </View>
                        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>My Purchase</Text>
                            <TouchableOpacity onPress={() => this.navigate_to('NewPurchaseScreen')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>View Purchase History</Text>
                                <View style={{ width: 6, height: 6, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                    <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '10%' }} />

                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray, marginBottom: 5 }} />
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>To Pay</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray, marginBottom: 5 }} />
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>To Ship</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray, marginBottom: 5 }} />
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>To Receive</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray, marginBottom: 5 }} />
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>To Rate</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.navigate_to('NewWishlistScreen')} style={{ borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '20%' }}>
                        <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray }} />
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Wishlist</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.navigate_to('NewVoucherListScreen')} style={{ borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '20%' }}>
                        <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray }} />
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>My Vouchers</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.navigate_to('NewReferralScreen')} style={{ borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '20%' }}>
                        <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray }} />
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Refer a friend</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <TouchableOpacity onPress={() => this.setState({ myAccountMenuSub: !this.state.myAccountMenuSub })} style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '20%' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray }} />
                        </View>
                        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>My Account</Text>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Image source={Images.downArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: this.state.myAccountMenuSub ? '180deg' : '0deg' }] }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        this.state.myAccountMenuSub &&
                        <View>
                            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '20%' }}>
                                    <View style={{ width: 40, height: 40 }} />
                                </View>
                                <TouchableOpacity onPress={() => this.navigate_to('NewEditProfileScreen')} style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.navigate_to('NewAddressListScreen')} style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '20%' }}>
                                    <View style={{ width: 40, height: 40 }} />
                                </View>
                                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Address List</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigate_to('NewChangePasswordScreen')} style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '20%' }}>
                                    <View style={{ width: 40, height: 40 }} />
                                </View>
                                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Password</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigate_to('NewBankAccountList')} style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '20%' }}>
                                    <View style={{ width: 40, height: 40 }} />
                                </View>
                                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Bank Accounts/Cards</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                <View style={{ borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <TouchableOpacity onPress={() => this.setState({ helpCenterMenuSub: !this.state.helpCenterMenuSub })} style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '20%' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray }} />
                        </View>
                        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Help Center</Text>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Image source={Images.downArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: this.state.helpCenterMenuSub ? '180deg' : '0deg' }] }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {
                        this.state.helpCenterMenuSub &&
                        <View>
                            <TouchableOpacity onPress={() => this.navigate_to('NewReturnExchangeScreen')} style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '20%' }}>
                                    <View style={{ width: 40, height: 40 }} />
                                </View>
                                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Return Exchange</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.navigate_to('NewContactUsScreen')} style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '20%' }}>
                                    <View style={{ width: 40, height: 40 }} />
                                </View>
                                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Contact us</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '20%' }}>
                        <View style={{ width: 40, height: 40, backgroundColor: Colors.mediumGray }} />
                    </View>
                    <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Logout</Text>
                    </View>
                </View>

            </View >
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
                    <LinearGradient
                        colors={['#8df2e5', '#28C9B9']}
                        style={{
                            width: '100%',
                            height: 300,
                            backgroundColor: Colors.mooimom,
                            justifyContent: 'space-evenly'
                        }}>
                        <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 2
                            }}>
                                <Image source={Images.profile} style={{ marginRight: 20, width: 54, height: 54 }} />
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white, fontSize: Metrics.fontSize3, marginBottom: 5 }}>yonathanwijaya</Text>
                                    <TouchableOpacity style={{
                                        borderRadius: 20,
                                        width: 120,
                                        height: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 5,
                                        backgroundColor: Colors.lightGray
                                    }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Silver Member</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flex: 2 }}>

                            </View>

                        </View>

                        <View style={{
                            alignSelf: 'center',
                            width: '90%',
                            height: 150,
                            backgroundColor: Colors.white,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }} >
                            <TouchableWithoutFeedback onPress={() => this.navigate_to('NewMooimomPointsScreen')}>
                                <LinearGradient colors={[Colors.mediumGray, Colors.gray]} style={{ width: '50%', height: 120, borderRadius: 10, marginLeft: 20, marginRight: 20, justifyContent: 'space-between', padding: 10 }}>
                                    <View style={{ width: '100%', justifyContent: 'flex-start' }}>
                                        <View style={{ width: 20, height: 20, borderRadius: 20 / 2, borderWidth: 2, borderColor: Colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.white, fontSize: Metrics.fontSize1 }}>M</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, margin: 5, borderRadius: 5 }}>
                                            <View style={{ width: 40, height: 40, backgroundColor: Colors.black }} />
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableWithoutFeedback>

                            <View style={{ width: '50%', height: 120, justifyContent: 'space-evenly' }}>
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2 }}>Silver Member</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>99.000 points</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2 }}>Valid Until</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>1/1/2021</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>

                    {this.renderMenu()}
                    <View style={{ marginVertical: 30 }} />
                </ScrollView>

            </SafeAreaView>
        )
    }
}