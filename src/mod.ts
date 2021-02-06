import { config } from 'dotenv/mod.ts'
import { RiotApi } from './riot-api.ts'
import { Rune } from './rune.enum.ts'

const env = config()

const api = new RiotApi(env.API_KEY, env.REGION)

const summonerId = await api.getSummonerId('Frddy')

const game = await api.getActiveGame(summonerId)

// Find out what team the summoner is on.
const ownTeam = game.participants.find(
  (x: any) => x.summonerId === summonerId
).teamId

// We need the other team.
const enemyTeam = ownTeam === 100 ? 200 : 100

// Fetch all enemies.
const enemies = game.participants.filter((x: any) => x.teamId === enemyTeam)

// Clean up and simplify (we don't need a lot of information).
const mapped = enemies.map((x: any) => {
  return {
    summonerSpellIds: [x.spell1Id, x.spell2Id],
    championId: x.championId,
    unsealedSpellbook: x.perks.perkIds.indexOf(Rune.UnsealedSpellbook) > -1,
    cosmicInsight: x.perks.perkIds.indexOf(Rune.CosmicInsight) > -1
  }
})

console.log(mapped)
