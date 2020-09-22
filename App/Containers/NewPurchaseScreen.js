import React from 'react'
import { View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Text, TextInput } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import colors from '../Themes/Colors'

import OrderStatusTab from '../Components/OrderStatusTab'


export default class NewPurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderStatusEnum: [
                { name: 'All' },
                { name: 'Not paid yet' },
                { name: 'Packed Up' },
                { name: 'Shipped' },
                { name: 'Completed' },
                { name: 'Cancelled' }
            ],
            currentTab: 'All'
        }
    }
    goBack() {
        this.props.navigation.goBack()
    }

    navigate_to(page, obj = {}) {
        const { navigate } = this.props.navigation
        navigate(page, obj)
    }

    renderOrderItem() {
        return (
            <View style={{ paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Hamako</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: Colors.mediumGray, marginRight: 10 }} />
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>From <Text style={{ fontWeight: 'bold' }}>Taiwan</Text> (shipping time 10-14days)</Text>
                </View>
                <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Unisex Top and Sort</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp199.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Frill Creeper</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp199.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>Product Subtotal</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp348.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>DHL Express</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp184.000</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mediumGray, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontWeight: 'bold' }}>Rp532.000</Text>
                    </View>
                </View>

                <TouchableOpacity style={{ marginVertical: 20, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', fontSize: Metrics.fontSize1, color: Colors.mooimom }}>DELIVERED TO [YONATHAN 12-06-2020 | 17:55]</Text>
                    </View>
                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Buy Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigate_to('NewDetailOrderScreen')} style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black }}>Detail Order</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }

    renderOrderItem2() {
        return (
            <View style={{ paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Mooimom Official</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: Colors.mediumGray, marginRight: 10 }} />
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>From <Text style={{ fontWeight: 'bold' }}>Jakarta Utara</Text></Text>
                </View>
                <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Crossover Maternity & Nursing Bra</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: 80C</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: Pink</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp170.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>59s UVC LED Sterilizing Box (Built in Battery)/ Box Sterilizer Portable</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: Blue</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp2.900.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>Product Subtotal</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp3.070.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>DHL Express</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp10.000</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mediumGray, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontWeight: 'bold' }}>Rp3.080.000</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    {/* <TouchableOpacity style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Buy Again</Text>
                    </TouchableOpacity> */}
                    <View style={{ width: '48%' }} />
                    <TouchableOpacity style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Pay</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }

    renderOrderItem3() {
        return (
            <View style={{ paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Hamako</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: Colors.mediumGray, marginRight: 10 }} />
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>From <Text style={{ fontWeight: 'bold' }}>Taiwan</Text> (shipping time 10-14days)</Text>
                </View>
                <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Unisex Top and Short</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp199.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>DHL Express</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp184.000</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mediumGray, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontWeight: 'bold' }}>Rp383.900</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    {/* <TouchableOpacity style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Buy Again</Text>
                    </TouchableOpacity> */}
                    <View style={{ width: '48%' }} />
                    <TouchableOpacity onPress={() => this.navigate_to('NewDetailOrderScreen')} style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black }}>Detail Order</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }

    renderOrderItem4() {
        return (
            <View style={{ paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Hamako</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: Colors.mediumGray, marginRight: 10 }} />
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>From <Text style={{ fontWeight: 'bold' }}>Taiwan</Text> (shipping time 10-14days)</Text>
                </View>
                <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Unisex Top and Short</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp199.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Frill Creeper</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp149.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>Product Subtotal</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp348.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>DHL Express</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp184.000</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mediumGray, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontWeight: 'bold' }}>Rp532.000</Text>
                    </View>
                </View>

                <TouchableOpacity style={{ marginVertical: 20, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', fontSize: Metrics.fontSize1, color: Colors.mooimom }}>Shipment RECEIVED by JNE Counter at Jakarta Utara</Text>
                    </View>
                    <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%' }} />
                    </View>
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    {/* <TouchableOpacity style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Buy Again</Text>
                    </TouchableOpacity> */}
                    <View style={{ width: '48%' }} />
                    <TouchableOpacity onPress={() => this.navigate_to('NewDetailOrderScreen')} style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.lightGray }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black }}>Detail Order</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }

    renderOrderItem5() {
        return (
            <View style={{ paddingVertical: 20, borderBottomWidth: 5, borderColor: Colors.lightGray }}>
                <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.gotham2, fontWeight: 'bold' }}>Hamako</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: Colors.mediumGray, marginRight: 10 }} />
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize0 }}>From <Text style={{ fontWeight: 'bold' }}>Taiwan</Text> (shipping time 10-14days)</Text>
                </View>
                <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ width: Metrics.screenWidth / 4, height: (Metrics.screenWidth / 4) + 20, backgroundColor: Colors.mediumGray }} />
                        <View style={{ width: '60%', justifyContent: 'flex-start', height: (Metrics.screenWidth / 4) + 20, marginLeft: 40 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>HAMAKO Unisex Top and Short</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Size: S</Text>
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Color: White</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black }}>Qty: 1</Text>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp199.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, marginBottom: 5 }}>DHL Express</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontWeight: 'bold' }}>Rp184.000</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: Metrics.screenWidth / 4 + 40 }} />
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mediumGray, fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontWeight: 'bold' }}>Rp383.900</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    {/* <TouchableOpacity style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Buy Again</Text>
                    </TouchableOpacity> */}
                    <View style={{ width: '48%' }} />
                    <TouchableOpacity style={{ borderRadius: 10, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.mooimom }}>
                        <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white }}>Buy Again</Text>
                    </TouchableOpacity>
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
                    <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => this.goBack()} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginTop: 20 }}>
                            <View style={{ width: 10, height: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.rightArrowBlack} style={{ width: '100%', height: '100%', transform: [{ rotate: '180deg' }], marginRight: 40 }} />
                            </View>
                            <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.black, fontSize: Metrics.fontSize2 }}>My Purchases</Text>
                        </TouchableOpacity>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray, marginTop: 20 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <OrderStatusTab options={this.state.orderStatusEnum} onSelected={(value) => this.setState({ currentTab: value })} />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%' }}>
                            {
                                this.state.currentTab === 'All' &&
                                <>
                                    {this.renderOrderItem()}
                                    {this.renderOrderItem2()}
                                    {this.renderOrderItem3()}
                                    {this.renderOrderItem4()}
                                    {this.renderOrderItem5()}
                                </>
                            }
                            {
                                this.state.currentTab === 'Not paid yet' &&
                                <>
                                    {this.renderOrderItem2()}
                                </>
                            }
                            {
                                this.state.currentTab === 'Packed Up' &&
                                <>
                                    {this.renderOrderItem3()}
                                </>
                            }
                            {
                                this.state.currentTab === 'Shipped' &&
                                <>
                                    {this.renderOrderItem4()}
                                </>
                            }
                            {
                                this.state.currentTab === 'Completed' &&
                                <>
                                    {this.renderOrderItem()}
                                </>
                            }
                            {
                                this.state.currentTab === 'Cancelled' &&
                                <>
                                    {this.renderOrderItem5()}
                                </>
                            }
                        </View>
                    </View>
                    <View style={{ marginVertical: 40 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}