<template>
  <span>
    <champion-bracket
      v-for="bracket in brackets"
      :key="bracket.champion"
      :champion="bracket.champion"
      :spell-d="bracket.spellD"
      :spell-f="bracket.spellF"
      :lucidity-boots="false"
    />
  </span>
</template>

<script type="text/javascript">
import ChampionBracket from './components/ChampionBracket.vue'
import summoner from './data/summoner.js'
import champion from './data/champion.js'

export default {
  name: 'App',
  components: {
    ChampionBracket
  },
  data: () => ({
    foo: 5,
    players: [
      { summonerSpellIds: [4,7], championId: 16, cosmicInsight: false },
      { summonerSpellIds: [4,14], championId: 32, cosmicInsight: false },
      { summonerSpellIds: [4,14], championId: 98, cosmicInsight: false },
      { summonerSpellIds: [3,4], championId: 37, cosmicInsight: false },
      { summonerSpellIds: [4,21], championId: 81, cosmicInsight: false }
    ]
  }),
  computed: {
    brackets() {
      return this.players.map(player => ({
        champion: champion
          .find(champion => champion.key === player.championId)
          .image,
        spellD: summoner
          .find(spell => spell.key === player.summonerSpellIds[0])
          .image,
        spellF: summoner
          .find(spell => spell.key === player.summonerSpellIds[1])
          .image
      }))
    }
  }
}
</script>

<style type="text/css">
body {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
