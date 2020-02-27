module.exports = state => {
  const { room } = state
  global.log.info(`Joined room ${room}.`)
}
