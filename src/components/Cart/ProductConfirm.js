import { useSelector, useDispatch } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { cartActions } from '../../context/Context'
import { Fragment } from "react";

const ProductConfirm = () => {

  const cartData = useSelector(state => state.cart.cartData);
  console.log(cartData);
  const cartKeys = Object.keys(useSelector(state => state.cart.cartData));
  const dispatch = useDispatch();
  let totalPrice = 0;

  const domElements = [];
  cartKeys.forEach(key => {
    
    const handleRemove = () => {
      dispatch(cartActions.removeAllItems({ id: key }));
    }
    const handleAdd = () => {
      dispatch(cartActions.addItem({id: key}))
    }
    const handleMinus = () => {
      dispatch(cartActions.removeItem({id: key}))
    }

    domElements.push(
      <Fragment key={key}>
        <div className='listItem'>
          <span><img src={data.img} alt='product image'/></span>
          <span>{data.name}</span>
          <span>{data.price},00 din</span>
          <span>
            <button onClick={handleMinus}><RemoveIcon></RemoveIcon></button>
            <span>{cartData[key].count}</span>
            <button onClick={handleAdd}><AddIcon></AddIcon></button>
          </span>
          <span>{cartData[key].count * data.price},00 din</span>
          <span><CancelIcon className='cancel' onClick={handleRemove}></CancelIcon></span>
        </div>
        <div className='listItemMobileContainer'>
          <div className='listItemMobile'>
            <img src={data.img} alt="product image" />
            <div className='text'>
              <span>{data.name}</span>
              <span className='counter'>
                <button onClick={handleMinus}><RemoveIcon></RemoveIcon></button>
                <span>{cartData[key].count}</span>
                <button onClick={handleAdd}><AddIcon></AddIcon></button>
              </span>
              <span>Cena: {data.price},00 din</span>
              <span>Ukupno: {cartData[key].count * data.price},00 din</span>
            </div>
            <span className='cancelContainer'><CloseIcon className='cancel' onClick={handleRemove}></CloseIcon></span>

          </div>
          <hr />
        </div>
      </Fragment>
    );
    totalPrice += cartData[key].count * data.price;
  })

  return <div className='productConfirm'>
    <h2>Vaša korpa</h2>
    <div className='gridList'>
      { totalPrice ? 
        <div className='placeholder'>
          <span></span>
          <span>Naziv</span>
          <span>Cena</span>
          <span>Količina</span>
          <span>Ukupno</span>
          <span></span>
        </div>
        :
        <h1 style={{opacity: .5, margin: '40px 0', textAlign: 'center'}}>Vaša korpa je prazna</h1>
      }
      { domElements }
    </div>
    <div className='total'>
      <div className='small'>
        <span>Ukupna vrednost bez poreza: {Math.floor(totalPrice * 0.8)},00 din</span>
        <br />
        <span>Ukupan porez: {Math.floor(totalPrice*0.2)},00 din</span>
      </div>
      <div className='big'>
        <span>Ukupna vrednost:</span>
        <p>{totalPrice},00 din</p>
      </div>
    </div>
  </div>
}

export default ProductConfirm;