import {isWorkingDay} from "../../Common/date.js";
import Random from "../../Common/random.js";
import Weather from "../../Common/weather.js";
import Location from "../../Common/location.js";
import {sendToTG} from "../Bot/instance.js";


const locationInfo = await Location.getLocation();
const locationInfoCount = locationInfo.length - 1;

export async function sendDailyMessage(msg) {
  const today = new Date();
  const isWorkingDayToday = await isWorkingDay(today);
  
  if (isWorkingDayToday) {
    // const chosenLocationNumber = await Random.getRandomNumberFromApi(locationInfoCount);
    let chosenLocationNumber = 0;
    
    let tryingRandomSelection = 0;
    
    do {
      chosenLocationNumber = Random.getLocalRandomInt(0, locationInfoCount);
      
      if (chosenLocationNumber === 0) {
        tryingRandomSelection++;
      }
    } while (chosenLocationNumber === 0 && tryingRandomSelection > 0 && tryingRandomSelection < 5);
    
    const info = locationInfo[chosenLocationNumber];
    
    const weatherInfo = await Weather.getWeatherFromApi();
    const msg = `${info.name} | ${weatherInfo.description}`;
    
    sendToTG(msg.chat.id, msg);
    
    console.log("Message sending: Today is working day.");
  } else {
    console.log("Today is a day off or a holiday. The message has not been sent.");
  }
}