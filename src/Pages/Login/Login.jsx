import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reducers } from '../../Store/Store';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setdata] = useState({Email:"",Password:""})

    function getdata(e) {
        const{name, value} = e.target
        setdata({...data, [name]:value})
    }
    console.log(data);
    
    async function Login(params) {
        try{
            let datacheck = {
                email:data.Email,
                password:data.Password
            }
            console.log(datacheck);
            
            let result=await axios.post(`http://localhost:4000/login/check`,datacheck)
            console.log(result.data);
                if (result.data.message =="Login successful") {
                    console.log(result.data.token);
                    
                   let mytoken= localStorage.setItem("token", result.data.token)
                   let myemail= localStorage.setItem("email", result.data.email)
                   let myid= localStorage.setItem("userid", result.data.id)
                   console.log(myemail);
                   
                   let result1=await axios.get(`http://localhost:4000/addtocart/viewonecart/
                    ${result.data.id}`)
                   console.log(result1.data);
                   let addcartdata=result1.data.data
                   let lengths=result1.data.data.length
                  dispatch(reducers.cartlength({lengths,addcartdata}))
                    navigate("/")
                    dispatch(reducers.mylogin())
                    console.log(mytoken);
                    
                }
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='login'>
        <div className='logininner'>
            <input type="text" placeholder='Email' name='Email' onChange={getdata}/>
            <input type="text" placeholder='Password' name='Password' onChange={getdata}/>
            <button onClick={Login}>Login</button>
        </div>
    </div>
  )
}

export default Login