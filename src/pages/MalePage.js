import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MalePage = () => {

  const [data, setData] = useState(null);
  const user = useSelector(state => state.auth.user);

  console.log(user);

  useEffect(() => {
    // loading hover menu
    axios.get('https://api.orders.galeja.net/api/homepage').then(res => {
      setData(res.data.data);
    }).catch(err => {
      console.log('err', err);
    });
    
    // loading page data
    axios.get('https://api.orders.galeja.net/api/product?filter[genders.gender]=Male').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return <div>
    {data ?
      <Navbar genders={data.genders}></Navbar>  
      :
      <Navbar genders={null}></Navbar>
    }
    <h1>Male Page</h1>
  </div>
}

export default MalePage;