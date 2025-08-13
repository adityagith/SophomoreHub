import React from 'react';
import "./Navbar.css";
import Logo from "../../Assets/images";
import {Link} from "react-router-dom";

const Navbar = ()=>{
    return(
    <div className='flex'>
        <div class="flex-grow text-left w-60 ...">
            Bombay School of Science
        </div>
        <div className="flex-grow w-10">

            <div className="flex flex-row">
                <div className='navListItem'><Link to="/">Home</Link></div>
                <div className='navListItem'><Link to="/dailyposts">Posts</Link></div>
                <div className='navListItem'><Link to="/connects">Connects</Link></div>
                <div className='navListItem'><Link to="/shop">Shop</Link></div>
                <div className='navListItem'><Link to="/chat">Chat</Link></div>
                <div className='navListItem'><Link to="/login">Login</Link></div>
                <div className='navListItem'><Link to="/signup">SignUp</Link></div>
            </div>
        </div>
    </div>
    )
};

export default Navbar;