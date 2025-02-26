import ServerConfig from "./ServerConfig.js";
import {printCLWithTime} from "../Common/Log.js";

export default class Index {
  
  controllersList = {};
  modelsList = {};
  
  constructor() {
  }
  
  async init() {
    // Сделаем метод init асинхронным
    let app;
    
    let controllerNames = [];
    let modelNames = [];
    
    try {
      const serverConfig = new ServerConfig();
      
      app = await serverConfig.init();
      
      controllerNames = await serverConfig.getControllerListFileName();
      modelNames = await serverConfig.getModelsListFileName();
      
      /**
       * First Loading Options
       * @type {{readonly default?: *}}
       */
      const module = await import('./Models/options.js');
      if (module.default) {
        this.modelsList['options'] = await new module.default();
      }
      
      serverConfig.addedPayload({
        controllersList: this.controllersList,
        modelsList: this.modelsList,
      });
    } catch (error) {
      printCLWithTime('error', 'Initialization error ServerConfig:', error);
      return false;
      // Прерываем выполнение, если ServerConfig не инициализировался
    }
    
    const list = {
      Models: modelNames,
      Controllers: controllerNames,
    };
    
    for (let folder in list) {
      for (let idx in list[folder]) {
        
        const fileName = list[folder][idx];
        
        try {
          const module = await import(`./${folder}/${fileName}.js`);
          
          if (module.default) {
            switch (folder) {
              case 'Controllers':
                this.controllersList[fileName] = new module.default(app);
                this.controllersList[fileName].init();
                break;
              case 'Models':
                this.modelsList[fileName] = new module.default();
                this.modelsList[fileName].init();
                break;
              default:
                break;
            }
          } else {
            printCLWithTime('warn', `Model ${fileName} has no default export`);
            return false;
          }
        } catch (err) {
          printCLWithTime('error', `Loading or initialization error ${fileName}:`, err);
          return false;
        }
      }
    }
    
    return true;
  }
}
