import { FileOptions, MessageAttachment, MessageEmbed } from 'discord.js'
import config from 'config'
import Weapon from '../../interfaces/weapon/Weapon'

export default class WeaponMapper {
    private weapon: Weapon
    private message: MessageEmbed
    private emojis: Record<string, string>

    public constructor (weapon: Weapon) {
      this.weapon = weapon
      this.message = new MessageEmbed()
      this.emojis = config.get('emojis')

      this.map()
    }

    public getMessage (): MessageEmbed {
      return this.message
    }

    private map (): void {
      const icon: unknown = new MessageAttachment(this.weapon.icon, 'icon.png')
      this.message.setTitle(this.weapon.name)
        .attachFiles((icon as (MessageAttachment | FileOptions | string)[]))
        .setThumbnail('attachment://icon.png')
        .addField('Attack', this.weapon.attack, true)
        .addField('Affinity', `${this.weapon.affinity}%`, true)
        .addField('Defense', this.weapon.defense, true)

      if (this.weapon.elements.length !== 0) {
        this.mapElements()
      }

      this.mapElderSeal()
    }

    private mapElements (): void {
      let elementsString = ''
      for (const element of this.weapon.elements) {
        elementsString += `${element.element} ${element.hidden ? '(hidden)' : ''} - ${element.attack}\n`
      }

      this.message.addField('Elements', elementsString, true)
    }

    private mapElderSeal (): void {
      this.message.addField(
        'Elderseal',
        `${this.weapon.elderseal ? `${this.emojis.check}\u200b` : `${this.emojis.x}\u200b`}`,
        true
      )
    }
}
