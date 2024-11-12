import React, { useState } from "react";
import logos from "../../Assets/about_4_2.png";
import "./Addtocart.css"
import { useSelector } from "react-redux";
const Addtocart = () => {
  const selectorlength=useSelector(function (data) {
    return data.cartlengths
  })
  console.log(selectorlength);
  const [count, setcount] = useState({})
  const selector=useSelector(function (data) {
    return data.cartarray
  })
  console.log(selector);
  function incresecount(id) {
    console.log(id);
   setcount(prevdata=>({
    ...prevdata,[id]:(prevdata[id]||1)+1
   }))
   console.log(id==count[id]);

  }
  function decresecount(id) {
    console.log(id);
   setcount(prevdata=>({
    ...prevdata,[id]:Math.max((prevdata[id]||1)-1,1)
   }))
  
  }
  const totalCost = selector.reduce((total, item) => {
    const productCount = count[item.product.id] || 1;
    console.log(productCount);
    
    return total + productCount * item.product.productprice;
  }, 0);
console.log(totalCost);

  // Calculate the number of items in the cart
  const totalItems = selector.reduce((total, item) => total + (count[item.product.id] || 1), 0);
console.log(totalItems);

  return (
    <>
      <div className="Addcart">
        <div className="Addcartleft">
         <div className="Addcartinners">
         <div className="Addcarttop">
            <h1>Shopping Cart</h1>
            <h1>{selectorlength} Items</h1>
            <h1>Total Quantity:{totalItems}</h1>
          </div>
          <div className="carttable">
           <div className="carttopinner">
           <div className="carttableinner">
            <h2>Product Details</h2>
            </div>
<div className="count">
<h2>Quantity</h2>
</div>  
<div className="price">
<h2>Price</h2>
</div>         
<div className="total">
    <h2>Total</h2>
    </div> 
    <div className="total">
    <h2>Delete</h2>
    </div>
    </div>         </div>
          {selector.map(function (data,index) {
            const productCount = count[data.product.id] || 1; 
            const productprice = data.product.productprice;
            const totalPrice = productCount * productprice; 
            return(<div className="carttablebottom" key={index}>
              <div className="carttableinner">
                <div className="carttableimg">
                  <img src={data.product.projectimg} alt="" />
                </div>
                <div className="cartcontent">
                  <h3>{data.product.categoryname}</h3>
                  <h3>{data.product.productname}</h3>
                  <h3>remove</h3>
                </div>
              </div>
              <div className="count">
                <h2 onClick={()=>decresecount(data.product.id)}>-</h2>
                <h4>{productCount}</h4>
                <h2 onClick={()=>incresecount(data.product.id)}>+</h2>
              </div>
              <div className="price">
                <h2>${data.product.productprice}/-</h2>
              </div>
              <div className="total">
                <h2>${totalPrice}/-</h2>
              </div>
              <div className="total">
               <button>Delete</button>
              </div>
              </div>)
          })}
          
          <div className="back">
            Continue Shopping
          </div>
         </div>
        </div>
        <div className="addtocartright">
        <div className="Addcarttop">
            <h1>Shopping Cart</h1>
            <h1>{selectorlength} Items</h1>
          </div>
          <div className="shop">
            <h3>Shopping</h3>
            <div className="delivery">
                <input type="text" placeholder="Standerd Delivery - $5.00"/>
                <button></button>
            </div>
          </div>
          <div className="shop">
            <h3>Promo Code</h3>
            <div className="delivery">
                <input type="text" placeholder="Enter Your Code"/>
            </div>
            <button>Apply</button>

          </div>
          <div className="checkout">
            <div className="checkout1">
                <h4>
            TOTAL COST

                </h4>
                <h4>${totalCost}</h4>
            </div>
            <button>CHECKOUT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtocart;
