import { config } from 'dotenv/mod.ts'
import { RiotApi } from './riot-api.ts'

const env = config()

const api = new RiotApi(env.API_KEY, env.REGION)

console.log(JSON.stringify(await api.getActiveGame('Handofsky')))
