import {DataTypes} from "sequelize";
import {BaseModel} from "./base.js";

export default class Locations extends BaseModel {
  constructor() {
    super('locations');
  }
  
  create() {
    const parameters = {
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
    
    super.create(parameters);
  }
  
  firstData(payload = []) {
    const locations = [
      {locationId: 0, locationName: 'Okey'},
      {locationId: 1, locationName: 'СуперТяж'},
      {locationId: 2, locationName: 'Чайхана'},
      {locationId: 3, locationName: 'Китайцы'},
      {locationId: 4, locationName: 'Манты возле театра'},
      {locationId: 5, locationName: 'У Бабушки'},
      {locationId: 6, locationName: 'Лисёнок'},
      {locationId: 7, locationName: 'Лоло Пицца'},
      {locationId: 8, locationName: 'Челентано (внутри)'},
      {locationId: 9, locationName: 'Челентано (с собой)'},
      {locationId: 10, locationName: 'Плов на рынке'},
      {locationId: 11, locationName: 'Лепим Сами'},
      {locationId: 12, locationName: 'Mr.Garry (Под Лолой Пиццей)'},
    ];
    
    super.firstData(locations);
  }
  
  // --------
  
  async getLocations() {
    const sql = `SELECT *
                 FROM ${this.tableName}`;
    
    const [results, metadata] = await this.db.query(sql);
    
    return results;
  }
  
  async getFullInfo() {
  
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
    
    const [results, metadata] = await this.db.query(sql, {
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
    
    const [results, metadata] = await this.db.query(sql, {
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
    
    const [results, metadata] = await this.db.query(sql);
    
    return results[0].locationName;
  }
  
  getDegreesSymbol() {
    return '°';
  }
}


