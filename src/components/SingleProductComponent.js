import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Carousel } from "react-responsive-carousel";

const SingleProductComponent = () => {

  const [product, setProduct] = useState(null);

  const LoadGallery = ({images}) => {

    const carouselItems = [];
    images.forEach(img => {
      carouselItems.push(<div><img src={img.src} /></div>);
    })

    return <Carousel showArrows={true}>{ carouselItems }</Carousel>;
  }

  useEffect(() => {
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    const url = `https://api.orders.galeja.net/api/product/${id}`;
    axios.get(url).then(res => {
      setProduct(res.data.data)
    }).catch(err => {
      console.log(err);
    });
  }, [])

  console.log(product);

  return <div className="singleProduct">
    <div className="singleProductInner">
      {product ? 
        <Fragment>
          <h1>{product.name}</h1>
          <LoadGallery images={product.images}></LoadGallery>
        </Fragment>
        :
      <CircularProgress />}
    </div>
  </div>
}

export default SingleProductComponent;