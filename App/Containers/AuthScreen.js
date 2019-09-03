import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native'
import { Images, Colors } from '../Themes'
import { connect } from 'react-redux'
import _ from 'lodash';
// Styles
import styles from './Styles/AuthScreenStyles'

const codeLength = 4
class AuthScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codeArr: new Array(codeLength).fill(''),
      currentIndex: 0
    };

    this.codeInputRefs = [];
  }

  actNavigate (screen) {
    const { navigate } = this.props.navigation
    navigate(screen, {})
  }

  clear() {
    this.setState({
      codeArr: new Array(codeLength).fill(''),
      currentIndex: 0
    });
    this._setFocus(0);
  }

  _setFocus(index) {
    this.codeInputRefs[index].focus();
  }

  _blur(index) {
    this.codeInputRefs[index].blur();
  }

  _onFocus(index) {
    let newCodeArr = _.clone(this.state.codeArr);
    const currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this._setFocus(currentEmptyIndex);
    }
    for (const i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    }

    this.setState({
      codeArr: newCodeArr,
      currentIndex: index
    })
  }

  _onInputCode(character, index) {
    let newCodeArr = _.clone(this.state.codeArr);
    newCodeArr[index] = character;

    if (index == codeLength - 1) {
      const code = newCodeArr.join('');
      this.onFulfill(code);
      this._blur(this.state.currentIndex);
    } else {
      this._setFocus(this.state.currentIndex + 1);
    }

    this.setState(prevState => {
      return {
        codeArr: newCodeArr,
        currentIndex: prevState.currentIndex + 1
      };
    });
  }

  _onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      const { currentIndex } = this.state;
      let newCodeArr = _.clone(this.state.codeArr);
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      for (const i in newCodeArr) {
        if (i >= nextIndex) {
          newCodeArr[i] = '';
        }
      }
      this._setFocus(nextIndex);
    }
  }

  onFulfill(){
    this.actNavigate('Home')
  }

  render () {
    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      const id = i;
      codeInputs.push(
        <TextInput
          key={id}
          ref={ref => (this.codeInputRefs[id] = ref)}
          style={[
            styles.codeInput
          ]}
          underlineColorAndroid="transparent"
          selectionColor={Colors.mooimom}
          keyboardType={'name-phone-pad'}
          returnKeyType={'done'}
          onFocus={() => this._onFocus(id)}
          value={this.state.codeArr[id] ? this.state.codeArr[id].toString() : ''}
          onChangeText={text => this._onInputCode(text, id)}
          onKeyPress={(e) => this._onKeyPress(e)}
          maxLength={1}
        />
      )
    }
    return (
      <View style={styles.container}>
        <Image source={Images.mooimomLogoWhite} style={styles.title}/>
        <View style={styles.loginContainer}>
          <KeyboardAvoidingView>
            <Text style={styles.caption1}>Masukkan kode verifikasi</Text>
            <View style={styles.textInput}>
              {codeInputs}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onFulfill()}
            >
              <Text style={styles.btnText}>Verifikasi</Text>
            </TouchableOpacity>
            <View style={styles.SignUpContainer}>
              <TouchableOpacity>
                <Text style={styles.textSignIn}>Kirim ulang kode verifikasi</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen)
