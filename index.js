import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
dotenv.config();

const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY, { polling: true });

telegramBot.onText(/\/start/, (msg) => {
  telegramBot.sendMessage(msg.chat.id, `Welcome ${msg.chat.first_name}`);
});