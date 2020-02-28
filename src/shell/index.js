const commands = require('./commands')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = function waitForCommand () {
  readline.question('', input => {
    if (input.startsWith('/')) {
      // Split input into command (Without leading slash) and arguments thereof
      const elements = input.split(' ')
      const command = elements.splice(0, 1)[0].replace('/', '')
      const args = elements

      if (commands[command]) commands[command](args)
      else global.chatLog.warn(`Command "${command}" does not exist!`.yellow)
    } else {
      // TODO: Send message
      console.log(`Sending message ${input}`)
    }

    // Wait for next command
    waitForCommand()
  })
}
