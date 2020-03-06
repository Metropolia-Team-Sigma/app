const request = require('superagent')
const { backendUrl } = require('../../../../config.json')
const connectToWebSocket = require('../../../ws')

const getVerboseError = message => {
  switch (message) {
    case 'Not Found': return 'Room does not exist.'
    case 'Unauthorized': return 'Incorrect password.'
    case 'Internal Server Error': return 'Server-side error.'
  }
}

module.exports = async (args, state) => {
  if (!args[0] || !args[1]) global.chatLog.warn('Please provide a room ID and password!'.yellow)
  else {
    try {
      const res = await request.get(`${backendUrl}/rooms/${args[0]}?p=${args[1]}`)
      connectToWebSocket(res.body.address, args[0], state)
    } catch (err) {
      global.chatLog.error(`Could not connect to room "${args[0]}": ${getVerboseError(err.message).yellow}`.red)
    }
  }
}
