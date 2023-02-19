import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items, unit }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className=" text-lg text-white uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between font-light">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center text-white">
            <p className="text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-10 my-1 filter brightness-200"
            />
            <p className="text-sm">
              {item.temp.toFixed()}° {unit === "metric" ? "C" : "F"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
