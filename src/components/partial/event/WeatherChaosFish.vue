<style scoped>
.fish-box {
  width: 72px;
  height: 72px;
}
</style>

<template>
  <gb-tooltip :title-text="caught ? $vuetify.lang.t(`$vuetify.event.weatherChaos.fish.${ name }`) : '???'">
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom offset-x="28" offset-y="28" :value="caught" :content="$formatNum(catchRecord)" :color="catchRecord >= maxSize ? 'success' : 'primary'">
        <div class="fish-box bg-tile-default rounded d-flex justify-center align-center" :class="$vnode.data.staticClass" v-bind="attrs" v-on="on">
          <v-icon v-if="caught" :size="24 * fish.iconSize" :color="fish.color">{{ fish.icon }}</v-icon>
          <v-icon v-else size="36" color="secondary">mdi-help</v-icon>
        </div>
      </v-badge>
    </template>
    <div :class="{
      'success--text text--lighten-3': fishingPower >= fish.minPower && $vuetify.theme.dark,
      'success--text text--darken-2': fishingPower >= fish.minPower && !$vuetify.theme.dark,
      'error--text text--lighten-3': fishingPower < fish.minPower && $vuetify.theme.dark,
      'error--text text--darken-2': fishingPower < fish.minPower && !$vuetify.theme.dark
    }">{{ $formatNum(fish.minPower) }} {{ $vuetify.lang.t(`$vuetify.event.weatherChaos.powerNeeded`) }}</div>
    <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.maxSize`) }}: {{ $formatNum(maxSize) }}</div>
    <div class="mt-0" v-if="chance !== null">{{ $formatNum(chance * 100, true) }}% {{ $vuetify.lang.t(`$vuetify.event.weatherChaos.chanceToCatch`) }}</div>
    <div class="d-flex flex-wrap mt-0">
      <template v-for="(item, key) in condition">
        <v-icon v-if="fish[key] === true" :key="`condition-${ key }`" :color="weather[key] ? undefined : `error ${ $vuetify.theme.dark ? 'lighten-3' : 'darken-2'}`">{{ item.on }}</v-icon>
        <v-icon v-else-if="fish[key] === false" :key="`condition-${ key }`" :color="weather[key] ? `error ${ $vuetify.theme.dark ? 'lighten-3' : 'darken-2'}` : undefined">{{ item.off }}</v-icon>
      </template>
    </div>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    chance: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState({
      condition: state => state.weatherChaos.condition
    }),
    fish() {
      return this.$store.state.weatherChaos.fish[this.name];
    },
    caught() {
      return this.fish.catchRecord !== null;
    },
    catchRecord() {
      return this.caught ? this.fish.catchRecord : 0;
    },
    maxSize() {
      return Math.round(this.$store.getters['mult/get']('weatherChaosFishSizeMax', this.fish.size));
    },
    fishingPower() {
      return this.$store.getters['mult/get']('weatherChaosFishingPower');
    },
    weather() {
      return this.$store.state.weatherChaos.weather[this.$store.getters['weatherChaos/currentWeather']];
    }
  }
}
</script>
