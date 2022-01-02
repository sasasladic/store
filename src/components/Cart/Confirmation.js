import { Alert, Button, CircularProgress, AlertTitle } from "@mui/material";
import axios from "axios";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";

const Confirmation = ({ address }) => {

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState('');
  const cart = useSelector(state => state.cart.cartData);
  const user = useSelector(state => state.auth.user);
  const keys = Object.keys(cart);

  const products = [];
  let totalPrice = 0;
  keys.forEach(key => {
    totalPrice += cart[key].price * cart[key].count;
    products.push({product_variant_id: Number(key), quantity: cart[key].count});
  })


  const confirmHandler = () => {

    const header = {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }
    const data = {address: address, orders: products};
    setLoading(true);
    axios.post('https://api.orders.galeja.net/api/order', data, header).then(res => {
      console.log(res);
      setState('success');
      setLoading(false)
    }).catch(err => {
      setState(err.response.data.message);
      setLoading(false)
    })
  }

  return <div className="confirmation">
    {state === 'success' ? 
      <Alert severity='success'>
        <AlertTitle><b>Success</b></AlertTitle>
        Your order has been confirmed!</Alert>
    : <Fragment>
      {loading ? <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}><CircularProgress></CircularProgress></div> :
      <h2>Total price: {totalPrice} €</h2>}
      <Button onClick={confirmHandler} disabled={loading} variant="contained" color='success' size="big">Confirm purchase</Button>
      {state ?
        <Alert severity="error" style={{marginTop: 20}}>
          <AlertTitle><b>Error</b></AlertTitle>
          {state}
        </Alert>
      : null}  
    </Fragment>}
  </div>
}

export default Confirmation;