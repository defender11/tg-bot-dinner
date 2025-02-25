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
      console.log(`Random number: ${randomNumber}`);
      
      return randomNumber;
    } catch (error) {
      console.error('Error when receiving a random number:', error);
      return -1;
    }
  }
}