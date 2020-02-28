module.exports = state => {
  global.log.error('All attempts to reconnect to backend have failed.')
  global.log.error('All reconnect attempts failed.'.red)
}
