import { Message, MessageEmbed, MessageAttachment, FileOptions } from 'discord.js'
import MHWClient from '../modules/MHWClient'
import Helper from '../modules/Helper'
import Monster from '../interfaces/monster/Monster'

module.exports = {
  name: 'monster',
  description: 'Display basic information about a monster.',
  async execute (message: Message, args: Array<string>) {
    const client = new MHWClient()

    try {
      const index = await client.getMonsterList()
      const search = args.join(' ')

      const found = Helper.search(index, search)
      const monster = await client.getMonster(found.id)
      await message.channel.send(formatMessage(message, monster))
    } catch (error) {
      await message.reply('I had a problem completing that request.')
    }
  }
}

function formatMessage (message: Message, monster: Monster): MessageEmbed {
  const icon: unknown = new MessageAttachment(monster.icon, 'icon.png')
  const embed = new MessageEmbed()
    .setTitle(monster.name)
    .attachFiles((icon as (MessageAttachment | FileOptions | string)[]))
    .setThumbnail('attachment://icon.png')
    .addField('Species', monster.species || 'N/A', true)
    .addField('Size', Helper.capitalise(monster.size), true)
    .addField('Description', monster.description)

  // TODO: Add monster weaknesses

  return embed
}
