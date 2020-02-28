const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)

module.exports = async () => {
  // Parse file location and read it
  const logoFile = path.join(__dirname, 'logo.txt')
  const logo = await readFile(logoFile, { encoding: 'utf-8' })
  // Print the logo with rainbow colors to console
  console.log(logo.rainbow)
}
