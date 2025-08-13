import React, { useState, useEffect } from "react";
import UserCart from "../Components/UserCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [isLoading, setIsLoading] = useState(false);
    //Search Bar Value to filter the Products
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
            const getProductsApi = "http://localhost:4000/api/shop/getCart?";
            const response = await fetch(getProductsApi, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
            const dataFromApi = await response.json();
            setProducts(dataFromApi.userCart); //Storing the Fetched data from Mongoose via Backend
            setIsLoading(true);
          } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(true);
          }
        };
        getProducts();
      }, [""]); // getproducts run on chainging the domain and price

    //Applying For Loop on DisplayConnectionTable components
    const renderProductsRows = () => {
    const rows = [];
    for (let i = 0; i < products.length; i++) {
      rows.push(
        <UserCart
          key={i}
          price={products[i].price}
          // imagepath={products[i].imagepath}
        />
      );
    }
    return rows;
  };

    return(
        <div className="flex flex-col">
            <div class="flex flex-row">
          
                <div class="basis-1/4"><button>Cart</button></div>
            </div>

            <div class="flex flex-wrap">
                {isLoading? renderProductsRows():<div>No Products</div>}
            </div>
        </div>
    );
}

export default Cart;