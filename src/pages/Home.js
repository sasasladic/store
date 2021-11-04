import Navbar from "../components/Navbar"
import Hero from '../components/Hero'
import CartButton from '../components/CartButton'
import FeaturedProducts from '../components/FeaturedProducts'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import axios from "axios";
import { useEffect, useState } from "react"

const Home = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://api.orders.galeja.net/api/homepage').then(res => {
      setData(res.data.data);
    }).catch(err => {
      console.log('err', err);
    });
  }, [])

  return <div>
    {data ?
      <Navbar genders={data.genders}></Navbar>  
      :
      <Navbar genders={null}></Navbar>
    }
    <Hero />
    <CartButton />
    {data ? 
      <FeaturedProducts products={data.products} />
      :
      <FeaturedProducts products={null} /> 
    }
    <Newsletter />
    <Footer />
  </div>
}

export default Home