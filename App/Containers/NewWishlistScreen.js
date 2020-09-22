import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'
import axios from 'axios'

import WishlistProductCard from '../Components/WishlistProductCard'

export default class NewWishlistScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wishlist: [],
        }
    }

    componentDidMount() {
        this.getWishlistProduct()
    }

    getWishlistProduct() {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNSwiZXhwIjoxNjAzMjYwNjE4fQ.xtWIzF5VnotRAMWcK29QvUBtQr0cv-j23gF6K_wmOOU'
        axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/user/wishlist', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({ wishlist: res.data })
            })
            .catch(err => {
                console.log('ERROR :', err)
            })
    }

    // getAttributeList(selectedProductAttributes) {
    //     axios.get('https://ec-test.mooimom.tnpgroup.co/web/attribute/all')
    //         .then((res) => {
    //             let sizes = res.data[0]
    //             let colors = res.data[1]

    //             let productAttributes = selectedProductAttributes

    //             productAttributes.map(productId => {
    //                 sizes.attribute_values.map(sizeItem => {
    //                     if (sizeItem.id === productId) {
    //                         // console.log('Berhasil')
    //                         this.setState({
    //                             productSizes: [...this.state.productSizes, sizeItem]
    //                         })
    //                     }
    //                 })

    //                 colors.attribute_values.map(colorItem => {
    //                     if (colorItem.id === productId) {
    //                         // console.log('Berhasil juga')
    //                         this.setState({
    //                             productColors: [...this.state.productColors, colorItem]
    //                         })
    //                     }
    //                 })
    //             })
    //         })
    //         .catch(err => {
    //             console.log('ERROR :', err)
    //         })
    // }

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
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>Wishlist</Text>
                        </TouchableOpacity>
                        <View style={{ width: '100%' }}>
                            <WishlistProductCard options={this.state.wishlist} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}