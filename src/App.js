import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
import { FaTemperatureHigh, FaTemperatureLow, FaPersonBooth, FaTencentWeibo, FaWind } from "react-icons/fa"

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
        appid: "0dc3a6fbc956f2078794ca3e71fa39e8",
        lang: "pt",
        units: "metric"
      }
    });
    setWeather(res.data)

  }

  //weather//




  if (location === false) {
    return (
      <Fragment>
        <div className="container text-2xl text-indigo-600">

          <h1 className="font-extrabold text-4xl">Permita o acesso a localização no navegador para continuar...</h1>
        </div>
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        <div className="container">
          <h2 className="text-2xl">Carregando o clima...</h2>
        </div>
        |
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className="shadow-2xl my-auto mx-2 bg-gray-100 h-min rounded-xl" >
          <div className="py-12">
            <div className="max-w-12 mx-auto px-4 ">
              <div className="text-center">
                <h2 className="text-xl text-indigo-600 font-semibold tracking-wide uppercase">Temperatura na sua coordenada</h2>
                <p className="sm:text-4xl mt-2 text-3xl font-extrabold leading-8">{weather["name"]}</p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Essas são as informações que temos no momento:
                </p>      
                <div className="mt-10">
                  <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-10">
                    <div className="relative">
                      <dt className="mb-2">
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <FaTencentWeibo className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-800">Temperatura atual: <span className="font-bold text-neutral-900 bg-gray-100 p-1 rounded-full">{weather["main"].temp}°</span></p>
                      </dt>
                    </div>
                    <div className="relative">
                      <dt>
                        <div className="absolute flex content-center items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <FaPersonBooth className="h-8 w-8 " aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Sensação térmica: <span className="font-bold text-neutral-900 bg-gray-100 p-1 rounded-full">{weather["main"].feels_like}°</span></p>
                      </dt>

                    </div>
                    <div className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <FaWind className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Velocidade do vento (km/h): <span className="font-bold text-neutral-900 bg-gray-100 p-1 rounded-full">{weather.wind.speed}</span></p>
                      </dt>
                    </div>

                    <div className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <FaTemperatureHigh className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Temperatura máxima: <span className="font-bold text-neutral-900 bg-gray-100 p-1 rounded-full">{weather["main"].temp_max.toFixed()}°</span></p>
                      </dt>
                    </div>
                    <div className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <FaTemperatureLow className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Temperatura mínima: <span className="font-bold text-neutral-900 bg-gray-100 p-1 rounded-full">{weather["main"].temp_min}°</span></p>
                      </dt>
                    </div>
                    <span className="text-2xl uppercase">{weather["weather"][0]["description"]}</span>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default App;
