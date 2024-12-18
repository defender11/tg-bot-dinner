import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

dotenv.config();

const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY, { polling: true }); // Используй {polling: false} для чисто отправки
const userID = 1194247671; // Или @имя_канала, если отправляешь в канал

const holidays = ["2024-12-25", "2025-01-01"]; // Список праздников

// Проверяем, является ли текущая дата рабочим днём
function isWorkingDay(date) {
  const day = date.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
  const formattedDate = date.toISOString().split("T")[0];
  return day >= 1 && day <= 5 && !holidays.includes(formattedDate);
}

// Функция отправки сообщения
function sendDailyMessage() {
  const today = new Date();
  if (isWorkingDay(today)) {
    telegramBot.sendMessage(userID, "Доброе утро! Сегодня рабочий день.");
    console.log("Сообщение отправлено: Сегодня рабочий день.");
  } else {
    console.log("Сегодня выходной или праздник. Сообщение не отправлено.");
  }
}

// Запуск cron задачи в 9:00 каждый день
cron.schedule("0 9 * * *", () => {
  console.log("Проверяем рабочий день и отправляем сообщение...");
  sendDailyMessage();
});
cron.schedule("*/1 * * * *", () => {
  console.log("Проверяем рабочий день и отправляем сообщение...");
  sendDailyMessage();
});

// Обработка команды /start (если нужен polling)
telegramBot.onText(/\/start/, (msg) => {
  console.log(`Получена команда /start от ${msg.chat.first_name}`);
  console.log(msg);
  telegramBot.sendMessage(userID, `Привет, ${msg.chat.first_name}! Бот запущен.`);
});