import React from 'react'
import Slider from '../Component/Slider/Slider'
import Categry from '../Component/Category/Categry'
import Navbar from '../Component/Navbar/Navbar'
import Product from '../Component/Product/Product'
import CategorySlider from '../Component/Categoryslider/CategorySlider'

const Home = (props) => {
  console.log(props);
  let array=[props]
  console.log(array);
  
  return (
    <>
    <Navbar/>
    <Slider/>
    <Categry/>
    <CategorySlider sendcate={array}/>
  
    </>
  )
}

export default Home