import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink,Link, useLocation, useNavigate } from 'react-router-dom';
import {Searchbar} from './Searchbar';
import axios from 'axios';import { IoHome, IoLogOutSharp } from 'react-icons/io5';
import { MdAccountCircle, MdForum } from 'react-icons/md';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


export const Header1 = ({email,selectedComponent}) => {
  
  const location=useLocation();
  const navigate = useNavigate();
  const [userId,setUserId]=useState();
  
  useEffect(()=>{
    axios.post("http://localhost:2000/profile_info",{email:email})
    .then((res)=>{
      setUserId(res.data[0]?.id);

    })
  },[email]);
 

  function handleDelete() {
    axios.get("http://localhost:2000/logout",{ params :{ email:email }} )
    .then((res)=> {
        console.log(res.data);
        navigate('/')
    })
    .catch((err)=> console.log(err));
  }

  return (
      <>
      
    {/*<div className="header">*/}
    <div className="contentfix">
        <div className="head">
            <h2>DISCUSSION FORUM</h2>  
        </div>
        
        <nav className="navbar">
        <ul>
            <li><NavLink to='/Home'>
              <span className='navtext'>HOME</span>
              <span className='navicon'><IoHome/></span>
                </NavLink></li>
                <li><NavLink to={`/profile?userId=${userId}`} state={{Profile_click:selectedComponent}} >
              <span className='navtext'>MY PROFILE</span>
              <span className='navicon'><MdAccountCircle/></span>
                </NavLink></li>

            <li><NavLink to='/Start_Discuss'>
              <span className='navtext'>START DISCUSSION</span>
              <span className='navicon'><MdForum/></span>
                </NavLink></li>

            <li><button type='button' onClick={handleDelete} > 
                  <span className='navtext' >LOG OUT</span>
                  <span className='navicon'><IoLogOutSharp/></span>
              </button> </li>
          </ul>
        </nav> 
      </div>
      <hr/></>
      )
}


