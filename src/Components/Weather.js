import React from "react";
import clear_icon from "../Components/Assets/clear.png";
import cloud_icon from "../Components/Assets/cloud.png";
import drizzle_icon from "../Components/Assets/drizzle.png";
import humidty_icon from "../Components/Assets/humidity.png";
import rain_icon from "../Components/Assets/rain.png";
import search_icon from "../Components/Assets/search.png";
import snow_icon from "../Components/Assets/snow.png";
import wind_icon from "../Components/Assets/wind.png";
import { useState, useEffect } from "react";
import Axios from "axios";

const Weather = () => {
  const [weatherFetch, setWeatherFetch] = useState({});
  const [search, setSearch] = useState("");
  const [wicon, setWicon] = useState(drizzle_icon);

  const searchInput = (event) => {
    setSearch(event.target.value);
  };

  const btnSearch = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8b9e94f66fc7b1320965b3a3fe41c6b4`;
    Axios.get(url)
      .then((res) => {
        setWeatherFetch(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("error fetching Location", error);
      });
  };

  return (
    <div>
      <div className="mt-5">
        <p className="text-6xl">
          WEATHER <span className="text-yellow-500 font-extrabold">APP</span>
        </p>
      </div>
      <div className="navBar flex justify-center mt-10">
        <input
          onChange={searchInput}
          type="text"
          className="w-64 h-14 text-center rounded-lg border-hidden"
          placeholder="Enter Location"
        />
        <button
          onClick={btnSearch}
          className="ms-4 hover:bg-red-500  bg-white w-10 rounded-xl"
        >
          <img className="ms-2" src={search_icon} />
        </button>
      </div>
      <div className="contentContainer">
        <div className="cloud flex justify-center">
          <img src={wicon} />
        </div>
        <div className="temp">
          <h1 className="text-6xl font-extrabold">
            {weatherFetch.main ? weatherFetch.main.temp + "°c" : "24°C"}
          </h1>
        </div>
        <div className="name mt-4">
          <h1 className="text-3xl">
            {weatherFetch.name ? weatherFetch.name : "Omi-Adio"}
          </h1>
          <h1 className="text-4xl">
            {weatherFetch.sys ? weatherFetch.sys.country : "NG"}
          </h1>
        </div>
        <div className="humidity_wind flex justify-center space-x-32 mt-14">
          <div className="humidty text-start ms-4">
            <img className="" src={humidty_icon} />
            <div>
              <p className="text-xl font-bold mt-3">
                {weatherFetch.main ? weatherFetch.main.humidity + "%" : "54%"}
              </p>
              <p className="text-lg">humidty</p>
            </div>
          </div>
          <div className="wind text-start ms-2">
            <img className="" src={wind_icon} />
            <div>
              <p className="text-xl font-bold mt-2">
                {weatherFetch.wind
                  ? weatherFetch.wind.speed + "km/h"
                  : "18km/h"}
              </p>
              <p className="text-lg">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
