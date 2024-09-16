import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';

const Movie = () => {


    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
  
    const [movie, setmovie] = useState([]);
    const [page , setpage] = useState(1);
    const [hasMore ,sethasMore] = useState(true)
    document.title = "SCSDB | Movies"

    

    const GetMovie = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
    
          // settrending(data.results)
          if(data.results.length > 0)
          {
            
                  setmovie((prevState)=>[...prevState, ...data.results])
                  setpage(page + 1);
    
          }else{
            sethasMore(false)
          }
         
    
        } catch (error) {
          console.log(error);
        }
      };


      const refershHandler = async () =>{

        if(movie.length === 0)
        {
          GetMovie()
        }else{
          setpage(1);
          setmovie([])
          GetMovie();
        }
    
      }
    


      useEffect(()=>{
        // GetTrending()
        refershHandler()
      } , [category ])
    
    
     
    
    
      return movie.length > 0 ?  (
        <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-scroll">
          <div className="w-full flex items-center">
            <h1 className="inline-block text-2xl text-zinc-400  font-semibold">
              <i
                onClick={() => navigate(-1)}
                className="hover:text-[#6556CD] pe-2 duration-500 ri-arrow-left-line"
              ></i>
              Movies <small className='ml-7 text-xl text-zinc-600'> ({category}) </small> 
            </h1>
    
            <span className="w-[120%]">
              <Topnav />
            </span>
    
            <Dropdown title="Category" options={["popular", "top_rated" , "upcoming" , "now_playing"]} func={(e)=>setcategory(e.target.value)} />
            <div className="w-[2%]"> </div>
            
          </div>
    
          <InfiniteScroll
          
          dataLength={movie.length}
          next={GetMovie}
          hasMore= {hasMore}
          loader={<h1>Loading..</h1>}
          
          
          >
    
            
    
          
    
           <Cards data={movie} title="movie" />
      
          </InfiniteScroll>
    
    
        </div>
      ) : <Loading/> ;

  
}

export default Movie