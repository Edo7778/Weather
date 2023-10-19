import React, { useState, useEffect } from "react";
import "./CurrentWeather.css";

function WeatherApp({ selCity }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "ba19a1e75ed84545301738a6e402f0ae";
  const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selCity}&appid=${apiKey}&units=imperial`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selCity}&appid=${apiKey}&units=imperial`;
  const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selCity}&appid=${apiKey}&units=imperial`;

  useEffect(() => {
    fetch(currentWeatherApiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError(error);
      });

    fetch(hourlyForecastUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const hourlyData = data.list.filter((item, index) => index % 8 === 0);
        setHourlyForecastData(hourlyData);
      })
      .catch((error) => {
        setError(error);
      });

    fetch(forecastUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setForecastData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [selCity]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-app">
      <h1 className="city-name">{selCity}</h1>
      <p className="temperature">Temperature: {weatherData.main.temp}</p>
      <p className="weather-description">
        Weather: {weatherData.weather[0].description}
      </p>

      <h2 className="forecast-title">Daily Weather</h2>
      <div className="forecast">
        {forecastData.list.map((forecastItem) => (
          <div className="forecast-item" key={forecastItem.dt}>
            <p className="forecast-date">
              {new Date(forecastItem.dt * 1000).toLocaleDateString()}
            </p>
            <p className="forecast-temperature">{forecastItem.main.temp}C</p>
          </div>
        ))}
      </div>
      <div className="hourly-forecast">
        {hourlyForecastData.map((forecastItem) => (
          <div key={forecastItem.dt} className="hourly-forecast-item">
            <p className="forecast-time">
              {new Date(forecastItem.dt * 1000).toLocaleTimeString()}
            </p>
            <p className="forecast-temperature">{forecastItem.main.temp}</p>
            <p className="forecast-weather-description">
              {forecastItem.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherApp;
