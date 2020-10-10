import { Message } from 'discord.js'

module.exports = {
  name: 'monster',
  description: 'Display basic information about a monster.',
  execute (message: Message, args: Array<string>) {
    console.log('Hello, World')
  }
}
