import {Sequelize} from "sequelize";

export default class DBWrapper {
  #instance = null;
  
  constructor() {
    if (this.#instance === null) {
      this.#instance = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite'
      });
    }
  }
  
  getInstance() {
    return this.#instance;
  }
}