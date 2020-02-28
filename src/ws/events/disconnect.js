module.exports = state => {
  const reason = state.eventParams
  global.log.debug(`Disconnected from backend: ${reason}`)
  global.chatLog.warn('Disconnected from server!'.yellow)
}
