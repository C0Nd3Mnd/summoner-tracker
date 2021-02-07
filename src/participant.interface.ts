export interface Participant {
  teamId: number
  spell1Id: number
  spell2Id: number
  championId: number
  summonerName: string
  bot: boolean
  summonerId: string
  gameCustomizationObjects: unknown[],
  perks: {
    perkIds: number[],
    perkStyle: number,
    perkSubStyle: number
  }
}
