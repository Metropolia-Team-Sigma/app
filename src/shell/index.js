const readline = require('serverline')
const commands = require('./commands')
const { encryptMessage } = require('../crypto')
const formatMessageTimestamp = require('../utils/formatMessageTimestamp')

module.exports = socket => {
  const timestamp = `[${formatMessageTimestamp(new Date())}]`.bold.green
  const author = 'You: '.bold.magenta

  readline.init()

  // Using explicit setPrompt because passing the prompt to init() will lead to unexpected results from getPrompt()
  readline.setPrompt(`${timestamp} ${author}`)

  // Handle command/message sending
  readline.on('line', input => {
    if (input.startsWith('/')) { // Handle as command to execute
      // Split input into command (Without leading slash) and arguments thereof
      const elements = input.split(' ')
      const command = elements.splice(0, 1)[0].replace('/', '')
      const args = elements

      if (commands[command]) commands[command](args, socket)
      else global.chatLog.warn(`Command "${command}" does not exist!`.yellow)
    } else { // Handle as message to send
      socket.send({ content: encryptMessage(input), id: socket.id })
    }
  })

  // Handle Ctrl-C
  readline.on('SIGINT', rl => {
    const prompt = '[Sigma]'.bold.green
    const question = 'Leave chat room? (y/n) '.bold.yellow

    rl.question(`${prompt} ${question}`, answer =>
      answer.match(/^y(es)?$/i)
        ? process.exit(0)
        : rl.output.write(readline.getPrompt())
    )
  })
}
