import HttpClient from './HttpClient'
import config from 'config'
import MonsterIndexItem from '../../interfaces/monster/MonsterIndexItem'
import Monster from '../../interfaces/monster/Monster'
import WeaponIndexItem from '../../interfaces/weapon/WeaponIndexItem'
import Weapon from '../../interfaces/weapon/Weapon'

export default class MHWClient extends HttpClient {
  public constructor () {
    super(config.get('mhw-api.base-url'))
  }

  public async getMonsterList (): Promise<Array<MonsterIndexItem>> {
    const route: string = config.get('mhw-api.routes.monster')
    return this.instance.get<Array<MonsterIndexItem>>(route)
  }

  public async getMonster (id: number): Promise<Monster> {
    const route: string = config.get('mhw-api.routes.monster')
    return this.instance.get<Monster>(`${route}/${id}`)
  }

  public async getWeaponList (): Promise<Array<WeaponIndexItem>> {
    const route: string = config.get('mhw-api.routes.weapon')
    return this.instance.get<Array<WeaponIndexItem>>(route)
  }

  public async getWeapon (id: number): Promise<Weapon> {
    const route: string = config.get('mhw-api.routes.weapon')
    return this.instance.get<Weapon>(`${route}/${id}`)
  }
}
