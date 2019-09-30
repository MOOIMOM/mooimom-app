import React, { Component } from 'react'
import { View, Text, Picker, Image } from 'react-native'
import { Colors, Metrics, Fonts, Images } from '../Themes';
import PropTypes from 'prop-types';

import styles from './Styles/TextInputCustomStyles';

export default class PickerCustom extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedValue: this.props.selectedValue ? this.props.selectedValue : '',
      selectedLabel: this.props.selectedLabel ? this.props.selectedLabel : ''
    }
  }

  _renderPicker(){
    if(this.props.isBank){
      return this.props.data.map((item) => {
        return <Picker.Item key={item.bank_slug} label={item.bank_name} value={item.bank_slug} color={Colors.black}/>
      })
    } else {
      var arr = [...this.props.data]
      for(var i = 0;i < arr.length; i++){
        if(arr[i].id == this.state.selectedValue && this.state.selectedLabel !== ''){
          arr.splice(i, 1)
        }
      }
      return arr.map((item) => {
        return <Picker.Item key={item.id} label={item.name} value={item.id} color={Colors.black}/>
      })
    }
  }
  _renderDefault(){
    if(this.state.selectedLabel !== ''){
      return <Picker.Item key={0} label={this.state.selectedLabel} value={this.state.selectedValue} color={Colors.black}/>
    }
    return <Picker.Item key={0} label={this.props.label0} value={''} color={Colors.black}/>
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
            backgroundColor: 'rgba(0,0,0,0)',
            alignItems: 'center',
            justifyContent:'center',
          }}
          itemStyle={{fontSize: 14, fontFamily: Fonts.type.gotham3}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              selectedValue: '',
              selectedLabel: ''
            })
            this.props.onValueChange(itemValue, itemIndex)
          }}>
          {this._renderDefault()}
          {this._renderPicker()}
          </Picker>
          <Image source={Images.down} style={{position:'absolute', width:10 * Metrics.screenWidth / 320, height:10 * Metrics.screenWidth / 320, resizeMode: 'contain', top:20, right:20}}/>
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
