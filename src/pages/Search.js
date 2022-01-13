import Navbar from "../components/Navbar";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { CircularProgress, MenuItem, Select } from '@mui/material'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import Filter from "../components/Products/Filter";
import Sort from '../components/Products/Sort'


const Search = () => {

  const [data, setData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [filterArr, setFilterArr] = useState({});
  const [sort, setSort] = useState('sort');

  let searchTerm = window.location.href.split('/')[window.location.href.split('/').length - 1];
  searchTerm = decodeURI(searchTerm);

  const LoadFilters = ({data}) => {
    // loading filters
    const filtersDom = [];
    Object.keys(data.filters).forEach((filter, i) => {
      filtersDom.push(<Filter great={filterArr} key={i} set={setFilterArr} data={data} filter={filter} i={i}></Filter>)
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
    let url = `https://api.orders.galeja.net/api/product?filter[name]=${searchTerm}${filterString}`;
    if (sort !== 'sort') {
      url += `&sort=${sort}`;
    }
    axios.get(url).then(res => {
      setProductsData(res.data.data);
      console.log(res.data.data);
    }).catch(err => {
      console.log(err);
    });
  }, [searchTerm, filterArr, sort]);

  return <div className="allProducts">
    {data ?
      <Navbar genders={data.genders}></Navbar>  
      :
      <Navbar genders={null}></Navbar>
    }
    <div className="description">
      <h1>Search - "{ searchTerm}"</h1>
    </div>
    <div className="propertiesCont">
      <div className="properties">
        <div className="filters">
          {productsData && <LoadFilters data={productsData} />}
        </div>
        <Sort sort={sort} setSort={setSort}></Sort>
      </div>
    </div>
    <div className="productsList">
      {productsData ? <LoadProductItems data={productsData}/> : <div className="spinnerContainer"><CircularProgress /></div> }
    </div>
    <Footer></Footer>
  </div>
}


export default Search;