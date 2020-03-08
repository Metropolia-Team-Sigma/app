const { encryptionKey } = require('../../crypto')

module.exports = state => {
  const { socket, eventParams } = state
  global.log.info(`Joined room ${eventParams.name} (ID ${eventParams.id}).`)
  global.chatLog.info(`Joined room ${`${eventParams.name}`.bold.underline}.`)
  socket.emit('chat_join', { id: socket.id })
  socket.emit('broadcast_key', { id: socket.id, encryptionKey })
}
