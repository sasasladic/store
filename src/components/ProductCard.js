import { Button } from "@mui/material";

const ProductCard = ({ img, name }) => {
  return <div className='productCard'>
    <div className='productCard-image'>
      <img src={img} alt={name} />
    </div>
    <div className='productCard-description'>
      <h4>{name}</h4>
      <Button size='small' variant='contained' disableElevation>add to cart</Button>
    </div>
  </div>
}

export default ProductCard;