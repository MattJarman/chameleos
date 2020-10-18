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
  }
}
