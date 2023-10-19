import { useState } from "react";
import CurrentWeather from "./CurrentWeather";
import "./Search.css";

const Search = () => {
  const [selCity, setSelCity] = useState("YEREVAN");
  const [city, setCity] = useState(true);

  const submithandler = (event) => {
    event.preventDefault();

    if (selCity) {
      setCity(selCity);
      setSelCity("");
    }
  };

  return (
    <form className="search-form" onSubmit={submithandler}>
      <input
        className="search-input"
        type="text"
        value={selCity}
        onChange={(event) => setSelCity(event.target.value)}
      />
      <button className="search-button">Search City</button>
      {city && <CurrentWeather selCity={city} selCityHandler={submithandler} />}
    </form>
  );
};

export default Search;
