import {BaseController} from "./base.js";
import {printCLWithTime} from "../../Common/Log.js";

export default class Index extends BaseController {
  
  constructor(app) {
    super(app);
  }
  
  init() {
    this.app.get('/', async (req, res) => {
      let locations = [];
      
      try {
        let locationModel = await this.getModel('locations');
        locations = await locationModel.getLocationWithVisits();
      } catch (error) {
        printCLWithTime('error', 'Error when receiving data:', error);
      }
      
      res.render('index', {
        tplName: 'statistic.ejs',
        h1: 'Statistics',
        headerTitle: 'Statistics',
        
        payload: {
          locations: locations,
          locationsCount: locations.length,
        },
      });
    });
  }
}