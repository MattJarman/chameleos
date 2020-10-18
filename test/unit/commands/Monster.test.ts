import { Message } from 'discord.js'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import MonsterCommand from '../../../src/commands/Monster'
import fs from 'fs'
import Monster from '../../../src/interfaces/monster/Monster'

const axiosMock = new MockAdapter(axios)
const monster: Monster = JSON.parse(fs.readFileSync('./test/test-files/31.json', 'utf-8'))

describe('Monster', () => {
  const message = {
    channel: {
      send: jest.fn()
    },
    reply: jest.fn()
  } as unknown as Message

  beforeAll(() => {
    axiosMock.onGet('api/monster').reply(200, [
      {
        id: 31,
        name: 'Rathalos',
        url: 'https://mhw-api.co.uk/monster/31'
      }
    ])
  })

  it('sends monster information on success', async () => {
    axiosMock.onGet('api/monster/31').reply(200, monster)
    await MonsterCommand.execute(message, ['Rathalos'])
    expect(message.channel.send).toHaveBeenCalled()
  })

  it('replies to user with error on monster show data retrieval', async () => {
    axiosMock.onGet('api/monster/31').reply(400, {})
    await MonsterCommand.execute(message, ['Rathalos'])
    expect(message.reply).toHaveBeenCalled()
  })
})
