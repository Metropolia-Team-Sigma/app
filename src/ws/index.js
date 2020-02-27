const io = require('socket.io-client')
const events = require('./events')

module.exports = (wsUrl, room) => {
  global.log.debug(`Connecting to backend ${wsUrl}...`)

  const socket = io(wsUrl)

  // Define shared state across all event handlers
  const globalState = { wsUrl, room, socket }

  // Register event handlers
  for (const event in events) {
    const handler = events[event]
    socket.on(event, eventParams => handler({ eventParams, ...globalState }))
  }
}