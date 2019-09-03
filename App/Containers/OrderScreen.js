import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/OrderScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

class OrderScreen extends Component {
  static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.order2 : Images.order)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <Image source={Images.homeBG} style={styles.backgroundImage} />
          <Text>This is Order Screen</Text>
          </ScrollView>
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
)(OrderScreen)
