import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from './Loading'

const Home = () => {

    document.title = " SCSDB || HomePage "

    const [wallpaper , setwallpaper] = useState(null)
    const [trending , settrening] = useState(null)
    const [category , setcategory] = useState("all")



    const GetHeaderWallpaper = async () =>{
        try {
            const {data} = await axios.get(`/trending/all/day`);

            let randomdata = data.results[(Math.random() * data.results.length).toFixed()]

            setwallpaper(randomdata)
           
           
            
        } catch (error) {
            console.log(error)
            
        }

    }




    const GetTrending = async () =>{
        try {
            const {data} = await axios.get(`/trending/${category}/day`);


            settrening(data.results)
           
           
            
        } catch (error) {
            console.log(error)
            
        }

    }
    

    useEffect(()=>{
        GetTrending()
     !wallpaper && GetHeaderWallpaper( )
    } , [category])

    console.log(trending)


  return wallpaper && trending ? (
       <>
       
       <Sidenav/>
       <div className='w-[80%] h-full bg-[#1F1E24] overflow-auto overflow-x-hidden'>
        <Topnav />
        <Header data={wallpaper} />


        <div className="p-5 flex justify-between">
        <h1 className="font-semibold text-zinc-400 text-3xl">Trending</h1>
         
      <Dropdown title="Filter" options={["tv" , "movie" , "all"]} func={(e)=>setcategory(e.target.value)} />
      </div>


        <HorizontalCards data={trending}/>
       </div>

       </>
  ) : <Loading />
}
 
export default Home

// primary  #1F1E24
//secondary #6556CD