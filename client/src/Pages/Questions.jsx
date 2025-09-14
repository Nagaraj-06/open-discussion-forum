import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Bottomdrawer.css'; 
import './Questions.css'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CodeImg from '../assets/codeImage.png';
import Img1 from '../assets/download (1).jpeg'
// import Img7 from '../assets/'
import { FaBookBookmark, FaBookmark, FaHeart, FaPen, FaRegHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Header1 } from '../componants/Header1';
import BottomDrawer from './BottomDrawer';
import { Footer } from '../componants/Footer';
import axios from 'axios';
import Mainreplies from './Like_componant';
import Likes from './Like_componant';
import ReplyFrom from './ReplyFrom';
import Subreplies from './Subreplies';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ViewReplies from './ViewReplies';  
import { Deletealertbox } from './Deletealertbox';
import { TbMessageReply } from 'react-icons/tb';


function Questions() {

  const [isOpen, setIsOpen] = useState(false);
  const [file,setFile]=useState(null);
  const openDrawer = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const [reply,setReply]=useState('');
  const [usernames,setUsernames]=useState([]);
  const [q_email,setQues_email] = useState('');
  const [q_username,setQ_username] =useState();
  const [userId,setUserId] =useState();
  const [title,setTitle] =useState();
  let [question, setQuestion] =useState() ;
  const [views,setViews]=useState(0);
  let [views_date,setView_date]=useState();
  const [image,setImage] =useState();

  let [likes,setLikes]=useState('');
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [result,setResult]=useState()
  const [mainreplies,setMainreplies]=useState([]);  
  const [liked, setLiked] = useState(false);
  const [marked,setMarked] = useState(false);
  const [yes_no,setYes_no]=useState('');
  const [yes_no1,setYes_no1]=useState('');
 
  const [editMainReply,setEditMainReply]=useState("");
  const [editReplyId,setEditReplyId]=useState(null);

  const navigate=useNavigate()
  
  let path= window.location.pathname;
  const language_id = path?.split("/")[1];
  const level_id = path?.split("/")[2];

  const MyKeysValues =window.location.search;
  const queryParams=new URLSearchParams(MyKeysValues);

  const post_id=queryParams.get('discussionId');
  const location =useLocation();
  
  const Acc_option_selected=location.state?.selected;
  
  if(Acc_option_selected!=null) {

    Cookies.set("Ac_select",Acc_option_selected)
  }

  let email,username;

  const jwt_token=Cookies.get('token');
  if(jwt_token) {
    const decode_payload=jwtDecode(jwt_token);
    email =decode_payload.email
    username= decode_payload.username;
  
  }
  // setQ_username
  useEffect(()=>{
    axios.post(`http://localhost:2000/QuestionId`,{
      id:post_id
    })
    .then((res)=>{
      console.log("Question Details...",res.data[0])
      setQues_email(res.data[0].email)
      setQuestion(res.data[0].body);
      setTitle(res.data[0].title)
      setViews(res.data[0].views);
      setImage(res.data[0].image);
      
    }).catch((err)=>{
      console.log(err);
    })
  },[post_id]);


console.log("Q email :",q_email)
useEffect(()=>{
  axios.post('http://localhost:2000/profile_info',{email:q_email})
  .then((res)=>{
    console.log("Username :",res.data)
    setQ_username(res.data[0].username);
    setUserId(res.data[0].id);
  }).catch((err)=>{
    console.log(err);
  })
},[q_email])

  useEffect(()=>{

    axios.post('http://localhost:2000/is_post_noliked',{email:email, id:post_id})
    .then((res)=>
      {
        if(res.data.status=="no") {
          setLiked(!liked);
          setYes_no("no")
        }else {
          setLiked(liked);
          setYes_no("yes");
        }
      })
      .catch((err)=>console.log(err));
  
  },[email,post_id]);


  useEffect(()=>{
    
    axios.post('http://localhost:2000/is_post_nosaved',{email:email, id:post_id})
    .then((res)=>
      {
        console.log("now put saved? ",post_id,"  ",res.data.status);

        if(res.data.status=="no") {
          setMarked(!marked);
          setYes_no1("no")
        }else{
          setMarked(marked);
          setYes_no1("yes");
        }
      })
      .catch((err)=>console.log(err));
  
  },[email,post_id]);


  const toggleLike = () => {
  let status=0;

  setLiked(!liked);
  
  if(!liked) {

    setLikes((likes)=>(likes+1));
    if(yes_no=="yes") {    
        status=1;
      }
      
    }
    else{
      setLikes((likes)=>(likes-1));
    }
    
    axios.post('http://localhost:2000/addlike',{ email: email, id: post_id})
        .then((res)=>{
          console.log(res.data)
      }).catch(err=>console.log(err)); 

    };  

  const toggleBmark = () => {

    setMarked(!marked);
    
      axios.post("http://localhost:2000/saved",{ email: email, id: post_id})
      .then((res)=>{
        console.log(res.data)
      }).catch((err)=>console.log(err));

  
  };

  useEffect(()=>{
    axios.post("http://localhost:2000/post_likes",{ post_id:post_id })
    .then((res)=>{
      console.log("likes length" ,res.data.length);
      setLikes(res.data.length)
    }).catch((err)=>console.log(err))
  },[post_id]);



 const postViewData = ()=>{
        axios.post('http://localhost:2000/postViewData', {
          email: email,
          post_id: post_id,
          
      }).then((result) => {

        if(result){
          if(result.data.Status==='Success') {
                setViews((view)=>(view+1));    
              }
              else if(result.data.Status==='Failed'){
                views=views;
                
                console.log("views Already added");
              }
    }
   
}).catch(err => console.log(err));
 } 
                 

   useEffect(() => {
   if(username && email && post_id ){
      //  console.log("Datas required for postview Data : ",username , email ,post_id)
      postViewData();
      
   }
  }, [post_id]);

  
function handleSubmit(event){
  event.preventDefault();
 
  let formData= new FormData();

  var today = new Date();
  var year = today.getFullYear();
  var mes = today.getMonth()+1;
  var dia = today.getDate();
  var fecha =year+"-"+mes+"-"+dia;

  var hour=today.getHours();
  var minutes=today.getMinutes();
  var seconds=today.getSeconds();
  // var time = today.getTime();
  var fecha1 =hour+":"+minutes+":"+seconds;
  console.log(fecha1);
  
  formData.append('from_email',email);
  formData.append('to_email',q_email);
  formData.append('language_id',language_id)
  formData.append('level_id',level_id)
  formData.append('post_id',post_id);
  formData.append('body',reply);
  formData.append('date',fecha);
  formData.append('time',fecha1);

  if(file){
    formData.append('image', file); 
  }
  else{
    formData.append('image', ''); 
  }

if(editReplyId==null) {
 
  axios.post('http://localhost:2000/mainreplies',formData)
    .then((res)=>{
      console.log(res,"Reply added SuccessFully...!")
      
      setReply('');
      setFile('');

  }).catch((err)=>{
      console.log(err);
  })
}else{
  
  formData.append('editReplyId',editReplyId);
  axios.post('http://localhost:2000/EditMainReply',formData)
    .then((res)=>{
      console.log(res.data);
      
      setReply('');
      setFile('');

  }).catch((err)=>{
      console.log(err);
  })
}

}

useEffect(()=>{

  axios.post('http://localhost:2000/getmainreplies',{
    post_id :post_id
  }).then((res)=>{
    
    setMainreplies(res.data)
  }).catch((err)=>{
    console.log(err);
  })
},[post_id])
  

useEffect(()=>{

  axios.get('http://localhost:2000/usernames')
  .then((res)=>{
    setUsernames(res.data)
  }).catch((err)=>{
    console.log(err);
  })
},[])
  


function delt() {
  axios.post('http://localhost:2000/delt',{
    id:post_id
  }).then((res)=>{
    console.log(res.data);
    navigate(`/${language_id}/${level_id}`)
  }).catch((err)=> console.log(err));
  

}

function deltReply(Main_ReplyId) {

  axios.post('http://localhost:2000/deltReply',{
    MainReplyId: Main_ReplyId
  }).then((res)=>{
    console.log(res.data);
  }).catch((err)=> console.log(err));
    
}

function edit() {

  navigate(`/Start_Discuss?EditPostId=${post_id}`);

}

function EditReply(e,id) {
    e.preventDefault();
    axios.post('http://localhost:2000/EditReply',{id:id})
      .then((res)=>{

        console.log("Editing Main reply..",res.data);
        setEditReplyId(res.data[0].id)
        setReply(res.data[0].body);
        if(res.data[0].image) {
          setFile({name: res.data[0].image ,type:`image/${res.data[0].image?.split(".")[1]}`});
        }else{

          setFile('');
        }
        openDrawer();

    }).catch((err)=> console.log(err));

}

  return (
          <div className='bodyy'>
              <Header1 email={email}/>
          <div className='secbody'>
          <div className='secquesh1'>
            
   <h1> QUESTION <BsFillQuestionCircleFill className='ques-icon'/></h1>
            </div>
            <div className='sech1'>
                  <div className='ques-account'>
                            <div className='ques-account-img'> <NavLink to={`/profile?userId=${userId}`} state={{Profile_click:"yes"}} > <img src={Img1}/>  </NavLink></div>
                            <div className='ques-account-name' ><p><NavLink to={`/profile?userId=${userId}`} state={{Profile_click:"yes"}} >{q_username}
                            </NavLink></p></div>
                  </div>
                  <div className='seciconh1'>
                     <h1> {title}</h1>
            </div>


            </div>
            <div className='secpara'>
                  <p>{question}</p> 
            </div>
            <div className='secimg'>
              {/* {console.log("Image :",image)} */}
                {(image!=null)? <img src={`http://localhost:2000/images/${image}`} alt='xy'/> : null} 
            </div>     

      <div className='actions'>
            <div className='likes'>
                <button ><FaHeart className='likeicon' onClick={toggleLike}
                  style={{
                    color: liked ? 'rgb(239, 67, 63)' : 'rgb(179,179,179)',   
                  }}/></button> {likes}
            </div>
            <div className='bookmark'>
                  <button ><FaBookmark className='bm-icon' onClick={toggleBmark}
                    style={{ 
                      color: marked ?  'rgb(239, 67, 63)' : 'rgb(179,179,179)',  
                    }}/></button>
            </div>

            {(q_email== email) ?
           
                <div className='edit'>
                    <button type="button" onClick={edit}><FaPen className='edit-icon'/></button>
                </div>
            :null }

            {(q_email== email) ?
                <div className='delete'>
                  <Deletealertbox  senddd={(data)=> {
                    if(data=="yes") {
                      delt();
                    }
                  }}/>
                </div>
           
            :null }

<div className='replybutton'>
          
          {(q_email!== email) ?  <div>

                    <form onSubmit={handleSubmit}> 
                                    <button className="open-btn" onClick={openDrawer}>
                                        Reply
                                    </button>
                                    {isOpen && <div className="overlay1" onClick={closeDrawer}></div>}
                                    <div className={`drawer ${isOpen ? 'open' : ''}`}>
                                      <div className="drawer-content">
                                        <button className="close-btn" type="button" onClick={()=>{
                                            closeDrawer();
                                            setFile('');
                                        }}>
                                          &times;
                                        </button>
                                        <h2>Reply to {question}</h2> <br/>
                                        <div className='drawer-body'>
                                          <button
                                              type="button"
                                              onClick={() => document.getElementById('file-upload').click()}
                                              className="bottomupload-file">
                                              <DriveFolderUploadIcon />
                                                 Upload File
                                          </button>
                                                            
                                        {file &&  <button style={{"margin":"2px", "padding":"3px" }}type="button" onClick={()=>{
                                          setFile('');
                                           }}>
                                              &times;
                                              </button>}
                                        <input
                                            type="file" 
                                            id="file-upload"
                                            className="file-upload"
                                            accept='.jpg,.jpeg,.png' 
                                            onChange={(e) => {
                                               setFile(e.target.files[0]);
                                            }}
                                          />

                                          {file && <p>Selected file: {file.name}</p>}

                                        <textarea type="text" placeholder="Type here..." className="input-field" required value={reply} onChange={e=>{
                                                      setReply(e.target.value)
                                        }} />
                                        
                                        </div>
                                            <div className="drawer-footer">
                                              <button className="cancel-btn" type="button" onClick={()=>{
                                                  closeDrawer();
                                                  setFile('');
                                                }}>
                                                Cancel
                                              </button>
                                              <button className="save-btn" type="submit" onClick={(e)=>{
                                                  handleSubmit(e);
                                                  closeDrawer();
                                              }}>Save</button>

                                            </div>

                                      </div>
                                    </div>
                    </form>

          </div> :null}     

    </div>
      </div>
<br/>
        

      <div className='secreplies'>
          
          
          <div className='secreph1'>
              <h1>REPLIES <TbMessageReply className='reply-icon'/></h1>
          </div>
                                              
          {mainreplies?.map((value,index)=>{
          
          let name,userId;
          {usernames.forEach((u_name)=>{
            if(u_name.email==value.from_email) {
              name=u_name.username
              userId=u_name.id
          }
        })}

             return( 
                 <div className='secrepexample' >

                        <div className='secrephead'>
                            <p><NavLink to={`/profile?userId=${userId}`} state={{Profile_click:"yes"}} > <img src={Img1}/>{name} </NavLink></p>
                        </div>
                        <div className='secreppara'>
                                <p>{value.body}</p> 
                                <div className='secimg'>
                                      { (value.image!=null)? <img src={`http://localhost:2000/images/${value.image}`} alt='xyz'/> : null} 
                                </div>
                                <div className='actions'>
                          <Likes email={email} post_id={post_id} MainReplyId={value.id}/>

                          {/* {console.log("Checking Questions and Main Reply Email :",email,value.from_email)} */}
                          <div  className='actions'>
                           
                            {(value.from_email== email) ?
                            
                                      <div className='actions'>
                                            <div className='edit'>
                                                <button type="button" onClick={(e)=>EditReply(e,value.id)} ><FaPen className='edit-icon'/></button>
                                            </div>
                                            <div className='delete'>
                                                              <Deletealertbox  senddd={(data)=> {
                                            if(data=="yes") {
                                                deltReply(value.id);
                                            }
                                          }}/> {/*onClick={deltReply} */}
                                            </div>
                                      
                                      </div>:null }
                                      {(email !== value.from_email) ?  <div className='replybutton'>
                        
                                        <ReplyFrom toreply_email={value.from_email} question={name} question1={question} username={username} email={email} post_id={post_id} main_id={value.id} />

                                    </div>:null}  
                              </div>
                          </div>

                        </div>
                    
                   
                   <div> 
         <br/>
              <div className='replybutton'>
                   <ViewReplies MainReplyId={value.id}  MainReplyUsername={name} post_id={post_id} email={email} username={username} question1={question} />              
                </div>
                </div>
                
              </div>

            )
                  
            })}
      </div>
    </div>
        {/* <Footer/> */}
    </div>
  )
}

export default Questions;