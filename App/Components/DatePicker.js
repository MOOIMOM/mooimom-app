import React, { Component } from 'react'
import { View, Text, AppRegistry } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../Themes';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types'

import styles from './Styles/TextInputCustomStyles';

export default class DatePickerCustom extends Component {
  constructor(props) {
    super(props)
    this.state = { focous: false }
    today = new Date().toJSON().slice(0, 10);
  }

  render() {
    var widthFix = Metrics.screenWidth - 80;
    return (
      <View>
        <DatePicker
          onOpenModal={() => this.setState({ focous: true })}
          onCloseModal={() => this.setState({ focous: false })}
          style={
            !this.state.focous
              ? [
                {
                  width: widthFix, height: 20,
                }
              ]
              : [
                {
                  width: widthFix, height: 20,
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
          showIcon={false}
          customStyles={{
            dateInput: {
              alignItems: 'flex-start',
              borderColor: 'rgba(0,0,0,0)'
            },
            placeholderText: {
              color: Colors.mediumGray,
              fontSize: 14,
              fontFamily: Fonts.type.gotham2
            },
            dateText: {
              color: Colors.black,
              fontSize: 14,
              fontFamily: Fonts.type.gotham2
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => this.props.onDateChange(date)}
          maxDate={today}
        />
      </View>
    )
  }
}
DatePickerCustom.propTypes = {
  onDateChange: PropTypes.func
};

AppRegistry.registerComponent('datepicker', () => datepicker);
