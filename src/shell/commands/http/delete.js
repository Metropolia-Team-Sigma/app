const request = require('superagent')
const { machineId } = require('node-machine-id')
const { backendUrl } = require('../../../../config.json')

const getVerboseError = message => {
  switch (message) {
    case 'Not Found': return 'Room does not exist.'
    case 'Unauthorized': return 'You do not own this room.'
    case 'Internal Server Error': return 'Server-side error.'
  }
}

module.exports = async (args, state) => {
  if (!args[0]) global.chatLog.warn('Please provide a room ID!'.yellow)
  else {
    try {
      await request.delete(`${backendUrl}/rooms/${args[0]}`).send({
        owner: await machineId()
      })

      global.chatLog.info(`Room ${args[0].bold.underline} deleted.`)
    } catch (err) {
      global.chatLog.error(`Could not delete room "${args[0]}": ${getVerboseError(err.message).yellow}`.red)
    }
  }
}
