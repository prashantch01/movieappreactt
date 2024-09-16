/* eslint-disable no-unused-vars */
 import React from 'react'
 import notfound from "/notfound.gif"
 
 const Notfound = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-black'>
    
            <img className='h-[50%] object-cover' src={notfound} alt="" />
    
        </div>
      )
 }
 
 export default Notfound