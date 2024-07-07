import { useState, useEffect } from "react";
import { convertToFlag } from "./starter";

export function useWeatherDaily(location) {
  const [isLoading, setIsloading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});
  console.log(convertToFlag("us"));

  useEffect(() => {
    if (location.length < 2) return setWeather({});
    const controller = new AbortController();
    const fetchWeather = async () => {
      try {
        setIsloading(true);
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          { signal: controller.signal }
        );
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Location not found!");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);

        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();

        setWeather(weatherData.daily);
      } catch (error) {
        if (error.name !== "AbortError") console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchWeather();
    return function () {
      controller.abort();
    };
  }, [location]);

  return { isLoading, displayLocation, weather };
}
