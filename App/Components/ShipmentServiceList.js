import React from 'react'
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'

export default class ShipmentServiceList extends React.Component {
    state = {
        value: null
    }

    render() {
        const { value } = this.state;
        const { options, onSelected } = this.props;

        return (
            <>
                {
                    options.map(parentItem => (
                        <TouchableOpacity
                            onPress={() => {
                                onSelected(parentItem.id)
                                this.setState({
                                    value: parentItem.id
                                })
                            }}
                            style={{
                                width: '100%',
                                height: 40,
                                borderRadius: 20,
                                borderWidth: value === parentItem.id ? 2 : 1,
                                borderColor: value === parentItem.id ? Colors.mooimom : Colors.mediumGray,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                                paddingHorizontal: 10,
                                justifyContent: 'space-between'
                            }}
                        >
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ fontFamily: value === parentItem.id ? Fonts.type.gotham4 : Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.name}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.arrival}</Text>
                                </View>
                            </View>
                            <View style={{ width: '50%', alignItems: 'flex-end' }}>
                                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize1 }}>Rp{parentItem.price}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </>

        )

    }
}