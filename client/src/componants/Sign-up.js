
import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './login.css'

export default function Signup() {
    const [username,setUsername] =useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformpassword,setConformpassword]= useState('')
    // const [data, setData] = useState({
    //     email: '',
    //     password: ''
    // });

    // Update data state whenever email or password changes
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    function submit(event) {
      

        axios.post('http://localhost:2000/',{
            username:username,
            email:email,
            password:password,
            conformpassword:conformpassword
            
        })
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.error('Login failed:', error);
            });
    }

    return (
        <form onSubmit={submit}>
            <div className="f">
                <h1>Sign-up</h1>
                
                <div className="input">
                    <label>User Name</label> <br />
                    <input onChange={(e)=> setUsername(e.target.value)} type="email" name="email" placeholder="User name"/>   
                </div><br />

                <div className="input">
                    <label>Email</label> <br />
                    <input onChange={(e)=> setEmail(e.target.value)} type="email" name="email" placeholder="Enter Ur Email"/>
                </div><br />

                <div className="input" onChange={(e)=> setPassword(e.target.value) }>
                    <label>Password</label> <br />
                    <input type="password" name="password" placeholder="Enter Ur Password" required />   
                </div><br />

                <div className="input" onChange={(e)=> setConformpassword(e.target.value) }>
                    <label>Conform Password</label> <br />
                    <input type="password" name="password" placeholder="Enter Ur Password" required  /> 
                </div>
               
                <Link to="/login" state={{ data: email, password: password }} >
                    <button  type="submit" onClick={submit}>Submit</button> 
                </Link>

                <br /><br />
            </div>
        </form>
    );
}



