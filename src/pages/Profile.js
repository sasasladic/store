import Navbar from "../components/Navbar"
import LoginSignin from "../components/Profile/LoginSignin"
import Footer from '../components/Footer'
import { useSelector } from "react-redux"
import ProfileData from "../components/Profile/ProfileData"

const Profile = () => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return <section className='profile'>
    <Navbar />
    <LoginSignin />
    { isLoggedIn && <ProfileData/>}
    <Footer></Footer>
  </section>
}

export default Profile