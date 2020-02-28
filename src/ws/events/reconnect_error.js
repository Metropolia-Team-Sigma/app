module.exports = state => {
  const err = state.eventParams
  global.log.error(`Encountered error while reconnecting to backend: ${err}`)
  global.chatLog.error('Reconnect attempt failed.'.red)
}
