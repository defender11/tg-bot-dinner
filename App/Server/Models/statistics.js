import {DataTypes} from "sequelize";
import {BaseModel} from "./base.js";

export default class Statistics extends BaseModel {
  constructor() {
    super('statistics');
  }
  
  create() {
    const parameters = {
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
    
    super.create(parameters);
  }
  
  firstData(payload = []) {
    const locations = [
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '10', weatherDescription: 'Пасмурно'},
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '11', weatherDescription: 'Пасмурно'},
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '12', weatherDescription: 'Пасмурно'},
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '1.3', weatherDescription: 'Пасмурно'},
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '8.5', weatherDescription: 'Пасмурно'},
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '3.2', weatherDescription: 'Пасмурно'},
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '1', weatherDescription: 'Солнечно'},
      {locationId: 0, dateEvent: new Date(), weatherDegrees: '6.4', weatherDescription: 'Солнечно'},
      {locationId: 1, dateEvent: new Date(), weatherDegrees: '1', weatherDescription: 'Дождь'},
      {locationId: 2, dateEvent: new Date(), weatherDegrees: '2', weatherDescription: 'Дождь'},
      {locationId: 3, dateEvent: new Date(), weatherDegrees: '1', weatherDescription: 'Солнечно'},
      {locationId: 4, dateEvent: new Date(), weatherDegrees: '5', weatherDescription: 'Солнечно'},
      {locationId: 5, dateEvent: new Date(), weatherDegrees: '7', weatherDescription: 'Дождь'},
      {locationId: 5, dateEvent: new Date(), weatherDegrees: '13', weatherDescription: 'Дождь'},
      {locationId: 5, dateEvent: new Date(), weatherDegrees: '11', weatherDescription: 'Дождь'},
      {locationId: 6, dateEvent: new Date(), weatherDegrees: '11', weatherDescription: 'Солнечно'},
      {locationId: 6, dateEvent: new Date(), weatherDegrees: '7.2', weatherDescription: 'Солнечно'},
      {locationId: 7, dateEvent: new Date(), weatherDegrees: '4.4', weatherDescription: 'Пасмурно с прояснениями'},
      {locationId: 8, dateEvent: new Date(), weatherDegrees: '3.2', weatherDescription: 'Пасмурно с прояснениями'},
      {locationId: 9, dateEvent: new Date(), weatherDegrees: '3', weatherDescription: 'Пасмурно с прояснениями'},
      {locationId: 10, dateEvent: new Date(), weatherDegrees: '2', weatherDescription: 'Дождь'},
      {locationId: 10, dateEvent: new Date(), weatherDegrees: '5', weatherDescription: 'Дождь'},
      {locationId: 10, dateEvent: new Date(), weatherDegrees: '3', weatherDescription: 'Дождь'},
      {locationId: 10, dateEvent: new Date(), weatherDegrees: '6', weatherDescription: 'Дождь'},
      {locationId: 11, dateEvent: new Date(), weatherDegrees: '11', weatherDescription: 'Пасмурно с прояснениями'},
      {locationId: 11, dateEvent: new Date(), weatherDegrees: '1.6', weatherDescription: 'Пасмурно с прояснениями'},
      {locationId: 11, dateEvent: new Date(), weatherDegrees: '1.1', weatherDescription: 'Пасмурно с прояснениями'},
      {locationId: 12, dateEvent: new Date(), weatherDegrees: '1.3', weatherDescription: 'Солнечно'},
    ];
    
    super.firstData(locations);
  }
  
  // --------
}


