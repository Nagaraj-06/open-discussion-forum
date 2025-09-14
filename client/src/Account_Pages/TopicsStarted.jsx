import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Img1 from '../assets/download (1).jpeg';
import FindDate from '../componants/FindDate';
import axios from 'axios';

export const TopicsStarted = ({email,nowemail}) => {

  const [languages,setLanguages] = useState([]);
  const [posts,setPosts] = useState([]);
  // const [topicsCount,setTopicsCount] = useState(0);

  // Get Languages

  useEffect(()=>{
    axios.get("http://localhost:2000/getLanguages")
    .then((res)=>{
      setLanguages(res.data);
    })
  },[]);

  // getallposts
  useEffect(() => {
    axios
      .get("http://localhost:2000/getallposts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
        <div className='accdetails'>
            <h1>TOPICS STARTED</h1>

            {languages.map((value,index)=>{
              
              let TopicsCount=0;
              {posts.forEach(post => {
                  if(post.email==email && value.id==post.language_id) {
                    TopicsCount++;
                  }
              })}

              return (
                <p><b>{value.label}</b>: {TopicsCount}</p>
            )})}
            

      </div> 
    </>
  )
}

