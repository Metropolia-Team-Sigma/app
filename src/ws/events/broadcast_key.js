const { keyCache } = require('../../crypto')

module.exports = state => {
  const { id, encryptionKey } = state.eventParams
  // Only cache encryption key if it hasn't been cached yet
  if (!keyCache.has(id)) {
    keyCache.set(id, encryptionKey)
    global.log.debug(`Cached decryption key for user ${id}.`)
  }
}
