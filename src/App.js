import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import "./App.css"
// require("dotenv").config()

function App() {

  //LOCATION//
  const [location, setLocation] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWheater(position.coords.latitude, position.coords.longitude);
      setLocation(true) 
    })
  }, [])
//LOCATION//

//WHEATER//
const [weather, setWeather] = useState(false)

let getWheater = async (lat, long) => {
  let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat: lat,
      lon: long,
      appid:process.env.REACT_APP_OPEN_WHEATER_KEY.replace(/[^\w\.@-]/g, ""),
      lang: "pt",
      units: "metric"
    }
  });
  setWeather(res.data)
  
}
console.log(weather)
//weather//

  
  if(location === false) {
    return(
      <Fragment>
        <div className="container">
        Você precisa habilitar a localização no Browser!
        </div>
      </Fragment>
    )
  } else if(weather === false) {
     return(
       <Fragment>
         <div className="container">
           <h2>Carregando o clima...</h2>
         </div>
         |
       </Fragment>
     )
  }else{
      return (
        <Fragment>
          <div className="container">
            <h3> Clima nas suas coordenadas:</h3>
          <h2>{weather["name"]} &gt; ({weather["weather"][0]["description"]})</h2>
          <hr/>
          <ul>
            <li>Temperatura atual: {weather["main"].temp.toFixed()}°</li>
            <li>Sensação térmica: {weather["main"].feels_like}</li>
            <li>Temperatura máxima: {weather["main"].temp_max.toFixed()}°</li>
            <li>Temperatura mínima: {weather["main"].temp_min}°</li>
            <li>Pressão: {weather["main"].pressure} hpa</li>
            <li>Umidade: {weather["main"].humidity}%</li>
          </ul>
          </div>
          
        </Fragment> 
  );
}
}
export default App;
