import React from 'react'
import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'


export default class NewProductDescriptions extends React.Component {
    state = {
        isSelected: false,
    }

    render() {
        const { productDescriptions } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    this.setState({
                        isSelected: !this.state.isSelected,
                    })
                }}
                style={{ width: '100%', borderBottomWidth: 1, borderColor: Colors.mediumGray, paddingBottom: 20 }}
            >
                <View style={{ width: '100%', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={{ fontFamily: Fonts.type.gotham4, fontSize: 14, color: Colors.black, marginBottom: this.state.isSelected ? 10 : 0 }}>{productDescriptions.title}</Text>
                    <Image source={Images.down} style={{ width: 12, height: 12, transform: [{ rotate: this.state.isSelected ? '180deg' : '0deg' }] }} />
                </View>
                {this.state.isSelected &&
                    <View style={{ width: '100%', paddingRight: 10 }}>
                        {typeof (productDescriptions.descriptionText) === 'object' ?
                            <>
                                {
                                    productDescriptions.descriptionText.map((subParentItem, index) => (
                                        <View style={{ width: '100%', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: Metrics.fontSize1, marginRight: 20 }}>●</Text>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{subParentItem}</Text>
                                        </View>
                                    ))
                                }
                            </>
                            :
                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{productDescriptions.descriptionText}</Text>
                        }
                    </View>
                }
            </TouchableOpacity>

        )
    }
}