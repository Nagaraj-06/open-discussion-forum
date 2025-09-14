import React, { useState } from 'react'
import {Link, NavLink } from 'react-router-dom'
import Img1 from '../assets/download (1).jpeg';
import FindDate from '../componants/FindDate';

export function Profile({email,nowemail,active,questions,replies})  {
  
  
   return (
     <>
        <div className='accdetails'>               
            <div>{email==nowemail ? <h1>MY PROFILE</h1> :<h1>PROFILE</h1>} 
            <p><b>Topics Started</b>: {`${questions.length}`}</p>
            <p><b>Replies Created</b>:{` ${replies.length}`}</p>
            <p><b>Forum Role</b>: Student</p>
            <p><b>Active</b>: {` ${active}`}</p></div>
        </div>
      
    </>
  )
}