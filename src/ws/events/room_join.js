module.exports = state => {
  const { room, socket } = state
  global.log.info(`Joined room ${room}.`)
  global.chatLog.info(`Joined room ${room}.`)
  socket.emit('chat_join', { id: socket.id })
}
