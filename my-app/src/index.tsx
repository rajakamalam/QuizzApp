import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import storeFactory from './Redux/Store'

//Storefactory is a function now, and needs to be executed
const reduxStore = storeFactory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
