import Weapon from '../../interfaces/weapon/Weapon'
import { FileOptions, MessageAttachment, MessageEmbed } from 'discord.js'

export default class WeaponMapper {
  private weapon: Weapon
  private message: MessageEmbed

  public constructor (weapon: Weapon) {
    this.weapon = weapon
    this.message = new MessageEmbed()

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

    console.log(this.weapon.elements)

    this.message.addField('Elements', elementsString, true)
  }

  private mapElderSeal (): void {
    this.message.addField(
      'Elderseal',
        `${this.weapon.elderseal ? ':white_check_mark:' : ':x:'}`,
        true
    )
  }
}
