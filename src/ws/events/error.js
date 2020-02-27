module.exports = state => {
  const err = state.eventParams
  global.log.error(`Encountered error in socket connection: ${err}`)
}
