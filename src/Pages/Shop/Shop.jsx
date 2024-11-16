import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCertificate } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import "./Shop.css"
import { useNavigate } from 'react-router-dom';
import { reducers } from '../../Store/Store';
import { useDispatch} from 'react-redux';

const Shop = () => {
    const selecotcate=useSelector(function (data) {
        return data.category
    })
    console.log(selecotcate);

    const selecotcatewise=useSelector(function (data) {
        return data.categorywise
    })
    console.log(selecotcatewise);

    const selecotcatewise1=useSelector(function (data) {
        return data.statefilter
    })
    console.log(selecotcatewise1);
   
    const navigate = useNavigate()
    let dispatch = useDispatch()
    const [filser, setfilser] = useState([])
    const [searchamt, setsearchamt] = useState([])
    const [searchcate, setsearchcate] = useState([])
    const [up, setup] = useState([])
    const [chgets, setchgets] = useState([])
    const [fichange, setfichange] = useState([])
    const [up1, setup1] = useState([])
    const [msg, setmsg] = useState("")
    const [ch1, setch1] = useState([])
    const [favs, setfavs] = useState(new Set())
    const [filter, setfilter] = useState([])
    const [search, setsearch] = useState("")
    const [onecart, setonecart] = useState([])
    const [max, setmax] = useState(0)
    const [selectcategory09, setselectcategory09] = useState(null)
    const selector = useSelector((data) => data.filterarrayspass)
    console.log(selector);

    const selector1 = useSelector((data) => data.filterarrayspass21)
    console.log(selector1);

    const selectormin = useSelector((data) => data.minvalue)
    console.log(selectormin);
    
    const selectormax = useSelector((data) => data.maxvalue)
    console.log(selectormax);
    const [serial, setserial] = useState([])
    // Set initial filter list on component mount or when selector1 changes
    useEffect(() => {
        setfilter(selector1)
        async function viewall(params) {
            try {
              let result = await axios.get("http://localhost:4000/category/viewall");
              console.log(result);
              let data123 = result.data.data;
              console.log(data123);
              setserial(data123);
            } catch (err) {}
          }
          viewall()
    }, [selector1,selector])
useEffect(() => {
  setmax(selectormin)
}, [selectormin])
useEffect(() => {
   if (selecotcatewise1!="") {
    let dtata=selector1.filter(function (data) {
        return data.categoryname==selecotcatewise1
      })
      console.log(dtata);
      setfilter(dtata)
   }
   else{
    setfilter(selector1)
   }
      
}, [selecotcatewise1])

let userid=localStorage.getItem('userid')
console.log(userid);
useEffect(() => {
  let fildata= selector1.find(function (data) {
    return data.categoryname
})
console.log(fildata);

}, [selecotcate])

    // Handle category selection
    function getname(event,event1) {
       
        
        if(event){
            setselectcategory09(event)
            console.log(event1);
            
            console.log(event);
            let filterdata = selector1.filter(function (data) {
                return data.categoryname === event
            })
            setmax(selectormin)
            console.log(filterdata);
            setfilter(filterdata)
            setup(filterdata)
            setup1(filterdata)
            setchgets(filterdata)
        }
       
    }
console.log(selectcategory09);

    // Filter products by Veg type
    function vegtypefilter() {
        console.log("Veg filter applied");
        let typefilters = selector1.filter(function (data) {
            return data.type.toLowerCase().trim() === "veg"
        })
        console.log(typefilters);
        setfilter(typefilters)
        console.log(filter);
        
        console.log(up);
        if (up.length!=0) {
            let filterdata = up.filter(function (data) {
                return data.type.toLowerCase().trim() === "veg"
                
            })
            setmax(selectormin)
            console.log(filterdata);
            console.log(filterdata);
            setfilter(filterdata)
            setch1(filterdata)
        }
        if (searchcate.length!=0) {
            let filtersear = searchcate.filter(function (data) {
                return data.type.toLowerCase().trim() === "veg"
                
            })
            setfilter(filtersear)
            setfilser(filtersear)
            setmax(selectormin)

        }
        

    }
    console.log(ch1);
    

    // Filter products by Non-Veg type
    function nonvegtypefilter() {
        console.log("Non-Veg filter applied");
        let typefilters1 = selector1.filter(function (data) {
            return data.type.toLowerCase().trim() === "nonveg"
        })
        console.log(typefilters1);
        setfilter(typefilters1)
        if (up.length!=0) {
            let filterdata = up.filter(function (data) {
                return data.type.toLowerCase().trim() === "nonveg"
                
            })
            setmax(selectormin)
            console.log(filterdata);
            console.log(filterdata);
            setfilter(filterdata)
            setch1(filterdata)
        }
        if (searchcate.length!=0) {
            let filtersear = searchcate.filter(function (data) {
                return data.type.toLowerCase().trim() === "nonveg"
                
            })
            console.log(filtersear);
            setfilser(filtersear)
            setfilter(filtersear)
            setmax(selectormin)
        }
       
    }

    // Handle search input changes
    function getvalues(e) {
        setsearch(e.target.value)
        const searchValue = e.target.value.toLowerCase().trim()

        // If search is empty, reset filter to show all products
        if (searchValue === "") {
            setfilter(selector1)
            setmax(selectormin)
            setsearchcate([])
        } else {
            // Filter products by matching product name or category name
            let searchfilters = selector1.filter(function (data) {
                return (
                    data.productname.toLowerCase().includes(searchValue) ||
                    data.categoryname.toLowerCase().includes(searchValue)
                )
            })
            setmax(selectormin)
            console.log(searchfilters);
            setfilter(searchfilters)
            setsearchamt(searchfilters)
            setsearchcate(searchfilters)
        }
    }
    console.log(searchcate);
    
    console.log(up1);
    console.log(chgets);
    
    function changerange(e) {
        let datset=parseInt(e.target.value)
        setmax(datset)
            let filtes=selector1.filter(function (data) {
                return (data.productprice>=selectormin && data.productprice<=datset)
            })
            console.log(filtes);
            setfilter(filtes)
            if (searchamt.length!=0) {
                let searchamt1=searchamt.filter(function (data) {
                    return (data.productprice>=selectormin && data.productprice<=datset)
                })
                setfilter(searchamt1)
               }
               if (filser.length!=0) {
                let fils=filser.filter(function (data) {
                    return (data.productprice>=selectormin && data.productprice<=datset)
                })
                setfilter(fils)
               }
        if (chgets.length!=0) {
            let filtesamtcate=chgets.filter(function (data) {
                return (data.productprice>=selectormin && data.productprice<=datset)
            })
            console.log(filtesamtcate);
            setfilter(filtesamtcate)
        }
        
      if (up1.length!=0) {
        let filtesamt=up1.filter(function (data) {
            return (data.productprice>=selectormin && data.productprice<=datset)
        })
        setfilter(filtesamt)
      }
       if (ch1.length!=0) {
        let filtesch=ch1.filter(function (data) {
            return (data.productprice>=selectormin && data.productprice<=datset)
        })
        setfilter(filtesch)
       }
     
        
    }
    function setfilters(params) {
        setmax(selectormin)
        setfilter(selector1)
        setch1([])
        setchgets([])
        setup1([])
setselectcategory09("")    }
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
    async function openmodel(event) {
        try{
            console.log("clkgnfdjkngjkxdngjdkbgkdjk");
            
            console.log("id",event);
            let result=await axios.get(`http://localhost:4000/product/viewone/${event}`);
            console.log(result.data.data);
        setonecart(result.data.data);
            console.log(onecart);
            let createhistory = await axios.post(`http://localhost:4000/history/create/${userid}/${event}`)
            console.log("data:",createhistory.data);
            dispatch(reducers.setmodel())
            dispatch(reducers.setonecarts(result.data.data))
        }
        catch(err){
            console.log(err);
            
        }
       
    }
    return (
        <div className='shopcart'>
          {selecotcatewise &&   <div className='shopcartleft'>
                <button onClick={() => setfilters(selector1)} className='refreshbtn'>Refresh</button>
                <div className='searchfilter'>
                    <h1>Search</h1>
                    <div className='serinput'>
                        <input
                            type="text"
                            value={search}
                            onChange={getvalues}
                            placeholder="Search by name or category"
                        />
                    </div>
                </div>
                <div className='amtfilter'>
                    <h1>Select Amount</h1>
<div className='se'>
<input type="range" min={selectormin} max={selectormax} value={max} onChange={changerange}/>
</div>                   <div className='spreds'>
<h1>{max}</h1>
<h1>{selectormax}</h1>
</div>
                </div>
                <div className='foodfilter'>
                    <h1>Select Type</h1>
                    <div className='food1'>
                        <button onClick={vegtypefilter}>VEG</button>
                        <button onClick={nonvegtypefilter}>NONVEG</button>
                    </div>
                </div>
                <div className='radiofilter'>
                    <h1>Select Category</h1>
                    <div className='radiofilter1'>
                        {serial.map((data) => {
                            return (
                               <div className='se1'onClick={() => getname(data.categoryname,data.type)}>
                                 <h5 key={data.categoryname} >
                                <span><p className={selectcategory09===data.categoryname ? "red1234":"blue1234"}></p></span>

                                    {data.categoryname}
                                </h5>
                               </div>
                            )
                        })}
                    </div>
                </div>
                
            </div>}
            <div className='shopcartright'>
                <div className='shopgrid'>
                    {filter.map(function (product) {
                        return (
                            <div className='product' key={product.id} style={{"position":"relative"}} onClick={()=>addtofav(product.id)} >
                                <FaHeart className={`heart ${favs.has(product.id) ? 'red' : 'green'}`} style={{"position":"absolute"}} />
                                <div className='productimg'>
                                    <img src={product.projectimg} alt={product.productname} />
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
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Shop
