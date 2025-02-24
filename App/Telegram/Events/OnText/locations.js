import Location from "../../../Common/location.js";
import {sendToTG} from "../../Bot/instance.js";

export default {
  locations: {
    init: async (msg) => {
      const locationInfo = await Location.getLocation();
      const locationInfoCount = locationInfo.length - 1;
      
      let locationListString = '';
      
      locationInfo.forEach((location, idx) => {
        locationListString += `${idx}: ${location.locationName} \n`;
      });
      
      console.log(locationInfo)
      
      if (
        // msg.chat.id === chanelID &&
        msg.chat.type === 'group' || msg.chat.type === 'supergroup'
      ) {
        sendToTG(msg.chat.id, locationListString);
      }
    }
  }
}