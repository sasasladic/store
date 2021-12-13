import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Contact from './pages/Contact';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { authActions } from './context/Context';

function App() {
  
  // if there is a token in localStorage, try to log in
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://api.orders.galeja.net/api/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        console.log('%cLogin successful', 'color:green');
        dispatch(authActions.login({ user: res.data.data }));
      }).catch(() => {
        console.log('%cLogin failed', 'color: red');
      })
    }
    
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/cart' component={Cart}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/products/:categorie' component={Products}></Route>
        <Route exact path='/singleProduct/:id' component={SingleProduct}></Route>
        <Route exact path='/contact' component={Contact}></Route>
      </Switch>
    </Router>
  );
}

export default App;
