import {DataTypes} from "sequelize";
import {BaseModel} from "./base.js";
import testStatisticsData from "../../Configs/statistics.json" assert {type: "json"};

export default class Statistics extends BaseModel {
  constructor() {
    // temp data for testing
    const firstData = testStatisticsData.map(stat => Object.assign(stat, {dateEvent: new Date()}));
    
    const createParameters = {
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateEvent: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      weatherDegrees: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      weatherDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    };
    
    super('statistics', createParameters, firstData);
  }
    
    // --------
  }


