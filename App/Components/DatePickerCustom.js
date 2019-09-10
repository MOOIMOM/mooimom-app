import React, { Component } from 'react'
import { View, Text, AppRegistry } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../Themes';
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
      <View style={[styles.inputCustom, {height:80}]}>
        <DatePicker
          onOpenModal={() => this.setState({ focous: true })}
          onCloseModal={() => this.setState({ focous: false })}
          style={
            !this.state.focous
              ? [
                  styles.inputText,
                  {
                    width: widthFix, height: 60,
                    backgroundColor: 'rgba(230,230,230,0.5)',
                    borderColor: 'gray',
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 20
                  }
                ]
              : [
                  styles.inputText,
                  {
                    width: widthFix, height: 60,
                    backgroundColor: 'rgba(230,230,230,0.5)',
                    borderColor: this.props.color,
                    borderWidth: 2,
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
              fontSize: 18
            },
            dateText:{
              color:'gray',
              fontSize: 18
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => this.props.onDateChange(date)}
          maxDate={today}
        />
        <View style={styles.inputLabelWrapper}>
          <Text
            style={
              !this.state.focous
                ? styles.inputLabel
                : [
                    styles.inputLabel,
                    { color: 'white', backgroundColor: this.props.color }
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
