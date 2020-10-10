import * as dotenv from 'dotenv'
import Bot from './modules/Bot'

dotenv.config()

function init () {
  if (!process.env.TOKEN) {
    console.error('No token found! Please ensure you have included a token in the .env file')
    return
  }

  const chameleos = new Bot(process.env.TOKEN)
  chameleos.listen()
}

init()
