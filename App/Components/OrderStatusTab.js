import React from 'react'
import { View, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'


export default class OrderStatusTab extends React.Component {
    state = {
        value: 'All'
    }

    render() {
        const { options, onSelected } = this.props;
        const { value } = this.state;

        return (
            options.map(parentItem => (
                <TouchableOpacity
                    // key={index}
                    onPress={() => {
                        this.setState({ value: parentItem.name })
                        onSelected(parentItem.name)
                    }}
                    style={{
                        width: Metrics.screenWidth / 4,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: value === parentItem.name ? 2 : 1,
                        borderColor: value === parentItem.name ? Colors.mooimom : Colors.mediumGray,
                        marginHorizontal: 10
                    }}
                >
                    <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.name}</Text>
                </TouchableOpacity>
            ))
        )
    }
}