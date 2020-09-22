import React from 'react'
import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'


export default class SizePick extends React.Component {
  state = {
    value: null,
  }

  render() {
    const { options } = this.props;
    const { value } = this.state;
    const { onSelected } = this.props;

    return (
      <View style={{ width: '90%' }}>
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
                  width: Metrics.screenWidth / 6,
                  height: (Metrics.screenWidth / 6) - 40,
                  borderRadius: (Metrics.screenWidth / 6) / 2,
                  backgroundColor: value === parentItem.id ? Colors.mooimom : Colors.white,
                  borderColor: value === parentItem.id ? '' : Colors.gray,
                  borderWidth: value === parentItem.id ? 0 : 1,
                  marginRight: 10,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} >
                <Text style={{
                  fontFamily: value === parentItem.id ? Fonts.gotham4 : Fonts.gotham1,
                  color: value === parentItem.id ? Colors.white : Colors.black,
                  fontSize: 14
                }}>{parentItem.name}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>

    )
  }
}