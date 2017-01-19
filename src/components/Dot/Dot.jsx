import React from 'react';

const DotStyles = {
};

const Dot = ({ style = {} }) => (
  <div style={{ ...DotStyles, ...style }} />
);

Dot.propTypes = {
  style: React.PropTypes.object,
  value: React.PropTypes.number,
  negative: React.PropTypes.bool,
  disable: React.PropTypes.bool,
  group: React.PropTypes.bool,
  position: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
};

Dot.defaultProps = {
  negative: false,
  disable: false,
  group: false,
  position: {
    x: 0,
    y: 0
  }
};

export default Dot;
