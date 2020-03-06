module.exports = state => {
  const { eventParams, shellState } = state
  const reason = eventParams

  shellState.setState({ socket: null })

  global.log.debug(`Disconnected from backend: ${reason}`)
  global.chatLog.warn('Disconnected from chat room!'.yellow)
}
