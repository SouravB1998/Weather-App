import "./App.css";

import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeLocation from "./components/TimeLocation";
import TemperaturDetails from "./components/TemperaturDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "kolkata" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [icon, setWeatherIcon] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";

      toast.info("Fetching weather for " + message.toLocaleUpperCase());

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}`
        );

        setWeatherIcon(data.icon);

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  console.log(icon.slice(2));

  const handleBg = () => {
    let dN = icon.slice(2);
    let weatherCode = icon.slice(0, 2);

    console.log(weatherCode);

    if (!weather) return "from-cyan-500 to-blue-900";

    if (dN === "n") {
      if (weatherCode === "01") {
        return "from-sky-600 to-indigo-900";
      } else if (weatherCode === "02" || weatherCode === "03") {
        return "from-cyan-600 to-stone-900";
      } else if (weatherCode === "04" || weatherCode === "50") {
        return "from-cyan-800 to-stone-900";
      } else if (weatherCode === "09" || weatherCode === "10") {
        return "from-cyan-800 to-stone-900";
      } else if (weatherCode === "11") {
        return "from-indigo-900 to-slate-900";
      } else if (weatherCode === "13") {
        return "from-cyan-500 to-indigo-900";
      }
    } else if (dN === "d") {
      if (weatherCode === "01") {
        return "from-cyan-500 to-blue-900";
      } else if (weatherCode === "02" || weatherCode === "03") {
        return "from-cyan-400 to-slate-800";
      } else if (weatherCode === "04" || weatherCode === "50") {
        return "from-sky-600 to-slate-900";
      } else if (weatherCode === "09" || weatherCode === "10") {
        return "from-gray-500 to-slate-900";
      } else if (weatherCode === "11") {
        return "from-red-600 to-blue-900";
      } else if (weatherCode === "13") {
        return "from-teal-500 to-blue-900";
      }
    }

    // if (dN === "n") {
    //   if (weatherCode === "50") {
    //     return "from-sky-600 to-indigo-900";
    //   }
    // }

    return "from-cyan-500 to-blue-900";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-14 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${handleBg()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeLocation weather={weather} />
          <TemperaturDetails weather={weather} unit={units} />
          <Forecast
            title="Hourly Forecast"
            items={weather.hourly}
            unit={units}
          />
          <Forecast title="Daily Forecast" items={weather.daily} unit={units} />
        </div>
      )}

      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
