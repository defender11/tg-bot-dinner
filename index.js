import TGWorkEnvironment from "./App/TG/TGWorkEnvironment.js";
import Server from "./App/Server/index.js";

const server = new Server();
const tgWorkEnvironment = new TGWorkEnvironment();

try {
  const serverStarted = await server.init();
  
  if (serverStarted) {
    console.log('ServerStarted: ', serverStarted);
    
    try {
      setTimeout(async () => {
        await tgWorkEnvironment.init();
        console.log('Initialization TgWorkEnvironment');
      }, 1000);
    } catch (e) {
      console.error('Initialization error TgWorkEnvironment:', e);
    }
  }
} catch (e) {
  console.error('Initialization error ServerConfig:', e);
}
