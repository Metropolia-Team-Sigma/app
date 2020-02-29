const winston = require('winston')
const path = require('path')

const devLogPath = path.join(__dirname, 'debug.log')
const prodLogPath = path.join(process.execPath, 'debug.log')
const isProduction = process.pkg

const debugLogger = winston.createLogger({
  level: process.env.NODE_ENV === 'debug' ? 'silly' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: isProduction ? prodLogPath : devLogPath })
  ]
})

const generatePrefix = info => {
  let prefix

  if (info.id && info.timestamp) prefix = `[${info.timestamp}] ${info.id.magenta}:`
  else prefix = '[Sigma]'

  // Colorise system messages to blue
  return `${prefix.green.bold} ${info.id && info.timestamp ? info.message : info.message.cyan}`
}

const chatLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.colorize(),
    winston.format.printf(info => generatePrefix(info))
  ),
  transports: [
    new winston.transports.Console()
  ]
})

global.log = debugLogger
global.chatLog = chatLogger
global.reportErrorMessage = 'Something unexpected went wrong. Please contact the developers and attach the "debug.log" file from the application installation directory. Thanks!'.yellow
