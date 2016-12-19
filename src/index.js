import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import './index.css';
import './font-awesome.min.css';
import logo from './scolab.png';
import bg from './Netmaths_photo_classe_05_low.jpg';
import boum from './boum-logo.png';
import {DOTS} from './constants/DotsConstants'

ReactDOM.render(
  <App logo={logo} boum={boum} mode={DOTS.SUBTRACT} startingValue={[1,2,3,4]} base='10'/>,
  document.getElementById('boum')
);
ReactDOM.render(
  <Home bg={bg} logo={logo} boum={boum} />,
  document.getElementById('landing')
);
