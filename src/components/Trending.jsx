import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page , setpage] = useState(1);
  const [hasMore ,sethasMore] = useState(true)
  document.title = "SCSDB | Trending "

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      // settrending(data.results)
      if(data.results.length > 0)
      {
        
              settrending((prevState)=>[...prevState, ...data.results])
              setpage(page + 1);

      }else{
        sethasMore(false)
      }
     

    } catch (error) {
      console.log(error);
    }
  };


  const refershHandler = async () =>{

    if(trending.length === 0)
    {
      GetTrending()
    }else{
      setpage(1);
      settrending([])
      GetTrending();
    }

  }


  useEffect(()=>{
    // GetTrending()
    refershHandler()
  } , [category , duration])

  // console.log(trending)

  return trending.length > 0 ?  (
    <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-scroll">
      <div className="w-full flex items-center">
        <h1 className="text-2xl text-zinc-400  font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] pe-2 duration-500 ri-arrow-left-line"
          ></i>
          Trending
        </h1>

        <span className="w-[120%]">
          <Topnav />
        </span>

        <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e)=>setcategory(e.target.value)} />
        <div className="w-[2%]"> </div>
        <Dropdown title="Duration" options={["week", "day"]} func={(e)=>setduration(e.target.value)} />
      </div>

      <InfiniteScroll
      
      dataLength={trending.length}
      next={GetTrending}
      hasMore= {hasMore}
      loader={<h1>Loading..</h1>}
      
      
      >

        

      

       <Cards data={trending} title="trending" />
  
      </InfiniteScroll>


    </div>
  ) : <Loading/> ;
};

export default Trending;
