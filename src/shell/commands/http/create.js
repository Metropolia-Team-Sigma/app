const request = require('superagent')
const { machineId } = require('node-machine-id')
const { backendUrl } = require('../../../../config.json')
const flatString = require('../../../utils/flatString')

const getVerboseError = message => {
  if (message.includes('Bad Request; missing body parameters')) return 'Too few parameters submitted.'
  else if (message === 'Internal Server Error') return 'Server-side error.'
}

module.exports = async (args, state) => {
  if (!args[0] || !args[1]) global.chatLog.warn('Please provide a room name and password!'.yellow)
  else {
    try {
      const res = await request.post(`${backendUrl}/rooms/create`).send({
        owner: await machineId(),
        name: args[0],
        password: args[1]
      })

      global.chatLog.info(flatString(`
        Room ${`${args[0]}`.bold.underline} created!
        Share the ID "${`${res.body.joinId}`.bold.underline}" to enable other users to join it.
        Users joining your room will need to supply the password you set.
      `))
      global.chatLog.info(`You can join your newly created room by typing ${`/join ${res.body.joinId} ${args[1]}`.bold.underline}.`)
    } catch (err) {
      global.chatLog.error(`Could not create room "${args[0]}": ${getVerboseError(err.message).yellow}`.red)
    }
  }
}
