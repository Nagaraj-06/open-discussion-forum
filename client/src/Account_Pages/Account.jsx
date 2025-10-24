import React,{useEffect, useState} from 'react'
// import { Recentreply } from '../components/Recentreply';
import Img1 from '../assets/download (1).jpeg';
import { Profile } from './Profile';
import { TopicsStarted } from './TopicsStarted';
import { RepliesCreated } from './RepliesCreated';
import './Account.css';
import { NavLink, useLocation } from 'react-router-dom';
import { Header1 } from '../componants/Header1';
import axios from 'axios';
import { FirstHeader } from '../componants/Header';
import FindDate from '../componants/FindDate';
import Favourites from './Favourites';
import { Recentreply } from './Recentreply';
import { Saved } from '@blueprintjs/icons';
import Savedd from './saved';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axiosConfig';


const Account = () => {

  const [selectedComponent, setSelectedComponent] = useState('0');
  let [results,setResult]=useState([])
  let [questions,setQuestions]=useState([])
  const [replies,setReplies]=useState([]);
  let showdate=new Date()
  const location=useLocation();

  let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  let dt=showdate.toDateString()
  let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();

  let nowemail,nowusername;
  const [email,setEmail] = useState()
  const MyKeyValues=window.location.search;
  const queryParams=new URLSearchParams(MyKeyValues);
  const Params1=queryParams.get('name');
  const Params2=queryParams.get('userId');
  const [username,setUsername]=useState("");
  // console.log("name :",Params1+"@bitsathy.ac.in");
  let Profile_click=location.state?.Profile_click;
  let Acc_option_selected=location.state?.selected;
  
  // console.log("Account :",Profile_click,Acc_option_selected)
  // if(Acc_option_selected!=null) {

  //   Cookies.set("Ac_select",Acc_option_selected)
  // }

  const [focusArray, setFocusArray] = useState([true, false, false, false,false]);
  const contents = ["Profile", "Topics Started", "Replies Created", "Likes","Saved"];

  const [focusArray1, setFocusArray1] = useState([true, false, false]);
  const contents1 = ["Profile", "Topics Started", "Replies Created"];
  
  let demo=Cookies.get('Ac_select')

  useEffect(()=>{
    if(demo!=null) {
      setSelectedComponent(demo);
      if(demo==0) {
        setFocusArray([true, false, false, false,false]);
        setFocusArray1([true, false, false]);
      }
      if(demo==1) {
        setFocusArray([false, true, false, false,false]);
        setFocusArray1([false, true, false]);
      }
      if(demo==2) {
        setFocusArray([false, false, true, false,false]);
        setFocusArray1([false, false, true]);
      }
      if(demo==3) {
        setFocusArray([false, false, false,true,false]);
        setFocusArray1([false, false, false]);
      }
      if(demo==4) {
        setFocusArray([false, false, false, false,true]);
        setFocusArray1([false, false, false]);
      }
      console.log("demo :",demo)
    } 
  },[demo]);


  useEffect(()=>{

    if(Profile_click!=null) {

      setSelectedComponent('0');
      
      setFocusArray([true, false, false, false,false]);
      setFocusArray1([true, false, false]);
      Profile_click=null
    }

},[Profile_click])

// console.log(" Profile_click : and selected ",Profile_click,Acc_option_selected)


  // console.log("demo type:",typeof demo)

    // if(Cookies.get('Ac_select')) {
    //   setSelectedComponent(Cookies.get('Ac_select'))
    // }
  
    // console.log("Profile Click :",Profile_click,)


  const jwt_token=Cookies.get('token');
  if(jwt_token) {
    const decode_payload=jwtDecode(jwt_token);
    nowemail =decode_payload.email
    nowusername= decode_payload.username;
  }
  
  // email=Params1+"@bitsathy.ac.in";
  // email=Params1;
  let userId=Params2;

  useEffect(() => {
    api.get("/profile_infoId", { params: { userId } })
      .then((res) => setEmail(res.data[0]?.email))
      .catch((err) => console.log(err));
  }, [userId]);

  // 🟢 Get username by email
  useEffect(() => {
    if (!email) return;
    api.post("/profile_info", { email })
      .then((res) => setUsername(res.data[0]?.username))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Get full profile info
  useEffect(() => {
    if (!email) return;
    api.post("/profile_info", { email })
      .then((res) => setResult(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Get user posts
  useEffect(() => {
    if (!email) return;
    api.post("/userPosts", { email })
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Get user replies
  useEffect(() => {
    if (!email) return;
    api.post("/userReplies", { email })
      .then((res) => setReplies(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  let arr2=[],arr4=[]
  
const handleClick =(component) =>{
  setSelectedComponent(component);
};

const changeTrueFalse = (index) => {
  setFocusArray((prev) =>
    prev.map((item, i) => (i === index ? true : false))
  );
};

const changeTrueFalse1 = (index) => {
  setFocusArray((prev) =>
    prev.map((item, i) => (i === index ? true : false))
  );
};

  let a,roll_number,dept,batch;

  {results.map((value,index)=>{
    
    <div key={index}></div>
     
    if(value.email == email){  
      let day, month, year;
      const dateObj = new Date(value.date);
      day = dateObj.getDate();             // Day of the month (1-31)
      month = dateObj.getMonth() + 1;     // Month (0-11, so add 1)
      year = dateObj.getFullYear();       // Full year (e.g., 2023)
      
      const [Hours, Minutes] = value?.time?.split(":");

      a=FindDate({ arr2: [
        Number(day),
        Number(month),
        Number(year),
      ] ,arr4:[Number(Hours), Number(Minutes)] });
      
      roll_number=value.roll_number;
      dept=value.dept;
      batch=value.batch         
    }
    
  })}

  
  
  if(nowemail=== email){
    a="Active Now"
  }else{
    a=FindDate({ arr2:arr2 ,arr4:arr4 });
  }
  
  const renderComponent = () => {

      switch (selectedComponent) {
        case '0':
          return <Profile email={email} nowemail={nowemail} active={a} questions={questions} replies={replies}/>
                  
        case '1':
          return <TopicsStarted email={email} nowemail={nowemail} questions={questions} selectedComponent={selectedComponent}/>
                  
        case '2':
          return <RepliesCreated  email={email} nowemail={nowemail} />

        case '3':
          return <Favourites email={email} nowemail={nowemail} active={a}/>

        case '4':
          return <Savedd email={email} nowemail={nowemail} active={a}/>

        default:
          return null;
      }
    };




let lastFiveRecentReplies=questions?.slice(-5).reverse();
let recentReplies=(lastFiveRecentReplies);

if(!email) {
  return  <h1>404</h1>
}

return (

    <div className='bodyy'>
      <Header1 email={nowemail} selectedComponent={selectedComponent}/>
      <div className='content-body'>
        <div className='account'>
              <div className='name'>
                  <h1>{username}</h1>
              </div>
    <div className='fundamental'>
                <div className='fundamental-img'>
                    <img src={Img1} alt='xyz'/>
                </div>
                <div className='fundamental-details'>
                    <ul>
                    <li><b>DEPARTMENT</b> : {dept}</li>
                    <li><b>ROLL NUMBER</b> : {roll_number} </li>
                    <li><b>EMAIL</b> : {email}</li>
                    </ul>
                </div>
            </div>
            <div className='account-base'>
              <div className='proflinks'>
                <ul>
                 
                 {email==nowemail ? <div> {contents.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {handleClick(`${index}`); changeTrueFalse(index)}} 
                          className={focusArray[index] ? "focused-item" : "unfocused-item"}
                        >
                          <a>{item}</a>
                        </li>
                      ))} </div> : <div> {contents1.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {handleClick(`${index}`); changeTrueFalse1(index)}} 
                          className={focusArray[index] ? "focused-item" : "unfocused-item"}
                        >
                          <a>{item}</a>
                        </li>
                      ))} </div> }
                </ul>
              </div>

              <div className='profile-details'>
                  {renderComponent()}
              </div>

            </div>
        </div>
          <Recentreply email={email} nowemail={nowemail} selectedComponent={selectedComponent}/>
      </div>
     
    </div>

   
  )
}

export default Account