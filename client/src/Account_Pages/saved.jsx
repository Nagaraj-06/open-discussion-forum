import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, NavLink } from 'react-router-dom'
import Img1 from '../assets/download (1).jpeg';
import FindDate from '../componants/FindDate';

const Savedd = ({email,nowemail,active}) => {

  
  const [save,setSave]=useState([]);
  const [replysave,setReplySave]=useState([]);

  

useEffect(()=>{
    // setSave(null)
    axios.post("http://localhost:2000/fetch_saved", {email :email})
   .then((res)=>{
        // console.log("Questions Saved ... ",res.data);
        setSave(res.data)
    }).catch((err)=> console.log(err));
  
},[])

  useEffect(()=>{
    // setReplySave(null) 
  axios.post("http://localhost:2000/fetch_Replysaved", {email :email})
   .then((res)=>{
        // console.log("Replies Saved ... ",res.data);
        setReplySave(res.data);
    }).catch((err)=> console.log(err));
  
},[])

 
  return (
    <>
    <div className='accdetails'>               
            <div>   <h1>SAVED</h1> 
                <p><b>Total Saved</b>: {save?.length + replysave?.length }</p>
                <p><b>Saved on Questions</b>: {save?.length} </p>
                <p><b>Saved on Replies</b>: {replysave?.length} </p>
            </div>
    </div>
    
   </>
  )
}

export default Savedd
