
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';


function App() {
  //2)UsesTate para guardar las variables latitud y longitud
  const [coords, setCoords] = useState();
  //14 setter para almacenar la respuesta del ussefect con al url
  const [weather, setWeather] = useState();
  //17) useState para convertir la temperatura a otras mediddas
  const [temp, setTemp] = useState();




  
  

  //4)parametro succes para la funcion de geolocalizacion,(succes pasó a ser position)
  const succes = position =>{
    //console.log(position);
    //5)Extraigo los dos datos (log, lat) del objeto position en un nuevo objeto obj
    const obj={
      lat: position.coords.latitude,
      long:position.coords.longitude,
    }
    //6 con el setCoords envio la informacion de obj (lat,long) a coords que ahora es un objeto con las propiedades lat y long
    setCoords(obj);
  }

  useEffect(() => {
    //3)funcion para obtener la geolocalizacion con el parametro succes
    navigator.geolocation.getCurrentPosition(succes)
  }, [])
   console.log(coords);
   console.log(weather);

  //8) creamos otro useEffect para hacer el llamado a otra API (APIKEY)
  useEffect(() => {
   
       //15 creamos un condicional,para que los valoresd de la url no lleguen indefinidos
   if (coords) {
    //9) ingresamos la url al useEffect
    //1)Constante con la URL de la API de clima
    //7) reemplazamos los valores del objeto coords en la url
    //11 Remmplazamos en la url la constantye APIkey
    const APIkey='cc5c21e93544529d767bd9d4780c8bac';
  //10 Utilizo la ApiKey que generó la página pra reemplazar en el espacio APIKEY de la url
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${APIkey}`;
   
    //12) Usamos axios para hacer la peticion de la url
    axios.get(url)
    //13 creamos un seter para almacenar la respuesta
      .then(res=>{
        //18) Funcion para la conversion de temperaturas
        const obj ={
          celsius: (res.data.main.temp - 273.15).toFixed(2),
          farenheith: ((res.data.main.temp - 273.15)*(9/5) + 32).toFixed(2),
        }
        setTemp(obj)
        setWeather(res.data)
        
      })
      .catch(err=>console.log(err));
    }}, [coords]);
    
   
    
    //console.log(temp?.celsius)

  
  

  
  


  return (
   <div className='app'>
    {/*16) enviamos a WeatherCard.jsx */}
      <WeatherCard 
        weather={weather}
        temp={temp}
      />
   </div>
  )
}

export default App
