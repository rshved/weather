import axios from "axios";

export const getWeatherInfoInTheCity = async (latitude, longitude) => {
  try{
    const { data } = await axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
    return data
  } catch (e) {
    console.log(e)
  }
}