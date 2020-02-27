module.exports = state => {
  const reason = state.eventParams
  global.log.debug(`Disconnected from backend: ${reason}`)
}
