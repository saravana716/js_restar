import { createSlice,configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";


let slice=createSlice({
    name:"slice",
    initialState:{
model:false,
viewone:[],
cartlengths:0,
cartarray:[],
fav:[],
    history:[],
    filterarrayspass:[],
    filterarrayspass21:[],
    minvalue:"",
    maxvalue:"",
    login:false,
    category:"",
    categorywise:true,
    statefilter:""
    },
    reducers:{
        mylogin(store,action){
            store.login=true
        },
        mycategories(store,action){
            store.categorywise=false
        },
        changewise(store,action){
            store.categorywise=action.payload
        },
        setmodel(store,action){
            store.model=true
        },
        closemodel(store,action){
            store.model=false
        },
        fav(store,action){
            console.log(action);
            store.fav=action.payload
            
        },
        history(store,action){
            console.log(action);
            store.history=action.payload
            
        },
        myfiltercategories(store,action){
            console.log(action);
            store.statefilter=action.payload
        },
        setonecarts(store,action){
            console.log(action);
            
            store.viewone=[action.payload]
            console.log(store.viewone);
            
        },
        cartlength(store,action){
            console.log(action);
            store.cartlengths=action.payload.lengths
            store.cartarray=action.payload.addcartdata
        },
        filterarrayspass12(store,action){
          console.log(action);
          store.filterarrayspass=action.payload
          
        },
        filterarrayspass121(store,action){
            console.log(action);
            store.filterarrayspass21=action.payload
            let mins=action.payload.map(function (data) {
                return data.productprice
            })
            let minimumvalue=Math.min(...mins)
            store.minvalue=minimumvalue
            let maximumvalue=Math.max(...mins)
            store.maxvalue=maximumvalue
          },
          catedispatch(store,action){
                console.log(action.payload);
                store.category=action.payload
          },
          changeselectors(store,action){
          }
    }
})


const persistConfig={
    key:"root",
    storage,
    whitelist:[
        "model",
        "viewone",
        "cartlengths",
        "cartarray",
        "fav",
        "history",
        "filterarrayspass",
        "filterarrayspass21",
        "minvalue",
        "maxvalue",
        "category",
        "categorywise"

    ]
}
const persistedReducer = persistReducer(persistConfig, slice.reducer);
const Store = configureStore({
  reducer: persistedReducer,
});
export let reducers=slice.actions

const persistor = persistStore(Store);

export { Store, persistor };