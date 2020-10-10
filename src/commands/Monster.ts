import { Message } from 'discord.js'
import MHWClient from '../modules/MHWClient'
import Helper from '../modules/Helper'

module.exports = {
  name: 'monster',
  description: 'Display basic information about a monster.',
  async execute (message: Message, args: Array<string>) {
    const client = new MHWClient()
    const helper = new Helper()
    const index = await client.getMonsterList()
    const search = args.join(' ')

    const found = helper.search(index, search)
    const monster = await client.getMonster(found.id)
    console.log(monster)
  }
}
