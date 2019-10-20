import React, { Component } from 'react'
import { View, Text, Picker, Image , Platform} from 'react-native'
import { Colors, Metrics, Fonts, Images } from '../Themes';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select'
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
    return <Picker.Item key={0} label={this.props.label0} value={''} color={Colors.gray} style={{paddingLeft: 10}}/>
  }

  render(){
    var widthFix = Metrics.screenWidth - 40;
    if (this.props.width) {
      widthFix = this.props.width;
    }
    if(Platform.OS === 'ios'){
      var data = []
      var defObj = {}
      if(this.props.isBank){
        this.props.data.map((item) => {
          data.push({key:item.bank_slug, label:item.bank_name,value:item.bank_slug, color:Colors.black})
        })
      } else {
        var arr = [...this.props.data]
        for(var i = 0;i < arr.length; i++){
          if(arr[i].id == this.state.selectedValue && this.state.selectedLabel !== ''){
            arr.splice(i, 1)
          }
        }
        arr.map((item) => {
          data.push({key:item.id, label:item.name, value:item.id, color:Colors.gray})
        })
      }
      if(this.state.selectedLabel !== ''){
        defObj = {key:0, label:this.state.selectedLabel, value:this.state.selectedValue, color:Colors.gray}
      } else {
        defObj = {key:0, label:this.props.label0, value:'', color:Colors.black}
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
          <RNPickerSelect
          placeholder={defObj}
          items={data}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              selectedValue: itemValue,
              selectedLabel: '',
            })
          }}
          value={this.state.selectedValue}
          onDonePress={() => this.props.onValueChange(this.state.selectedValue)}
          textInputProps={styles.placeholderIOS }
          style={{placeholder:styles.placeholderIOS}}/>
          </View>
          <View style={styles.inputLabelWrapper}>
          <View style={styles.inputLabelContainer}>
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
        </View>
      )
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
          }}
          itemStyle={{fontSize: 14, fontFamily: Fonts.type.gotham3, paddingLeft: 10, color:Colors.black}}
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
        <View style={styles.inputLabelContainer}>
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
      </View>
    )
  }
}
PickerCustom.propTypes = {
  onValueChange: PropTypes.func
};
