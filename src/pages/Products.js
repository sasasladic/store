import Navbar from "../components/Navbar";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgress } from '@mui/material'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import FiltersComponent from "../components/FiltersComonent";

const Products = () => {

  const [data, setData] = useState(null);
  const user = useSelector(state => state.auth.user);
  const [productsData, setProductsData] = useState(null);
  const [sortPrice, setSortPrice] = useState(false);

  let categorie = window.location.href.split('/')[window.location.href.split('/').length - 1];
  const gender = categorie[0] == 'm' ? 'Male' : 'Female';
  categorie = decodeURI(categorie);
  categorie = categorie.slice(1);


  const LoadProductItems = ({ data }) => {
    let allProducts = [];
    // sorting products by price
    if (sortPrice === 'fromTop'){
      data.products.sort((a, b) => (parseInt(a.price.slice(0, -1)) > parseInt(b.price.slice(0, -1))) ? -1 : 1);
    }
    if (sortPrice === 'fromBottom') {
      data.products.sort((a, b) => (parseInt(a.price.slice(0, -1)) > parseInt(b.price.slice(0, -1))) ? 1 : -1);
    }

    if (data.length !== 0) {       
      allProducts = data['products'].map(product => {
        return <ProductCard key={product.name} img={product.image.src} name={product.name} id={product.id} price={product.price}/>
      });
    }

    return allProducts.length ? <Fragment>{allProducts}</Fragment> : <p>There are no items in selected categorie</p>;
  }


  // loading hover menu
  useEffect(() => {
    axios.get('https://api.orders.galeja.net/api/homepage').then(res => {
      setData(res.data.data);
    }).catch(err => {
      console.log('err', err);
    });
  }, []);

  // loading page data
  useEffect(() => {
    setProductsData(null);
    let url = `https://api.orders.galeja.net/api/product?category_gender_id=${categorie}`;
    if (categorie === 'ALL') {
      url = `https://api.orders.galeja.net/api/product?filter[genders.gender]=${gender}`;
    }
    axios.get(url).then(res => {
      setProductsData(res.data.data);
    }).catch(err => {
      console.log(err);
    });
  }, [categorie, gender]);

  return <div className="allProducts">
    {data ?
      <Navbar genders={data.genders}></Navbar>  
      :
      <Navbar genders={null}></Navbar>
    }
    <div className="description">
      <h1>{gender === 'Male' ? 'MEN' : 'WOMEN'}</h1>
      { productsData && productsData.category ? <h2 className="categorieName">{productsData.category.name}</h2> : null}
      { productsData && productsData.category ? <p className="descriptionText">{productsData.category.description}</p> : null }
    </div>
    <FiltersComponent sortPrice={sortPrice} setSortPrice={setSortPrice}></FiltersComponent>
    <div className="productsList">
      {productsData ? <LoadProductItems data={productsData}/> : <div className="spinnerContainer"><CircularProgress /></div> }
    </div>
    <Footer></Footer>
  </div>
}

export default Products;