export default {
  // Список праздников
  getHolidaysInfo: function(){
    return [
      {date: "2025-01-01", label: 'НГ'},
      {date: "2025-01-02", label: 'НГ'},
      {date: "2025-01-07", label: 'Рождество Христово'},
      {date: "2025-05-01", label: 'Праздник Весны и Труда'},
      {date: "2025-05-02", label: 'Праздник Весны и Труда'},
      {date: "2025-05-09", label: 'День Победы'},
      {date: "2025-06-12", label: 'День России'},
      {date: "2025-06-13", label: 'День России'},
      {date: "2025-11-04", label: 'День народного единства'},
      {date: "2025-12-31", label: 'НГ'},
    ]
  },
  
  getHolidayDates: function(){
    return this.getHolidaysInfo().map((holiday) => holiday.date);
  }
}