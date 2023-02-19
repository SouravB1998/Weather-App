import React, { useState } from "react";
import { UilSearch, UilMapMarker } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city) {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        setQuery({
          lon,
          lat,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row justify-center items-center w-3/4 space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          className="text-md font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          placeholder="search for city....."
          onKeyDown={handleKey}
        ></input>
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        <UilMapMarker
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={fetchCurrentLocation}
        />
      </div>
      <div className="flex flex-row justify-center items-center w-1/4 text-white text-lg font-medium">
        <button
          name="metric"
          className="transition ease-out hover:-translate-y-1"
          onClick={handleUnitChange}
          style={{ opacity: units === "metric" ? 1 : 0.7 }}
        >
          °C
        </button>
        <p className="mx-2">|</p>
        <button
          name="imperial"
          className="transition ease-out hover:-translate-y-1"
          onClick={handleUnitChange}
          style={{ opacity: units === "imperial" ? 1 : 0.7 }}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
