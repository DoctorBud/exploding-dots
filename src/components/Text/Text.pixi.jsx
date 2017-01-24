import React, {Component} from 'react';
import {Text} from 'react-pixi';

class Bunny extends Component {
  render () {
    const {text, x, y, ...others} = this.props;

    return (
      <Text text={text} x={x} y={y} {...others} />
    );
  }
}

export default Bunny;
