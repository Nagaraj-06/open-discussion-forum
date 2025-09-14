import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaBookmark, FaHeart } from 'react-icons/fa6';
import './Questions.css'

const Likes = ({email,post_id,MainReplyId,SubReplyId}) => {

    const [liked, setLiked] = useState(false);
    const [marked,setMarked] = useState(false);
    let  [likes,setLikes]=useState('');
    const [yes_no,setYes_no]=useState('');
    const [yes_no2,setYes_no2]=useState('');
    const [likeCount, setLikeCount] = useState(0);

    let ReplyType={email:email, id:post_id, MainReplyId:MainReplyId};

    if(MainReplyId==null) {
      ReplyType={ email:email, id:post_id, SubReplyId: SubReplyId }
    }
// a={ email:email, id:post_id, SubReplyId: SubReplyId }

    useEffect(()=>{

      
      axios.post('http://localhost:2000/check_likeExist2',ReplyType)
      .then((res)=>
        {

          // console.log("checking Like Exist2",post_id,"  ",res.data.status);
          if(res.data.status=="no") {
            setLiked(!liked);
            setYes_no("no")
          }else{
            setLiked(liked);
            setYes_no("yes")
          }
        })
        .catch((err)=>console.log(err));
    
    },[]);

    // console.log("after Checking Like Exist..",liked)

    useEffect(()=>{

      
      axios.post('http://localhost:2000/check_saveExist2',ReplyType )
      .then((res)=>
        {

          console.log("checking save Exist2 ",post_id,"  ",res.data.status);
          if(res.data.status=="no") {
            setMarked(!marked);
            setYes_no2("no")
          }else{
            setMarked(marked);
            setYes_no2("yes");
          }
        })
        .catch((err)=>console.log(err));
    
    },[]);


  useEffect(()=>{
    axios.post("http://localhost:2000/replyLikes",ReplyType)
    .then((res)=>{
      console.log("replyType",ReplyType)
      console.log("likes length" ,res.data.length);
      setLikes(res.data.length)
    }).catch((err)=>console.log(err))

  },[]);



   const toggleLike = (event) => {
      let status=0;

      setLiked(!liked);
      
      if(!liked) {
        
        setLikes((likes)=>(likes+1));
        if(yes_no == "yes") {
          status=1;
        }

      }
      else{
        setLikes((like)=>(like-1));
      }        
        
      axios.post('http://localhost:2000/addlike2',ReplyType)
      .then((res)=>{
        console.log(res.data)
      }).catch(err=>console.log(err));
  
  };

  const toggleBmark = () => {

    setMarked(!marked);
    
          axios.post('http://localhost:2000/saved2',ReplyType)
          .then((res)=>{
            console.log(res.data)
          }).catch(err=>console.log(err));  
  };



  return (
    <>
        {/* <div className='actions' > */}
                                <div style={{display:"flex"}}className='likes'>
                                  <button   style={{backgroundColor:"#ffffff"}}><FaHeart className='likeicon' onClick={toggleLike}
                                    style={{ 
                                      color: liked ? 'rgb(239, 67, 63)' : 'rgb(179,179,179)',   
                                    }}/></button> <div>{likes} </div>
                                </div> 
                                <div className='bookmark'>
                                        <button   style={{backgroundColor:"#ffffff"}} ><FaBookmark className='bm-icon' onClick={toggleBmark}
                                        style={{ 
                                          color: marked ? 'rgb(239, 67, 63)' : 'rgb(179,179,179)',  
                                      }}/></button>
                                </div>
                        {/* </div> */}
    </>
  )
}

export default Likes
