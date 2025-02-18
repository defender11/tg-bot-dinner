import ServerConfig from "./ServerConfig.js";


export default class Index {
  
  controllersList = {};
  modelsList = {};
  
  constructor(props) {
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
      
      // Предполагаем, что init может быть асинхронным
      
      serverConfig.addedPayload({
        controllersList: this.controllersList,
        modelsList: this.modelsList,
      });
    } catch (error) {
      console.error("Ошибка инициализации ServerConfig:", error);
      return;
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
                break;
              default:
                break;
            }
          } else {
            console.warn(`Model ${fileName} не имеет экспорта по умолчанию`);
          }
        } catch (err) {
          console.error(`Ошибка загрузки или инициализации ${fileName}:`, err);
        }
      }
    }
  }
}
