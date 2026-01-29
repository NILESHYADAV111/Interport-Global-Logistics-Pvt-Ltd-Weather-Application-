import React, { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import { getWeatherData } from "./api/weather";
import WeatherCard from "./components/WeatherCard";
import Button from "./components/Button";
import Loader from "./components/Loader";
import ErrorMessages from "./components/ErrorMessages";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("searchHistory")) || [];
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSearch = async (searchCity) => {
    const currentCity = searchCity || city;
    if (!currentCity.trim()) return;
    try {
      setIsLoading(true);
      const response = await getWeatherData(currentCity);
      setWeatherData(response);
      if (response?.cod === "404") {
        setError("City not found. Please try again");
        return;
      }
      setCity("");
      setError("");
      setShowDropdown(false);
      setSearchHistory((prev) => {
        const updatedHistory = [
          currentCity,
          ...prev.filter((c) => c !== currentCity),
        ].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    } catch (error) {
      console.log("errorerror", error);
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="max-w-[400px] mt-20 m-auto border boder-gray-200 rounded-lg p-4  shadow-2xl">
      <div>
        <div className="relative flex items-center justify-center gap-2 flex-wrap">
          <SearchBox
            className="outline-none border border-gray-400 py-1 px-2 rounded-lg w-full"
            type={"text"}
            placeholder={"Enter city"}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          <Button
            onClick={() => handleSearch()}
            className="  bg-blue-600 text-white h-8 w-20 rounded-lg flex justify-center items-center"
            text={"Search"}
            isLoading={isLoading}
          />

          {searchHistory.length > 0 && showDropdown && (
            <div
              className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-md z-10"
              onMouseDown={(e) => e.preventDefault()}
            >
              {searchHistory.map((c, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(c)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  {c}
                </button>
              ))}
              <button
                onClick={clearHistory}
                className="w-full text-left font-bold px-3 py-2 text-red-600 hover:bg-red-100"
              >
                Clear History
              </button>
            </div>
          )}
        </div>
        {error ? <ErrorMessages error={error} /> : ""}
        {isLoading ? (
          <Loader />
        ) : (
          <WeatherCard
            humidity={weatherData?.main?.humidity}
            temperature={
              weatherData?.main?.temp
                ? (weatherData.main.temp - 273.15).toFixed(1)
                : null
            }
            feels_temperature={
              weatherData?.main?.feels_like
                ? (weatherData.main.feels_like - 273.15).toFixed(1)
                : null
            }
            description={weatherData?.weather?.[0]?.description}
            city={weatherData?.name}
            icon={weatherData?.weather?.[0]?.icon}
          />
        )}
      </div>
    </div>
  );
};

export default App;
