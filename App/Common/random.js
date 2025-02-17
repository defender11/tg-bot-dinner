import axios from "axios";

export default {
  getLocalRandomInt: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  getRandomNumberFromApi: async function (maxCount) {
    try {
      const response = await axios.get('https://www.random.org/integers/', {
        params: {
          num: 1,
          min: 0,
          max: maxCount,
          col: 1,
          base: 10,
          format: 'plain',
          rnd: 'new'
        }
      });
      
      const randomNumber = parseInt(response.data, 10);
      console.log(`Случайное число: ${randomNumber}`);
      
      return randomNumber;
    } catch (error) {
      console.error('Ошибка при получении случайного числа:', error);
      return -1;
    }
  }
}