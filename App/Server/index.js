import ServerConfig from "./ServerConfig.js";

export default class Index {
  
  constructor(props) {
  }
  
  async init() {
    // Сделаем метод init асинхронным
    let app;
    let controllerNames = [];
    
    try {
      const serverConfig = new ServerConfig();
      app = await serverConfig.init();
      controllerNames = await serverConfig.getControllerListFileName();
      // Предполагаем, что init может быть асинхронным
    } catch (error) {
      console.error("Ошибка инициализации ServerConfig:", error);
      return;
      // Прерываем выполнение, если ServerConfig не инициализировался
    }
    
    await Promise.all(controllerNames.map(async (fileName) => {
      // Используем Promise.all для параллельной загрузки
      try {
         console.log(fileName)
        const module = await import(`./Controllers/${fileName}`);
        if (module.default) {
          const controller = new module.default(app);
          await controller.init();
        } else {
          console.warn(`Controller ${name} не имеет экспорта по умолчанию`);
        }
      } catch (err) {
        console.error(`Ошибка загрузки или инициализации Controller ${name}:`, err);
      }
    }));
  }
}
