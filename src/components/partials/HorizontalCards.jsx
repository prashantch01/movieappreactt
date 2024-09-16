import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import noimage from '/no_image.jpg'

const HorizontalCards = ({ data }) => {
  return (
  
     


      <div className="w-[100%]   flex overflow-y-hidden mb-5 p-5">
        {data.length > 0 ? data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[17%]  mr-5  bg-zinc-900 p-2 mb-5">

             <img className="w-full h-28" src={ d.backdrop_path || d.poster_path ?  `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}` : noimage } alt="" />

            <h1 className=" mt-3 text-xl font-black text-white w-[70%] overflow-y-auto">
              {d.name ||
                d.original_name ||
                d.title ||
                d.original_title}
            </h1>
            <p className="text-white mt-3 mb-3 w-[70%]">
              {d.overview.slice(0, 50 )}...
              <span className="text-zinc-600">more</span>
            </p>
          </Link>
        )) : <h1 className="text-3xl text-white mt-5 text-center font-black">Nothing to Show</h1>
        }
      </div>
   
  );
};

export default HorizontalCards;
