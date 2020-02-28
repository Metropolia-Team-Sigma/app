const { keyCache } = require('../../crypto')

module.exports = state => {
  const { id } = state.eventParams
  keyCache.delete(id)
  global.log.info(`User ${id} has left the chat.`)
  global.chatLog.info(`User ${id} has left the chat.`)
}
