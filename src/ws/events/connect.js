// Flatten newlines and shrink extra whitespace in a string
const flatString = string => string.trim().replace(/\s+/g, ' ').replace(/\r\n|\n/g, ' ')

module.exports = state => {
  const { wsUrl, room, socket } = state
  global.log.info(`Successfully connected to backend ${wsUrl}. Joining room ${room}...`) // FIXME: Temp
  global.chatLog.info(flatString(`
    Connected! You can join a chat room by typing ${'/join <room ID> <password>'.bold.underline}
    or create a new chat room by typing ${'/create <room name> <password>'.bold.underline}.
    Happy chatting!
  `))
  // FIXME: Temp
  socket.emit('request_room_join', { room })
}
