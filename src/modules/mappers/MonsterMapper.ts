import { MessageEmbed, MessageAttachment, FileOptions } from 'discord.js'
import Monster from '../../interfaces/monster/Monster'
import Helper from '../common/Helper'

export default class MonsterMapper {
    private readonly WEAKNESS_FILTER = ['sleep', 'paralysis', 'stun', 'poison', 'blast']
    private readonly WEAKNESS_AMOUNT = 3
    private readonly STAR = '⭐'

    private monster: Monster
    private message: MessageEmbed

    public constructor (monster: Monster) {
      this.monster = monster
      this.message = new MessageEmbed()

      this.map()
    }

    public getMessage (): MessageEmbed {
      return this.message
    }

    private map (): void {
      const icon: unknown = new MessageAttachment(this.monster.icon, 'icon.png')
      this.message.setTitle(this.monster.name)
        .attachFiles((icon as (MessageAttachment | FileOptions | string)[]))
        .setColor(this.monster.colour)
        .setThumbnail('attachment://icon.png')
        .addField('Species', this.monster.species || 'N/A', true)
        .addField('Size', Helper.capitalise(this.monster.size), true)
        .addField('Description', this.monster.description)

      this.mapWeaknesses()
    }

    private mapWeaknesses (): void {
      const weaknesses = this.monster.weaknesses

      const filtered = Object.entries(weaknesses).filter(element => {
        return !this.WEAKNESS_FILTER.includes(element[0])
      })

      const sorted = filtered.sort((a, b): number => {
        return b[1] - a[1]
      })
        .slice(0, this.WEAKNESS_AMOUNT)
        .filter(element => {
          return element[1] > 0
        })

      if (sorted.length === 0) {
        return
      }

      this.message.addField('\u200b', '\u200b')
      this.message.addField('Weaknesses', '\u200b')

      for (const weakness of sorted) {
        const name = Helper.capitalise(weakness[0])
        const value = this.STAR.repeat(weakness[1])
        this.message.addField(name, value, true)
      }
    }
}
