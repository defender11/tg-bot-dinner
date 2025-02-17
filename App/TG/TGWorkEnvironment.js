import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import Random from "./../Common/random.js";
import Weather from "./../Common/weather.js";
import Holidays from "./../Common/holidays.js";
import Location from "./../Common/location.js";

export default class TGWorkEnvironment {
  constructor() {
  }
  
  init() {
    dotenv.config();
    
    const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
    const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY, {polling: true, onlyFirstMatch: true});
    const chanelID = process.env.TELEGRAM_CHANEL_ID; // Или @имя_канала, если отправляешь в канал
    
    const commands = [
      {
        command: "locations",
        description: "Список Мест"
      },
      {
        command: "holidays",
        description: "Нерабочие праздничные дни 2025"
      },
      {
        command: "try_your_luck",
        description: "Попытать удачу"
      },
    ];
    telegramBot.setMyCommands(commands);
    
    // Проверяем, является ли текущая дата рабочим днём
    function isWorkingDay(date) {
      const day = date.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
      const formattedDate = date.toISOString().split("T")[0];
      return day >= 1 && day <= 5 && !Holidays.getHolidayDates().includes(formattedDate);
    }
    
    function sendToTG(chatID = null, payload) {
      if (chatID === null) {
        chatID = chanelID;
      }
      
      let msg = '';
      
      if (typeof payload === 'object') {
        msg = JSON.stringify(payload);
      }
      
      if (typeof payload === 'string') {
        msg = payload;
      }
      
      telegramBot.sendMessage(chatID, msg);
    }
    
    const locationInfo = Location.getLocations();
    const locationInfoCount = Location.getLocationCount();
    
    async function sendDailyMessage() {
      const today = new Date();
      if (isWorkingDay(today)) {
        // const chosenLocationNumber = await Random.getRandomNumberFromApi(locationInfoCount);
        let chosenLocationNumber = 0;
        
        let tryingRandomSelection = 0;
        
        do {
          chosenLocationNumber = Random.getLocalRandomInt(0, locationInfoCount);
          
          if (chosenLocationNumber === 0) {
            tryingRandomSelection++;
          }
        } while (chosenLocationNumber === 0 && tryingRandomSelection > 0 && tryingRandomSelection < 5);
        
        const info = locationInfo[chosenLocationNumber];
        
        const weatherInfo = await Weather.getWeatherFromApi();
        const msg = `${info.name} | ${weatherInfo.description}`;
        
        sendToTG(chanelID, msg);
        
        console.log("Сообщение отправлено: Сегодня рабочий день.");
      } else {
        console.log("Сегодня выходной или праздник. Сообщение не отправлено.");
      }
    }
    
    function send() {
      console.log("Проверяем рабочий день и отправляем сообщение...");
      sendDailyMessage();
    }
    
    // Запуск cron задачи в 12:35 каждый день
    // cron.schedule("35 12 * * *", send);
    
    
    //
    // cron.schedule("*/1 * * * *", send);
    
    telegramBot.on('message', (msg) => {
      const chatId = msg.chat.id;
      console.log(msg);
      
      
      // send a message to the chat acknowledging receipt of their message
      // sendToTG(chatId, 'Received your message');
    });
    
    telegramBot.onText(/\/locations/, async (msg) => {
      console.log(msg);
      // return;
      //
      // let locationListString = '';
      //
      // locationInfo.forEach((location, idx) => {
      //   locationListString += `${idx}: ${location.name} \n`;
      // });
      //
      // if (
      //   msg.chat.id === chanelID &&
      //   msg.chat.type === 'group' || msg.chat.type === 'supergroup'
      // ) {
      //   sendToTG(chanelID, locationListString);
      // }
    });
    
    telegramBot.onText(/\/holidays/, async (msg) => {
      console.log(msg);
      // return;
      
      // let holidaysListString = '';
      //
      // Holidays.getHolidaysInfo().forEach((holiday, idx) => {
      //   holidaysListString += `${holiday.getHumanDate(holiday.date)} | ${holiday.label} \n`;
      // });
      //
      // if (
      //   msg.chat.id === chanelID &&
      //   msg.chat.type === 'group' || msg.chat.type === 'supergroup'
      // ) {
      //   sendToTG(chanelID, holidaysListString);
      // }
    });
    
    // telegramBot.onText(/\/try_your_luck/, send);
    
    telegramBot.on("polling_error", err => console.log(err.data.error.message));
    
  }
}