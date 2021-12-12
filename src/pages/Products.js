import Navbar from "../components/Navbar";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgress } from '@mui/material'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const Products = () => {

  const [data, setData] = useState(null);
  const user = useSelector(state => state.auth.user);
  const [productsData, setProductsData] = useState([]);

  let categorie = window.location.href.split('/')[window.location.href.split('/').length - 1];
  const gender = categorie[0] == 'm' ? 'Male' : 'Female';
  categorie = decodeURI(categorie);
  categorie = categorie.slice(1);


  const LoadProductItems = ({data}) => {
    console.log(data);
    const allProducts = data.map(product => {
      return <ProductCard key={product.name} img={product.image.src} name={product.name} />
    });

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
    console.log(gender);
    let url = `https://api.orders.galeja.net/api/product?filter[genders.gender]=${gender}&filter[categories.name]=${categorie}`;
    if (categorie === 'ALL') {
      url = `https://api.orders.galeja.net/api/product?filter[genders.gender]=${gender}`;
    }
    axios.get(url).then(res => {
      setProductsData(res.data.data);
    }).catch(err => {
      console.log(err);
    });
  }, [categorie, gender]);

  // todo: categorie description, Sasa mora da doda kad mi vraca proizvode da vraca i opis kategorije 
  return <div className="allProducts">
    {data ?
      <Navbar genders={data.genders}></Navbar>  
      :
      <Navbar genders={null}></Navbar>
    }
    <div className="description">
      <h1>{gender === 'Male' ? 'MEN' : 'WOMEN'}</h1>
      <h2 className="categorieName">{categorie}</h2>
      { productsData ? <p className="descriptionText">{}</p> : null }
    </div>
    <div className="productsList">
      {productsData ? <LoadProductItems data={productsData}/> : <div className="spinnerContainer"><CircularProgress /></div> }
    </div>
    <Footer></Footer>
  </div>
}

export default Products;