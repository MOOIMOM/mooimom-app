import React from 'react'
import { View, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import { T } from 'ramda';
import LinearGradient from 'react-native-linear-gradient'


export default class WishlistProductCard extends React.Component {
    state = {
        value: 'All'
    }

    render() {
        const { options, onDeleted } = this.props;
        const { value } = this.state;

        return (
            options.map(parentItem => (
                <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderColor: Colors.mediumGray }}>
                    <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ width: Metrics.screenWidth / 2.5, height: Metrics.screenWidth / 2.5, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            <Image source={{ uri: parentItem.product_image }} style={{ width: '100%', height: '100%' }} />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginBottom: 10 }}>{parentItem.product_name}</Text>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.mooimom, fontSize: Metrics.fontSize2, marginBottom: 20, fontWeight: 'bold' }}>Rp{parentItem.product_price}</Text>
                            <LinearGradient colors={[Colors.gray, Colors.lightGray]} style={{ width: 80, height: 26, borderRadius: 5 }}>
                                <View style={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <Text style={{ fontFamily: Fonts.type.gotham2, fontWeight: 'bold', color: Colors.white, fontSize: Metrics.fontSize0 }}>Rp{parentItem.cash_back[0].cash_back}</Text> */}
                                </View>
                                <View style={{ height: '50%', justifyContent: 'flex-end' }}>
                                    <View style={{ height: 10, width: '90%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 30, borderBottomLeftRadius: 5, backgroundColor: Colors.black }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontSize: 6 }}>Your Points</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: '68%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mooimom, borderRadius: 5 }}>
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.white, fontWeight: 'bold', fontSize: Metrics.fontSize2 }}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDeleted(parentItem.id)} style={{ width: '28%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray, borderRadius: 5 }}>
                            <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.bin} style={{ width: '100%', height: '100%' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            ))
        )
    }
}