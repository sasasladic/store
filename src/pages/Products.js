import Navbar from "../components/Navbar";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { CircularProgress, MenuItem, Select } from '@mui/material'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import Filter from "../components/Products/Filter";

const Products = () => {

  const [data, setData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [filterArr, setFilterArr] = useState({});
  const [sort, setSort] = useState({price: '', time: ''});

  let categorie = window.location.href.split('/')[window.location.href.split('/').length - 1];
  const gender = categorie[0] == 'm' ? 'Male' : 'Female';
  categorie = decodeURI(categorie);
  categorie = categorie.slice(1);


  const LoadFilters = ({data}) => {
    // loading filters
    const filtersDom = [];
    Object.keys(data.filters).forEach((filter, i) => {
      filtersDom.push(<Filter gender={gender} great={filterArr} key={i} set={setFilterArr} data={data} filter={filter} i={i}></Filter>)
    });

    return filtersDom;
  }

  const LoadProductItems = ({ data }) => {
    let allProducts = [];

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
    let filterString = '';
    Object.keys(filterArr).forEach(key => {
      filterString += filterArr[key];
    })
    let url = `https://api.orders.galeja.net/api/product?category_gender_id=${categorie}${filterString}`;
    if (categorie === 'ALL') {
      url = `https://api.orders.galeja.net/api/product?filter[gender]=${gender}${filterString}`;
    }
    axios.get(url).then(res => {
      setProductsData(res.data.data);
      console.log(res.data.data);
    }).catch(err => {
      console.log(err);
    });
  }, [categorie, gender, filterArr]);

  useEffect(() => {
    setFilterArr({})
  }, [gender, categorie])


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
    <div className="filters">
      { productsData && <LoadFilters data={productsData} /> }
    </div>
    <div className="productsList">
      {productsData ? <LoadProductItems data={productsData}/> : <div className="spinnerContainer"><CircularProgress /></div> }
    </div>
    <Footer></Footer>
  </div>
}

export default Products;