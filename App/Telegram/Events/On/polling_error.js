export default {
  polling_error: {
    init: async (err) => {
      console.log(err.data.error.message)
    }
  }
}