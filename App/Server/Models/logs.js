import {DataTypes} from "sequelize";
import {BaseModel} from "./base.js";

export default class Logs extends BaseModel {
  constructor() {
    super('logs');
  }
  
  create() {
    const parameters = {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateEvent: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    };
    
    super.create(parameters);
  }
  
  // --------
  
}


