import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {isCheck: false};
  }

  checkClicked = async () => {
    await this.setState(prevState => ({
      isCheck: !prevState.isCheck,
    })); // setState is async function.

    // Call function type prop with return values.
    this.props.clicked && this.props.clicked(this.state.isCheck);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.checkClicked} style={this.props.style}>
        <View style={{
          height: 24,
          width: 24,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            height: 12,
            width: 12,
            backgroundColor: this.state.isCheck ? '#000' : '#FFF',
          }} />
        </View>
      </TouchableOpacity>
    )
  }
}
