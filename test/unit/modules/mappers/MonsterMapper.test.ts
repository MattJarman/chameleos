import Monster from '../../../../src/interfaces/monster/Monster'
import MonsterMapper from '../../../../src/modules/mappers/MonsterMapper'
import Helper from '../../../../src/modules/common/Helper'
import fs from 'fs'

// Rathalos
const monster: Monster = JSON.parse(fs.readFileSync('./test/test-files/monster-31.json', 'utf-8'))

describe('Test MonsterMapper', () => {
  it('maps the monster data to an message embed', () => {
    const message = (new MonsterMapper(monster)).getMessage()

    expect(message.title).toEqual(monster.name)
    expect(message.thumbnail).toEqual({ url: 'attachment://icon.png' })
    expect(message.files).toContainEqual({ attachment: monster.icon, name: 'icon.png' })
    expect(message.fields).toEqual([
      {
        name: 'Species',
        value: monster.species,
        inline: true
      },
      {
        name: 'Size',
        value: Helper.capitalise(monster.size),
        inline: true
      },
      {
        name: 'Description',
        value: monster.description,
        inline: false
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false
      },
      {
        name: 'Weaknesses',
        value: '\u200b',
        inline: false
      },
      {
        name: 'Dragon',
        value: '⭐⭐⭐',
        inline: true
      },
      {
        name: 'Thunder',
        value: '⭐⭐',
        inline: true
      },
      {
        name: 'Water',
        value: '⭐',
        inline: true
      }
    ])
  })

  it('does not include weaknesses if the monster has no weaknesses', () => {
    const noWeaknessMonster = { ...monster }
    noWeaknessMonster.weaknesses.dragon = 0
    noWeaknessMonster.weaknesses.fire = 0
    noWeaknessMonster.weaknesses.thunder = 0
    noWeaknessMonster.weaknesses.water = 0
    noWeaknessMonster.weaknesses.ice = 0

    const message = (new MonsterMapper(noWeaknessMonster)).getMessage()

    expect(message.fields).not.toContainEqual(
      {
        name: '\u200b',
        value: '\u200b',
        inline: false
      }
    )
    expect(message.fields).not.toContainEqual(
      {
        name: 'Weaknesses',
        value: '\u200b',
        inline: false
      }
    )
  })
})
