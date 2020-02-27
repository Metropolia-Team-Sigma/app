const crypto = require('crypto')

// Assign a per-session encryption key
// AES-256-CBC requires a 256-bit (32-byte) encryption key and a 128-bit (16-byte) initialisation vector
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

// Encode key bytes as hexadecimal to prevent garbled output
exports.encryptionKey = `${key.toString('hex')}:${iv.toString('hex')}`

exports.keyCache = new Map()

exports.encryptMessage = message => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  const encrypted = cipher.update(message)
  return Buffer.concat([encrypted, cipher.final()])
}

exports.decryptMessage = (message, decryptionKey) => {
  decryptionKey = decryptionKey.split(':')
  const text = Buffer.from(message, 'hex')
  const key = Buffer.from(decryptionKey[0], 'hex')
  const iv = Buffer.from(decryptionKey[1], 'hex')

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  const decrypted = decipher.update(text)
  return Buffer.concat([decrypted, decipher.final()])
}
