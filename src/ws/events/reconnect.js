module.exports = state => {
  const attempt = state.eventParams
  global.log.info(`Successfully reconnected to backend on attempt ${attempt}.`)
}
