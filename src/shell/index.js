const defaults = require('defaults')
const readline = require('serverline')
const localCommands = require('./commands/local')
const httpCommands = require('./commands/http')
const chatCommands = require('./commands/chat')
const { encryptMessage } = require('../crypto')
const formatMessageTimestamp = require('../utils/formatMessageTimestamp')

let state = {
  socket: null,
  name: null
}

function start () {
  readline.init()

  const timestamp = `[${formatMessageTimestamp(new Date())}]`.bold.green
  const author = 'You: '.bold.magenta
  readline.setPrompt(`${timestamp} ${author}`)

  // Handle command/message sending
  readline.on('line', input => {
    if (input.startsWith('/')) { // Handle as command to execute
      // Split input into command (Without leading slash) and arguments thereof
      const elements = input.split(' ')
      const command = elements.splice(0, 1)[0].replace('/', '')
      const args = elements

      // When connected to a chat room, allow chat commands; when not, allow HTTP commands
      // (Local commands are always available)
      const availableCommands = state.socket
        ? { ...localCommands, ...chatCommands }
        : { ...localCommands, ...httpCommands }

      // List all commands for checking if the user is trying to access an inaccessible command
      const allCommands = { ...localCommands, ...httpCommands, ...chatCommands }

      if (availableCommands[command]) availableCommands[command](args, { current: state, setState, getState })
      else if (allCommands[command]) global.chatLog.warn(`Command "${command}" is not available because you are currently ${state.socket ? 'connected' : 'not connected'} to a chat room!`.yellow)
      else global.chatLog.warn(`Command "${command}" does not exist!`.yellow)
    } else { // Handle as message to send (If connected to chat room)
      if (state.socket) state.socket.send({ content: encryptMessage(input), id: state.socket.id, name: state.name })
    }
  })

  // Handle Ctrl-C
  readline.on('SIGINT', rl => {
    const prompt = '[Sigma]'.bold.green
    const question = state.socket
      ? 'Leave chat room? (y/n) '.yellow
      : 'Exit? (y/n) '.yellow

    rl.question(`${prompt} ${question}`, answer =>
      answer.match(/^y(es)?$/i)
        ? state.socket ? state.socket.disconnect() : process.exit(0)
        : rl.output.write(readline.getPrompt())
    )
  })
}

function getState () {
  return state
}

function setState (toUpdate) {
  state = defaults(toUpdate, state)
  return state
}

exports.start = start
exports.getState = getState
exports.setState = setState
