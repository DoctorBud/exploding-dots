import React, { Component, PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import DotsContainer from './components/DotsContainer';

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
    mode: PropTypes.oneOf(['display', 'add', 'subtract', 'multiply', 'divide'])
  };

  render() {
    const { ...others } = this.props;

    return (
      <Provider store={store}>
        <div>
          TODO
          <DotsContainer/>
          <DotsContainer/>
          <DotsContainer/>
          <DotsContainer/>
          <DotsContainer/>
        </div>
      </Provider>
    );
  }
}

export default ExplodingDots;

