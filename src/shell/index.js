const readline = require('readline')
const { Writable } = require('stream')
const commands = require('./commands')
const { encryptMessage } = require('../crypto')
const formatMessageTimestamp = require('../utils/formatMessageTimestamp')

// FIXME: Stdout does sometimes not get muted
// Minor hack to prevent unnecessary output from making it to stdout (Like messages being sent)
const stdout = new Writable({
  write: (chunk, encoding, callback) => {
    if (!this.muted) {
      process.stdout.write(chunk, encoding)
      callback()
    }
  }
})

const rl = readline.createInterface({
  input: process.stdin,
  output: stdout
})

module.exports = function waitForCommand (socket) {
  rl.question('', input => {
    if (input.startsWith('/')) {
      // Split input into command (Without leading slash) and arguments thereof
      const elements = input.split(' ')
      const command = elements.splice(0, 1)[0].replace('/', '')
      const args = elements

      if (commands[command]) commands[command](args, socket)
      else global.chatLog.warn(`Command "${command}" does not exist!`.yellow)
    } else {
      // Re-log message locally
      global.chatLog.info(input, { id: socket.id, timestamp: formatMessageTimestamp(new Date()) })
      socket.send({ content: encryptMessage(input), id: socket.id })
    }

    // Wait for next command
    waitForCommand(socket)
  })
}
