import { Message } from 'discord.js'
import MHWClient from '../modules/common/MHWClient'
import Helper from '../modules/common/Helper'
import WeaponMapper from '../modules/mappers/WeaponMapper'

export = {
  name: 'weapon',
  description: 'Displays information for a weapon',
  async execute (message: Message, args: Array<string>): Promise<void> {
    const client = new MHWClient()

    try {
      const index = await client.getWeaponList()
      const search = args.join(' ')

      const found = Helper.search(index, search)
      const weapon = await client.getWeapon(found.id)

      const embed = (new WeaponMapper(weapon)).getMessage()

      await message.channel.send(embed)
    } catch (error) {
      console.error(error)
      await message.reply('I had a problem completing that request.')
    }
  }
}
