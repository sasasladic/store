import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/allProducts.css';
import './css/cart.css'
import 'react-toastify/dist/ReactToastify.css';
import './css/contact.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './context/Context.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));