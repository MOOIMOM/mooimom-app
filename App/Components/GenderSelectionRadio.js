import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Images, Metrics, Colors, Fonts } from '../Themes'
import FastImage from 'react-native-fast-image'

export default class GenderSelectionRadio extends Component {
  state = {
    value: null,
  };

  render() {
    const { options } = this.props;
    const { onSelected } = this.props;
    const { value } = this.state;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%', justifyContent: 'space-between', alignSelf: 'center', marginTop: 40 }}>
        {options.map(item => {
          return (
            <View key={item.value}>
              <FastImage
                source={item.icon}
                style={{ width: 70, height: 70, marginBottom: 20 }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={{ flexDirection: 'row', aligniItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={[styles.circle, { borderColor: item.value === 'female' ? '#FF8DB5' : Colors.blueMooimom, marginRight: 10 }]}
                  onPress={() => {
                    onSelected(item.value)
                    this.setState({
                      value: item.value,
                    });
                  }}
                >
                  {value === item.value && <View style={[styles.checkedCircle, { backgroundColor: item.value === 'female' ? '#FF8DB5' : Colors.blueMooimom }]} />}
                </TouchableOpacity>
                <Text style={{ fontFamily: Fonts.type.gotham1, color: item.value === 'female' ? '#FF8DB5' : Colors.blueMooimom }}>{item.label}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  circle: {
    height: 14,
    width: 14,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2
  }
});
