import WeaponMapper from '../../../../src/modules/mappers/WeaponMapper'
import Weapon from '../../../../src/interfaces/weapon/Weapon'
import fs from 'fs'

const greatSword: Weapon = JSON.parse(fs.readFileSync('./test/test-files/weapon/great-sword.json', 'utf-8'))

describe('WeaponMapper', () => {
  it('maps a great sword to a message embed', () => {
    const message = (new WeaponMapper(greatSword)).getMessage()

    expect(message.title).toEqual(greatSword.name)
    expect(message.thumbnail).toEqual({ url: 'attachment://icon.png' })
    expect(message.files).toContainEqual({ attachment: greatSword.icon, name: 'icon.png' })
  })
})
