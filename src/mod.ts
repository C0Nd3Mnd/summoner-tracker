import { server } from './server.ts'
import { env } from './env.ts'

server.listen(+env.SERVER_PORT)
console.log('Ready.')
