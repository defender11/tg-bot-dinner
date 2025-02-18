import Locations from "../Server/Models/locations.js";

const locations = new Locations();

export default {
  getLocations: async function () {
    return await locations.getLocations();
  },
}