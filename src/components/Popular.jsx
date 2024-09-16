import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';


const Popular = () => {


    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
  
    const [popular, setpopular] = useState([]);
    const [page , setpage] = useState(1);
    const [hasMore ,sethasMore] = useState(true)
    document.title = "SCSDB | Popular"



    const GetPopular = async () => {
        try {
          const { data } = await axios.get(`${category}/popular?page=${page}`);
    
          // settrending(data.results)
          if(data.results.length > 0)
          {
            
                  setpopular((prevState)=>[...prevState, ...data.results])
                  setpage(page + 1);
    
          }else{
            sethasMore(false)
          }
         
    
        } catch (error) {
          console.log(error);
        }
      };



      
  const refershHandler = async () =>{

    if(popular.length === 0)
    {
      GetPopular()
    }else{
      setpage(1);
      setpopular([])
      GetPopular();
    }

  }


  useEffect(()=>{
    // GetTrending()
    refershHandler()
  } , [category ])


 


  return popular.length > 0 ?  (
    <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-scroll">
      <div className="w-full flex items-center">
        <h1 className="text-2xl text-zinc-400  font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] pe-2 duration-500 ri-arrow-left-line"
          ></i>
          Popular
        </h1>

        <span className="w-[120%]">
          <Topnav />
        </span>

        <Dropdown title="Category" options={["movie", "tv"]} func={(e)=>setcategory(e.target.value)} />
        <div className="w-[2%]"> </div>
        
      </div>

      <InfiniteScroll
      
      dataLength={popular.length}
      next={GetPopular}
      hasMore= {hasMore}
      loader={<h1>Loading..</h1>}
      
      
      >

        

      

       <Cards data={popular} title="popular" />
  
      </InfiniteScroll>


    </div>
  ) : <Loading/> ;
}

export default Popular