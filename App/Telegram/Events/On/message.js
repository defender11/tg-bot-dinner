import CommonBus from "../../Common/CommonBus.js";
import ModuleAskAI from "../OnText/ask_ai.js";

export default {
  message: {
    init: async (msg) => {
      const chatId = msg.chat.id;
      
      console.log(msg);
      console.log(CommonBus.usersQueueQuestions);
      
      if (typeof CommonBus.usersQueueQuestions[msg.from.id] !== "undefined") {
        await ModuleAskAI.ask_ai.init(msg);
      }
      
      // send a message to the chat acknowledging receipt of their message
      // sendToTG(chatId, 'Received your message');
    }
  }
}