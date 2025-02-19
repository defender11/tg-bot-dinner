import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_URL,
  logging: false, // Отключаем логи SQL-запросов в консоли
});

export default sequelize;