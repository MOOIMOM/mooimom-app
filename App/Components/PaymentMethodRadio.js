import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native';
import { Images, Metrics, Colors, Fonts } from '../Themes'
import FastImage from 'react-native-fast-image'

export default class PaymentMethodRadio extends Component {
  state = {
    value: null,
  };

  render() {
    const { options } = this.props;
    const { onSelected } = this.props;
    const { value } = this.state;
    const { hideCircle } = this.props;
    const { otherMethodSelected } = this.props;
    const { otherMethod } = this.props;

    return (
      <View>
        {options.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelected(item.value)
                this.setState({
                  value: item.value,
                });
              }}
              style={{
                width: '98%',
                alignSelf: 'center',
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingLeft: 20,
                paddingVertical: 5,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: value === item.value ? 2 : 0,
                borderColor: value === item.value ? Colors.mooimom : '',
                backgroundColor: Colors.white,
                shadowColor: '#CCCCCC',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.7,
                shadowRadius: 4,
                elevation: 2
              }}
            >
              <View style={{ width: '20%', alignItems: 'center' }}>
                <FastImage
                  source={item.icon}
                  style={{ width: item.value === 'ovo' ? 40 : 60, height: 40 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              {
                hideCircle ?
                  <View />
                  :
                  <View
                    style={[styles.circle, { borderColor: Colors.blueMooimom, marginRight: 10 }]}
                  >
                    {value === item.value && <View style={[styles.checkedCircle, { backgroundColor: Colors.blueMooimom }]} />}
                  </View>
              }
            </TouchableOpacity>
          )
        })}
        <TouchableOpacity
          onPress={() => {
            onSelected('other')
            this.setState({
              value: 'other',
            });
          }}
          style={{
            width: '98%',
            alignSelf: 'center',
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingLeft: 20,
            paddingVertical: 5,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: value === 'other' ? 2 : 0,
            borderColor: value === 'other' ? Colors.mooimom : '',
            backgroundColor: Colors.white,
            shadowColor: '#CCCCCC',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.7,
            shadowRadius: 4,
            elevation: 2
          }}
        >

          {
            otherMethodSelected ?
              <View style={{ width: '50%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                <View style={{ width: '20%', alignItems: 'center' }}>
                  <FastImage
                    source={otherMethod ? otherMethod.icon : ''}
                    style={{ width: 60, height: 40 }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginVertical: 10 }}>{otherMethod ? otherMethod.label : ""}</Text>
              </View>
              :
              <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginVertical: 10 }}>Metode lainnya..</Text>
          }
          {
            hideCircle ?
              <View />
              :
              <View
                style={[styles.circle, { borderColor: Colors.blueMooimom, marginRight: 10 }]}
              >
                {value === 'other' && <View style={[styles.checkedCircle, { backgroundColor: Colors.blueMooimom }]} />}
              </View>
          }
        </TouchableOpacity>
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
    height: 18,
    width: 18,
    borderRadius: 18 / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2
  }
});
