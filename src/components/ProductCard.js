import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from '../context/Context';

const ProductCard = ({ img, name, id, price }) => {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(cartActions.addItem({ id, img, name, price }));
  }

  return <div className='productCard'>
    <Link to={`/singleProduct/${id}`}><div className='productCard-image'>
      <img src={img} alt={name} />
      <span className="price">{price}€</span>
    </div>
    <div className='productCard-description'>
      <h4 style={{fontWeight: 'normal'}}>{name}</h4>
    </div>
    </Link>
  </div>
}

export default ProductCard;