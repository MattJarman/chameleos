import { MessageEmbed } from 'discord.js'
import Monster from '../../interfaces/monster/Monster'

class MonsterMapper {
    private monster: Monster
    private message: MessageEmbed

    public constructor (monster: Monster) {
      this.monster = monster
      this.message = new MessageEmbed()
    }

    public getMessage (): MessageEmbed {
      return this.message
    }
}
