import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../Themes'

export default class LocationItem extends Component {
  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id)

    this.props.getLatlong(res)
  }
  render() {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.root} onPress={this._handlePress}  >
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{this.props.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    width: '96%',
    alignSelf: 'center',
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.mediumGray,
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 14
  },
  textContainer: {
    marginVertical: 10,
  }
})
