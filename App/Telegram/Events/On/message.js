export default {
  message: {
    init: async (msg) => {
      const chatId = msg.chat.id;
      console.log(msg);
      
      // send a message to the chat acknowledging receipt of their message
      // sendToTG(chatId, 'Received your message');
    }
  }
}