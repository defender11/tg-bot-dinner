import Server from "./App/Server/index.js";
import TGEnvironment from "./App/Telegram/index.js";
import {printCLWithTime} from "./App/Common/Log.js";

try {
  const server = new Server();
  const serverStarted = await server.init();
  
  if (serverStarted) {
    printCLWithTime('log', 'Server Side Started');
    
    try {
      setTimeout(async () => {
        const tgEnvironment = new TGEnvironment();
        await tgEnvironment.init();
        
        printCLWithTime('log', 'Telegram Work Environment Started');
      }, 1000);
    } catch (e) {
      printCLWithTime('error', 'Initialization error Telegram Work Environment:', e);
    }
  }
} catch (e) {
  printCLWithTime('error', 'Initialization error Server Config:', e);
}
