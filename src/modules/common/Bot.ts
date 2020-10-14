import { Client, Message, Collection, Command } from 'discord.js'
import fs from 'fs'
import config from 'config'

export default class Bot {
    private client: Client

    public constructor (token: string) {
      this.client = new Client()
      this.client.login(token)

      this.setCommands()
    }

    public listen (): void {
      this.client.on('ready', () => {
        console.log(`Logged in as ${this.client.user?.tag}`)
      })

      this.client.on('message', message => {
        if (message.author.bot) {
          return
        }

        this.handleMessage(message)
      })
    }

    private setCommands (): void {
      this.client.commands = new Collection()
      const files = fs.readdirSync('dist/commands').filter(file => file.endsWith('js'))

      for (const file of files) {
        const command = require(`../../commands/${file}`)
        this.client.commands.set(command.name, command)
      }
    }

    private handleMessage (message: Message): void {
      const prefix: string = config.get('bot.prefix')
      const content = message.content
      if (!message.content.startsWith(prefix)) {
        return
      }

      const args = content.slice(prefix.length).split(' ')
      const name = args.shift()?.toLowerCase()

      try {
        const command = this.client.commands?.get(name) as Command
        command.execute(message, args)
      } catch (error) {
        message.reply('that command does not exist.')
      }
    }
}
