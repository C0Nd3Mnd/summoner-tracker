<template>
  <div class="champion-bracket__wrapper">
    <div class="champion-bracket__portrait" :style="backgroundImage(champion)"></div>
    <div class="champion-bracket__summoners">
      <div class="champion-bracket__icon" :style="backgroundImage(spellD)"></div>
      <div class="champion-bracket__icon" :style="backgroundImage(spellF)"></div>
      <div class="champion-bracket__icon" :style="backgroundImage(lucidityBootsImage)"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
import lucidityBootsImage from '/_dragon-cache/LucidityBoots.png'

export default {
  name: 'ChampionBracket',
  data: () => ({
    lucidityBootsImage
  }),
  props: {
    champion: {
      type: String,
      required: true
    },
    spellD: {
      type: String,
      required: true
    },
    spellF: {
      type: String,
      required: true
    },
    lucidityBoots: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    backgroundImage(path) {
      return {
        backgroundImage: `url(${path})`
      }
    }
  }
}
</script>

<style type="text/css">
.champion-bracket__wrapper {
  width: 20%;
  position: relative;
  float: left;
}

.champion-bracket__portrait {
  width: 100%;
  padding-top: 100%;
  background-size: cover;
}

.champion-bracket__summoners {
  width: 100%;
  background-color: #00f;
}

.champion-bracket__icon {
  width: 33.33%;
  padding-top: 33.33%;
  background-size: cover;
  float: left;
}
</style>
