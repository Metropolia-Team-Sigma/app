module.exports = (...args) => {
  global.chatLog.info('Shutting down...')
  process.exit(0)
}
