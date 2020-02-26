const io = require('socket.io-client')
const handlers = require('./handlers')

module.exports = (wsUrl, room) => {
  global.log.debug(`Connecting to backend ${wsUrl}...`)

  const socket = io(wsUrl)

  socket.on('connect', () => handlers.connect(wsUrl, room, socket))
  socket.on('room_joined', () => handlers.room_joined(room))
  socket.on('disconnect', reason => handlers.disconnect(reason))
  socket.on('reconnect', attempt => handlers.reconnect(attempt))
  socket.on('reconnect_attempt', attempt => handlers.reconnect_attempt(attempt))
  socket.on('reconnect_error', err => handlers.reconnect_error(err))
  socket.on('reconnect_failed', handlers.reconnect_failed)
  socket.on('error', err => handlers.error(err))
}
