module.exports = (args, { setState }) => {
  setState({ name: args[0] || '' })
  global.chatLog.info(args[0] ? `Nickname set to ${args[0]}.` : 'Nickname cleared.')
}
