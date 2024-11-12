import React, { useState } from 'react'
import "./Product.css"
import primg from "../../Assets/pata.png"
import { GoDotFill } from "react-icons/go";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect } from 'react';
import './Product.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
const Product = () => {
    const [productdata, setproductdata] = useState([])
    async function productall(params) {
        try{
let result=await axios.get("http://localhost:4000/product/viewall")
console.log(result.data.data);
setproductdata(result.data.data)


        }
    catch(err){

    }
    }
    useEffect(()=>{
        productall()
    },[])
    function addtocart(params) {
      
    }
  return (
    <>
  <div className='producthead'>
  <h1>Our Products</h1>

  <div className='producthead1'>
  <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={false}

        autoplay={{ // Enable autoplay
          delay: 2500, // Time between slides (in ms)
          disableOnInteraction: false, // Keep autoplay even after user interaction
      }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
       {productdata.map(function (data) {
        return( <SwiperSlide>
            <div className='product'>
            <div className='productimg'>
                <img src={data.projectimg} alt="" />
<span>
<GoDotFill className={data.type=="Veg"?"greens":"reds"}/>
</span>            </div>
            <div className='productcont'>
                <h3>{data.productname}</h3>
                <div className='price'>
                <h3>Rs.{data.productprice}.00/-</h3>
                <del>Rs.{data.offprice}.00/-</del>
                </div>
                <p>{data.productdes}</p>
                <button onClick={()=>addtocart()}>Add to Cart</button>
            </div>
        </div>
            </SwiperSlide>)
       })}
       
      </Swiper>
  </div>
  </div>

  
    </>
  )
}

export default Product