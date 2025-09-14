const express=require('express');
const dotenv=require('dotenv');
const mysql=require('mysql2');
const path=require('path');

dotenv.config({
    path:path.resolve(__dirname,'../../.env')
})


const db=mysql.createConnection({
    
    user      :process.env.db_user,
    password  :process.env.db_password,
    host      :process.env.db_host,
    database  :process.env.db_name ,
  
});

db.connect((err)=>{
    
    if(err){
        console.log(err);
        return;
    }   
    else{
        console.log("DB is connected SuccessFully..!")
    }
})  


module.exports= db;

