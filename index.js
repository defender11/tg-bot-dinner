import TGWorkEnvironment from "./App/TG/TGWorkEnvironment.js";
import Server from "./App/Server/index.js";

const server = new Server();
const tgWorkEnvironment = new TGWorkEnvironment();

await server.init();
await tgWorkEnvironment.init();

