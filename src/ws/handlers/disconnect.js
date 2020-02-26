module.exports = reason => {
  global.log.debug(`Disconnected from backend: ${reason}`)
}
