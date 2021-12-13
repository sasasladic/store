import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleProductComponent from '../components/SingleProductComponent'

const SingleProduct = () => {
  
  const [data, setData] = useState(null);

  // loading hover menu
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
    <SingleProductComponent></SingleProductComponent>
    <Footer></Footer>
  </div>
}

export default SingleProduct;