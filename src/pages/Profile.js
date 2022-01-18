import Navbar from "../components/Navbar"
import LoginSignin from "../components/Profile/LoginSignin"
import Footer from '../components/Footer'
import { useSelector } from "react-redux"
import ProfileData from "../components/Profile/ProfileData"
import axios from "axios"
import {useEffect, useState} from 'react'

const Profile = () => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://api.orders.galeja.net/api/homepage').then(res => {
      setData(res.data.data);
    }).catch(err => {
      console.log('err', err);
    });
  }, []);

  return <section className='profile'>
    {data ?
      <Navbar genders={data.genders}></Navbar>  
      :
      <Navbar genders={null}></Navbar>
    }
    <LoginSignin />
    { isLoggedIn && <ProfileData/>}
    <Footer></Footer>
  </section>
}

export default Profile