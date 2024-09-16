/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const Tvdetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center", // or top 10%
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[200vh] px-[10%]   "
    >
      {/* part 1 navigation  */}
      <nav className="h-[10vh] w-full text-zinc-100 flex gap-10 items-center">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] pe-2 duration-500 ri-arrow-left-line"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* part 2 poster and Details  */}

      <div className="w-full flex">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]  h-[50vh] object-cover "
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title ||
              info.detail.title}

            <small className="font-semibold text-2xl text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className=" mt-3 mb-5 flex items-center font-semibold text-zinc-200 gap-x-5">
            <span className=" rounded-full bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center font-semibold">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <h1 className="w-[60px] font-semibold text-2xl leading-6  ">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="font-semibold text-xl italic text-white">
            {info.detail.tagline}
          </h1>

          <h1 className="text-xl font-semibold mt-5 mb-5">
            Overview :
            <p className="font-normal  text-lg"> {info.detail.overview} </p>
          </h1>

          <h1 className="text-xl font-semibold mt-5 mb-5">
            Tv Translations :
            <p className="font-normal mb-10  text-sm">
              {" "}
              {info.translations.join(" ")}{" "}
            </p>
          </h1>

          <Link
            className="font-semibold text-lg rounded-lg py-5 px-10 text-white bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            {" "}
            <i className="text-xl mr-2 ri-play-fill"> </i> Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3  */}

      <div className="w-[80%] flex flex-col gap-y-5 mt-10 ">
        <div className="mt-5">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-10 items-center py-5 text-white">
              <h1>Avalible on Platform </h1>

              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-lg object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-10 items-center py-5 text-white">
              <h1>Avalible for Rent </h1>

              {info.watchproviders.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-lg object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-10 items-center py-5 text-white">
              <h1>Avalible to Buy </h1>

              {info.watchproviders.buy.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] rounded-lg object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* {part 4 seasons } */}
      <hr className="mt-5 mb-5 border-none h-[2px] bg-zinc-500" />

      <h1 className="font-bold text-2xl text-white">Seasons</h1>

      <div className="w-[100%]   flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((s,i)=>(
          <div className="w-[15vh mr-[8%]">
           <img key={i}
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[14vw] h-[40vh] object-cover "
          src={`https://image.tmdb.org/t/p/original/${s.poster_path }`}
          alt=""
        />

        <h1 key={i} className="text-2xl text-zinc-400 mt-3 font-semibold ">
          {s.name || s.original_name || s.original_title || s.title}
        </h1>
          
          </div>

        )) : <h1 className="text-3xl text-white mt-5 text-center font-black">Nothing to Show</h1> }
       
      </div>

      {/* 
      <HorizontalCards
        data={
         info.detail.seasons
        }
      /> */}

      {/* part 5 recommandations */}
      <hr className="mt-5 mb-5 border-none h-[2px] bg-zinc-500" />

      <h1 className="font-bold text-2xl text-white">
        Recommendation & Similar Stuff
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;
