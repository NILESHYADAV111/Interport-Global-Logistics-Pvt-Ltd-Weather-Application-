import React, { useState } from "react";
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";

const WeatherCard = ({
  humidity,
  temperature,
  feels_temperature,
  description,
  city,
  icon,
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="  bg-white rounded-lg p-7">
      <div className="flex justify-center items-center flex-wrap gap-7 mt-4">
        <h2 className="text-2xl text-center font-bold">{city}</h2>
        {temperature && feels_temperature && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">°F</span>
            <div
              onClick={() => setChecked(!checked)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 
        ${checked ? "bg-blue-500" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
          ${checked ? "translate-x-6" : "translate-x-0"}`}
              />
            </div>
            <span className="text-sm font-semibold">°C</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-5 mt-4">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        )}

        {temperature && (
          <div className="text-2xl font-bold">
            <span>
              {checked
                ? (temperature - 273.15).toFixed(1) + "°C"
                : (((temperature - 273.15) * 9) / 5 + 32).toFixed(1) +
                  "°F"}{" "}
            </span>
          </div>
        )}
        {description && (
          <p className="font-semibold text-xl">
            {" "}
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </p>
        )}
      </div>

      <div className="flex justify-between flex-wrap mt-4">
        {feels_temperature && (
          <div className="flex flex-col items-center justify-center gap-2 mt-4 border border-gray-400 p-4 rounded-lg">
            <CiTempHigh size={36} />
            <div className="flex flex-col items-center">
              <span>
                {checked
                  ? (feels_temperature - 273.15).toFixed(1) + "°C"
                  : (((feels_temperature - 273.15) * 9) / 5 + 32).toFixed(1) +
                    "°F"}{" "}
              </span>
              <p>Feels like</p>
            </div>
          </div>
        )}
        {humidity && (
          <div className="flex flex-col items-center justify-center gap-2 mt-4 border border-gray-400 p-4 rounded-lg">
            <WiHumidity size={36} />
            <div className="flex flex-col items-center">
              <span>{humidity}%</span>
              <p>Humidity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
