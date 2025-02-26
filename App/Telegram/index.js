import dotenv from "dotenv";
import {TGBot} from "./Bot/instance.js";
import {getFolderList} from "../Common/file.js";
import {fileURLToPath} from "url";
import path from "path";
import CommonBus from "./Common/CommonBus.js";
import cron from "node-cron";
import {sendDailyMessage} from "./Common/DailyMessage.js";
import {printCLWithTime} from "../Common/Log.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class TGEnvironment {
  constructor() {
    this.modules = [];
    this.eventsPathFileList = {
      Events: {
        On: {
          path: 'Events/On/',
          files: []
        },
        OnText: {
          path: 'Events/OnText/',
          files: []
        },
      }
    };
    this.commonBus = CommonBus;
  }
  
  async fillEventsFileList() {
    for (let eventsFolderName in this.eventsPathFileList.Events) {
      const eventsFilesList = await getFolderList(eventsFolderName, __dirname + '/Events/');
      
      this.eventsPathFileList.Events[eventsFolderName].files = eventsFilesList;
      
      for (let eventFileName of eventsFilesList) {
        const module = await import(__dirname + '/Events/' + eventsFolderName + '/' + eventFileName + '.js');
        
        if (module.default) {
          this.modules['Events/' + eventsFolderName + '/' + eventFileName] = await module.default;
        }
      }
    }
  }
  
  async init() {
    dotenv.config();
    
    try {
      await this.fillEventsFileList();
      
      // Events: 'On'
      for (let eventFileName of this.eventsPathFileList.Events.On.files) {
        const eventPath = this.eventsPathFileList.Events.On.path;
        TGBot.on(eventFileName, async (msg) => await this.modules[eventPath + eventFileName][eventFileName].init(msg));
      }
      
      // Events: 'OnText'
      for (let eventFileName of this.eventsPathFileList.Events.OnText.files) {
        const eventPath = this.eventsPathFileList.Events.OnText.path;
        
        // Предполагаем, что имя файла без расширения — это команда без слеша в начале
        // Например, файл "holidays.js" будет обрабатывать команду "/holidays"
        const commandPattern = `\\/${eventFileName}`;
        
        TGBot.onText(new RegExp(commandPattern),
          async (msg, match) => {
            await this.modules[eventPath + eventFileName][eventFileName].init(msg, match);
          }
        );
      }
      
      this.cronRun();
    } catch (err) {
      printCLWithTime('error', 'Modules init error', err.message);
      return false;
    }
    
    
    return true;
  }
  
  cronRun() {
    dotenv.config();
    
    // Запуск cron задачи в 12:35 каждый день
    const msg = {
      chat: {
        id: process.env.TELEGRAM_CHANEL_ID
      }
    };
    
    cron.schedule("35 12 * * *", sendDailyMessage.bind(this, msg));
    
    // cron.schedule("*/1 * * * *", sendDailyMessage.bind(this, msg));
  }
}