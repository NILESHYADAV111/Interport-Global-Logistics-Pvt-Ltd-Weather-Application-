import React from "react";
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
  return (
    <div className="  bg-white rounded-lg p-7">
      <h2 className="text-2xl text-center font-bold">{city}</h2>
      <div className="flex flex-col items-center justify-center gap-5 mt-4">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        )}

        {temperature && (
          <div className="text-2xl font-bold">
            <span>{temperature}°C</span>
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
              <span>{feels_temperature}°C</span>
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
