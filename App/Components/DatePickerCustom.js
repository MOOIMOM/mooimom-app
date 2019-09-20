import React, { Component } from 'react'
import { View, Text, AppRegistry } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../Themes';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';

import styles from './Styles/TextInputCustomStyles';

export default class DatePickerCustom extends Component {
  constructor(props){
    super(props)
    this.state = {focous: false}
    today = new Date().toJSON().slice(0, 10);
  }

  render(){
    var widthFix = Metrics.screenWidth - 40;
    return (
      <View style={[styles.inputCustom, {height:70}]}>
        <DatePicker
          onOpenModal={() => this.setState({ focous: true })}
          onCloseModal={() => this.setState({ focous: false })}
          style={
            !this.state.focous
              ? [
                  {
                    width: widthFix, height: 50,
                    borderColor: Colors.mooimom,
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 20
                  }
                ]
              : [
                  {
                    width: widthFix, height: 50,
                    borderColor: Colors.mooimom,
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 20
                  }
                ]
          }
          date={this.props.date}
          androidMode='spinner'
          mode="date"
          placeholder={this.props.placeholder}
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              marginTop: 15
            },
            dateInput: {
              alignItems: 'flex-start',
              marginTop:15,
              borderColor: 'rgba(0,0,0,0)'
            },
            placeholderText:{
              color: 'gray',
              fontSize: 14,
              fontFamily: Fonts.type.gotham2
            },
            dateText:{
              color:'gray',
              fontSize: 14
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => this.props.onDateChange(date)}
          maxDate={today}
        />
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
DatePickerCustom.propTypes = {
  onDateChange: PropTypes.func
};

AppRegistry.registerComponent('datepicker', () => datepicker);
