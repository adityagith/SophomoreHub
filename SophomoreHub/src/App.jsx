import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom"; 
import News from "./Pages/News";
//import DailyPosts from "./Pages/DailyPosts";
import StudentLogin from "./Pages/StudentLogin";
import StudentSignUp from "./Pages/StudentSignUp";
import Connects from './Pages/Connects';
import Shop from './Pages/Shop';
import SellProduct from './Pages/SellProduct';
import Cart from './Pages/Cart';
import Chat from './Pages/Chat';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="flex flex-col text-white space-y-12">

        {/* Navbar Area */}

        <div className="text-white">
          <Navbar/>
          <Routes>
            <Route path='/news' element={<News/>}/>
            {/* <Route path='/signup' element={<DailyPosts/>}/> */}
            <Route path='/connects' element={<Connects/>}/>
            <Route path='/shop' element={<Shop/>}/>
            {/* For Selling the Product*/}
            <Route path='/shop/sell' element={<SellProduct/>}/>
            <Route path='/shop/cart' element={<Cart/>}/>
            <Route path='/chat/' element={<Chat/>}/>
            <Route path='/login' element={<StudentLogin/>}/>
            <Route path='/signup' element={<StudentSignUp/>}/>

          </Routes>

    
        </div>

      </div>
      </BrowserRouter>
  )
}

export default App
