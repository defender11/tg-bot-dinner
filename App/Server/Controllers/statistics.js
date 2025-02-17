import * as Location from '../../Common/location.js';
import axios from "axios";

export default class Statistics {
  
  #app = null;
  constructor(app) {
    this.#app = app;
  }
  
  init() {
    this.#app.get('/statistic/location/:id', (req, res) => {
      const locationID = req.params.id; // Получаем ID из URL
      res.json(locationID);
      // const pool = new pg.Pool(config);
      // pool.connect((err, client, done) => {
      //   if (err) {
      //     return res.status(500).send('Ошибка подключения к базе данных');
      //   }
      //
      //   client.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
      //     done(); // Завершаем соединение
      //     if (err) {
      //       return res.status(500).send('Ошибка выполнения запроса');
      //     }
      //     if (result.rowCount === 0) {
      //       return res.status(404).send('Пользователь не найден');
      //     }
      //     res.json(result.rows[0]); // Отправляем данные о пользователе
      //   });
      // });
    });
  }
}