import TelegramBot from "node-telegram-bot-api";
import commandsData from "../../Configs/commands.json" assert {type: "json"};
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY, {polling: true, onlyFirstMatch: true});

export const TGBot = telegramBot;
export const chanelID = process.env.TELEGRAM_CHANEL_ID; // Или @имя_канала, если отправляешь в канал

export async function sendToTG(chatID = null, payload) {
  // if (chatID === null) {
  //   chatID = chanelID;
  // }
  
  let msg = '';
  
  if (typeof payload === 'object') {
    msg = JSON.stringify(payload);
  }
  
  if (typeof payload === 'string') {
    msg = payload;
  }
  
  const response = await TGBot.sendMessage(chatID, msg);
}

const commands = commandsData;

TGBot.setMyCommands(commands);
