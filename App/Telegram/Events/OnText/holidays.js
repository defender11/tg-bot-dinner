import Holidays from "../../../Common/holidays.js";
import {sendToTG} from "../../Bot/instance.js";

export default {
  holidays: {
    init: async (msg) => {
      let holidaysListString = '';
      
      const holidaysInfo = await Holidays.getHolidaysInfo();
      
      holidaysInfo.forEach((holiday, idx) => {
        holidaysListString += `${Holidays.getHumanDate(holiday.dateEvent)} | ${holiday.description} \n`;
      });
      
      if (
        // msg.chat.id === chanelID &&
        msg.chat.type === 'group' || msg.chat.type === 'supergroup'
      ) {
        sendToTG(msg.chat.id, holidaysListString);
      }
    }
  }
}