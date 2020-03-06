const { keyCache, decryptMessage } = require('../../crypto')
const formatMessageTimestamp = require('../../utils/formatMessageTimestamp')

module.exports = state => {
  const { content, id, name } = state.eventParams
  const decryptionKey = keyCache.get(id)
  let messageContent

  if (!decryptionKey) messageContent = '<cannot decrypt message due to missing encryption key>'
  else messageContent = decryptMessage(content, decryptionKey)

  global.chatLog.info(messageContent, { id, name, timestamp: formatMessageTimestamp(new Date()) })
}
