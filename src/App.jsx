import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import bgRain from "./assets/bg_rain.png";
import { Icon } from "@iconify/react";
import humidity from "./assets/icons8-humidity-96.png";
import air from "./assets/icons8-air.png";
import wind from "./assets/ph_wind.png";
import rain_gif from "./assets/rain-here-comes-the-rain.gif";
import normal_day from "./assets/normal.gif";
import sunny_day from "./assets/sunny.gif";
import fog_day from "./assets/fog.gif";
import snow_day from "./assets/snow.gif";
import thunderstorm_day from "./assets/thunderstorm.gif";
import rain_day from "./assets/raining.gif";
import brokenCloud_day from "./assets/broken_clouds.gif";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [disIcon, setDesIcon] = useState("");
  const slice = forecastData.slice(0, 5);
  const [bgTheme, setBgTheme] = useState(sunny_day);

  const apiKey = "b839c54e97e21904d8877a28f9ae433e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        // fetchForecastData(); // Call fetchForecastData after setting the weather data
      });
    }
  };

  useEffect(() => {
    if (data.coord && data.coord.lat && data.coord.lon) {
      fetchForecastData(); // Fetch forecast data only when data.coord is available
    }
  }, [data]);

  const fetchForecastData = () => {
    if (data.coord && data.coord.lat && data.coord.lon) {
      const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;

      axios.get(url2).then((res) => {
        setForecastData(res.data.list); // Set the forecast data list in state
        console.log("Forecast data:", res.data.list);
      });
    }
  };

  // const index = 0;

  const bg = {
    backgroundImage: `url(${bgTheme})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw", // Use '100vw' to represent 100% of the viewport width
    height: "100vh", // Use '100vh' to represent 100% of the viewport height
  };

  useEffect(() => {
    if (data.main && data.weather) {
      let icon = "sharp-cloud";

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          // Clear Sky
          icon = "ion:partly-sunny";
          setBgTheme(sunny_day);
          break;
        case "02d":
        case "02n":
          // Few Clouds
          icon = "ion:partly-sunny";
          setBgTheme(sunny_day);
          break;
        case "03d":
        case "03n":
          // Scattered Clouds
          icon = "ph:cloud-fog-fill";
          setBgTheme(normal_day);

          break;
        case "04d":
        case "04n":
          // Broken Clouds
          icon = "solar:clouds-bold";
          setBgTheme(normal_day);

          break;
        case "09d":
          // Broken Clouds
          icon = "fluent:weather-rain-showers-day-20-filled";
          setBgTheme(normal_day);
          break;
        case "09n":
          // Shower Rain
          icon = "fluent:weather-rain-showers-night-20-filled";
          setBgTheme(rain_gif);
          break;
        case "10d":
        case "10n":
          // Rain
          icon = "bi:cloud-rain-fill";
          setBgTheme(rain_day);
          break;
        case "11d":
        case "11n":
          // Thunderstorm
          icon = "bi:cloud-lightning-rain-fill";
          setBgTheme(thunderstorm_day);
          break;
        case "13d":
        case "13n":
          // Snow
          icon = "jam:cloud-snow-f";
          setBgTheme(snow_day);
          break;
        case "50d":
        case "50n":
          // Mist or Fog
          icon = "solar:fog-bold";
          setBgTheme(fog_day);
          break;
        default:
          // icon = "ri:cloud-fill";
          setBgTheme(sunny_day);
          break;
      }

      setDesIcon(icon);
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center" style={bg}>
      <div className="w-fit h-fit bg-slate-800 bg-opacity-[36%] rounded-[7px] backdrop-blur-[3.40px] pb-[40px] pt-[60px] px-[80px]">
        <div className="flex flex-col w-full gap-6 h-fit">
          <div className="flex relative h-fit pb-5 w-full">
            {" "}
            <div className="relative left-0  w-[20%]">
              {disIcon && (
                <Icon
                  icon={disIcon}
                  width={"90px"}
                  color="#D5D5D5"
                  className="mb-4"
                />
              )}
              <p className="text-white text-[28px] font-bold font-['Poppins']">
                {/* {data.main ? `${data.weather[0].main}` : "--"} */}
                {data.main && `${data.weather[0].main}`}
              </p>
              <p className="text-white text-[18px] font-normal font-['Poppins'] ">
                {/* {data.main ? `Country: ${data.sys.country}` : "-- Location"} */}
                {/* {data.main ? `${data.name}` : "-- Location"} */}
                {data.main && `${data.name}`}
              </p>
              <p className="text-white text-[45px] font-bold font-['Poppins'] w-fit ">
                {/* {data.main ? `${(data.main.temp - 273.15).toFixed(2)}` : "00"}°C */}
                {data.main && `${(data.main.temp - 273.15).toFixed(2)} °C`}
              </p>
              <p className="text-white text-[18px] font-normal font-['Poppins'] ">
                {/* {data.main
                  ? ` Feels like ${data.main.feels_like.toFixed()}`
                  : "00"} */}
                {data.main &&
                  ` Feels like ${(data.main.feels_like - 273.15).toFixed()} °C`}
              </p>
            </div>
            <div className="relative h-fit w-[60%] flex justify-center items-center flex-col ">
              {!data.main && (
                <div className="flex flex-col gap-2">
                  <h1 className="text-center text-white text-2xl font-semibold font-['Poppins']">
                    Weather App
                  </h1>
                  <p className="text-center w-[500px] text-white text-[13px] font-normal mb-10">
                    Get ahead of changing weather patterns - access accurate
                    forecasts and real-time updates from any location, anytime,
                    right at your fingertips.
                  </p>
                </div>
              )}
              <div className="border-b text-[#D5D5D5] flex gap-4 items-center w-fit ">
                <Icon
                  icon="ic:baseline-search"
                  width={"25px"}
                  color="#D5D5D5"
                />
                <input
                  type="text"
                  placeholder="Enter city name"
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={searchLocation}
                  value={location}
                  className="w-[243px] h-[47px] bg-transparent  focus:outline-none text-[#D5D5D5]"
                />
              </div>
              {/* <div className=" h-10  mt-[12%]">
                <p className="text-center text-white text-[64px] font-bold font-['Poppins']">
                  {data.main && `${data.name}`}
                </p>
              </div> */}
            </div>
            {data.main && (
              <div className="relative right-0 flex flex-col gap-4  w-[20%] ">
                <div>
                  <div className="flex gap-4">
                    {/* <Icon icon="ri:cloud-fill" width={"25px"} color="#D5D5D5" /> */}
                    <img src={humidity} width={"25px"} color="#D5D5D5" />
                    <p className="text-white text-xl font-normal font-['Poppins']">
                      Humidity
                    </p>
                  </div>
                  <p className="pl-10 text-white text-2xl font-semibold font-['Poppins']">
                    {/* {data.main ? `${data.main.humidity}` : "--"} */}
                    {data.main && `${data.main.humidity}`}
                  </p>
                </div>
                <div>
                  <div className="flex gap-4">
                    {/* <Icon icon="ri:cloud-fill" width={"25px"} color="#D5D5D5" /> */}
                    <img src={air} width={"25px"} color="#D5D5D5" />
                    <p className="text-white text-xl font-normal font-['Poppins']">
                      Air Pressure
                    </p>
                  </div>
                  <p className="pl-10 text-white text-2xl font-semibold font-['Poppins']">
                    {/* {data.main ? `${data.main.pressure}` : "--"} */}
                    {data.main && `${data.main.pressure}`}
                  </p>
                </div>
                <div>
                  <div className="flex gap-4">
                    {/* <Icon icon="ri:cloud-fill" width={"25px"} color="#D5D5D5" /> */}
                    <img src={wind} width={"25px"} color="#D5D5D5" />
                    <p className="text-white text-xl font-normal font-['Poppins']">
                      Wind Speed
                    </p>
                  </div>
                  <p className="pl-10 text-white text-2xl font-semibold font-['Poppins']">
                    {/* {data.main ? `${data.wind.speed} MPH ` : "--"} */}
                    {data.main && `${data.wind.speed} MPH `}
                  </p>
                </div>
              </div>
            )}
          </div>{" "}
          <div className="w-full h-fit flex  gap-5">
            {slice.map((elem, index) => {
              const dateTime = new Date(elem.dt_txt);
              let formattedDate = dateTime.toLocaleDateString();
              let formattedTime = dateTime.toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              });
              console.log("count:", index);

              return (
                <div
                  key={index}
                  className="w-[202.94px] h-full bg-slate-800 bg-opacity-[14px] rounded-[7px] shadow-10 hover:border border-[#848285] p-3 flex flex-col gap-2"
                >
                  <p className="text-white text-[20px] font-semibold font-['Poppins'] blur-[0px]">
                    {slice ? `${formattedTime}` : " "}
                  </p>
                  <p className="text-center text-white text-5xl font-bold font-['Poppins'] py-6">
                    {/* {(elem.main.temp - 273.15).toFixed(2)}°C */}
                    {slice ? `${(elem.main.temp - 273.15).toFixed()}` : ""}°C
                  </p>
                  <p className="text-white text-xl font-normal font-['Poppins']">
                    Feels like 30°C
                  </p>
                  <p className="text-white text-xs font-semibold font-['Poppins']">
                    {slice ? `${formattedDate}` : " "}
                  </p>
                </div>
              );
            })}
            {/* <div className="w-[202.94px] h-full bg-slate-800 bg-opacity-[14px] rounded-[7px] shadow-10 hover:border border-[#848285] p-3 flex flex-col gap-2">
              <p className="text-white text-[20px] font-semibold font-['Poppins'] blur-[0px]">
                2PM
              </p>
              <p className=" text-center text-white text-5xl font-bold font-['Poppins'] py-6">
                °C
              </p>
              <p className="text-white text-xl font-normal font-['Poppins']">
                Feels like 30°C
              </p>
              <p className="text-white text-xs font-semibold font-['Poppins']">
                2023-11-27
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// return (
//   <>
//     <div className="container">
//       <input
//         type="text"
//         placeholder="Enter city name"
//         onChange={(e) => setLocation(e.target.value)}
//         onKeyPress={searchLocation}
//         value={location}
//       />
//       <div className="top">
//         {data &&
//           data.name && ( // Check if data and data.name exist before rendering
//             <>
//               <div className="location">
//                 <p>{data.name}</p>
//               </div>
//               {data.main &&
//                 data.weather && ( // Check if data.main and data.weather exist before rendering
//                   <>
//                     <div className="temp">
//                       <h1>{data.main.temp}°F</h1>
//                     </div>
//                     <div className="description">
//                       <p>{data.weather[0].description} </p>
//                     </div>
//                   </>
//                 )}
//             </>
//           )}
//       </div>
//       <div className="bottom">
//         {data &&
//           data.main && ( // Check if data and data.main exist before rendering
//             <>
//               <div className="feels">
//                 <p>{data.main.feels_like}°F</p>
//               </div>
//               <div className="humidity">
//                 <p>{data.main.humidity}%</p>
//               </div>
//               <div className="wind">{data.wind.speed} MPH</div>
//             </>
//           )}
//       </div>
//     </div>
//   </>
// );
// }
