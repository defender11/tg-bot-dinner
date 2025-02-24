import dotenv from "dotenv";
import {TGBot} from "./Bot/instance.js";
import {getFolderList} from "../Common/file.js";
import {fileURLToPath} from "url";
import path from "path";


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
    
    await this.fillEventsFileList();
    
    // Events: 'On'
    for (let eventFileName of this.eventsPathFileList.Events.On.files) {
      const eventPath = this.eventsPathFileList.Events.On.path;
      TGBot.on(eventFileName, await this.modules[eventPath + eventFileName][eventFileName].init);
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
  }
  
  cronRun() {
    // Запуск cron задачи в 12:35 каждый день
    // cron.schedule("35 12 * * *", send);
    
    
    //
    // cron.schedule("*/1 * * * *", send);
  }
}