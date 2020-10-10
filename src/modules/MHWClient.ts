import HttpClient from './HttpClient'
import config from 'config'
import MonsterIndexItem from '../interfaces/monster/MonsterIndexItem'
import Monster from '../interfaces/monster/Monster'

export default class MHWClient extends HttpClient {
  public constructor () {
    super(config.get('mhw-api.base-url'))
  }

  public async getMonsterList (): Promise<Array<MonsterIndexItem>> {
    const route: string = config.get('mhw-api.routes.monster')
    return this.instance.get<Array<MonsterIndexItem>>(route)
  }

  // TODO: Replace unknown with interface
  public async getMonster (id: number): Promise<Monster> {
    const route: string = config.get('mhw-api.routes.monster')
    return this.instance.get<Monster>(`${route}/${id}`)
  }
}
