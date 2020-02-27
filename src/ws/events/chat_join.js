const { encryptionKey } = require('../../crypto')

module.exports = state => {
  const { socket, eventParams } = state
  global.log.info(`User ${eventParams.id} joined the chat. Broadcasting own encryption key...`)
  socket.emit('broadcast_key', { id: socket.id, encryptionKey })
}
