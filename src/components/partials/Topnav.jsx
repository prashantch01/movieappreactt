import axios from '../../utils/axios'
import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from '/no_image.jpg'

const Topnav = () => {

    const [query, setquery] = useState("")
    const [searches , setsearches] = useState([])




    const GetSeearches = async () =>{
        try {
            const {data} = await axios.get(`/search/multi?query=${query}`)
           
            setsearches(data.results)
            
        } catch (error) {
            console.log(error)
            
        }
     };
    
     useEffect(()=>{
    
        GetSeearches()
    
     } , [query])
 

  return (
    <div className='w-[50% ] h-[10vh] relative flex ml-[15%]  items-center'>
         <i className="text-zinc-400 text-3xl ri-search-line"></i>
        <input onChange={(e)=>setquery(e.target.value)}  value={query}  className='w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent' type="text" placeholder='search anything' />
        {query.length > 0 &&  <i onClick={()=>setquery("")} className="text-zinc-400 text-3xl ri-close-fill right-0"></i> }
       

        <div className='z-[100] absolute left-16 w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] rounded-lg overflow-auto'>

            {searches.map((s,i)=> <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600 font-semibold w-[100%] p-10 flex justify-start items-center  border-b-4 border-zinc-100'>
            <img className='w-[10vh] h-[10vh] objext-cover rounded mr-5 shadow-lg' 
            
            src={
                
                s.backdrop_path || 
                s.profile_path ?  `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage }
                alt="" />
            
            <span className='font-semibold'>
                {s.name || s.title || s.original_title || s.original_name} 
                </span>
            </Link>)}

            {/* <Link className='hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600 font-semibold w-[100%] p-10 flex justify-start items-center  border-b-4 border-zinc-100'>
            <img src="" alt="" />
            <span className='font-semibold'>Hello Everyone </span>
            </Link> */}

           

          

         

        </div>


          


    </div>
  )
}

export default Topnav