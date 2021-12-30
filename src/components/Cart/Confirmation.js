import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Confirmation = ({ address }) => {

  const [loading, setLoading] = useState(false);
  const cart = useSelector(state => state.cart.cartData);

  let totalPrice = 0;
  const keys = Object.keys(cart);
  keys.forEach(key => {
    totalPrice += cart[key].price * cart[key].count;
  })

  const confirmHandler = () => {

    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    //todo add axios with order

    setLoading(true);
    axios.post('https://api.orders.galeja.net/api/order', header, data)
  }

  return <div className="confirmation">
    {loading ? <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}><CircularProgress></CircularProgress></div> : 
    <h2>Total price: {totalPrice} </h2>}
    <Button onClick={confirmHandler} disabled={loading} variant="contained" color='success' size="big">Confirm purchase</Button>
  </div>
}

export default Confirmation;