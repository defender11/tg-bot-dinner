import Holidays from "../Server/Models/holidays.js";
import {printCLWithTime} from "./Log.js";

export default {
  // Список праздников
  getHolidaysInfo: async function () {
    try {
      const model = new Holidays();
      const dbModel = await model.getModel();
      const rawList = await dbModel.findAll({raw: true});
      
      return rawList || [];
    } catch (e) {
      printCLWithTime('error', 'Has problem in Model: ', e.message);
    }
  },
  
  getHumanDate: function (date) {
    return new Date(date).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  getHolidayDates: async function () {
    const daysInfo = await this.getHolidaysInfo();
    return daysInfo.map((holiday) => holiday.dateEvent);
  }
}