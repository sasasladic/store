import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import AllProducts from './pages/AllProducts';
import SingleProduct from './pages/SingleProduct';
import Contact from './pages/Contact';


function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/cart' component={Cart}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/allProducts' component={AllProducts}></Route>
        <Route exact path='/singleProduct' component={SingleProduct}></Route>
        <Route exact path='/contact' component={Contact}></Route>
      </Switch>
    </Router>
  );
}

export default App;
