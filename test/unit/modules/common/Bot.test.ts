import Bot from '../../../../src/modules/common/Bot'
import Discord, { Message } from 'discord.js'
import { mocked } from 'ts-jest/utils'
import fs, { Dirent } from 'fs'
import clearAllMocks = jest.clearAllMocks;

// FileSystem mocks
jest.spyOn(fs, 'readdirSync')
mocked(fs.readdirSync).mockImplementation(() => {
  return ['test-command.js' as unknown as Dirent]
})

// Test command mocks
const testCommand = {
  name: 'test',
  description: 'A test command.',
  execute: jest.fn()
}

jest.mock('../../../../src/commands/test-command.js', () => (
  testCommand
), { virtual: true })

// Discord Client mocks
const onEventMock = jest.fn()
const clientMock = jest.spyOn(Discord, 'Client') as jest.Mock
let user: Record<string, unknown> | null = { tag: 'TestBot#1234' }
clientMock.mockImplementation(() => ({
  login: jest.fn(),
  user: user,
  on: onEventMock
}))

describe('Bot', () => {
  describe('.listen()', () => {
    beforeEach(() => {
      clearAllMocks()
    })

    it('logs the client id on ready event', () => {
      jest.spyOn(console, 'log')
      console.log = jest.fn()
      mockOnReadyEvent()

      const bot = new Bot('test-token')
      bot.listen()
      expect(console.log).toBeCalledWith('Logged in as TestBot#1234')
    })

    it('does not do thing', () => {
      jest.spyOn(console, 'error')
      console.error = jest.fn()
      mockOnReadyEvent()

      user = null
      const bot = new Bot('test-token')
      bot.listen()
      expect(console.error).toBeCalledWith('Client user is not defined!')
    })

    it('does not handle message if the message was sent by a bot', () => {
      const message = getMessage(true, '~test')
      mockOnMessageEvent(message)

      const bot = new Bot('test-token')
      bot.listen()
      expect(message.reply).not.toBeCalled()
      expect(testCommand.execute).not.toBeCalled()
    })

    it('handles the message if the message was not sent by a bot', () => {
      const message = getMessage(false, '~test')
      mockOnMessageEvent(message)

      const bot = new Bot('test-token')
      bot.listen()
      expect(testCommand.execute).toBeCalledWith(message, [])
    })
  })

  describe('.handleMessage()', () => {
    beforeEach(() => {
      clearAllMocks()
    })

    it('does not handle the message if the message does not begin with ~', () => {
      const message = getMessage(false, 'test')
      mockOnMessageEvent(message)

      const bot = new Bot('test-token')
      bot.listen()
      expect(testCommand.execute).not.toBeCalled()
      expect(testCommand.execute).not.toBeCalledWith(message, [])
      expect(message.reply).not.toBeCalled()
    })

    it('handles the message if the message begins with ~ and the command exists', () => {
      const message = getMessage(false, '~test')
      mockOnMessageEvent(message)

      const bot = new Bot('test-token')
      bot.listen()
      expect(testCommand.execute).toBeCalled()
      expect(testCommand.execute).toBeCalledWith(message, [])
      expect(message.reply).not.toBeCalled()
    })

    it('replies with error if the message begins with ~ and the command does not exist', () => {
      const message = getMessage(false, '~not-command')
      mockOnMessageEvent(message)

      const bot = new Bot('test-token')
      bot.listen()
      expect(testCommand.execute).not.toBeCalled()
      expect(testCommand.execute).not.toBeCalledWith(message, [])
      expect(message.reply).toBeCalledWith('that command does not exist.')
    })

    it('replies with error if the message begins with ~ but no command is provided', () => {
      const message = getMessage(false, '~')
      mockOnMessageEvent(message)

      const bot = new Bot('test-token')
      bot.listen()
      expect(message.reply).toBeCalledWith('you haven\'t provided a command.')
    })
  })
})

function mockOnMessageEvent (message: any): void {
  onEventMock.mockImplementation((event, handler) => {
    if (event === 'message') {
      handler(message)
    }
  })
}

function mockOnReadyEvent (): void {
  onEventMock.mockImplementation((event, handler) => {
    if (event === 'ready') {
      handler()
    }
  })
}

function getMessage (isBot: boolean, content: string): Message {
  return {
    author: {
      bot: isBot
    },
    channel: {
      send: jest.fn()
    },
    content: content,
    reply: jest.fn()
  } as unknown as Message
}
