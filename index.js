import TGWorkEnvironment from "./App/TG/TGWorkEnvironment.js";
import Server from "./App/Server/index.js";

const tgWorkEnvironment = new TGWorkEnvironment();
const server = new Server();

tgWorkEnvironment.init();
server.init();
