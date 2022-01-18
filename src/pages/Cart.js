import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import CartComponent from "../components/Cart/CartComponent"
import { useEffect, useState } from "react"
import axios from "axios"

const Cart = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://api.orders.galeja.net/api/homepage').then(res => {
      setData(res.data.data);
    }).catch(err => {
      console.log('err', err);
    });
  }, []);

  return <div>
    {data ?
      <Navbar genders={data.genders}></Navbar>  
      :
      <Navbar genders={null}></Navbar>
    }
    <CartComponent></CartComponent>
    <Footer></Footer>
  </div>
}

export default Cart