import { Client, Message, Collection } from 'discord.js'
import CommandClient from '../interfaces/CommandClient'
import fs from 'fs'
import config from 'config'

export default class Bot {
    private client: CommandClient

    public constructor (token: string) {
      this.client = new Client()
      this.client.login(token)

      this.setCommands()
    }

    public listen (): void {
      this.client.on('ready', () => {
        console.log(`Logged in as ${this.client?.user?.tag}`)
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
        // TODO: Add interface for commands
        const command = require(`../commands/${file}`)
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
      const command = args.shift()?.toLowerCase()

      try {
        this.client.commands?.get(command).execute(message, args)
      } catch (error) {
        message.reply('that command does not exist.')
      }
    }
}
