import summoners from './summoner.json'

const formatted = []

for (const index of Object.keys(summoners.data)) {
  const { key, image, cooldown } = summoners.data[index]

  formatted.push({
    key: +key,
    image: image.full,
    cooldown
  })
}

export default formatted
