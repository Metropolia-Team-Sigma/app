module.exports = state => {
  const { wsUrl, room, socket, shellState } = state
  shellState.setState({ socket })
  global.log.info(`Successfully connected to backend ${wsUrl}.`)
  socket.emit('request_room_join', { room })
}
