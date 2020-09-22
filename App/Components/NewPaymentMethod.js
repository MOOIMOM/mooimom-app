import React from 'react'
import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'


export default class NewPaymentMethod extends React.Component {
    state = {
        value: null,
    }

    render() {
        const { options } = this.props;
        const { value } = this.state;
        const { onSelected } = this.props;

        return (
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
                        width: '90%',
                        alignSelf: 'center',
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: Colors.white,
                        borderColor: value === parentItem.id ? Colors.mooimom : Colors.mediumGray,
                        borderWidth: value === parentItem.id ? 2 : 1,
                        marginBottom: 10,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }} >
                    <View style={{ width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: value === parentItem.id ? 2 : 1, borderColor: value === parentItem.id ? Colors.mooimom : Colors.mediumGray, marginRight: 20 }}>
                        {value === parentItem.id &&
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.mooimom }} />
                        }
                    </View>
                    <View>
                        {
                            parentItem.name !== '' ?
                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.name}</Text>
                                :
                                <View style={{ width: '30%', height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray }}>
                                </View>
                        }
                    </View>
                </TouchableOpacity>
            ))
        )
    }

}