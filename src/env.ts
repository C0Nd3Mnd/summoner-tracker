import { config } from 'dotenv/mod.ts'

export const env = {
  ...config()
}
