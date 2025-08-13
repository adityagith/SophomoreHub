import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

let SellProduct = ()=>{
    const [product,setProduct] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [domain,setDomain] = useState('');
    let nav = useNavigate();
    //const [imagePath,imagePath] = useState('');             For Uploading Image later
    
    //Collecting the Form data
    let data = {
        "product":product,
        "description":description,
        "price":price,
        "domain":domain,
    };

    let productForm={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    };

    const navToShop = (data)=>{
        if(data['error'] == 0)
        {
            window.alert("Product Added :)");
        }
        else 
        {
            window.alert("Product Not added :(");
        }
        nav("/shop");
        return;
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        //Cancels the default action that is submitting a form
        let backendpoint='http://localhost:4000/api/shop/registerNewProduct';
        fetch(backendpoint,productForm)
          .then(response => response.json())
          .then(data => navToShop(data))
          .catch(error => console.error('Error fetching data:', error));
      };

    return(
        <div className="content-center">
           <form method="POST" class="mt-8" onSubmit={handleSubmit}>
           <div class="mt-2">
              <input
                class="flex h-10 w-80 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="name"
                placeholder="Product Name"
                value={product}
                onChange = {(e)=>setProduct(e.target.value)}
              />
            </div>

            <div class="mt-2">
              <input
                class="flex h-10 w-80 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="name"
                placeholder="Description of Product"
                value={description}
                onChange = {(e)=>setDescription(e.target.value)}
              />
            </div>

            <div class="mt-2">
              <input
                class="flex h-10 w-80 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="name"
                placeholder="Price"
                value={price}
                onChange = {(e)=>setPrice(e.target.value)}
              />
            </div>

            <div class="mt-2">
              <input
                class="flex h-10 w-80 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="name"
                placeholder="Domain"
                value={domain}
                onChange = {(e)=>setDomain(e.target.value)}
              />
            </div>

            <div class="mt-2">
              <button>Submit Product</button>
            </div>

           </form>
        </div>
    );
}

export default SellProduct;