import React from 'react';
import Dot from '../Dot';

const DotsContainerStyles = {
};

const DotsContainer = ({ style = {} }) => (
  <div style={{ ...DotsContainerStyles, ...style }} >
    <Dot/>
    <Dot/>
    <Dot/>
    <Dot/>
  </div>
);

DotsContainer.propTypes = {
  style: React.PropTypes.object,
  index: React.PropTypes.number,
  base: React.PropTypes.number,
  value: React.PropTypes.number,
  onDotsUpdated: React.PropTypes.func
};

export default DotsContainer;
