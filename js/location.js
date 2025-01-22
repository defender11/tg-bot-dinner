export default {
  getLocations: function() {
    return [
      {name: 'Okey'},
      {name: 'СуперТяж'},
      {name: 'Чайхана'},
      {name: 'Китайцы'},
      {name: 'Манты возле театра'},
      {name: 'У Бабушки'},
      {name: 'Лисёнок'},
      {name: 'Лоло Пицца'},
      {name: 'Челентано (внутри)'},
      {name: 'Челентано (с собой)'},
      {name: 'Плов на рынке'},
      {name: 'Лепим Сами'},
    ];
  },
  
  getLocationCount: function() {
    return (this.getLocations().length - 1);
  }
}