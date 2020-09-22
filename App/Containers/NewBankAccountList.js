import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput, Modal } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'


export default class NewBankAccountList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            showAddBankModal: false,
            showAddCCModal: false
        }
    }

    goBack() {
        this.props.navigation.goBack()
    }

    navigate_to(page, obj = {}) {
        const { navigate } = this.props.navigation
        navigate(page, obj)
    }

    renderAddBankModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.4, top: Metrics.screenHeight / 4, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showAddBankModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Add Bank Account</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Bank Name</Text>
                            <TouchableOpacity activeOpacity={0.5} style={{ width: '100%', borderRadius: 10, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.gray, fontSize: Metrics.fontSize1 }}>Choose Bank</Text>
                                <View style={{ width: 10, height: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={Images.downArrowBlack} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Account Number</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    placeholder="Input Account Number"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                />
                            </View>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Cardholder's Name</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    placeholder="Name must be same as the name on your bank account"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    renderAddCCModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 1.4, top: Metrics.screenHeight / 4, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showAddCCModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Add Credit Card</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Cardholder's Name</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    placeholder="Name must be same as the name on your bank account"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                />
                            </View>
                        </View>

                        <View style={{ width: '100%', marginBottom: 20, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Card Number</Text>
                            <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    placeholder="Please type here"
                                    underlineColorAndroid='transparent'
                                    style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View style={{ width: '48%', justifyContent: 'flex-start' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>Valid Date</Text>
                                <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                    <TextInput
                                        placeholder="MM/YY"
                                        underlineColorAndroid='transparent'
                                        style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '48%', justifyContent: 'flex-start' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 5 }}>CVV</Text>
                                <View style={{ width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                    <TextInput
                                        placeholder="000"
                                        underlineColorAndroid='transparent'
                                        style={{ width: '100%', fontFamily: Fonts.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingRight: 10 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>We ensure that your credit card information is protected. MOOIMOM will not access your credit card info.</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 50 }} />
                </ScrollView>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10, width: '48%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white, fontSize: Metrics.fontSize1 }}>Save</Text>
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
                    <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => this.goBack()} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginTop: 20 }}>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }], marginRight: 40 }} />
                            </View>
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Bank Accounts/Cards</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', marginTop: 20 }}>
                            <View style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Bank Account</Text>
                            </View>
                            <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ width: '30%', height: 50, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <View style={{ width: '70%', paddingRight: 10 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>PT.BCA (BANK CENTRAL ASIA) TBK</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>8810283771</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>a.n. Yonathan Wijaya</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity style={{ width: '20%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray, marginTop: 10, borderRadius: 10 }}>
                                        <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={Images.bin} style={{ width: '100%', height: '100%' }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginVertical: 20, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ showAddBankModal: true })} style={{ width: '40%', height: 30, backgroundColor: Colors.lightGray, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>+ Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '100%', borderBottomWidth: 1, borderColor: Colors.lightGray }} />

                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Credit Card</Text>
                            </View>
                            <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ width: '30%', height: 50, backgroundColor: Colors.mediumGray, marginRight: 20 }} />
                                    <View style={{ width: '70%', paddingRight: 10 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>PT.BCA (BANK CENTRAL ASIA) TBK</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>0982344678</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>Valid Until 11/22</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity style={{ width: '20%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray, marginTop: 10, borderRadius: 10 }}>
                                        <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={Images.bin} style={{ width: '100%', height: '100%' }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginVertical: 20, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ showAddCCModal: true })} style={{ width: '40%', height: 30, backgroundColor: Colors.lightGray, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>+ Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showAddBankModal}
                    onRequestClose={() => {
                        this.setState({
                            showAddBankModal: false
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
                                showAddBankModal: false
                            })
                        }}
                    />
                    {this.renderAddBankModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showAddCCModal}
                    onRequestClose={() => {
                        this.setState({
                            showAddCCModal: false
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
                                showAddCCModal: false
                            })
                        }}
                    />
                    {this.renderAddCCModal()}
                </Modal>
            </SafeAreaView>
        )
    }
}