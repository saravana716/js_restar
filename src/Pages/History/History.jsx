import React from 'react'
import "./History.css"
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
const History = () => {
  const history = useSelector(function (data) {
    return data.history
  })
  console.log(history);
 
let dates=history.map(function (data) {
  return moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')
})
console.log(dates);
let dates1=history.map(function (data) {
  return moment(data.latestViewAt).format('MMMM Do YYYY, h:mm:ss a')
})
console.log(dates1);
  
  
  return (
    <>
    <div className='history'>
      <div className='history1'>
       {history.map(function (data) {
        return( <div className='historycart'>
          <img src={data.product.projectimg} alt="" />
        <div className='historydata'>
       <div className='his-top'>
        <div className='hisf'>
        <h1>{data.product.categoryname}</h1>
        <h1>{data.product.type}</h1>
        </div>
      
       <h4>{moment(data.latestViewAt).format('MMMM Do YYYY, h:mm:ss a')}</h4>

       </div>

          <div className='his-top2'>
          <h1>{data.product.productname}</h1>
         <div className='his-top1'> <h1><span>OffPrice:</span>{data.product.offprice}</h1>
         <h1><span>Price:</span>{data.product.productprice}</h1></div>
          </div>
          <p>{data.product.productdes}</p>
         <button>Delete</button>
        </div>
        </div>)
       })}
      </div>
    </div>
    </>
  )
}

export default History