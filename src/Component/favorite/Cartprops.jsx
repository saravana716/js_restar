import React from "react";
import "./Cartprops.css"
import logo from "../../Assets/about_4_1.png"
import { FaRegDotCircle } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { FaDotCircle } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
const Cartprops = (props) => {
    let fav=props.myfav
  return (
    <>
   {fav.map(function (data) {
    let isdata=data.product.type=="Veg"
    return(   <div className="carts">
        <div className="cartsimg">
          <img src={data.product.projectimg} alt="" />
        </div>
        <div className="cartscon">
          <div className="carttitle_head">
            <h1>{data.product.categoryname}</h1>
            <h1 className="indicator">{data.product.type}<span><FaDotCircle className={isdata?"notint":"indicator_dot"}/></span></h1>
          </div>
          <h2>{data.product.productname}</h2>
          <div className="carttitle">
            <del>Price: {data.product.productprice}</del>
            <h1>Offer Price: {data.product.offprice}</h1>
          </div>
          <p>
            {data.product.productdes}
          </p>
          <div className="extra_actions">
            <span><FaCartArrowDown /></span>
            <span><FaHeart /></span>
            <span><IoEye/></span>
          </div>
        </div>
      </div>)
   })}
    </>
  );
};

export default Cartprops;
