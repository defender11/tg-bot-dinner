import {localIP} from "./../Common/os.js";
import express from "express";
import {hotReloadMiddleware} from "@devmade/express-hot-reload";
import fs from 'fs';
import path from "path";
import {fileURLToPath} from 'url';
import dotenv from "dotenv";
import {getFolderList} from "../Common/file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ServerConfig {
  #app = null;
  #port = null;
  
  constructor() {
    this.#app = express();
    this.payload = {};
    
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
    return await getFolderList('Controllers', __dirname, this.getExcludeAutoloadFileList());
  }
  
  async getModelsListFileName() {
    return await getFolderList('Models', __dirname, this.getExcludeAutoloadFileList());
  }
  
  getExcludeAutoloadFileList() {
    return ['base', 'options'];
  }
  
  addedPayload(parameters = {}) {
    this.#app = Object.assign(this.#app, this.payload, parameters);
  }
}