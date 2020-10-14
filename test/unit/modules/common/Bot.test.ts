import { Client, Collection } from 'discord.js'
import Bot from '../../../../src/modules/common/Bot'
import { mocked } from 'ts-jest/utils'
import fs, { Dirent } from 'fs'

// FileSystem mocks
jest.spyOn(fs, 'readdirSync')
mocked(fs.readdirSync).mockImplementation(() => {
  return ['test-command.js' as unknown as Dirent]
})

// Discord mocks
jest.mock('discord.js')
const ClientMock = (Client as unknown) as jest.Mock
const CollectionMock = (Collection as unknown) as jest.Mock
const loginMock = jest.fn()
const setMock = jest.fn()

// Test command mocks
const testCommand = {
  name: 'test-command',
  description: 'A test command.',
  execute: jest.fn()
}

jest.mock('../../../../src/commands/test-command.js', () => (
  testCommand
), { virtual: true })

describe('Bot', () => {
  beforeAll(() => {
    ClientMock.mockImplementation(() => ({
      login: loginMock,
      commands: jest.fn()
    }))

    CollectionMock.mockImplementation(() => ({
      set: setMock
    }))
  })

  describe('.setCommands()', () => {
    it('set commands', () => {
      const bot = new Bot('test-token')

      expect(fs.readdirSync).toBeCalled()
      expect(setMock).toBeCalledWith(testCommand.name, testCommand)
    })
  })
})
