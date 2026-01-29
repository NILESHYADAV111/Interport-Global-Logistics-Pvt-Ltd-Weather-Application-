const apiKey = import.meta.env.VITE_API_KEYS;
console.log(apiKey);

export const getWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
  );
  const data = await response.json();
  return data;
};
