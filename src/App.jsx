import { useState } from "react";

const App = () => {
  const [url, seturl] = useState('')
  
  let coordinateAPI=async (e)=>{
    e.preventDefault();
    let fetchd=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(url)}`);
  let resposnse = await fetchd.json();
  let latitude=resposnse.results[0].latitude;
  let longitude=resposnse.results[0].longitude;
   const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code
` +
  `&timezone=auto`;

    const weathers = await fetch(weatherUrl);
    const weatherData = await weathers.json();

    function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";

  return "Unknown";
}

const description = getWeatherDescription(
  weatherData.current.weather_code
);

    
    console.log(url);
    console.log(`temperature is ${weatherData.current.temperature_2m} degree`);
    console.log(weatherData.current.relative_humidity_2m);
    console.log(`weather is ${description}`);
    console.log(weatherData.current.time);
    console.log(weatherData.timezone);
    



  }
  function urls(elem){
    
    seturl(elem.target.value);



  }


  
  return (
    <>
    <form onSubmit={coordinateAPI}>
      <input type="text" value={url} name="text" id="text1" onChange={urls} placeholder="enter place name"/>
      <button type="submit">submit</button>
    </form>
    </>
  )
}

export default App