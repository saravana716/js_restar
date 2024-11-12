import './App.css';
import AOS from 'aos';
import "aos/dist/aos.css";
import Categry from './Component/Category/Categry';
import Home from './Pages/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from './Store/Store';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Favorites from './Pages/Favorites/Favorites';
import History from './Pages/History/History';
import Addtocart from './Pages/Addtocart/Addtocart';
import Shop from './Pages/Shop/Shop';
function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  AOS.init();

  async function allCategory() {
    try {
      let result = await axios.get("http://localhost:4000/product/viewall");
      console.log(result);
      setData(result.data.data);
      selectCategory(result.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  function selectCategory(data) {
    const categoryMap = {};

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const categoryName = item.categoryname;

      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = []; // Initialize array if it doesn't exist
      }
      categoryMap[categoryName].push(item); // Add item to the respective category
    }

    console.log(categoryMap);
    setCategories(categoryMap); // Store categorized data
  }
console.log(categories);

  useEffect(() => {
    allCategory();
  }, []);
  const selector=useSelector(function (data) {
    return data.model
})
console.log(selector);
const selectorone=useSelector(function (data) {
  return data.viewone
})
console.log(selectorone);
const dispatch=useDispatch()
function closemodel(params) {
  dispatch(reducers.closemodel())
}
function open(params) {
  dispatch(reducers.setmodel())
} useEffect(() => {
  if (selector) {
    document.body.style.overflow = 'auto'; // Prevent background scroll
  } else {
    document.body.style.overflow = 'auto'; // Allow background scroll
  }
}, [selector]);
  return (
    <div className="App">
        <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home category={categories}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/fav' element={<Favorites/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/addtocart' element={<Addtocart/>}/>
        <Route path='/shop' element={<Shop/>}/>
    </Routes>
    </BrowserRouter>
   {selector &&   <div className='model' onClick={closemodel}>
      <div className='modelinner' onClick={(e)=>e.stopPropagation()}>
       {selectorone.map(function (data) {
        return( <div className='cartdemo'>
          <div className='viewone'>
          <img src={data.projectimg}/>
         

          </div>
        <div className='cartcontent12'>
           <h1>Type:{data.type}</h1>
          <h1>Category Name:{data.categoryname}</h1>
          <h1>Product Name:{data.productname}</h1>
          <h3>Price:{data.productprice}</h3>
          <h3>Price:<del>{data.offprice}</del></h3>
          <p>{data.productdes}</p>
        <button onClick={closemodel}>close</button>

        </div>  
        </div>
        )
       })}
      </div>
     </div>}
    </div>
  );
}

export default App;
