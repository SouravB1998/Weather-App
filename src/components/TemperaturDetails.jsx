import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";

function TemperaturDetails({
  weather: {
    description,
    temp,
    feels_like,
    humidity,
    temp_max,
    temp_min,
    icon,
    speed,
    sunrise,
    sunset,
    timezone,
  },
  unit,
}) {
  const handleColor = () => {
    let dN = icon.slice(2);
    let weatherCode = icon.slice(0, 2);
    if (dN === "n") {
      if (weatherCode === "01") {
        return "text-sky-200";
      } else if (weatherCode === "02" || weatherCode === "03") {
        return "text-teal-200";
      } else if (
        weatherCode === "04" ||
        weatherCode === "50" ||
        weatherCode === "09" ||
        weatherCode === "10"
      ) {
        return "text-teal-200";
      } else if (weatherCode === "11") {
        return "text-indigo-200";
      } else if (weatherCode === "13") {
        return "text-cyan-200";
      }
    } else if (dN === "d") {
      if (
        weatherCode === "01" ||
        weatherCode === "04" ||
        weatherCode === "50"
      ) {
        return "text-sky-200";
      } else if (weatherCode === "02" || weatherCode === "03") {
        return "text-sky-200";
      } else if (weatherCode === "09" || weatherCode === "10") {
        return "text-gray-400";
      } else if (weatherCode === "11") {
        return "text-red-200";
      } else if (weatherCode === "13") {
        return "text-teal-200";
      }
    }

    // if (dN === "n") {
    //   if (weatherCode === "50") {
    //     return "text-sky-200";
    //   }
    // }
  };

  return (
    <div>
      <div
        className={`flex items-center justify-center py-5 text-md capitalize ${handleColor()}`}
      >
        {description}
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img
          src={iconUrlFromCode(icon)}
          className={`w-20 filter ${
            icon !== "01d" || icon.slice(0, 2) === "50"
              ? "invert"
              : "brightness-200"
          }`}
        />
        <p className="text-5xl">
          {temp.toFixed()}° {unit === "metric" ? "C" : "F"}
        </p>
        <div className="flex flex-col space-y-3">
          <div className="text-white text-sm flex flex-row justify-around">
            <UilTemperature size={20} className="mr-1" /> Feels Like:
            <span className="font-medium ml-1">{feels_like.toFixed()}°</span>
          </div>
          <div className="text-white text-sm flex flex-row justify-around">
            <UilTear size={20} className="mr-1" /> Humidity:
            <span className="font-medium ml-1">{humidity}%</span>
          </div>
          <div className="text-white text-sm flex flex-row justify-around">
            <UilWind size={20} className="mr-1" /> Wind:
            <span className="font-medium ml-1">{speed} km/h</span>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-row items-center justify-around py-3 space-x-2 text-sm ${handleColor()}`}
      >
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="ml-1 font-medium">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="ml-1 font-medium">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilArrowUp />
        <p className="font-light">
          High: <span className="ml-1 font-medium">{temp_max.toFixed()}°</span>
        </p>
        <p className="font-light">|</p>
        <UilArrowDown />
        <p className="font-light">
          Low: <span className="ml-1 font-medium">{temp_min.toFixed()}°</span>
        </p>
      </div>
    </div>
  );
}

export default TemperaturDetails;
