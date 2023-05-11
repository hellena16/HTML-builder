const path = require('path')
const fs = require('fs')
const readline = require('readline')

const { stdin, stdout } = process

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8')

stdout.write('Hello! Please, write your text\n')
stdin.on('data', (data) => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    process.exit()
  } else {
    stream.write(data)
  }
})
process.on('exit', () => stdout.write('Bye!'))
process.on('SIGINT', () => {
  stdout.write('Bye!')
  process.exit()
})
