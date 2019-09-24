import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, Alert, Linking } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'
import { NavigationActions, StackActions } from 'react-navigation'

// Styles
import styles from './Styles/ContactScreenStyles'

class ContactScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      whatsapp:this.props.setting.payload.whatsapp,
      line:this.props.setting.payload.line,
      mail:this.props.setting.payload.email,
      instagram:this.props.setting.payload.instagram,
      phone:this.props.setting.payload.telephone
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  doContact(contact){
    if(contact === 'whatsapp'){
      const url = `whatsapp://send?phone=${this.state.whatsapp}`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url);
          } else {
              Alert.alert(
                  'Sorry',
                  'WhatsApp is not installed on your phone',
              )
          }
      });
    } else if(contact === 'line'){
      const url = `line://ti/p/~${this.state.line}`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url);
          } else {
              Alert.alert(
                  'Sorry',
                  'Line is not installed on your phone',
              )
          }
      });
    } else if(contact === 'mail'){
      const url = `mailto:${this.state.mail}`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url);
          } else {
              Alert.alert(
                  'Sorry',
                  'Email is not installed on your phone',
              )
          }
      });
    } else if(contact === 'instagram'){
      const url = `instagram://user?username=${this.state.instagram}`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url);
          } else {
              Alert.alert(
                  'Sorry',
                  'Instagram is not installed on your phone',
              )
          }
      });
    } else if(contact === 'phone'){
      const url = `tel:${this.state.phone}`;
      Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url);
          } else {
              Alert.alert(
                  'Sorry',
                  'Phone Call is not installed on your phone',
              )
          }
      });
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.props.navigation.goBack()}>
              <Image source={Images.back} style={styles.imgHeader} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.containerMenu}>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.doContact('whatsapp')}>
                  <View style={styles.leftContainerMenu}>
                    <Image source={Images.wa} style={styles.imgMenu}/>
                    <View style={styles.contactContainer}>
                      <Text style={styles.imgText}>Whatsapp</Text>
                      <Text style={styles.imgText2}>+{this.state.whatsapp}</Text>
                    </View>
                  </View>
                  <Image source={Images.rightArrowBlack} style={styles.imgMenu2}/>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.doContact('line')}>
                  <View style={styles.leftContainerMenu}>
                    <Image source={Images.line} style={styles.imgMenu}/>
                    <View style={styles.contactContainer}>
                      <Text style={styles.imgText}>Line</Text>
                      <Text style={styles.imgText2}>{this.state.line}</Text>
                    </View>
                  </View>
                  <Image source={Images.rightArrowBlack} style={styles.imgMenu2}/>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.doContact('mail')}>
                  <View style={styles.leftContainerMenu}>
                    <Image source={Images.mail} style={styles.imgMenu}/>
                    <View style={styles.contactContainer}>
                      <Text style={styles.imgText}>Email</Text>
                      <Text style={styles.imgText2}>{this.state.mail}</Text>
                    </View>
                  </View>
                  <Image source={Images.rightArrowBlack} style={styles.imgMenu2}/>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.doContact('instagram')}>
                  <View style={styles.leftContainerMenu}>
                    <Image source={Images.ig2} style={styles.imgMenu}/>
                    <View style={styles.contactContainer}>
                      <Text style={styles.imgText}>Instagram</Text>
                      <Text style={styles.imgText2}>{this.state.instagram}</Text>
                    </View>
                  </View>
                  <Image source={Images.rightArrowBlack} style={styles.imgMenu2}/>
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => this.doContact('phone')}>
                  <View style={styles.leftContainerMenu}>
                    <Image source={Images.phone} style={styles.imgMenu}/>
                    <View style={styles.contactContainer}>
                      <Text style={styles.imgText}>Telepon</Text>
                      <Text style={styles.imgText2}>{this.state.phone}</Text>
                    </View>
                  </View>
                  <Image source={Images.rightArrowBlack} style={styles.imgMenu2}/>
                </TouchableOpacity>
              </View>
              <View style={styles.menuBottom}>
                <Text style={styles.imgText3}>OPERATIONAL TIME</Text>
                <Text style={styles.imgText2}>Monday - Friday</Text>
                <Text style={styles.imgText2}>9.30 - 17.30</Text>
              </View>
            </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    setting: state.setting
  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactScreen)
