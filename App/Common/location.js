import Locations from "../Server/Models/locations.js";
import {printCLWithTime} from "./Log.js";

export default {
  getLocation: async function () {
    try {
      const model = new Locations();
      const list = await model.getLocationWithVisits();
      
      return list || [];
    } catch (e) {
      printCLWithTime('error', 'Has problem in Model: ', e.message);
    }
  },
}