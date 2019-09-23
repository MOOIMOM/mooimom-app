import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  ListView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { Images, Metrics, Colors } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TextInputCustomStyles';

export default class TextInputCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focous: false
      //   value: this.props.value
    };
  }

  render() {
    var labelPhone;
    if (this.props.isPhone) {
      labelPhone = <Text style={styles.labelPhone}>+62</Text>;
    }

    var widthFix = Metrics.screenWidth - 40;
    if (this.props.width) {
      widthFix = this.props.width;
    }

    var height=70
    var heightText = 50
    if(this.props.multiline){
      heightText = (60 / 1.5 * this.props.numberOfLines)
      height = heightText + 20
    }

    return (
      <View style={[styles.inputCustom, {height:height}]}>
        <TextInput
          onFocus={() => this.setState({ focous: true })}
          onBlur={() => this.setState({ focous: false })}
          placeholderTextColor={!this.state.focous ? Colors.black : this.props.color}
          placeholder={
            this.props.isRP
              ? ''
              : this.props.placeholder
              ? this.props.placeholder
              : ''
          }
          style={
            !this.state.focous
              ? [
                  styles.inputText,
                  {
                    textAlign: this.props.textAlign,
                    textAlignVertical: this.props.textAlignVertical,
                    paddingLeft: this.props.isPhone ? 50 : 20,
                    width: widthFix,
                    height: heightText
                  }
                ]
              : [
                  styles.inputText,
                  {
                    color: this.props.color,
                    borderColor: this.props.color,
                    textAlign: this.props.textAlign,
                    textAlignVertical: this.props.textAlignVertical,
                    paddingLeft: this.props.isPhone ? 50 : 20,
                    width: widthFix,
                    height: heightText
                  }
                ]
          }
          value={this.props.value}
          editable={this.props.editable}
          onChangeText={val => this.props.onChangeText(val)}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          maxLength={this.props.maxLength}
          autoCapitalize = {this.props.autoCapitalize}
          multiline = {this.props.multiline}
          numberOfLines = {this.props.numberOfLines}
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
        {labelPhone}
      </View>
    );
  }
}

TextInputCustom.propTypes = {
  placeholder: PropTypes.string,
  color: PropTypes.string,
  isGray: PropTypes.bool,
  editable: PropTypes.bool,
  isRP: PropTypes.bool,
  label: PropTypes.string,
  textAlign: PropTypes.string,
  textAlignVertical: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number,
  width: PropTypes.number,
  autoCapitalize: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number
};
