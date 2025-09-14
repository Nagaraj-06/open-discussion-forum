import axios from 'axios';
import React, { useState } from 'react'

function FileUpload() {

  const [file,setFile]=useState()
  
  function handleSubmit(){
        
    const formData= new FormData;

    formData.append('image',file);

    // axios.post('http://localhost:2000/upload',formData)
    // .then((res)=>{
        
    //     if(res.data.Status==="Success"){
    //         console.log("Succeed");
    //     }
    //     else{
    //         console.log("Failed");
    //     }
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })

  }


  return (
    <div>
        <input type="file" onChange={(e)=>{
            setFile(e.target.files[0])
        }}></input>
        <button onClick={handleSubmit}>Upload</button>
        
    </div>
  )

}

export default FileUpload
