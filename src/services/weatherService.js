import { DateTime } from "luxon";

const API_KEY = ; // Use your One Call weather API Key here
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json().then((data) => data));
};

const currentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, humidity, feels_like, temp_max, temp_min },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather: [{ description, icon }],
    wind: { speed },
  } = data;

  return {
    lat,
    lon,
    temp,
    humidity,
    feels_like,
    temp_max,
    temp_min,
    name,
    dt,
    country,
    sunrise,
    sunset,
    description,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentData = await getWeatherData(
    "weather",
    searchParams
  ).then(currentWeather);

  const { lat, lon } = formattedCurrentData;

  const formattedForecast = await getWeatherData("onecall", {
    lat,
    lon,
    units: searchParams.units,
    exclude: "current,minutely,alerts",
  }).then(formatForecastWeather);

  return { ...formattedCurrentData, ...formattedForecast };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
