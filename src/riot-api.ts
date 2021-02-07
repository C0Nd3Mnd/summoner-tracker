import { Game } from './game.interface.ts'

export class RiotApi {
  private _apiKey: string

  private _region: string

  constructor(apiKey: string, region: string) {
    this._apiKey = apiKey
    this._region = region
  }

  private async _callApi(endpoint: string, params: string[]): Promise<any> {
    const result = await fetch(
      `https://${this._region}.api.riotgames.com/${endpoint}/${params.join('/')}`,
      {
        method: 'GET',
        headers: {
          'X-Riot-Token': this._apiKey
        }
      }
    )

    console.log(result)

    // @todo Error handling...

    return result.json()
  }

  public async getSummonerId(summonerName: string): Promise<string> {
    const summoner = await this._callApi(
      'lol/summoner/v4/summoners/by-name',
      [summonerName]
    )

    return summoner.id
  }

  public async getActiveGame(summonerId: string): Promise<Game> {
    const game = await this._callApi(
      'lol/spectator/v4/active-games/by-summoner',
      [summonerId]
    )

    if (!game) {
      // @todo Error handling.
      throw new Error('temp')
    }

    return game as Game
  }
}
