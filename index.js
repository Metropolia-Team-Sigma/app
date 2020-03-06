// Load global libraries
require('colors')
require('./src/log')

const { machineId } = require('node-machine-id')
const { start } = require('./src/shell')
const printLogo = require('./src/utils/printLogo')
const flatString = require('./src/utils/flatString')

;(async () => {
  try {
    global.hwid = await machineId()
    await printLogo()
    global.chatLog.info('Welcome to Sigma!')
    global.chatLog.info(flatString(`
      You can join a chat room by typing ${'/join <room ID> <password>'.bold.underline}
      or create a new chat room by typing ${'/create <room name> <password>'.bold.underline}.
      Happy chatting!
    `))
    start()
  } catch (err) {
    global.chatLog.error(global.reportErrorMessage)
    global.chatLog.error('Exiting...')
    process.exit(1)
  }
})()
