import {localIP} from "./../Common/os.js";
import express from "express";
import {hotReloadMiddleware} from "@devmade/express-hot-reload";
import fs from 'fs';
import path from "path";
import {fileURLToPath} from 'url';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ServerConfig {
  #app = null;
  #port = null;
  
  constructor() {
    this.#app = express();
    
    dotenv.config();
    
    this.#port = process.env.EXPRESS_PORT;
  }
  
  init() {
    this.#app.use(express.json());
    this.#app.use(hotReloadMiddleware({
        watchFolders: ["./App"],
        verbose: true
      }
    ));
    
    this.#app.set('views', path.join(__dirname, 'views'));
    this.#app.set('view engine', 'ejs');
    
    this.#app.listen(this.#port, localIP, () => {
      console.log(`Server listening at http://${localIP}:${this.#port}`);
    });
    
    return this.#app;
  }
  
  async getControllerListFileName() {
    const controllersDir = path.join(__dirname, 'Controllers');
    
    try {
      // Оборачиваем fs.readdir в Promise
      const files = await new Promise((resolve, reject) => {
        fs.readdir(controllersDir, (err, files) => {
          if (err) {
            reject(err); // Передаем ошибку в reject
          } else {
            resolve(files); // Передаем список файлов в resolve
          }
        });
      });
      
      // Фильтруем файлы, оставляя только .js файлы
      return files.filter(file => path.extname(file) === '.js');
    } catch (err) {
      console.error("Ошибка чтения директории:", err);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  
  }
}