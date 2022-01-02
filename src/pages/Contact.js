import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from '../components/Footer';
import ContactContainer from "../components/Contact/ContactContainer"


const Contact = () => {

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
    <ContactContainer></ContactContainer>
    <Footer></Footer>
  </div>
}

export default Contact