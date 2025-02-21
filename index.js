import TGWorkEnvironment from "./App/TG/TGWorkEnvironment.js";
import Server from "./App/Server/index.js";

const server = new Server();
const tgWorkEnvironment = new TGWorkEnvironment();

try {
  const serverStarted = await server.init();
  
  if (serverStarted) {
    console.log('Server Started: ', serverStarted);
    
    try {
      setTimeout(async () => {
        await tgWorkEnvironment.init();
        console.log('Initialization Telegram Work Environment');
      }, 1000);
    } catch (e) {
      console.error('Initialization error Telegram Work Environment:', e);
    }
  }
} catch (e) {
  console.error('Initialization error Server Config:', e);
}
