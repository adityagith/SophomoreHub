import React, { useState} from "react";
import LoginCard from "../Components/LoginCard";
import { useNavigate } from "react-router-dom";


let StudentLogin = ()=>{

  //Always Use all the Hooks at the beginning 
  let nav = useNavigate();

  //Initializing Form Data
  let [name,setName] = useState('');
  let [email,setEmail] = useState('');
  let [password,setPassword]=useState('');
  let [userid,setUserid]=useState('');

 
  //Collating the Form data
  let data = {
    "name":name,
    "email":email,
    "password":password,
    "userid":"",
  };

  //Setting API Config

  let formdata={
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  //Handling Form
  let handleSubmit = (event) =>{

  //Cancels the default action that is submitting a form to avoid refereshing the page
  event.preventDefault();
    
  //FORM Submit API Point(BackendAPIPoint, Getting Response in JSON,Redirecting to Login Page Post Success SignUp)
  let backendpoint='http://localhost:4000/api/users/signupuser';
  fetch(backendpoint,formdata)
  .then(response => response.json())
  .then(data => nav("/login"))
  .catch(error => console.error('Error fetching data:', error));
  };
  
  return(
        <div className="content-center">
           <form method="POST" class="mt-8" onSubmit={handleSubmit}>

           <div class="mt-2">
              <input
                class="flex h-10 w-80 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="name"
                placeholder="Name"
                value={name}
                onChange = {(e)=>setName(e.target.value)}
              />
            </div>
            

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
              <button>SignUp</button>
            </div>

           </form>
        </div>
    )
}

export default StudentLogin;