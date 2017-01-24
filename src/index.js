import React, {Component, PropTypes} from 'react';
import {Stage} from 'react-pixi';
import {Point} from 'pixi.js';
import {createStore} from 'redux';
import './style.css';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';
import Bunny from './components/Bunny';
import Text from './components/Text';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

class ExplodingDots extends Component {

  static propTypes = {
    mode: PropTypes.oneOf(['display', 'add', 'subtract', 'multiply', 'divide']),
  };

  constructor(props) {
    super(props);
  };

  render() {
    const {...others} = this.props;

    let config = {
      stage: {
        width: 500,
        height: 500,
      }
    };

    let bunnyX = config.stage.width / 2;
    let bunnyY = config.stage.height / 2 - 100;

    return (
      <Provider store={store} onClick={this.handleClick}>
        <Stage width={config.stage.width} height={config.stage.height}>
          <Bunny
            x={bunnyX}
            y={bunnyY}
            anchor={new Point(0.5, 0.5)}
            key="1"
          />

          <Text text="EXPLODING BUNNIES!"
                x={config.stage.width / 2}
                y={config.stage.height / 2}
                anchor={new Point(0.5, 0.5)}
                key="2"
          />
        </Stage>
      </Provider>
    );
  }
}

export default ExplodingDots;
