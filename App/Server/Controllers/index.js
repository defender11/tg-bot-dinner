import {BaseController} from "./base.js";

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
        console.error('Ошибка при получении данных:', error);
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