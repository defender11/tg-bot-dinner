import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import {printCLWithTime} from "./Log.js";

export async function getFolderList(dir = '', __dirname = '', excludeAutoloadFileList = []) {
  if (__dirname === '') {
    const __filename = fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);
  }
  
  const folderDir = path.join(__dirname, dir);
  
  try {
    // Оборачиваем fs.readdir в Promise
    const files = await new Promise((resolve, reject) => {
      fs.readdir(folderDir, (err, files) => {
        if (err) {
          reject(err); // Передаем ошибку в reject
        } else {
          resolve(files); // Передаем список файлов в resolve
        }
      });
    });
    
    // Фильтруем файлы, оставляя только .js файлы
    return files
      .filter(file => path.extname(file) === '.js' && !excludeAutoloadFileList.includes(path.basename(file, '.js')))
      .map(file => file.replace('.js', ''));
  } catch (err) {
    printCLWithTime('error', "Error reading the directory:", err);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}