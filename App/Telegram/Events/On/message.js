import CommonBus from "../../Common/CommonBus.js";
import ModuleAskAI from "../OnText/ask_ai.js";
import {printCLWithTime} from "../../../Common/Log.js";

export default {
  message: {
    init: async (msg) => {
      const chatId = msg.chat.id;
      
      printCLWithTime('log', msg);
      printCLWithTime('log', CommonBus.usersQueueQuestions);
      
      if (typeof CommonBus.usersQueueQuestions[msg.from.id] !== "undefined") {
        await ModuleAskAI.ask_ai.init(msg);
      }
      
      // send a message to the chat acknowledging receipt of their message
      // sendToTG(chatId, 'Received your message');
    }
  }
}