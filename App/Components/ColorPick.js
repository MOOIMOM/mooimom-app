import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'


export default class ColorPick extends React.Component {
  state = {
    value: null
  }

  render() {
    const { options } = this.props;
    const { onSelected } = this.props;
    const { value } = this.state;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {
          options.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onSelected(item.id)
                  this.setState({
                    value: item.id,
                  });
                }}
                style={{
                  width: Metrics.screenWidth / 10,
                  height: Metrics.screenWidth / 10,
                  backgroundColor: Colors.mediumGray,
                  marginRight: 10,
                  borderWidth: value === item.id ? 2 : 0,
                  borderColor: value === item.id ? Colors.mooimom : ''
                }} />
            )
          })
        }
      </View>
    )
  }
}