import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import axios from "axios";

dotenv.config();

const holidays = ["2024-12-25", "2025-01-01"]; // Список праздников

const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY, {polling: true, onlyFirstMatch: true});
const chanelID = process.env.TELEGRAM_CHANEL_ID; // Или @имя_канала, если отправляешь в канал

const locationInfo = [
  {name: 'Okey'},
  {name: 'СуперТяж'},
  {name: 'Чайхана'},
  {name: 'У Бабушки'},
  {name: 'Лисёнок'},
];
const locationInfoCount = (locationInfo.length - 1);

const commands = [
  {
    command: "locations",
    description: "Список Мест"
  },
];
telegramBot.setMyCommands(commands);

async function getRandomNumber() {
  try {
    const response = await axios.get('https://www.random.org/integers/', {
      params: {
        num: 1,
        min: 0,
        max: locationInfoCount,
        col: 1,
        base: 10,
        format: 'plain',
        rnd: 'new'
      }
    });

    const randomNumber = parseInt(response.data, 10);
    console.log(`Случайное число: ${randomNumber}`);

    return randomNumber;
  } catch (error) {
    console.error('Ошибка при получении случайного числа:', error);
    return -1;
  }
};

const lat = process.env.WEATHER_LAT;
const lon = process.env.WEATHER_LON;
const API_KEY = process.env.WEATHER_API_KEY;
const baseUrl = "https://dataservice.accuweather.com";

async function getWeather() {
  try {
    // Получить LocationKey по координатам
    const locationResponse = await axios.get(`${baseUrl}/locations/v1/cities/geoposition/search`, {
      params: {
        apikey: API_KEY,
        q: `${lat},${lon}`,
        language: "ru",
      },
    });

    const locationKey = locationResponse.data.Key;
    const cityName = locationResponse.data.LocalizedName;
    console.log(`Найдено местоположение: ${cityName}, LocationKey: ${locationKey}`);

    const weatherResponse = await axios.get(`${baseUrl}/currentconditions/v1/${locationKey}`, {
      params: {
        apikey: API_KEY,
        language: "ru",
      },
    });

    const weather = weatherResponse.data[0];
    const description = `Погода: ${weather.Temperature.Metric.Value}°C, ${weather.WeatherText}`;

    console.log(description);

    return {
      weather,
      description: description,
    };
  } catch (error) {
    console.error("Ошибка при получении данных:", error.message);
  }
}

// Проверяем, является ли текущая дата рабочим днём
function isWorkingDay(date) {
  const day = date.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
  const formattedDate = date.toISOString().split("T")[0];
  return day >= 1 && day <= 5 && !holidays.includes(formattedDate);
}

async function sendDailyMessage() {
  const today = new Date();
  if (isWorkingDay(today)) {
    const chosenLocationNumber = await getRandomNumber();
    const info = locationInfo[chosenLocationNumber];

    const weatherInfo = await getWeather();
    const msg = `${info.name} | ${weatherInfo.description}`;

    telegramBot.sendMessage(chanelID, msg);

    console.log("Сообщение отправлено: Сегодня рабочий день.");
  } else {
    console.log("Сегодня выходной или праздник. Сообщение не отправлено.");
  }
}

// Запуск cron задачи в 12:30 каждый день
cron.schedule("30 12 * * *", () => {
  console.log("Проверяем рабочий день и отправляем сообщение...");
  sendDailyMessage();
});

//
// cron.schedule("*/1 * * * *", () => {
//   console.log("Проверяем рабочий день и отправляем сообщение...");
//   sendDailyMessage();
// });

telegramBot.onText(/\/locations/, async (msg) => {
  let locationListString = '';

  locationInfo.forEach((location, idx) => {
    locationListString += `${idx}: ${location.name} \n`;
  });

  if (
    msg.chat.id === chanelID &&
    msg.chat.type === 'group' || msg.chat.type === 'supergroup'
  ) {
    telegramBot.sendMessage(chanelID, locationListString);
  }
});

telegramBot.on("polling_error", err => console.log(err.data.error.message));