import {DataTypes} from "sequelize";
import {BaseModel} from "./base.js";
import locationData from "../../Configs/locations.json" assert {type: "json"};

export default class Locations extends BaseModel {
  constructor() {
    const firstData = locationData;
    
    const createParameters = {
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      locationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    };
    
    super('locations', createParameters, firstData);
  }
  
  // --------
  
  async getFullInfo() {
    return [];
  }
  
  async getLocationWithVisits() {
    const sql = `
        SELECT l.locationId,
               l.locationName,
               COUNT(*) AS visits
        FROM statistics AS s
                 LEFT JOIN locations AS l ON l.locationId = s.locationId
        WHERE s.dateEvent < :currentDate
        GROUP BY s.locationId
    `;
    
    const [results] = await this.db.query(sql, {
      replacements: {currentDate: new Date()},
    });
    
    return results;
  }
  
  async getLocationDetailsById(locationId) {
    const sql = `
        SELECT l.locationId,
               l.locationName,
               s.dateEvent,
               s.weatherDegrees,
               s.weatherDescription
        FROM statistics AS s
                 LEFT JOIN locations AS l ON l.locationId = s.locationId
        WHERE l.locationId = ${locationId}
    `;
    
    const [results] = await this.db.query(sql, {
      replacements: {currentDate: new Date()},
    });
    
    return results;
  }
  
  
  async getLocationNameById(locationId) {
    const sql = `
        SELECT locationName
        FROM locations
        WHERE locationId = ${locationId}
    `;
    
    const [results] = await this.db.query(sql);
    
    return results[0].locationName;
  }
  
  getDegreesSymbol() {
    return '°';
  }
}


