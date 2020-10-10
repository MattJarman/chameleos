import { Client, Collection } from 'discord.js'

export default interface CommandClient extends Client {
    commands?: Collection<any, any>
}
