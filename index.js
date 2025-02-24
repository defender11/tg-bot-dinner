import Server from "./App/Server/index.js";
import TGEnvironment from "./App/Telegram/index.js";

try {
  const server = new Server();
  const serverStarted = await server.init();
  
  if (serverStarted) {
    console.log('Server Started: ', serverStarted);
    
    try {
      setTimeout(async () => {
        const tgEnvironment = new TGEnvironment();
        await tgEnvironment.init();
        console.log('Initialization Telegram Work Environment');
      }, 1000);
    } catch (e) {
      console.error('Initialization error Telegram Work Environment:', e);
    }
  }
} catch (e) {
  console.error('Initialization error Server Config:', e);
}
