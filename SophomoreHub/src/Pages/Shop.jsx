import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import { useNavigate } from "react-router-dom";

const Shop = () => {

    const [isLoading, setIsLoading] = useState(false);
    //Search Bar Value to filter the Products
    const [searchBar,setSearchBar] = useState("");
    const [domain,setDomain] = useState("ECE");
    const [price,setPrice] = useState("10000");
    //Products to store response from Backend API
    const [products,setProducts] = useState("");
    //To Navigate
    let nav = useNavigate();

    //To Get the Products 
    useEffect(() => {
        const getProducts = async () => {
          try {
            //Below API being modified to include the Optional Parameters in the GET Request
            //"search=",searchBar
            const getProductsApi = "http://localhost:4000/api/shop/showproducts?".concat("domain=",domain,"&price=",price);
            const response = await fetch(getProductsApi, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
              
            });
            const dataFromApi = await response.json();
            setProducts(dataFromApi.products); //Storing the Fetched data from Mongoose via Backend
            setIsLoading(true);
          } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(true);
          }
        };
        getProducts();
      }, [domain,price]); // getproducts run on chainging the domain and price

    //Navigate to Sell Product 
    const navigateToSellProduct = () =>{
      nav("/shop/sell");
      return;
    }

    const navigateToCart = ()=>{
      nav("/shop/cart");
      return;
    }

    //Applying For Loop on DisplayConnectionTable components
    const renderProductsRows = () => {
    const rows = [];
    for (let i = 0; i < products.length; i++) {
      rows.push(
        <Product
          key={i}
          name={products[i].name}
          desc={products[i].desc}
          price={products[i].price}
          imagepath={products[i].imagepath}
          product={products[i].productid}
        />
      );
    }
    return rows;
  };

    return(
        <div className="flex flex-col">
            <div class="flex flex-row">
                <div class="basis-1/2"><input className="bg-gradient-to-r from-cyan-500 to-blue-500" 
                value={searchBar} onChange = {(e)=>setSearchBar(e.target.value)}></input></div>
                <div class="w-14"><button>Search</button></div>
                <div class="basis-1/4">
                    <select className="bg-gradient-to-r from-cyan-500 to-blue-500"
                     value={domain} onChange = {(e)=>setDomain(e.target.value)}>
                    <option value="ECE">ECE</option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    </select>
                </div>
                <div class="basis-1/4">
                    Price
                   <input type="range" id="vol" name="vol" min="50" max="1000" 
                   value={price} onChange = {(e)=>setPrice(e.target.value)}></input>
                   1000
                </div>
                <div class="basis-1/4"><button onClick={navigateToSellProduct}>Sell</button></div>
                <div class="basis-1/2"><button onClick={navigateToCart}>Cart </button></div>
            </div>

            <div class="flex flex-wrap">
                {isLoading? renderProductsRows():<div>No Products</div>}
            </div>
        </div>
    );
}

export default Shop;