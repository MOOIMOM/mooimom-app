import React from 'react'
import { View, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'

export default class SizeFilter extends React.Component {
  state = {
    value: null,
    isSelected: false,
    showFlatList: false
  }

  render() {
    const { options } = this.props;
    const { value, isSelected } = this.state;
    const { onSelected } = this.props;
    const { onSelected2 } = this.props;

    return (
      <View style={{ alignSelf: 'center', width: '90%' }}>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
          <TouchableOpacity
            onPress={() => {
              onSelected(isSelected)
              this.setState({ isSelected: !this.state.isSelected })
            }}
            style={{ width: 12, height: 12, borderRadius: 6, borderWidth: isSelected ? 0 : 1, borderColor: Colors.gray, backgroundColor: isSelected ? Colors.mooimom : Colors.white, marginRight: 10 }} />
          <TouchableOpacity onPress={() => {
            this.setState({ showFlatList: !this.state.showFlatList })
          }} style={{ flex: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Size</Text>
            <Image source={Images.downArrowBlack} style={{ width: 12, height: 12 }} />
          </TouchableOpacity>
        </View> */}
        <Text style={{ marginBottom: 20 }}>Size</Text>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
          {
            options.map(parentItem => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onSelected2(parentItem.id)
                    this.setState({
                      value: parentItem.id
                    })
                  }}
                  style={{
                    width: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    borderWidth: value === parentItem.id ? 0 : 1,
                    borderColor: value === parentItem.id ? '' : Colors.gray,
                    backgroundColor: value === parentItem.id ? Colors.mooimom : Colors.white,
                    marginHorizontal: 10,
                    paddingVertical: 5,
                    marginBottom: 20
                  }}>
                  <Text style={{ color: value === parentItem.id ? Colors.white : Colors.black }}>{parentItem.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

    )
  }
}