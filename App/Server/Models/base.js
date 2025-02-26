import sequelize from '../../Common/db.js';
import {printCLWithTime} from "../../Common/Log.js";

export class BaseModel {
  constructor(tableName, createParameters, payload = []) {
    this.db = sequelize;
    this.tableName = tableName;
    this.createParameters = createParameters;
    this.payload = payload;
    
    this.model = this.db.define(this.tableName, this.createParameters, {
      timestamps: false,
    });
  }
  
  async init() {
    try {
      await this.db.sync();
      
      printCLWithTime('log', `Model ${this.tableName} synchronized with the database.`);
      
      if (this.payload.length) {
        await this.firstData();
      }
    } catch (error) {
      printCLWithTime('error', `Model synchronization error:`, error);
    }
  }
  
  getModel() {
    return this.model;
  }
  
  async firstData() {
    if (!this.payload.length) return;
    
    const isEmpty = await this.checkFirstData();
    
    if (!isEmpty) return;
    
    await Promise.all(this.payload.map(item => this.model.upsert(item)));
    
    try {
      await this.markFirstData();
      printCLWithTime('log', `Mark First Data completed for ${this.tableName}`);
    } catch (error) {
      printCLWithTime('warn', error.message);
    }
  }
  
  async checkFirstData() {
    let sql = 'SELECT optionName FROM options WHERE optionName = ?';
    const [results] = await this.db.query(sql, { raw: true, replacements: [this.tableName] });
    return results.length === 0; // true, если пусто
  }
  
  async markFirstData() {
    let sql = 'INSERT OR IGNORE INTO options (optionName, optionValue) VALUES (?, 1)';
    await this.db.query(sql, { replacements: [this.tableName] });
  }
}