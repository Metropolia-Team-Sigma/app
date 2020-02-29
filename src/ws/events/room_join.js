const { encryptionKey } = require('../../crypto')

module.exports = state => {
  const { room, socket } = state
  global.log.info(`Joined room ${room}.`)
  global.chatLog.info(`Joined room ${room}.`)
  socket.emit('chat_join', { id: socket.id })
  socket.emit('broadcast_key', { id: socket.id, encryptionKey })
}
