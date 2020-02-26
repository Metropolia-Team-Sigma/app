module.exports = err => {
  global.log.error(`Encountered error while reconnecting to backend: ${err}`)
}
