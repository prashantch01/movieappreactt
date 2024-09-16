/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({data}) => {
    
  return (
    <div 
    style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://image.tmdb.org/t/p/original/${data.poster_path || data.profile_path})`,
      backgroundPosition: "center", // or top 10%
      backgroundSize: "cover"
    }} 
    className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'
  >
    <h1 className='text-5xl font-black text-white w-[70%]'>
        {data.name || data.original_name || data.title  || data.original_title }
    </h1>
    <p className='text-white mt-3 mb-3 w-[70%]'>
        {data.overview.slice(0 , 200)}...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-600'>more</Link> 
    </p>
    <p className='text-white'>
    <i className="text-yellow-600 ri-megaphone-fill"></i> {data.release_date || "No-Information"}
     <i className="text-yellow-600 ri-album-fill ms-2"></i> {data.media_type.toUpperCase()}
    
    </p>

    <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='p-5 mt-5 rounded-lg bg-blue-500 font-semibold text-white'>Watch Trailer</Link>
  </div> 

)
}

export default Header