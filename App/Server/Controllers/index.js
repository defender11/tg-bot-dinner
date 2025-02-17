export default class Index {
  
  #app = null;
  constructor(app) {
    this.#app = app;
  }
  
  init() {
    this.#app.get('/', (req, res) => {
      const data = {
        message: 'Привет из Node.js!',
        buttonText: 'Нажми меня'
      };
      res.render('history', {data: data});
    });
  }
}