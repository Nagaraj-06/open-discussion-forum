// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import {Link, NavLink, useLocation } from 'react-router-dom'
// import Img1 from '../assets/download (1).jpeg';
// import FindDate from '../componants/FindDate';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
// import { Recentreply } from './Recentreply';
// import { Header1 } from '../componants/Header1';

// const Favourites_copy = () => {

//   const [selectedComponent, setSelectedComponent] = useState('3');
//   let nowemail,nowusername;
//   const MyKeyValues=window.location.search;
//   const queryParams=new URLSearchParams(MyKeyValues);
//   const email=queryParams.get('name');
//   const location=useLocation();
  
//   const jwt_token=Cookies.get('token');
//   if(jwt_token) {
//     const decode_payload=jwtDecode(jwt_token);
//     nowemail =decode_payload.email
//     nowusername= decode_payload.username;
//   }
  
//   const [fav,setFav]=useState(null);
//   const [replyfav,setReplyfav]=useState(null);
//   let lastFiveRecentFav=fav?.slice(-5).reverse();
//   let recentfav=(lastFiveRecentFav);
//   let lastFiveRecentReplyfav=replyfav?.slice(-5).reverse();
//   let RecentReplyfav=(lastFiveRecentReplyfav);
  
//   let arr2=[],arr4=[]
  

//   const [focusArray, setFocusArray] = useState([false, false, false, true,false]);
//   const contents = ["Profile", "Topics Started", "Replies Created", "Likes","Saved"];


//   console.log("email",email)
//   useEffect(()=>{
//     // setFav(null)
//     axios.post("http://localhost:2000/favourites", {email :email})
//    .then((responce)=>{
//         console.log("Questions Favourites ... ",responce.data);
//         setFav(responce.data)
//     }).catch((err)=> console.log(err));
  
//   },[])
  
//   useEffect(()=>{
//     // setReplyfav(null)
//     axios.post("http://localhost:2000/ReplyFavourites", {email :email} )
//     .then((responce)=>{
//         console.log("Reply Favourites ... ",responce.data);
//         setReplyfav(responce.data)
//     })
//     .catch((err)=> console.log(err));
    
//   },[]);



// const changeTrueFalse = (index) => {
//   setFocusArray((prev) =>
//     prev.map((item, i) => (i === index ? true : false))
//   );
// };

// const changeTrueFalse1 = (index) => {
//   setFocusArray((prev) =>
//     prev.map((item, i) => (i === index ? true : false))
//   );
// };

// const renderComponent = () => {
//   // {console.log("before switch case :",selectedComponent)}


   
//   };
//   // console.log("Favourites :",fav,replyfav)
 
//   return (
//     <>
//      <div className='bodyy'>
//       <Header1 email={nowemail} selectedComponent={selectedComponent}/>
//       <div className='content-body'>
//         <div className='account'>
//               <div className='name'>
//                   <h1>{"It is username"}</h1>
//               </div>
//     <div className='fundamental'>
//                 <div className='fundamental-img'>
//                     <img src={Img1} alt='xyz'/>
//                 </div>
//                 <div className='fundamental-details'>
//                     <ul>
//                     <li><b>DEPARTMENT</b> : 899</li>
//                     <li><b>BATCH</b> : 989 </li>
//                     <li><b>EMAIL</b> : ioj</li>
//                     </ul>
//                 </div>
//             </div>
//             <div className='account-base'>
//               <div className='proflinks'>
//                 <ul>
                 
//                 <div> {contents.map((item, index) => (
//                        <NavLink to={`/Account/${item}?name=${email}`} >
//                         <li
//                             key={index}
                            
//                             className={focusArray[index] ? "focused-item" : "unfocused-item"}
//                           >
//                             <a>{item}</a>
//                           </li>
//                         </NavLink>
                      
//                       ))} </div> 
//                 </ul>
//               </div>

//               <div className='profile-details'>
//               <div className='accdetails'>               
//                 <div>   <h1>LIKES</h1> 
//                     <p><b>Total Likes</b>: {fav?.length + replyfav?.length }</p>
//                     <p><b>Likes on Questions</b>: {fav?.length} </p>
//                     <p><b>Likes on Replies</b>: {replyfav?.length} </p>
//                 </div>
//         </div>
//               </div>

//             </div>
//         </div>
//           <Recentreply email={email} nowemail={nowemail} selectedComponent={selectedComponent}/>
//       </div>
     
//     </div>
        
//     </>
//   )
// }

// export default Favourites_copy
