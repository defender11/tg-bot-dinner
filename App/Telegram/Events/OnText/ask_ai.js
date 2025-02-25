import {TGBot} from "../../Bot/instance.js";
import {ApiAI} from "../../Common/ApiAI.js";
import CommonBus from "./../../Common/CommonBus.js";

function getPreparedUserQueueQuestion(msg) {
  return {
    answerStatus: 'waiting',
    messages_id: [],
    first_name: msg.from.first_name,
    question: '',
  };
}

function getPreparedUserName(userName, userID) {
  return `${userName}`;
}

export default {
  ask_ai: {
    init: async (msg) => {
      
      if (Object.keys(msg.from).length && !msg.from.is_bot) {
        const userID = msg.from.id;
        const chatID = msg.chat.id;
        
        const contentUserName = getPreparedUserName(msg.from.first_name, msg.from.username);
        
        if (typeof CommonBus.usersQueueQuestions[userID] === "undefined") {
          /**
           * added to queue wait
           */
          CommonBus.usersQueueQuestions[userID] = getPreparedUserQueueQuestion(msg);
          
          const msgResponse = await TGBot.sendMessage(chatID, `*${contentUserName}*, waiting question`, {parse_mode: 'Markdown'});
          
          CommonBus.usersQueueQuestions[userID].messages_id.push(msgResponse.message_id);
          
          return;
        }
        
        if (CommonBus.usersQueueQuestions[userID].answerStatus === 'pending') {
          return;
        }
        
        if (CommonBus.usersQueueQuestions[userID].answerStatus === 'waiting') {
          CommonBus.usersQueueQuestions[userID].answerStatus = 'pending';
          CommonBus.usersQueueQuestions[userID].question = msg.text;
          
          const msgResponse = await TGBot.sendMessage(chatID, `
*${contentUserName}* - generating answer,
approximately from 2 minutes`
            , {parse_mode: 'Markdown'});
          
          const apiAI = new ApiAI();
          
          const answerFromApi = await apiAI.getAnswer(msg.text);
          
          if (answerFromApi.length) {
            answerFromApi.forEach((a) => {
              const preparedDescription = `
Question from *${contentUserName}*:
${CommonBus.usersQueueQuestions[userID].question}

------------------------------------------

Model: ${a.model},

------------------------------------------

${a.answer}`;
              
              TGBot.sendMessage(chatID, preparedDescription, {parse_mode: 'Markdown'})
                .then(() => console.log('The answer from AI was sent to TG'))
                .catch(async (e) => {
                  console.warn('Failed to send an answer From AI to TG', e);
                  await this.init(msg);
                });
              
            });
          }
          
          const deletedMessagesPromise = CommonBus.usersQueueQuestions[userID].messages_id.map(
            message_id => TGBot.deleteMessage(chatID, message_id))
          
          await Promise.all([
            ...deletedMessagesPromise,
            TGBot.deleteMessage(chatID, msgResponse.message_id)
          ])
            .then(() => console.log('Messages are successfully deleted'))
            .catch((err) => console.error('Has error to deleted messages', err))
            .finally(() => delete (CommonBus.usersQueueQuestions[userID]));
          
          return;
        }
      }
      
      return;
    }
  }
}