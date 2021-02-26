const got = require('got')
const fs = require('fs').promises
const { createWriteStream } = require('fs')
const stream = require('stream')
const { promisify } = require('util')
const path = require('path')

const pipeline = promisify(stream.pipeline)

const VERSION = '11.4.1'
const BASE_URL =
  `https://ddragon.leagueoflegends.com/cdn/${VERSION}/`
const DRAGON_PATH = path.join(process.cwd(), 'src/_dragon-cache')
const CHAMPIONS_PATH = path.join(DRAGON_PATH, 'champions')
const SUMMONERS_PATH = path.join(DRAGON_PATH, 'summoners')

function dataDragonUrl(suffix) {
  return `${BASE_URL}${suffix}`
}

function writeFile(file, content) {
  return fs.writeFile(path.join(DRAGON_PATH, file), content)
}

async function prepare() {
  await fs.rmdir(DRAGON_PATH, { recursive: true })
  await fs.mkdir(DRAGON_PATH)
  await fs.mkdir(CHAMPIONS_PATH)
  await fs.mkdir(SUMMONERS_PATH)
}

async function downloadChampions() {
  console.log('Fetching champion data...')

  const { body } = await got(dataDragonUrl('data/en_US/champion.json'), {
    responseType: 'json'
  })

  console.log('Download complete. Formatting champion data...')

  const formatted = []

  for (const index of Object.keys(body.data)) {
    const champion = body.data[index]

    formatted.push({
      key: champion.key,
      name: champion.name,
      image: champion.image.full
    })
  }

  console.log('Champion data formatted.')

  return formatted
}

async function downloadChampionPortraits(champions) {
  console.log(`Downloading ${champions.length} champion portraits...`)

  let done = 0

  for (const champion of champions) {
    await pipeline(
      got.stream(dataDragonUrl(`img/champion/${champion.image}`)),
      createWriteStream(path.join(CHAMPIONS_PATH, champion.image))
    )

    ++done

    console.log(`Downloaded ${champion.image} (${done}/${champions.length}).`)
  }

  console.log('All champion portraits downloaded.')
}

function generateChampionsJs(champions) {
  console.log('Generating champions file...')

  let content = 'export const champions = []'

  for (const champion of champions) {
    content +=
`

champions.push({
  key: ${+champion.key},
  name: ${JSON.stringify(champion.name)},
  image: require(${JSON.stringify(`./champions/${champion.image}`)})
})`
  }

  console.log('Champions file generated.')

  return writeFile('champions.js', content + '\n')
}

async function downloadSummoners() {
  console.log('Fetching summoner data...')

  const { body } = await got(dataDragonUrl('data/en_US/summoner.json'), {
    responseType: 'json'
  })

  console.log('Download complete. Formatting summoner data...')

  const formatted = []

  for (const index of Object.keys(body.data)) {
    const summoner = body.data[index]

    formatted.push({
      key: summoner.key,
      name: summoner.name,
      image: summoner.image.full,
      cooldown: summoner.cooldown[0]
    })
  }

  console.log('Summoner data formatted.')

  return formatted
}

function generateSummonersJs(summoners) {
  console.log('Generating summoners file...')

  let content = 'export const summoners = []'

  for (const summoner of summoners) {
    content +=
`

summoners.push({
  key: ${+summoner.key},
  name: ${JSON.stringify(summoner.name)},
  image: require(${JSON.stringify(`./summoners/${summoner.image}`)}),
  cooldown: ${summoner.cooldown}
})`
  }

  console.log('Summoners file generated.')

  return writeFile('summoners.js', content + '\n')
}

async function downloadSummonerPortraits(summoners) {
  console.log(`Downloading ${summoners.length} champion portraits...`)

  let done = 0

  for (const summoner of summoners) {
    await pipeline(
      got.stream(dataDragonUrl(`img/spell/${summoner.image}`)),
      createWriteStream(path.join(SUMMONERS_PATH, summoner.image))
    )

    ++done

    console.log(`Downloaded ${summoner.image} (${done}/${summoners.length}).`)
  }

  console.log('All summoner portraits downloaded.')
}

async function downloadLucidityBoots() {
  await pipeline(
    got.stream(dataDragonUrl('img/item/3158.png')),
    createWriteStream(path.join(DRAGON_PATH, 'LucidityBoots.png'))
  )
}

async function execute() {
  await prepare()

  const champions = await downloadChampions()
  await generateChampionsJs(champions)
  await downloadChampionPortraits(champions)

  const summoners = await downloadSummoners()
  await generateSummonersJs(summoners)
  await downloadSummonerPortraits(summoners)

  await downloadLucidityBoots()

  console.log('\n', 'All done!')
}

execute()
