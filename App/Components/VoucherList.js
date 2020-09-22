import React from 'react'
import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'


export default class VoucherList extends React.Component {
    state = {
        value: null,
    }

    render() {
        const { options } = this.props;
        const { value } = this.state;
        const { onSelected } = this.props;

        return (
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                    {
                        options.map(parentItem => (
                            <TouchableOpacity
                                // key={parentItem.index}
                                onPress={() => {
                                    onSelected(parentItem.id)
                                    this.setState({
                                        value: parentItem.id,
                                    })
                                }}
                                style={{
                                    width: Metrics.screenWidth / 2.4,
                                    height: (Metrics.screenWidth / 2.4) - 60,
                                    borderRadius: 20,
                                    backgroundColor: Colors.white,
                                    borderColor: value === parentItem.id ? Colors.mooimom : Colors.gray,
                                    borderWidth: value === parentItem.id ? 3 : 1,
                                    marginHorizontal: 5,
                                    marginBottom: 10,
                                    justifyContent: 'center',
                                }} >
                                <View style={{ width: '100%', height: '70%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: parentItem.bannerColor, borderTopLeftRadius: value === parentItem.id ? 16 : 18, borderTopRightRadius: value === parentItem.id ? 16 : 18 }}>
                                    <View style={{ opacity: .3 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize3, fontWeight: 'bold' }}>FREE</Text>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize3, fontWeight: 'bold' }}>ONGKIR</Text>
                                    </View>
                                    <View style={{ opacity: .3 }}>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize6, fontWeight: 'bold' }}>{parentItem.amount}<Text style={{ fontSize: Metrics.fontSize2 }}>rb</Text></Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: value === parentItem.id ? Colors.mooimom : Colors.white, borderWidth: value === parentItem.id ? 0 : 1, borderColor: Colors.gray }} />
                                    <View>
                                        <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: 8 }}>Valid Until</Text>
                                        {
                                            parentItem.expiredDate !== '' ?
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: 8 }}>{parentItem.expiredDate}</Text>
                                                :
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: 8 }}>-</Text>
                                        }
                                    </View>
                                    <View style={{ width: 1, backgroundColor: Colors.mediumGray, height: '70%' }} />
                                    {
                                        parentItem.minOrder !== 0 ?
                                            <View>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: 8 }}>Min Order</Text>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: 8 }}>{parentItem.minOrder}</Text>
                                            </View>
                                            :
                                            <View>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: 8 }}>No min</Text>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: 8 }}>Transaction</Text>
                                            </View>
                                    }
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View >

        )
    }
}