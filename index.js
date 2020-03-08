// Load global libraries
require('colors')
require('./src/log')

const { start } = require('./src/shell')
const printLogo = require('./src/utils/printLogo')
const flatString = require('./src/utils/flatString')

;(async () => {
  try {
    await printLogo()
    start()
    global.chatLog.info('Welcome to Sigma!')
    global.chatLog.info(flatString(`
      You can join a chat room by typing ${'/join <room ID> <password>'.bold.underline}
      or create a new chat room by typing ${'/create <room name> <password>'.bold.underline}.
      Happy chatting!
    `))
  } catch (err) {
    global.chatLog.error(global.reportErrorMessage)
    global.chatLog.error('Exiting...')
    process.exit(1)
  }
})()
