import { useState } from 'react';
import { fetchWeather } from './api/fetch-weather';
import './App.css';
import { Weather } from './types/weather';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({} as Weather);

  const search = async () => {
    const data = await fetchWeather(query);
    setWeather(data);
    setQuery('');
  }

  const { main, name, sys, weather: weatherEntity } = weather;

  return (
    <div className="main-container">
      <input type="text" className="search" placeholder="Enter City" value={query}
        onChange={(e) => setQuery(e.target.value)} onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            search();
          }
        }}
        onSubmit={search}
      />
      {main && (
        <div className="city">
          <h2 className="city-name">
            <span>{name}</span>
            <sup>{sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(main.temp)}
            <sup>&deg;C</sup>
          </div>
          {weatherEntity && <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weatherEntity[0].icon}@2x.png`} alt={weatherEntity[0].description} />
            <p>{weatherEntity[0].description}</p>
          </div>}
        </div>
      )}
    </div>
  );
}

export default App;