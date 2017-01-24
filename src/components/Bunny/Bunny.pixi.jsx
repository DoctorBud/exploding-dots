import React, {Component} from 'react';
import {Sprite} from 'react-pixi';
import bunny from './bunny.png';

class Bunny extends Component {
  render () {
    const {x, y, ...others} = this.props;

    return (
      <Sprite image={bunny} x={x} y={y} {...others} />
    );
  }
}

export default Bunny;
