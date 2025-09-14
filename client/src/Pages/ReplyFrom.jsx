
import React, { useEffect, useRef, useState } from 'react'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';
import Img1 from '../assets/download (1).jpeg'
import { NavLink } from 'react-router-dom';
import Likes from './Like_componant';

const ReplyFrom = ({question,question1,username,email,post_id,main_id, sub_id }) => {
    
    const [reply,setReply]=useState('');

    const [isOpen2, setIsOpen2] = useState(false);
    const [file2,setFile2]=useState(null);
    const openDrawer2 = () => setIsOpen2(true);
    const closeDrawer2 = () => setIsOpen2(false);
    
    // let [q_email,setQues_email]=useState(qemail);
    const [isOpen, setIsOpen] = useState(false);
    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);
    


    let showdate=new Date()

    let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
    let dt=showdate.toDateString()
    let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
    const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
    const [currentHours,currentMinutes,currentsec]=displayTime.split(':');
    let [viewDate,viewMonth,viewYear]=['', '' ,'']
    
    let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
    let arr2=[];

    // console.log("subreplies in ReplyForm :",subrepliess);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
      // Use the ref to click the file input
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      // Handle file selection
      setFile2(e.target.files[0]);
    };


function handleSubmit1(event){

    event.preventDefault();
      
        let formData1= new FormData;
        
        var today = new Date();
        var year = today.getFullYear();
        var mes = today.getMonth()+1;
        var dia = today.getDate();
        var fecha =year+"-"+mes+"-"+dia;

        var hour=today.getHours();
        var minutes=today.getMinutes();
        var seconds=today.getSeconds();
        var fecha1 =hour+":"+minutes+":"+seconds;
        console.log(fecha1);
                  
        if(sub_id==null) {

            formData1.append('to_main_replyid',main_id);
        }
        if(main_id==null) {
            formData1.append('to_sub_replyid',sub_id);
        }

        formData1.append('from_email',email);
        formData1.append('post_id',post_id);
        formData1.append('body',reply);
        formData1.append('date',fecha);
        formData1.append('time',fecha1);
    
        // console.log(formData1)
    
        if(file2){
        formData1.append('image', file2); 
        }
        else{
        formData1.append('image', ''); 
        }
        
        // console.log("form ",formData1)

        axios.post('http://localhost:2000/subreplies',formData1)
        .then((res)=>{
            console.log("sub Reply added SuccessFully...!")
            setReply('')
            setFile2('')
            
        }).catch((err)=>{
            console.log(err);
        })
    
    
 }


  return (
    <div>
          <form onSubmit={handleSubmit1}>
                  <button className="open-btn" type="button" onClick={openDrawer2}>
                      Reply
                  </button>
                  <div className={`drawer ${isOpen2 ? 'open' : ''}`}>
                      <div className="drawer-content">
                                              <button className="close-btn" type="button" onClick={()=>{
                                                    closeDrawer2();
                                                    setFile2('');   }}>      &times;    </button>
                                      <h2>{question1} <br/> Reply to   `{question}`</h2><br/>
                                
                              <div className='drawer-body'>
                                      <button type="button"
                                            onClick={handleButtonClick}
                                            className="bottomupload-file">
                                            <DriveFolderUploadIcon />
                                          Upload File
                                      </button>
                                             
                                      {file2 &&  <button style={{"margin":"2px", "marginBottom":"3px" }} type="button" onClick={()=>{
                                                 setFile2('');
                                              }}>
                                            &times;
                                    </button>}    
                                        <input    
                                          type="file" 
                                          ref={fileInputRef}
                                          className="file-uploadd"
                                          accept='.jpg,.jpeg,.png' 
                                          onChange={(e) => {
                                          setFile2(e.target.files[0]);}}
                                        />
                                     
                                        {file2 && <p>Selected file: {file2.name}</p>}
                          
                                        <textarea type="text" placeholder="Type here..." className="input-field" required value={reply} onChange={e=>{
                                                  setReply(e.target.value);
                                                  
                                          }}/>
                              </div>
                              
                                  <div className="drawer-footer">
                                          <button className="cancel-btn" type="button" onClick={()=>{
                                              closeDrawer2();
                                              setFile2('');  }}>
                                                Cancel
                                          </button>
                                          <button type="submit" className="save-btn"  onClick={()=>{
                                              closeDrawer2();
                                              
                                          }}>Save Sub Reply</button>

                                  </div>
                                  
                      </div>
                  </div>
          </form>
                 
    </div>
  )
}

export default ReplyFrom
