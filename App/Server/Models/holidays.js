import {DataTypes} from "sequelize";
import {BaseModel} from "./base.js";
import holidaysData from "../../Configs/holidays.json" assert {type: "json"};

export default class Holidays extends BaseModel {
  constructor() {
    const firstData = holidaysData;
    
    const createParameters = {
      dateEvent: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    };
    
    super('holidays', createParameters, firstData);
  }
  
  // --------
}


