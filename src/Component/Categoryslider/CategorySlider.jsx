import React, { useState, useEffect } from 'react';
import { FaCertificate } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import 'swiper/css';
import { FaHeart } from "react-icons/fa";
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import "../../Component/Product/Product.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reducers } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';
const CategorySlider = (props) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [productdata, setproductdata] = useState([]);
    const [categories, setCategories] = useState([]);
    const [onecart, setonecart] = useState([])
    const [msg, setmsg] = useState(false)
    const datas = props.sendcate[0].category;
    const [favs, setfavs] = useState(new Set())

let userids=localStorage.getItem('userid')
console.log(userids);

    useEffect(() => {
        if (datas && typeof datas === 'object') {
            // Get keys dynamically and store values in categories
            const allCategories = Object.keys(datas).map(key => ({
                key: key,
                value: datas[key]
            }));
            setCategories(allCategories);
        }
    }, [datas]);

    useEffect(() => {
        const productall = async () => {
            try {
                let result = await axios.get("http://localhost:4000/product/viewall");
                console.log(result.data.data);
                setproductdata(result.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        productall();
    }, []);
console.log(categories);
async function openmodel(event) {
    try{
        console.log("clkgnfdjkngjkxdngjdkbgkdjk");
        
        console.log("id",event);
        let result=await axios.get(`http://localhost:4000/product/viewone/${event}`);
        console.log(result.data.data);
    setonecart(result.data.data);
        console.log(onecart);
        let createhistory = await axios.post(`http://localhost:4000/history/create/${userids}/${event}`)
        console.log("data:",createhistory.data);
        dispatch(reducers.setmodel())
        dispatch(reducers.setonecarts(result.data.data))
    }
    catch(err){
        console.log(err);
        
    }
   
}
let userid=localStorage.getItem('userid');
console.log(userid);

async function addtofav(id) {
    try{

console.log(id);
let result=await axios.post(`http://localhost:4000/favorite/create/${userid}/${id}`)
console.log(result.data);
let productdata=result.data.data.productID
console.log(productdata);
setfavs((prev)=>new Set(prev).add(id))
if (productdata) {
    
}

    let cor=document.querySelector(".heart")
    console.log(cor);
    
    cor.classList.add("red")

    }
    catch(err){
        console.log(err);
        setmsg(err.response.data.message);

        
    }
    
}
async function createCart(id) {
    try{

console.log(id);
let result=await axios.post(`http://localhost:4000/addtocart/create/${userid}/${id}`)
console.log(result.data);


let productdata=result.data.data.productID
if (result.data) {
    let result=await axios.get(`http://localhost:4000/addtocart/viewonecart/${userid}`)
    console.log(result.data);
    let addcartdata=result.data.data
    let lengths=result.data.data.length
   dispatch(reducers.cartlength({lengths,addcartdata}))
}
console.log(productdata);
navigate("/addtocart")

   
    }
    catch(err){
        console.log(err);
        setmsg(err.response.data.message);

        
    }
    
}


console.log(msg);
console.log(favs);


    return (
        < >
        <h1 className='msg'>{msg}</h1>
            {/* Dynamically display each category key and value */}
            {categories.map((category, index) => (
                <div className='check1'>
                    <div key={index} className='check2'>
                    <h1>{category.key}</h1>
                    <div className='check'>
                    <Swiper
                           slidesPerView={4}
                           spaceBetween={30}
                           pagination={false}
                           autoplay={{
                               delay: 2500,
                               disableOnInteraction: false,
                           }}
                           modules={[Pagination, Autoplay]}
                           className="mySwiper"
                       >
                        {category.value.map((product, index) => (
                           
                               <SwiperSlide key={product.id}> {/* Ensure to use a unique key */}
                                   <div className='product'>
<FaHeart   className={`heart ${favs.has(product.id) ? 'red' : 'green'}`} onClick={()=>addtofav(product.id)}/>

                                       <div className='productimg'>
                                           <img src={product.projectimg} alt="" />

                                           <span>
                                               <FaCertificate className={product.type === "Veg" ? "greens" : "reds"} />
                                           </span>
                                       </div>
                                       <div className='productcont'>
                                           <h3>{product.productname}</h3>
                                           <div className='price'>
                                               <h3>Rs.{product.productprice}.00/-</h3>
                                               <del>Rs.{product.offprice}.00/-</del>
                                           </div>
                                           <p>{product.productdes}</p>
                                           <button onClick={()=>createCart(product.id)}>Add to Cart</button>
                                           <button onClick={()=>openmodel(product.id)}>View</button>
                                       </div>
                                   </div>
                               </SwiperSlide>
                      
                        ))}
                       </Swiper>

                    </div>
                </div>
                </div>
            ))}

            <div className='producthead'>
                <h1>Our Products</h1>

                <div className='producthead1'>
                    
                </div>
            </div>
        </>
    );
};

export default CategorySlider;
