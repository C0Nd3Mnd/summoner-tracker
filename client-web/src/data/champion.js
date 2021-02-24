import champions from './champion.json'

const formatted = []

for (const index of Object.keys(champions.data)) {
  const { key, image } = champions.data[index]

  formatted.push({
    key: +key,
    image: image.full
  })
}

export default formatted
