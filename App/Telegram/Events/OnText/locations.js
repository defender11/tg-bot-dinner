import Location from "../../../Common/location.js";
import {sendToTG} from "../../Bot/instance.js";

export default {
  locations: {
    init: async (msg) => {
      const locationInfo = await Location.getLocation();
      
      let locationListString = '';
      
      locationInfo.forEach((location, idx) => {
        locationListString += `${idx}: ${location.locationName} \n`;
      });
      
      if (
        msg.chat.type === 'group' || msg.chat.type === 'supergroup'
      ) {
        await sendToTG(msg.chat.id, locationListString);
      }
    }
  }
}