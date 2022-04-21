import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App';
import IndexState from "./reducer/state/userState"

import Favicon from "./assets/icon.png";
const favicon = document.getElementById("idFavicon");
favicon.setAttribute("href", Favicon);

ReactDOM.render(
  <React.StrictMode>
    <IndexState>
      <App /> 
    </IndexState>
  </React.StrictMode>,
  document.getElementById('root')
);
