import React from "react";
import { useState,useEffect } from "react";
import {useNavigate}from "react-router-dom";

const Login =()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate =useNavigate();
    const [error, setError] = useState("");

   
    useEffect(()=>{
        const authr = localStorage.getItem('user');
        if(authr)
        {
            navigate('/');
        }
    });
   
    const handlelogin=async ()=>
    {
        if (!email || ! password) {
            setError(true);
            return false;

        }
      
        try{
        let result = await fetch('http://localhost:3000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'content-type':'application/json'
            }
        });
            result = await result.json();
            console.warn(result);

            if(result.auth)
            {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));

            navigate('/')
            }else{
                alert("Please Enter Correct Details");
            }
       
    } catch (error) {
        alert(error.message);
      }
    }
    return (
        <div className="register">
            <h1 className="login-head">Login</h1>
            <input className="inputBox" type="text" value={email}
             onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email"/>
                {error && !email && <span className="invalid-input">Enter valid Username</span>}

             <input className="inputBox" type="password" value ={password}
             onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password"/>
                {error && !password && <span className="invalid-input">Enter valid Password</span>}

            <button className="app-Button" type="button" onClick={handlelogin} >Login</button>

        </div>
    )
}
export default Login;