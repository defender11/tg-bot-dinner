import {BaseController} from "./base.js";
import {printCLWithTime} from "../../Common/Log.js";

export default class Statistics extends BaseController {
  constructor(app) {
    super(app);
  }
  
  init() {
    this.app.get('/statistic/location/:id', async (req, res) => {
      const locationID = req.params.id; // Получаем ID из URL
      let locationInfoList = [];
      
      try {
        locationInfoList = await this.getModel('locations')
          .then(async function (model) {
            return {
              degreesSymbol: model.getDegreesSymbol(),
              name: await model.getLocationNameById(locationID),
              list: await model.getLocationDetailsById(locationID)
            }
          });
        
        return res.json(locationInfoList);
      } catch (error) {
        printCLWithTime('error', 'Error when receiving data:', error);
        return res.status(500).send('Request error');
      }
    });
  }
}