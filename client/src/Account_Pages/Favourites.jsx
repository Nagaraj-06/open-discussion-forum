import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, NavLink } from 'react-router-dom'
import Img1 from '../assets/download (1).jpeg';
import FindDate from '../componants/FindDate';

const Favourites = ({email,nowemail,active}) => {

    
  const [fav,setFav]=useState([]);
  const [replyfav,setReplyfav]=useState([]);

  useEffect(()=>{
    // setFav(null)
    axios.post("http://localhost:2000/favourites", {email :email})
   .then((responce)=>{
        setFav(responce.data)
    }).catch((err)=> console.log(err));
  
  },[])
  
  useEffect(()=>{
    axios.post("http://localhost:2000/ReplyFavourites", {email :email} )
    .then((responce)=>{
        setReplyfav(responce.data)
    })
    .catch((err)=> console.log(err));
    
  },[]);
 
  return (
    <>
        <div className='accdetails'>               
                <div>   <h1>LIKES</h1> 
                    <p><b>Total Likes</b>: {fav?.length + replyfav?.length }</p>
                    <p><b>Likes on Questions</b>: {fav?.length} </p>
                    <p><b>Likes on Replies</b>: {replyfav?.length} </p>
                </div>
        </div>
    </>
  )
}

export default Favourites
