import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';

export default class Ball extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const minSize = Math.min(width, height);
    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color || "orange",
          borderWidth: 2,
          borderRadius: minSize / 2,
          borderColor: 'black'
        }} />
    );
  }
}

Ball.propTypes = {
  size: array,
  body: object,
  color: string
}