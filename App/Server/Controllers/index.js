import * as Location from '../../Common/location.js';
import axios from "axios";

export default class Index {
  
  #app = null;
  constructor(app) {
    this.#app = app;
  }
  
  init() {
    this.#app.get('/', (req, res) => {
      
      const data = {
        tplName: 'statistic.ejs',
        h1: 'Статистика',
        buttonText: 'Нажми меня',
        headerTitle: 'Статистика',
        
        payload: {
          locations: Location.default.getLocations(),
          locationsCount: Location.default.getLocationCount(),
        }
      };
      
      res.render('index', {
        data: data
      });
    });
  }
}