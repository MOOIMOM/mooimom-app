import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput, Modal } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import DatePicker from 'react-native-date-picker'
import { DotIndicator } from 'react-native-indicators'
import moment from 'moment'
import colors from '../Themes/Colors'
import axios from 'axios'


export default class NewEditProfileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userProfile: {
                "picture_url": "",
                "name": "",
                "membershiplevel": "",
                "married": "",
                "gender": "",
                "country": "",
                "state": "",
                "city": "",
                "district": "",
                "street": "",
                "zip_code": "",
                "email": "",
                "phone": "",
                "birthday": "",
                "children": [],
                "default_shipping_address_id": 0,
                "wishlist_num": 0,
                "mooimom_point": 0
            },
            uploading: false,
            showStatusModal: false,
            showGenderModal: false,
            showBirthdayModal: false,
            showHaveKidsModal: false,
            genderEnum: [
                { title: 'Male', value: 'male' },
                { title: 'Female', value: 'female' }
            ],
            statusEnum: [
                { title: 'Married', value: 'married' },
                { title: 'Not Married', value: 'notmarried' }
            ],
            haveKidsEnum: [
                { title: 'Yes', value: 'yes' },
                { title: 'No', value: 'no' }
            ],
            objectToPostGeneric: {},
            currentDate: new Date(),
            editedPhoneNumber: '',
            selectedHaveKidsIdx: '',
            selectedBirthday: '',
            selectedStatusIdx: '',
            selectedGenderIdx: ''
        }

        this.renderStatusModal = this.renderStatusModal.bind(this)
    }

    componentDidMount() {
        this.getUserProfile()
    }

    async componentWillReceiveProps(newProps) {
        if (this.props.navigation.state.params !== newProps.navigation.state.params) {
            console.log('AJOO: ', newProps.navigation.state.params.newPhoneNumber)
            let phone = newProps.navigation.state.params.newPhoneNumber
            this.setState({
                userProfile: {
                    ...this.state.userProfile, phone: phone
                },
                objectToPostGeneric: {
                    ...this.state.objectToPostGeneric,
                    phone: phone
                },
                editedPhoneNumber: phone
            })
        }
    }

    getUserProfile() {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNSwiZXhwIjoxNjAzMjYwNjE4fQ.xtWIzF5VnotRAMWcK29QvUBtQr0cv-j23gF6K_wmOOU'
        axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/user/profile?type=mobile', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({ userProfile: res.data })
            })
            .catch(err => {
                console.log('ERROR :', err)
            })
    }

    editUserProfile() {
        this.setState({ uploading: true })
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNSwiZXhwIjoxNjAzMjYwNjE4fQ.xtWIzF5VnotRAMWcK29QvUBtQr0cv-j23gF6K_wmOOU'
        let api = {
            Authorization: `Bearer ${token}`
        }
        let body = this.state.objectToPostGeneric
        axios.put('https://mooimom-alpha.ec.tnpgroup.co/web/user/profile?type=mobile', body, { headers: api })
            .then((res) => {
                if (res.status == 200) {
                    this.setState({ uploading: false })
                    alert('Success updated profile data')
                }
                console.log('Response Edit: ', res)
            })
            .catch(err => {
                console.log('ERROR: ', err)
            })

        console.log('GENERIC: ', this.state.objectToPostGeneric)

    }

    goBack() {
        this.props.navigation.goBack()
    }

    navigate_to(page, obj = {}) {
        const { navigate } = this.props.navigation
        navigate(page, obj)
    }

    onChangeBirthday(date) {
        let birthday = moment(date).format("YYYY-MM-DD")
        this.setState({
            selectedBirthday: birthday,
            userProfile: {
                ...this.state.userProfile, birthday: birthday
            },
            objectToPostGeneric: {
                ...this.state.objectToPostGeneric,
                birthday: birthday
            },
            currentDate: date
        })
        console.log(birthday)
    }

    onChangeGender(index) {
        let gender = this.state.genderEnum[index].value
        this.setState({
            selectedGenderIdx: index,
            userProfile: {
                ...this.state.userProfile, gender: gender
            },
            objectToPostGeneric: {
                ...this.state.objectToPostGeneric,
                gender: gender
            },
            showGenderModal: false
        })
    }

    initialDate() {
        if (this.state.userProfile.birthday !== '') {
            let currentDate = new Date(this.state.userProfile.birthday)
            return currentDate
        }
        else {
            return this.state.currentDate
        }
    }

    renderStatusModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 2, top: Metrics.screenHeight / 2, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showStatusModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Status</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        this.state.statusEnum.map((parentItem, index) => (
                            <TouchableOpacity onPress={() => this.setState({ selectedStatusIdx: index, showStatusModal: false })} style={{ width: '90%', alignSelf: 'center', marginTop: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
            </View>
        )
    }

    renderGenderModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 2, top: Metrics.screenHeight / 2, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showGenderModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Gender</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        this.state.genderEnum.map((parentItem, index) => (
                            <TouchableOpacity onPress={() => this.onChangeGender(index)} style={{ width: '90%', alignSelf: 'center', marginTop: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
            </View>
        )
    }

    renderBirthdayModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 2, top: Metrics.screenHeight / 2, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showBirthdayModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Birthday</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <DatePicker
                            date={this.initialDate()}
                            androidVariant='iosClone'
                            mode='date'
                            onDateChange={(value) => this.onChangeBirthday(value)}
                        />
                    </View>
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
            </View>
        )
    }

    renderHaveKidsModal() {
        return (
            <View style={{ width: '100%', height: Metrics.screenHeight / 2, top: Metrics.screenHeight / 2, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ showBirthdayModal: false })} style={{ marginLeft: '96%', marginTop: 10, width: 20, height: 20 }}>
                        <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: 16 }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black }}>Have Kids</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        this.state.haveKidsEnum.map((parentItem, index) => (
                            <TouchableOpacity onPress={() => this.setState({ selectedHaveKidsIdx: index, showHaveKidsModal: false })} style={{ width: '90%', alignSelf: 'center', marginTop: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    <View style={{ marginTop: 50 }} />
                </ScrollView>
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
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Profile</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                <Image source={Images.profile} style={{ width: '100%', height: '100%' }} />
                            </View>
                            <TouchableOpacity style={{ width: 90, height: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderRadius: 20, borderWidth: 1, borderColor: Colors.mediumGray }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>Edit</Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mediumGray, fontSize: Metrics.fontSize0 }}>Max image Size 1 MB. Image format .jpg, .png</Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Account Name</Text>
                            </View>
                            <View style={{ width: '60%', justifyContent: 'flex-start' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>{this.state.userProfile.name}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Email</Text>
                            </View>
                            <TouchableOpacity style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>{this.state.userProfile.email}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Phone Number</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.navigate_to('NewChangePhoneNumberScreen')} style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>{this.state.userProfile.phone}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Status</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showStatusModal: true })} style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: this.state.selectedStatusIdx !== '' ? Colors.black : Colors.mediumGray }}>{this.state.selectedStatusIdx !== '' ? this.state.statusEnum[this.state.selectedStatusIdx].title : 'set now'}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Gender</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showGenderModal: true })} style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: this.state.selectedGenderIdx !== '' || this.state.userProfile.gender !== '' ? Colors.black : Colors.mediumGray }}>{(this.state.userProfile.gender !== '' ? this.state.userProfile.gender : (this.state.selectedGenderIdx !== '' ? this.state.genderEnum[this.state.selectedGenderIdx].title : 'set now'))}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Birthday</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showBirthdayModal: true })} style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: this.state.selectedBirthday !== '' || this.state.userProfile.birthday !== '' ? Colors.black : Colors.mediumGray }}>{(this.state.userProfile.birthday !== '' ? this.state.userProfile.birthday : (this.state.selectedBirthday !== '' ? this.state.selectedBirthday : 'set now'))}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Have Kids</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showHaveKidsModal: true })} style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '90%', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: this.state.selectedHaveKidsIdx !== '' ? Colors.black : Colors.mediumGray }}>{this.state.selectedHaveKidsIdx !== '' ? this.state.haveKidsEnum[this.state.selectedHaveKidsIdx].title : 'set now'}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, marginBottom: 20 }}>
                            <View style={{ width: '40%' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>If Yes, how old?</Text>
                            </View>
                            <View style={{ width: '60%', justifyContent: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: Colors.mediumGray }}>
                                <TextInput
                                    style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, paddingVertical: 0 }}
                                    placeholder="please type here"
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.editUserProfile()} style={{ backgroundColor: Colors.mooimom, width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 20 }}>
                            {
                                this.state.uploading ?
                                    <DotIndicator color={Colors.white} size={6} />
                                    :
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontWeight: 'bold' }}>Save</Text>
                            }
                        </TouchableOpacity>
                        <View style={{ marginVertical: 30 }} />
                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showStatusModal}
                    onRequestClose={() => {
                        this.setState({
                            showStatusModal: false
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
                                showStatusModal: false
                            })
                        }}
                    />
                    {this.renderStatusModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showGenderModal}
                    onRequestClose={() => {
                        this.setState({
                            showGenderModal: false
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
                                showGenderModal: false
                            })
                        }}
                    />
                    {this.renderGenderModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showBirthdayModal}
                    onRequestClose={() => {
                        this.setState({
                            showBirthdayModal: false
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
                                showBirthdayModal: false
                            })
                        }}
                    />
                    {this.renderBirthdayModal()}
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showHaveKidsModal}
                    onRequestClose={() => {
                        this.setState({
                            showHaveKidsModal: false
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
                                showHaveKidsModal: false
                            })
                        }}
                    />
                    {this.renderHaveKidsModal()}
                </Modal>
            </SafeAreaView>
        )
    }
}