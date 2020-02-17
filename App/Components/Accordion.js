import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Images, Metrics, Colors, Fonts } from '../Themes';

export default class Accordion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    }
  }

  render() {
    var img = Images.rightArrowBlack
    if (this.state.expanded)
      img = Images.down
    return (
      <View style={styles.container} >
        <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
          <Text style={[styles.title]}>{this.props.title}</Text>
          <Image source={img} style={styles.imgMenu2} />
        </TouchableOpacity>
        {
          this.state.expanded &&
          <View style={styles.child}>
            <Text style={styles.desc}>{this.props.data}</Text>
          </View>
        }
      </View>
    )
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }

}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.mediumGray,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: Colors.fire,
    fontFamily: Fonts.type.gotham4,
    fontSize: Metrics.fontSize2
  },
  child: {
    marginVertical: 10,
  },
  desc: {
    color: Colors.black,
    fontFamily: Fonts.type.gotham2,
    fontSize: Metrics.fontSize1,
    lineHeight: Metrics.fontSize2,
  },
  imgMenu2: {
    width: 15 * Metrics.screenWidth / 320,
    height: 15 * Metrics.screenWidth / 320,
  },

});
