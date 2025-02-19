import {DataTypes} from "sequelize";
import {BaseModel} from "./base.js";

export default class Options extends BaseModel {
  constructor() {
    const createParameters = {
      optionName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      optionValue: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    };
    
    super('options', createParameters);
  }
  
  // --------
}


