import {printCLWithTime} from "../../../Common/Log.js";

export default {
  polling_error: {
    init: async (err) => {
      printCLWithTime('error', err.data.error.message)
    }
  }
}