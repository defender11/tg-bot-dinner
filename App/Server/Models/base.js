import {Sequelize} from "sequelize";

export class BaseModel {
  constructor(tableName) {
    this.db = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.DATABASE_URL,
    });
    
    this.tableName = tableName;
    
    this.model = null;
    
    this.create();
    
    this.sync(this.firstData.bind(this));
  }
  
  create(parameters) {
    this.model = this.db.define(this.tableName, parameters, {
      timestamps: false, // Включаем автоматическое создание createdAt и updatedAt
    });
  }
  
  firstData(payload = []) {
    if (payload.length) {
      for (let idx = 0; idx < payload.length; idx++) {
        this.getModel().upsert({...payload[idx]});
      }
    }
  }
  
  getModel() {
    return this.model;
  }
  
  async sync(cb) {
    await this.db.sync()
      .then(() => {
        if (typeof cb === "function") {
          cb();
        }
        console.log('Модель ' + this.tableName + ' синхронизирована с базой данных.');
      })
      .catch(error => {
        console.error('Ошибка при синхронизации модели:', error);
      });
  }
}


