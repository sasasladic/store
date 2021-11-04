import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

import maleImage from '../assets/male.jpg'
import femaleImage from '../assets/female.jpg'

import ProductCard from "./ProductCard";

const FeaturedProducts = ({products}) => {

  
  let allProducts;
  if (products) {
    allProducts = products.map(product => {
      return <ProductCard key={product.name} img={product.image.src} name={product.name} />
    });
  }


  

  return <section className='featuredProducts'>
    <div className="featuredProductsInner">
      <h1 className='featuredProducts-header'>Categories</h1>
      <div className='genders'>
        <div className='card'>
          <span>MALE</span>
          <div style={{backgroundImage: `url(${maleImage})`}} className='bg'></div>
        </div>
        <div className='card'>
          <span>FEMALE</span>
          <div style={{backgroundImage: `url(${femaleImage})`}} className='bg'></div>
        </div>
      </div>
      <h1 className='featuredProducts-header'>Featured products</h1>
      {products ?
        <div className='cardContainer'>
          {allProducts}
        </div>
        :
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0'}}>
          <CircularProgress />
        </Box>
      }
    </div>
  </section>
}

export default FeaturedProducts;