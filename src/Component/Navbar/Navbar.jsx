import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { ImSpoonKnife } from "react-icons/im";
import { BsCartCheck } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import app from "../../Component/Firebase/Firebase"; // Make sure to import your Firebase app initialization
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Adjusted imports
import logo from "../../Assets/logo-white.svg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { reducers } from "../../Store/Store";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [btn, setbtn] = useState(false);
  const [profile, setprofile] = useState(false);
  const [hide, sethide] = useState(false);
  const [data, setData] = useState(false)
  // const [fav, setfav] = useState([])
  const imageref=useRef()
  const [editval, seteditval] = useState({firstname:"", lastname:"",userimg:"",pnumber:"",apnumber:"",add:"",altadd:"",dateof:"",usercate:""})
const selector=useSelector(function (data) {
  return data.cartlengths
})
console.log(selector);

  const [hidess, sethidess] = useState(false);
  const [editpro, seteditpro] = useState(false)
  const [changestate, setchangestate] = useState("Close Profile")
  const [changestate1, setchangestate1] = useState("Edit Profile")
  function displaylist(event) {
    console.log(event);
    sethide(event);
  }
  function closediv(event) {
    console.log(event);
    sethide(false);
  }
  function opendiv(params) {
    sethidess(!hidess);
  }
  function movepage(params) {
    navigate("/register");
  }
  let token = localStorage.getItem("token");
  let userid = localStorage.getItem("userid");
  console.log(token);
  function logout(params) {
    alert("You have logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
    dispatch(reducers.cartlength(0))
  }

  function gotologin(params) {
    let data = localStorage.getItem("token");
    if (data) {
      alert("already login");
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  let mytoken = localStorage.getItem("token");
  let myemail = localStorage.getItem("email");
  useEffect(() => {
    if (mytoken) {
      setbtn(true);
    }
  }, [mytoken]);

  async function openProfile() {
    try {
      let result = await axios.get(`http://localhost:4000/login/all`);
      console.log(result.data); // Check if data is received properly

      let gets = result.data.data; // Adjust if necessary based on your data structure
      console.log("Received tokens:", gets);

      let gettoken = gets.filter(function (data) {
        return data.email === myemail;
      });

      console.log("Filtered data:", gettoken);
      setuser(gettoken);
      if (gettoken.length > 0) {
        // Do something with the filtered token data
      } else {
        console.log("No matching token found");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    sethidess(false);
    setTimeout(() => {
      setprofile(!profile);
    }, 1000);
  }

  function closeprofile(params) {
    setprofile(!profile);
  }
  function backprofile(params) {
    seteditpro(!editpro)
    setchangestate("Close Profile");
    setchangestate1("Edit Profile");
  }
  function editprofile(params) {
    seteditpro(!editpro)
    setchangestate("Back Profile")
    setchangestate1("Update Profile")
    console.log("userdat",user);
    seteditval({firstname:user[0]?.firstname ||"", lastname:user[0]?.lastname || "", userimg:user[0]?.userimg ||"", pnumber:user[0]?.phone||"", apnumber:user[0]?.alterphone||"", add:user[0]?.address||"", altadd:user[0]?.alteraddress||"", dateof:user[0]?.dateofbirth||"", usercate:user[0]?.usercate||""})
    
  }
  console.log(editval);
  
  async function updateprofile(event) {
    try{
      console.log(event);
      
    seteditpro(!editpro)
    let userid=user[0].id
    console.log(userid);
    
      let data=await axios.put(`http://localhost:4000/login/update/${userid}`,editval)
console.log(data.data);
setchangestate("Close Profile");
setchangestate1("Edit Profile");
openProfile()

    }
    catch(error){
      console.log(error);
    }
  }
  function uploadimgae(data) {
    console.log(data);
    if (data.current) {
    data.current.click()
        
    }
    
}
async function editData(e) {
  try{
  const name=e.target.name
  const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

  // const value=e.target.type==="file" ? e.target.files[0]:e.terget.value
  if (name === "userimg" && value) {
    setData(true);
    const storage = getStorage(app);
    const storageRef = ref(storage, "images/" + value.name);
    await uploadBytes(storageRef, value);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    seteditval({ ...editval, [name]: downloadURL });
  }
  else if (name === "firstname") {
    seteditval({...editval, [name]: value });
  }
  else if (name === "lastname") {
    seteditval({...editval, [name]: value });
  }
  else if (name === "pnumber") {
    seteditval({...editval, [name]: value });
  }
  else if (name === "apnumber") {
    seteditval({...editval, [name]: value });
  }
  else if (name === "add") {
    seteditval({...editval, [name]: value });
  }
  else if (name === "altadd") {
    seteditval({...editval, [name]: value });
  }
  else if (name === "dateof") {
    seteditval({...editval, [name]: value });
  }
  else if (name === "usercate") {
    seteditval({...editval, [name]: value });
  }
}
catch(err){
console.log(err);

}
}


async function favorites(params) {
  try{
    let result=await axios.get(`http://localhost:4000/favorite/viewonecart/${userid}`)
    console.log(result.data.data);
    
    // setfav(result.data.data)
    navigate("/fav")
    dispatch(reducers.fav(result.data.data))

  }
  catch(err){
    console.log(err);
  }
  
}
async function history(params) {
  try{
    let result=await axios.get(`http://localhost:4000/history/viewonehistory/${userid}`)
    console.log(result.data.data);
    
    // setfav(result.data.data)
    navigate("/history")
    dispatch(reducers.history(result.data.data))

  }
  catch(err){
    console.log(err);
  }
  
}

async function movecartpage(params) {
  try{
navigate("/addtocart")
  }
  catch(err){
    console.log(err);
  }
}

async function openproductpage(params) {
  try{
    let result = await axios.get(`http://localhost:4000/category/viewall`)
    console.log(result.data);
                    let filterarrayspass=result.data.data
                    console.log(filterarrayspass);
                    
                    let result1 = await axios.get(`http://localhost:4000/product/viewall`)
                    console.log(result1.data);
                                    let filterarrayspass123=result1.data.data
                                    console.log(filterarrayspass123);
                    dispatch(reducers.filterarrayspass121(filterarrayspass123))
  navigate("/shop")
    dispatch(reducers.changewise("true"))
    dispatch(reducers.myfiltercategories(""))
                    }
                    catch(err){
                        console.log(err);
                    }
}
 
  return (
    <>
      <div className="navbar">
        <div className="navbarimg">
          <img src={logo} alt="" />
        </div>
        <div className="navlist">
          <ul
            onMouseOver={() => displaylist("f1")}
            onMouseLeave={() => closediv("f1")}
          >
            Home{" "}
            <div className="btns">
              <span className="inc">+</span>
              <span className="dec">-</span>
            </div>
            <div className={hide == "f1" ? "nav1" : "nav2"}>
              <div className="sidelist">
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Restaurant Shop</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Fast Food</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Restaurant</li>
                </div>
              </div>
            </div>
          </ul>
          <ul
            onMouseOver={() => displaylist("f2")}
            onMouseLeave={() => closediv("f1")}
          >
            Pages{" "}
            <div className="btns">
              <span className="inc">+</span>
              <span className="dec">-</span>
            </div>
            <div className={hide == "f2" ? "nav1" : "nav2"}>
              <div className="sidelist">
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Restaurant Shop</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Fast Food</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Restaurant</li>
                </div>
              </div>
            </div>
          </ul>
          <ul
            onMouseOver={() => displaylist("f3")}
            onMouseLeave={() => closediv("f1")}
          >
            Menus{" "}
            <div className="btns">
              <span className="inc">+</span>
              <span className="dec">-</span>
            </div>
            <div className={hide == "f3" ? "nav1" : "nav2"}>
              <div className="sidelist">
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Restaurant Shop</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Fast Food</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Restaurant</li>
                </div>
              </div>
            </div>
          </ul>
          <ul
            onMouseOver={() => displaylist("f4")}
            onMouseLeave={() => closediv("f1")}
            onClick={openproductpage}
          >
            Shop{" "}
            <div className="btns">
              <span className="inc">+</span>
              <span className="dec">-</span>
            </div>
            <div className={hide == "f4" ? "nav1" : "nav2"}>
              <div className="sidelist">
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Restaurant Shop</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Fast Food</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Restaurant</li>
                </div>
              </div>
            </div>
          </ul>
          <ul
            onMouseOver={() => displaylist("f5")}
            onMouseLeave={() => closediv("f1")}
          >
            Blog{" "}
            <div className="btns">
              <span className="inc">+</span>
              <span className="dec">-</span>
            </div>
            <div className={hide == "f5" ? "nav1" : "nav2"}>
              <div className="sidelist">
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Restaurant Shop</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Fast Food</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Restaurant</li>
                </div>
              </div>
            </div>
          </ul>
          <ul
            onMouseOver={() => displaylist("f6")}
            onMouseLeave={() => closediv("f1")}
          >
            Contact{" "}
            <div className="btns">
              <span className="inc">+</span>
              <span className="dec">-</span>
            </div>
            <div className={hide == "f6" ? "nav1" : "nav2"}>
              <div className="sidelist">
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Restaurant Shop</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Fast Food</li>
                </div>
                <div className="list">
                  <ImSpoonKnife className="spoon" />

                  <li>Home Restaurant</li>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div className="search">
          <div className="searchbar">
            <input type="text" placeholder="Enter Keyword" />
            <ImSearch className="se" />
          </div>
          <div className="cart" onClick={movecartpage}>
            <BsCartCheck className="carticon" />
            <p>{selector}</p>
          </div>
          <div className="conatct">
            <div className="contact1">
              <FaPhone />
              <h1>+98778678755</h1>
            </div>
            <h4>Contact us for reservation</h4>
          </div>
          <div className="burger">
            <IoMenu className="burgericon" onClick={opendiv} />
          </div>
        </div>
        <div className={hidess ? "sliderbar" : "slidebar"}>
          {!btn && <h1 onClick={movepage}>Register</h1>}
          {btn && <h1 onClick={openProfile}>Profile</h1>}{" "}
          {!btn && <h1 onClick={gotologin}>Login</h1>}
          {btn && <h1 onClick={favorites}>Favorites</h1>}
          {btn && <h1 onClick={history}>View History</h1>}
          {btn && <h1 onClick={logout}>Logout</h1>}
        </div>
        <div className={profile ? "openuser" : "userProfile"}>
          {user.map(function (data) {
            return (
              <div className="centerdiv">
                <div className="pro">
                  <img src={data.userimg} alt="" />
                </div>
                <div className="fl">
                  <h1>Username:</h1>
                  <h1>
                    {data.firstname} {data.lastname}
                  </h1>
                </div>
                <div className="fl">
                  <h1>Phone-Number:</h1>
                  <h1>{data.phone}</h1>
                </div>
                <div className="fl">
                  <h1>Alter Number:</h1>
                  <h1>{data.alterphone}</h1>
                </div>
                <div className="fl">
                  <h1>Address:</h1>
                  <h1>{data.address}</h1>
                </div>
                <div className="fl">
                  <h1>Alter Address:</h1>
                  <h1>{data.alteraddress}</h1>
                </div>
                <div className="fl">
                  <h1>Date-of-Birth:</h1>
                  <h1>{data.dateofbirth}</h1>
                </div>
                <div className="fl">
                  <h1>Your Categoery:</h1>
                  <h1>{data.usercate}</h1>
                </div>{" "}
              </div>
            );
          })}
          <div className={editpro? "editprofiles1":"editprofiles"}>
          <div className="editinputs">
            <input type="text" placeholder="Enter Firstname" name="firstname" onChange={editData} value={editval.firstname}/>
            <input type="text" placeholder="Enter Lastname" name="lastname" onChange={editData} value={editval.lastname}/>
          </div>
          <div className="editinputs">
            <input type="text" placeholder="Enter Phone Number" name="pnumber" onChange={editData} value={editval.pnumber}/>
            <input type="text" placeholder="Enter Altrate Phone Number" name="apnumber" onChange={editData} value={editval.apnumber}/>
          </div>
          <div className="editinputs">
            <input type="text" placeholder="Enter Address" name="add" onChange={editData} value={editval.add}/>
            <input type="text" placeholder="Enter Altrate Address" name="altadd" onChange={editData} value={editval.altadd}/>
          </div>
          <div className="editinputs">
          <input type="date" name='dateof' placeholder='Date of Birth' onChange={editData} value={editval.dateof}/>
            <select name="usercate" id="" onChange={editData} value={editval.usercate}>
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
</span>            <input type="file" name='userimg' ref={imageref} style={{display:"none"}} placeholder='Userimg' onChange={editData}/>
<img src="" alt="" />
          
           <button disabled={data}>
                 {data ? "upload" : "upload image"}
               </button>
          </div>
          {editval && 
<img src={editval.userimg} alt="" className='userimages'/>
           }
          </div>
          </div>
          <div className="flbtn">
          <button onClick={changestate=="Close Profile"?closeprofile:backprofile}>{changestate}</button>
          <button onClick={changestate1=="Edit Profile"?editprofile:updateprofile}>{changestate1}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
