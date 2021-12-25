import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './allProducts.css';
import './cart.css'
import App from './App';
import { Provider } from 'react-redux'
import store from './context/Context.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));