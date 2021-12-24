import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions} from '../context/Context'

const ProductCard = ({ img, name, id, price }) => {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(cartActions.addItem({ id, img, name, price }));
  }

  return <div className='productCard'>
    <Link to={`/singleProduct/${id}`}><div className='productCard-image'>
      <img src={img} alt={name} />
    </div></Link>
    <div className='productCard-description'>
      <Link to={`/singleProduct/${id}`}><h4>{name}</h4></Link>
      <span className="price">{price}€</span>
      <Button onClick={handleAddToCart} size='small' variant='contained' disableElevation >add to cart</Button>
    </div>
  </div>
}

export default ProductCard;