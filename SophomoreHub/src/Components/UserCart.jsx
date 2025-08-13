import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserCart = ({price})=> {

  const addtocart = (k)=>{

    let data = {
      "productid":product,
      "price":price,
    };
  
    let cartForm={
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    };

    //MODIFY BELOW LATER

    //To Trigger the event to make form start
    const startEvent = new Event("start");

    const handleSubmit = (event) =>{
      event.preventDefault();
      //Cancels the default action that is submitting a form
      let backendpoint='http://localhost:4000/api/shop/addToCart';
      fetch(backendpoint,productForm)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching data:', error));
    };
    
    handleSubmit(startEvent);
    return;
    
  }

  return (
    <div className="w-[300px] rounded-md border">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => addtocart({product})}
        >
          {price}
        </button>
      </div>
    </div>
  )
}

export default UserCart;