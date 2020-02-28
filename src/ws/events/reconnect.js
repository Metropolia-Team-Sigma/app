module.exports = state => {
  const attempt = state.eventParams
  global.log.info(`Successfully reconnected to backend on attempt ${attempt}.`)
  global.chatLog.info(`Reconnected after ${attempt} attempts, you're back in business!`.green)
}
