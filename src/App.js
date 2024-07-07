import { useState } from "react";
import { useWeatherDaily } from "./useWeatherDaily.js";
import { Weather } from "./Weather.js";
import { Input } from "./Input.js";
import { Title } from "./Title.js";

export default function App() {
  const [location, setLocation] = useState("");
  const { isLoading, displayLocation, weather } = useWeatherDaily(location);

  return (
    <div className="app">
      <Title />
      <Input location={location} setLocation={setLocation} />
      {isLoading && <p className="loader">Loading...</p>}
      {weather.weathercode && (
        <Weather displayLocation={displayLocation} weather={weather} />
      )}
    </div>
  );
}
