import { useSelector, useDispatch } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { cartActions } from '../../context/Context'
import { Fragment } from "react";

const ProductConfirm = () => {

  const cartData = useSelector(state => state.cart.cartData);
  const cartKeys = Object.keys(useSelector(state => state.cart.cartData));
  console.log(cartData);
  const dispatch = useDispatch();
  let totalPrice = 0;

  const domElements = [];
  cartKeys.forEach(key => {
    
    const handleRemove = () => {
      dispatch(cartActions.removeAllItems({id: key, name: cartData[key].name, price: cartData[key].price, img: cartData[key].img}));
    }
    const handleAdd = () => {
      dispatch(cartActions.addItem({id: key, name: cartData[key].name, price: cartData[key].price, img: cartData[key].img}))
    }
    const handleMinus = () => {
      dispatch(cartActions.removeItem({id: key, name: cartData[key].name, price: cartData[key].price, img: cartData[key].img}))
    }

    domElements.push(
      <Fragment key={key}>
        <div className='listItem'>
          <span><img src={cartData[key].img} alt='product image'/></span>
          <span>{cartData[key].name}</span>
          <span>{cartData[key].price} €</span>
          <span>
            <button onClick={handleMinus}><RemoveIcon></RemoveIcon></button>
            <span>{cartData[key].count}</span>
            <button onClick={handleAdd}><AddIcon></AddIcon></button>
          </span>
          <span>{cartData[key].count * cartData[key].price} €</span>
          <span><CancelIcon className='cancel' onClick={handleRemove}></CancelIcon></span>
        </div>
        <div className='listItemMobileContainer'>
          <div className='listItemMobile'>
            <img src={cartData[key].img} alt="product image" />
            <div className='text'>
              <span>{cartData[key].name}</span>
              <span className='counter'>
                <button onClick={handleMinus}><RemoveIcon></RemoveIcon></button>
                <span>{cartData[key].count}</span>
                <button onClick={handleAdd}><AddIcon></AddIcon></button>
              </span>
              <span>Cena: {cartData[key].price} €</span>
              <span>Ukupno: {cartData[key].count * cartData[key].price} €</span>
            </div>
            <span className='cancelContainer'><CloseIcon className='cancel' onClick={handleRemove}></CloseIcon></span>

          </div>
          <hr />
        </div>
      </Fragment>
    );
    totalPrice += cartData[key].count * cartData[key].price;
  })

  return <div className='productConfirm'>
    <h2>Your Cart</h2>
    <div className='gridList'>
      { totalPrice ? 
        <div className='placeholder'>
          <span></span>
          <span>Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span></span>
        </div>
        :
        <h1 style={{opacity: .5, margin: '40px 0', textAlign: 'center'}}>Vaša korpa je prazna</h1>
      }
      { domElements }
    </div>
    <div className='total'>
      <div className='small'>
        <span>Ukupna vrednost bez poreza: {Math.floor(totalPrice * 0.8)} €</span>
        <br />
        <span>Ukupan porez: {Math.floor(totalPrice*0.2)} €</span>
      </div>
      <div className='big'>
        <span>Ukupna vrednost:</span>
        <p>{totalPrice} €</p>
      </div>
    </div>
  </div>
}

export default ProductConfirm;