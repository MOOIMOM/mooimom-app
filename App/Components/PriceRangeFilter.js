import React from 'react'
import { View, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'

import RangeSlider from 'rn-range-slider'

export default class PriceRangeFilter extends React.Component {
  state = {
    value: null,
    isSelected: false,
    showRange: false,
    rangeLow: 0,
    rangeHigh: 0
  }

  render() {
    const { options } = this.props;
    const { value, isSelected } = this.state;
    const { onSelected } = this.props;
    const { onSelected2 } = this.props;

    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
          <TouchableOpacity
            onPress={() => {
              // onSelected(isSelected)
              this.setState({ isSelected: !this.state.isSelected })
            }}
            style={{ width: 12, height: 12, borderRadius: 6, borderWidth: isSelected ? 0 : 1, borderColor: Colors.gray, backgroundColor: isSelected ? Colors.mooimom : Colors.white, marginRight: 10 }} />
          <TouchableOpacity onPress={() => {
            this.setState({ showRange: !this.state.showRange })
          }} style={{ flex: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Price</Text>
            <Image source={Images.downArrowBlack} style={{ width: 12, height: 12 }} />
          </TouchableOpacity>
        </View>
        {
          this.state.showRange &&
          <View style={{ marginTop: 20 }}>
            <RangeSlider
              style={{ width: 160, height: 80 }}
              gravity={'center'}
              min={200}
              max={1000}
              step={20}
              selectionColor="#3df"
              blankColor="#f618"
              onValueChanged={(low, high, fromUser) => {
                this.setState({ rangeLow: low, rangeHigh: high })
              }} />
          </View>
        }
      </View>

    )
  }
}