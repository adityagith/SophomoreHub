import React, { useState, useEffect } from "react";
import LoginCard from "../Components/LoginCard";
import { useNavigate } from "react-router-dom";

const StudentLogin = ()=>{
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('');
  let nav = useNavigate();
  //Collecting the Form data
  let data = {
    "email":email,
    "password":password
  };

  let formdata={
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    //Cancels the default action that is submitting a form
    let backendpoint='http://localhost:4000/api/users/loginuser';
    fetch(backendpoint,formdata)
      .then(response => response.json())
      .then(data => nav("/connects"))
      .catch(error => console.error('Error fetching data:', error));
  };
  
  
  return(
        <div className="content-center">
           <form method="POST" class="mt-8" onSubmit={handleSubmit}>
           <div class="mt-2">
              <input
                class="flex h-10 w-80 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                value={email}
                onChange = {(e)=>setEmail(e.target.value)}
              />
            </div>
            

            <div class="mt-2">
              <input
                class="flex h-10 w-80 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Password"
                value={password}
                onChange = {(e)=>setPassword(e.target.value)}
              />
            </div>

            <div class="mt-2">
              <button>Login</button>
            </div>

           </form>
        </div>
    )
}

export default StudentLogin;