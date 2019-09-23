import React, { Component } from 'react'
import { View, Text, Picker, Image } from 'react-native'
import { Colors, Metrics, Fonts, Images } from '../Themes';
import PropTypes from 'prop-types';

import styles from './Styles/TextInputCustomStyles';

export default class PickerCustom extends Component {
  constructor(props){
    super(props)
  }

  _renderPicker(){
    if(!this.props.data) return <View/>
    return this.props.data.map((item) =>{
      return <Picker.Item key={item.label} label={item.label} value={item.value} color={'gray'}/>
    })
  }

  render(){
    var widthFix = Metrics.screenWidth - 40;
    if (this.props.width) {
      widthFix = this.props.width;
    }

    return (
      <View style={[styles.inputCustom, {height:70}]}>
        <View style={{
          width: widthFix, height: 50,
          borderColor: Colors.mooimom,
          borderWidth: 0.5,
          borderRadius: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}>
        <Picker
          mode="dropdown"
          selectedValue={this.props.selectedValue}
          style={{
            width: widthFix - 20, height: 50,
            backgroundColor: 'rgba(0,0,0,0)'
          }}
          itemStyle={{fontSize: 18, fontFamily: Fonts.type.gotham2}}
          onValueChange={(itemValue, itemIndex) => {
            this.props.onValueChange(itemValue, itemIndex)
          }}>
          {this._renderPicker()}
          </Picker>
          <Image source={Images.down} style={{position:'absolute', width:10, height:10, resizeMode: 'contain', top:20, right:20}}/>
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text
            style={
              [
                styles.inputLabel,
                { color: 'white', backgroundColor: Colors.mooimom }
              ]
            }
          >
            {this.props.label ? this.props.label : 'Label'}
          </Text>
        </View>
      </View>
    )
  }
}
PickerCustom.propTypes = {
  onValueChange: PropTypes.func
};
