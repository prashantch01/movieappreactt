import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';

const People = () => {

    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
  
    const [person, setperson] = useState([]);
    const [page , setpage] = useState(1);
    const [hasMore ,sethasMore] = useState(true)
    document.title = "SCSDB | People"

    

    const GetPerson = async () => {
        try {
          const { data } = await axios.get(`/person/${category}?page=${page}`);
    
          // settrending(data.results)
          if(data.results.length > 0)
          {
            
                  setperson((prevState)=>[...prevState, ...data.results])
                  setpage(page + 1);
    
          }else{
            sethasMore(false)
          }
         
    
        } catch (error) {
          console.log(error);
        }
      };


      const refershHandler = async () =>{

        if(person.length === 0)
        {
          GetPerson()
        }else{
          setpage(1);
          setperson([])
          GetPerson();
        }
    
      }
    


      useEffect(()=>{
        // GetTrending()
        refershHandler()
      } , [category ])
    
    



      return person.length > 0 ?  (
        <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-scroll">
          <div className="w-full flex items-center">
            <h1 className="inline-block text-2xl text-zinc-400  font-semibold">
              <i
                onClick={() => navigate(-1)}
                className="hover:text-[#6556CD] pe-2 duration-500 ri-arrow-left-line"
              ></i>
              People  
            </h1>
    
            <span className="w-[120%]">
              <Topnav />
            </span>
    

            <div className="w-[2%]"> </div>
            
          </div>
    
          <InfiniteScroll
          
          dataLength={person.length}
          next={GetPerson }
          hasMore= {hasMore}
          loader={<h1>Loading..</h1>}
          
          
          >
    
            
    
          
    
           <Cards data={person} title="person" />
      
          </InfiniteScroll>
    
    
        </div>
      ) : <Loading/> ;


}

export default People