import Navbar from "../components/Navbar"
import Hero from '../components/Hero'
import CartButton from '../components/CartButton'
import FeaturedProducts from '../components/FeaturedProducts'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return <div>
    <Navbar/>
    <Hero />
    <CartButton />
    <FeaturedProducts />
    <Newsletter />
    <Footer />

  </div>
}

export default Home