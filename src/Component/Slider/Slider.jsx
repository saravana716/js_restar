import React from 'react'
import "./Slider.css"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import ball from "../../Assets/ball_1.svg"
import ball1 from "../../Assets/ball_2.svg"
import ball2 from "../../Assets/ball_3.svg"
import ball3 from "../../Assets/about_4_1.png"
import ball4 from "../../Assets/about_4_2.png"
import ball5 from "../../Assets/hero_offer_1.svg"
const Slider = () => {
  return (
    <>
    <div className='slider'>
    <div className='sliderright'>
        <p></p>
        <div className='social'>
        <FaFacebookF />
        <FaInstagram />
        <FaLinkedinIn />
            
        </div>
        <p></p>
    </div>
    <div className='slidercenter'>
        <div className='centerleft'>
            <div className='headtitle'>
                <p></p>
                <h1>Healthy & Quality</h1>
                <p></p>
            </div>
            <div className='ticon'  data-aos="fade-up">
            <h3>Fast Food</h3>
            <h5>Food Menu</h5>
            </div>
            <button>ORDER NOW</button>
        </div>
        <div className='centerright'>
            <img src={ball4} alt="" className='im5' data-aos="fade-bottom"  data-aos-duration="900"  data-aos-delay="700"/>
            <img src={ball3} alt="" className='im4' data-aos="fade-left" data-aos-duration="900"/>
            <img src={ball5} alt="" className='im6'/>

           <div className='hi'>
           <img src={ball} alt="" className='im1'/>
            <img src={ball1} alt="" className='im2'/>
            <img src={ball2} alt="" className='im3'/>
           </div>
        </div>
    </div>
    <div className='sliderright'>
        <p></p>
       <h2>B</h2>
       <h2>O</h2>
       <h2>O</h2>
       <h2>K</h2>

       <h2>T</h2>
       <h2>A</h2>
       <h2>B</h2>
       <h2>L</h2>
       <h2>E</h2>
      
        <p></p>
    </div>
    </div>
    </>
  )
}

export default Slider