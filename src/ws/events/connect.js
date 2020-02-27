module.exports = state => {
  const { wsUrl, room, socket } = state
  global.log.info(`Successfully connected to backend ${wsUrl}. Joining room ${room}...`)
  socket.emit('request_room_join', { room })
}
