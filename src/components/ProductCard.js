import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ img, name, id }) => {
  return <div className='productCard'>
    <Link to={`/singleProduct/${id}`}>
      <div className='productCard-image'>
        <img src={img} alt={name} />
      </div>
      <div className='productCard-description'>
        <h4>{name}</h4>
        <Button size='small' variant='contained' disableElevation >add to cart</Button>
      </div>
    </Link>
  </div>
}

export default ProductCard;