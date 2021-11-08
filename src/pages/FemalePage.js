import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const FemalePage = () => {

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
    <h1>Female Page</h1>
  </div>
}

export default FemalePage;