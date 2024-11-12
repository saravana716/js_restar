import axios from 'axios'
import React from 'react'
const Catefolder = () => {
    async function viewalladata(params) {
        try{
            let result = await axios.get("")
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <>
    
    </>
  )
}

export default Catefolder