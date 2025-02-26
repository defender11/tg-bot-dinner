export function logTime(withMilliseconds = false) {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  
  const logTimeStr = `[ ${year}-${month}-${day} ${hours}:${minutes}:${seconds}${(withMilliseconds ? `.${milliseconds} ]` : ' ]' )}`;
  return logTimeStr;
}

export function printCLWithTime(state = 'log', ...arg) {
  const message = logTime() + ' ';
  
  switch (state) {
    case "log":
      console.log(message, ...arg);
      break;
    case "warn":
      console.warn(message, ...arg);
      break;
    case "error":
      console.error(message, ...arg);
      break;
    default:
      console.log(message, ...arg);
      break;
  }
}
