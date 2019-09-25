import React, { Component, PropTypes } from "react";
import { Image } from "react-native";
import { CachedImage } from 'react-native-cached-image';
import { Images } from '../Themes'

export default class ScaledImage extends Component {
  constructor(props) {
      super(props);
      var image = Images.default
      if(this.props.uri && this.props.uri !== '')
        image = { uri: this.props.uri }
      this.state = { source: image };
  }

  componentWillMount() {
      Image.getSize(this.props.uri, (width, height) => {
          if (this.props.width && !this.props.height) {
              this.setState({
                  width: this.props.width,
                  height: height * (this.props.width / width)
              });
          } else if (!this.props.width && this.props.height) {
              this.setState({
                  width: width * (this.props.height / height),
                  height: this.props.height
              });
          } else {
              this.setState({ width: width, height: height });
          }
      });
  }

  render() {
      return (
          <CachedImage
              source={this.state.source}
              style={{ height: this.state.height, width: this.state.width }}
          />
      );
}
}
