import Holidays from "./holidays.js";

export function getFormattedDate(dateString) {
  const date = new Date(dateString);
  
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  return date.toLocaleDateString('ru-RU', options);
}

// Проверяем, является ли текущая дата рабочим днём
export async function isWorkingDay(date) {
  const day = date.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
  const formattedDate = date.toISOString().split("T")[0];
  
  const holidayDates = await Holidays.getHolidaysInfo();
  
  return day >= 1 && day <= 5 && !holidayDates.includes(formattedDate);
}