import {sendDailyMessage} from "../../Common/DailyMessage.js";

export default {
  try_your_luck: {
    init: async (msg) => {
      await sendDailyMessage(msg);
    }
  }
}