// Flatten newlines and shrink extra whitespace in a string
module.exports = string => string.trim().replace(/\s+/g, ' ').replace(/\r\n|\n/g, ' ')
