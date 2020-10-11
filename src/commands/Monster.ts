import { Message, Command } from 'discord.js'
import MHWClient from '../modules/common/MHWClient'
import Helper from '../modules/common/Helper'
import MonsterMapper from '../modules/mappers/MonsterMapper'

export = {
  name: 'monster',
  description: 'Display basic information about a monster.',
  async execute (message: Message, args: Array<string>) {
    const client = new MHWClient()

    try {
      const index = await client.getMonsterList()
      const search = args.join(' ')

      const found = Helper.search(index, search)
      const monster = await client.getMonster(found.id)

      const embed = (new MonsterMapper(monster)).getMessage()

      await message.channel.send(embed)
    } catch (error) {
      await message.reply('I had a problem completing that request.')
    }
  }
}
