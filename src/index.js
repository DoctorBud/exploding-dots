import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import Bookpage from './Bookpage';
import './index.css';
import './font-awesome.min.css';
import logo from './scolab.png';
import bg from './Netmaths_photo_classe_05_low.jpg';
import boum from './boum-logo.png';
import { Router, Route, hashHistory } from 'react-router';
/*

ReactDOM.render(
  <App logo={logo} boum={boum} />,
  document.getElementById('boum')
);
ReactDOM.render(
  <Home bg={bg} logo={logo} boum={boum} />,
  document.getElementById('landing')
);
*/


ReactDOM.render((
  <Router>
    <Route path="/home" component={Home} logo={logo} boum={boum}  />
    <Route path="/app" component={App} logo={logo} boum={boum}  />
    <Route path="/page1" component={Bookpage}  />
  </Router>
), document.getElementById('landing'));
