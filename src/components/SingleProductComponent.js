import { CircularProgress, Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Carousel } from "react-responsive-carousel";
import SizePicker from "./SingleProductSub/SizePicker";
import ColorPicker from "./SingleProductSub/ColorPicker";
import { useDispatch } from "react-redux";
import { cartActions } from "../context/Context";
import { ToastContainer, toast } from 'react-toastify';


const SingleProductComponent = () => {

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [sizeExists, setSizeExists] = useState(false);
  const [colorExists, setColorExists] = useState(false);
  const [added, setAdded] = useState(false);

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(cartActions.addItem({ id: selectedVariant.id, name: product.product_data.name, img: product.product_data.images[0].src, price: selectedVariant.price}));
    toast.success(`Item ${product.product_data.name} has been added to Cart`, {position: "bottom-right", theme: 'colored', autoClose: 2000})
  }

  // If product is loaded, set selected variant to first one
  useEffect(() => {
    if (product) { 
      setSelectedVariant(product.all_variants[0])
      //checking if color and size attributes exist
      product.all_attributes.forEach(att => {
        if (att.name === 'color') { setColorExists(true) }
        if (att.name === 'size') { setSizeExists(true)}
      });
    }
  }, [product]);


  const LoadGallery = ({images}) => {
    const carouselItems = [];
    images.forEach((img, i) => {
      carouselItems.push(<div key={i}><img src={img.src} /></div>);
    })

    return <Carousel showArrows={true}>{ carouselItems }</Carousel>;
  }

  useEffect(() => {
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    const url = `https://api.orders.galeja.net/api/product/${id}`;
    axios.get(url).then(res => {
      setProduct(res.data.data);
    }).catch(err => {
      console.log(err);
    });
  }, [])


  return <Fragment>
    <div className="singleProduct">
      <div className="singleProductInner">
        {product && selectedVariant ?
          <Fragment>
            <div className="container">
              <div className="left">
                <LoadGallery images={product.product_data.images}></LoadGallery>
                {colorExists ?
                  <ColorPicker setVariant={setSelectedVariant} curr={selectedVariant} all={product.all_variants} /> :
                  null
                }
              </div>
              <div className="right">
                <h1>{product.product_data.name}</h1>
                <p className="price">{selectedVariant.price} €</p>
                <p className="promoText">This product is excluded from all promotional discounts and offers.</p>
                {sizeExists ?
                  <SizePicker setVariant={setSelectedVariant} curr={selectedVariant} all={product.all_variants} /> :
                  null
                }
                <Button onClick={handleAddToCart} variant="contained" size='big'>Add to Cart</Button>
              </div>
            </div>
            <h3 className="descHeader">Description</h3>
            <p className="descText">{product.product_data.description}</p>
          </Fragment>
          :
          <div style={{ padding: '30vh 0', display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>}
      </div>
    </div>
    <ToastContainer style={{top: 50}}></ToastContainer>
  </Fragment>
}

export default SingleProductComponent;