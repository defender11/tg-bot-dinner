import dotenv from "dotenv";
import axios from "axios";
import {printCLWithTime} from "./Log.js";


export default {
  getWeatherFromApi: async function () {
    try {
      dotenv.config();
      
      const lat = process.env.WEATHER_LAT;
      const lon = process.env.WEATHER_LON;
      const API_KEY = process.env.WEATHER_API_KEY;
      const baseUrl = "https://dataservice.accuweather.com";
      
      // Получить LocationKey по координатам
      const locationResponse = await axios.get(`${baseUrl}/locations/v1/cities/geoposition/search`, {
        params: {
          apikey: API_KEY,
          q: `${lat},${lon}`,
          language: "ru",
        },
      });
      
      const locationKey = locationResponse.data.Key;
      const cityName = locationResponse.data.LocalizedName;
      printCLWithTime('log', `Found Location: ${cityName}, LocationKey: ${locationKey}`);
      
      const weatherResponse = await axios.get(`${baseUrl}/currentconditions/v1/${locationKey}`, {
        params: {
          apikey: API_KEY,
          language: "ru",
        },
      });
      
      const weather = weatherResponse.data[0];
      const description = `Погода: ${weather.Temperature.Metric.Value}°C, ${weather.WeatherText}`;
      
      printCLWithTime('log', description);
      
      return {
        weather,
        description: description,
      };
    } catch (error) {
      const msg = "Ошибка при получении данных:";
      
      printCLWithTime('error', msg, error.message);
      return {
        description: `${msg} ${error.message}`,
      };
    }
  }
}