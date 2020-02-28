module.exports = state => {
  const attempt = state.eventParams
  global.log.warn(`Attempting to reconnect to backend, attempt ${attempt}...`)
  global.chatLog.warn(`Trying to get you back online, attempt ${attempt}...`.yellow)
}
