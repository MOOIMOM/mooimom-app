import React from 'react'
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'

export default class SortOption extends React.Component {
  state = {
    value: null
  }

  render() {
    const { value } = this.state;
    const { sortOptions, onSelected } = this.props;

    return (
      <>
        {
          sortOptions.map(parentItem => (
            <TouchableOpacity
              onPress={() => {
                onSelected(parentItem.value)
                this.setState({
                  value: parentItem.value
                })
              }}
              style={{
                width: '86%', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 10
              }}
            >
              <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: Colors.mediumGray, justifyContent: 'center', alignItems: 'center' }}>
                {
                  value === parentItem.value &&
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.mooimom }} />
                }
              </View>
              <Text style={{ fontFamily: Fonts.type.gotham1, marginLeft: 20 }}>{parentItem.name}</Text>
            </TouchableOpacity>
          ))
        }
      </>

    )

  }
}