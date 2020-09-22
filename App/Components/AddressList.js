import React from 'react'
import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'


export default class AddressList extends React.Component {
    state = {
        value: null,
    }

    render() {
        const { options, onSelected, version } = this.props;
        const { value } = this.state;

        if (version === 'first') {
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
                                        width: '100%',
                                        height: Metrics.screenWidth / 2.8,
                                        borderRadius: 20,
                                        backgroundColor: Colors.white,
                                        borderColor: value === parentItem.id ? Colors.mooimom : Colors.mediumGray,
                                        borderWidth: value === parentItem.id ? 2 : 1,
                                        marginBottom: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.27,
                                        shadowRadius: 4.65,

                                        elevation: 6
                                    }} >
                                    <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ width: 20, height: 20, borderRadius: 20 / 2, borderWidth: 2, borderColor: value === parentItem.id ? Colors.mooimom : Colors.mediumGray, justifyContent: 'center', alignItems: 'center' }} >
                                            {value === parentItem.id && <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.mooimom }} />}
                                        </View>
                                    </View>
                                    <View style={{ width: '85%', height: '100%', justifyContent: 'space-around' }}>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>{parentItem.name}</Text>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.phone}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={Images.edit} style={{ width: '100%', height: '100%' }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                                                    <Image source={Images.delete} style={{ width: '100%', height: '100%' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{ width: '70%', paddingRight: 10 }}>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.address}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View >
            )
        }
        else if (version === 'second') {
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
                                        width: '100%',
                                        height: Metrics.screenWidth / 2.8,
                                        borderRadius: 20,
                                        backgroundColor: value === parentItem.id ? Colors.mooimom : Colors.white,
                                        borderColor: value === parentItem.id ? Colors.mooimom : Colors.mediumGray,
                                        borderWidth: 1,
                                        marginBottom: 10,
                                        justifyContent: 'center',
                                    }} >
                                    {/* <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ width: 20, height: 20, borderRadius: 20 / 2, borderWidth: 2, borderColor: value === parentItem.id ? Colors.mooimom : Colors.mediumGray, justifyContent: 'center', alignItems: 'center' }} >
                                            {value === parentItem.id && <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.mooimom }} />}
                                        </View>
                                    </View> */}
                                    <View style={{ width: '90%', height: '100%', alignSelf: 'center', justifyContent: 'center' }}>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: value === parentItem.id ? Colors.white : Colors.black, fontSize: Metrics.fontSize1, fontWeight: 'bold' }}>{parentItem.name}</Text>
                                                <Text style={{ fontFamily: Fonts.type.gotham2, color: value === parentItem.id ? Colors.white : Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.phone}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={Images.edit} style={{ width: '100%', height: '100%' }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                                    <Image source={Images.delete} style={{ width: '100%', height: '100%' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{ width: '70%', paddingRight: 10 }}>
                                            <Text style={{ fontFamily: Fonts.type.gotham2, color: value === parentItem.id ? Colors.white : Colors.black, fontSize: Metrics.fontSize1 }}>{parentItem.address}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View >

            )
        }
    }
}