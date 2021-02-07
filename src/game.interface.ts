import { Participant } from './participant.interface.ts'
import { BannedChampion } from './banned-champion.interface.ts'

export interface Game {
  gameId: number
  mapId: number
  gameMode: string
  gameType: string
  gameQueueConfigId: number
  participants: Participant[]
  observers: {
    encryptionKey: string
  }
  platformId: string
  bannedChampions: BannedChampion[]
  gameStartTime: number
  gameLength: number
}
