import React from 'react'
import { useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Adjusted imports
import { useRef } from 'react'
import app from "../../Component/Firebase/Firebase"; // Make sure to import your Firebase app initialization
import axios from 'axios';
import "./Register.css"
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const imageref=useRef()
    const [data, setData] = useState(false)
    const [getval, setgetval] = useState({firstname:"", lastname:"",email:"",password:"",userimg:"",pnumber:"",apnumber:"",add:"",altadd:"",dateof:"",usercate:""})
    async function getData(e) {
        try {
          const name = e.target.name;
    
          const value =
            e.target.type === "file" ? e.target.files[0] : e.target.value; // Check input type
          console.log({ name: value });
    
          if (name === "userimg" && value) {
            setData(true);
            const storage = getStorage(app);
            const storageRef = ref(storage, "images/" + value.name);
            await uploadBytes(storageRef, value);
            const downloadURL = await getDownloadURL(storageRef);
            console.log(downloadURL);
            setgetval({ ...getval, [name]: downloadURL }); // Update the image URL in state
          } else if (name === "firstname") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
           else if (name === "lastname") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "email") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "password") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "userimg") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "pnumber") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "apnumber") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "add") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "altadd") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "dateof") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }
          else if (name === "usercate") {
            setgetval({ ...getval, [name]: value }); // Update the category name in state
          }


        } catch (err) {
          console.log(err);
        } finally {
          setData(false);
        }
      }
    // function getdata(e) {
    //     const names=e.target.name
    //     const values=e.target.value
    //     setdata({...data,[names]:values})
    // }
    console.log(getval);
    function uploadimgae(data) {
        console.log(data);
        if (data.current) {
        data.current.click()
            
        }
        
    }

    async function register(params) {
        try{
            let data={
                firstname:getval.firstname,
                lastname:getval.lastname,
                email:getval.email,
                password:getval.password,
                userimg:getval.userimg,
                phone:getval.pnumber,
                alterphone:getval.apnumber,
                address:getval.add,
                alteraddress:getval.altadd,
                dateofbirth:getval.dateof,
                usercate:getval.usercate
            }
            console.log(data);
            
let result=await axios.post(`http://localhost:4000/login/create`,data)
console.log(result.data);
if (result.data.message=="Success") {
    navigate("/login")
}
        }
        catch(err){
            console.error(err);
        }
    }
  return (
    <>
    <div className='register'>
        <div className='registerInner'>
          <div className='rightinner'>
            <div className='titles'>
              <h1>Looks like you're new here!</h1>
              <p>Create an account and enjoy our food delivery service.</p>
            
            </div>
         <div className='inputs'>
         <input type="text" name='firstname' placeholder='Firstname' onChange={getData}/>
            <input type="text" name='lastname' placeholder='Lastname'onChange={getData}/>
            <input type="text" name="email" placeholder='Email'onChange={getData}/>
            <input type="text" name='password' placeholder='Password'onChange={getData}/>
            <input type="text" name='pnumber' placeholder='Enter Phone Number'onChange={getData}/>
            <input type="text" name='apnumber' placeholder='Altrate Phone Number'onChange={getData}/>
            <input type="text" name='add' placeholder='Enter Address'onChange={getData}/>
            <input type="text" name='altadd' placeholder='Altrate Address'onChange={getData}/>
            <input type="date" name='dateof' placeholder='Date of Birth'onChange={getData}/>
            <select name="usercate" id="" onChange={getData}>
              <option value="">None</option>
              <option value="Veg">Vegetarian</option>
              <option value="Non-veg">Vegen</option>
              <option value="Gluten-Free">Gluten-Free</option>
            </select>
         </div>
           <div className='imgsec'>
          
           <div className='imgselect'>
<span>
<h1 onClick={()=>uploadimgae(imageref)}>+</h1>
</span>            <input type="file" name='userimg' ref={imageref} style={{display:"none"}} placeholder='Userimg' onChange={getData}/>
<img src="" alt="" />
           
            <button disabled={data}>
                  {data ? "upload" : "upload image"}
                </button>
           </div>
           {getval && 
<img src={getval.userimg} alt="" className='userimages'/>
            }
           </div>
               <div className='terms'>
               <input type="checkbox" name="terms"/>
               <p>I agree to the terms and conditions.</p>
               </div>
            <button onClick={register}>Register</button>
            <div className='foots'>
            <p>Already have an account? <a href="/login">Log In</a></p>
            <p><a href="/forgot-password">Forgot your password?</a></p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Register