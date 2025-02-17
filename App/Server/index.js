import {localIP} from "./../Common/os.js";
import express from "express";
import {Sequelize, DataTypes} from "sequelize";
import {hotReloadMiddleware} from "@devmade/express-hot-reload";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Index {
  constructor(props) {
  }
  
  init() {
    
    const app = express();
    const port = process.env.EXPRESS_PORT;
    
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './db.sqlite'
    });
    
    app.use(express.json());
    app.use(hotReloadMiddleware({watchFolders: ["./App"], verbose: true}));
    
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    
    
    app.get('/', (req, res) => {
      const data = {
        message: 'Привет из Node.js!',
        buttonText: 'Нажми меня'
      };
      res.render('history', {data: data});
    });
    
    
    app.listen(port, localIP, () => {
      console.log(`Server listening at http://${localIP}:${port}`);
    });
  }
}