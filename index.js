// Load global libraries
require('colors')
require('./src/log')

const config = require('./config.json')
const printLogo = require('./src/utils/printLogo')
const startShell = require('./src/shell')
const connectToWebSocket = require('./src/ws')

;(async () => {
  try {
    await printLogo()
    global.chatLog.info('Welcome to Sigma!')
    global.chatLog.info('Connecting to the server...')
    const socket = await connectToWebSocket(config.backendUrl, 'a9c450b1-9e5e-4565-b3cd-155cad72466e')
    startShell(socket)
  } catch (err) {
    global.chatLog.error(global.reportErrorMessage)
    global.chatLog.error('Exiting...')
    process.exit(1)
  }
})()
