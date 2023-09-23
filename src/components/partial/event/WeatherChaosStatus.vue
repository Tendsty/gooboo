<style scoped>
.fishing-rod-box {
  width: 64px;
  height: 64px;
  cursor: pointer;
}
</style>

<template>
  <div>
    <div class="d-flex flex-wrap ma-1">
      <gb-tooltip v-for="(item, key) in location" :key="`location-${ key }`" :title-text="$vuetify.lang.t(`$vuetify.event.weatherChaos.location.${ key }`)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :color="key === currentLocation ? 'primary' : 'secondary'"
            class="ma-1"
            v-bind="attrs"
            v-on="on"
            @click="changeLocation(key)"
          >{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.location.${ key }`) }}</v-btn>
        </template>
        <display-row class="mt-0" v-for="(subitem, subkey) in item.effect" :key="`stat-${ key }-${ subkey }`" :name="subitem.name" :type="subitem.type" :after="subitem.value"></display-row>
      </gb-tooltip>
    </div>
    <div class="d-flex flex-wrap ma-1">
      <gb-tooltip v-for="(item, key) in fishingRod" :key="`fishing-rod-${ key }`" :title-text="$vuetify.lang.t(`$vuetify.event.weatherChaos.fishingRod.name`) + ': ' + $vuetify.lang.t(`$vuetify.event.weatherChaos.fishingRod.${ key }`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="fishing-rod-box d-flex justify-center align-center bg-tile-default rounded ma-1" v-bind="attrs" v-on="on" @click="clickFishingRod(key)">
            <v-icon size="48" :color="key === currentFishingRod ? 'primary' : (item.owned ? undefined : 'secondary')">{{ item.icon }}</v-icon>
          </div>
        </template>
        <div v-if="item.owned">{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.owned`) }}</div>
        <price-tag v-else currency="gem_topaz" :amount="rodCost"></price-tag>
        <display-row class="mt-0" v-for="(subitem, subkey) in item.effect" :key="`stat-${ key }-${ subkey }`" :name="subitem.name" :type="subitem.type" :after="subitem.value"></display-row>
      </gb-tooltip>
    </div>
    <div class="d-flex flex-wrap ma-1">
      <gb-tooltip v-for="(item, key) in bait" :key="`bait-${ key }`" :title-text="$vuetify.lang.t(`$vuetify.event.weatherChaos.bait.${ key }`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex justify-center align-center bg-tile-default rounded ma-1 pa-1" v-bind="attrs" v-on="on">
            <v-icon class="ma-1" :color="key === currentBait ? 'primary' : undefined">{{ item.icon }}</v-icon>
            <v-btn v-on="on" small class="ma-1 px-2" color="primary" @click="buyBait(key)">{{ $vuetify.lang.t(`$vuetify.gooboo.buy`) }}</v-btn>
            <v-btn v-on="on" small class="ma-1 px-2" color="primary" :disabled="currentBait !== key && item.owned <= 0" @click="clickBait(key)">{{ $vuetify.lang.t(`$vuetify.gooboo.${ currentBait === key ? 'unequip' : 'equip' }`) }}</v-btn>
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.owned`) }}: {{ $formatNum(item.owned) }}</div>
        <div>{{ item.stackSize * 10 }} for <price-tag currency="event_cloud" :amount="baitCost"></price-tag></div>
        <display-row class="mt-0" v-for="(subitem, subkey) in item.effect" :key="`stat-${ key }-${ subkey }`" :name="subitem.name" :type="subitem.type" :after="subitem.value"></display-row>
      </gb-tooltip>
    </div>
    <div class="d-flex ma-1">
      <v-icon class="ma-2 flex-shrink-0" size="72">{{ weather[nextWeather[0]].icon }}</v-icon>
      <div class="d-flex flex-grow-1 flex-wrap align-center">
        <v-icon class="ma-1" v-for="(item, key) in nextWeather.slice(1)" :key="`weather-next-${ key }`" :style="`opacity: ${ 0.5 - key * 0.02 };`">{{ weather[item].icon }}</v-icon>
      </div>
    </div>
    <div class="d-flex justify-center align-center pa-1">
      <div class="bg-tile-default elevation-2 rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="event_cloud" :amount="resetCost"></price-tag>
        <v-btn class="ma-1" color="primary" :disabled="cloud < resetCost" @click="resetWeather">
          <v-icon class="mr-2">mdi-refresh</v-icon>
          {{ $vuetify.lang.t(`$vuetify.event.weatherChaos.changeWeather`) }}
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-space-around ma-1">
      <div class="d-flex flex-wrap justify-center">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.weatherChaosFishingPower`)">
          <template v-slot:activator="{ on, attrs }">
            <div class="bg-tile-default rounded ma-1 pa-1" v-bind="attrs" v-on="on">
              <v-icon>mdi-hook</v-icon>
              <span class="ma-1">{{ $formatNum(fishingPower, true) }}</span>
            </div>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.fishingPowerDescription`) }}</div>
          <stat-breakdown name="weatherChaosFishingPower"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.weatherChaosFishSizeAverage`)">
          <template v-slot:activator="{ on, attrs }">
            <div class="bg-tile-default rounded ma-1 pa-1" v-bind="attrs" v-on="on">
              <v-icon>mdi-scale</v-icon>
              <span class="ma-1">{{ $formatNum(fishSizeAverage, true) }}</span>
            </div>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.fishSizeDescription`) }}</div>
          <stat-breakdown name="weatherChaosFishSizeAverage"></stat-breakdown>
        </gb-tooltip>
      </div>
      <div class="d-flex flex-wrap justify-center">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.weatherChaosFishChance`)">
          <template v-slot:activator="{ on, attrs }">
            <div class="bg-tile-default rounded ma-1 pa-1" v-bind="attrs" v-on="on">
              <v-icon>mdi-fish</v-icon>
              <span class="ma-1">{{ $formatNum(fishChance * 100, true) }}%</span>
            </div>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.fishDescription`) }}</div>
          <stat-breakdown name="weatherChaosFishChance"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.event.weatherChaos.trashTitle`)">
          <template v-slot:activator="{ on, attrs }">
            <div class="bg-tile-default rounded ma-1 pa-1" v-bind="attrs" v-on="on">
              <v-icon>mdi-delete</v-icon>
              <span class="ma-1">{{ $formatNum(trashChance * 100, true) }}%</span>
            </div>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.trashDescription`) }}</div>
        </gb-tooltip>
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.weatherChaosTreasureChance`)">
          <template v-slot:activator="{ on, attrs }">
            <div class="bg-tile-default rounded ma-1 pa-1" v-bind="attrs" v-on="on">
              <v-icon>mdi-star</v-icon>
              <span class="ma-1">{{ $formatNum(treasureChance * 100, true) }}%</span>
            </div>
          </template>
          <div v-if="currentLocationNext">{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.treasureDescription`, $formatNum(currentLocationNext.minPower)) }}</div>
          <div v-else>{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.treasureDescriptionFinal`) }}</div>
          <stat-breakdown name="weatherChaosTreasureChance"></stat-breakdown>
        </gb-tooltip>
      </div>
    </div>
    <div class="ma-2">
      <v-progress-linear height="24" class="rounded" :value="fishingPercent">{{ $formatTime(fishingTimeLeft) }}</v-progress-linear>
    </div>
    <div class="d-flex flex-wrap ma-1">
      <weather-chaos-fish class="ma-1" v-for="(item, key) in fishList" :key="`fish-${key}`" :name="key" :chance="fishChances[key]"></weather-chaos-fish>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { WEATHER_CHAOS_BAIT_COST, WEATHER_CHAOS_RESET_COST } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import WeatherChaosFish from './WeatherChaosFish.vue';

export default {
  components: { WeatherChaosFish, PriceTag, DisplayRow, StatBreakdown },
  computed: {
    ...mapState({
      fishingRod: state => state.weatherChaos.fishingRod,
      bait: state => state.weatherChaos.bait,
      currentLocation: state => state.weatherChaos.currentLocation,
      currentFishingRod: state => state.weatherChaos.currentFishingRod,
      currentBait: state => state.weatherChaos.currentBait,
      weather: state => state.weatherChaos.weather,
      nextWeather: state => state.weatherChaos.nextWeather,
      cloud: state => state.currency.event_cloud.value,
    }),
    ...mapGetters({
      fishList: 'weatherChaos/fishList',
      rodCost: 'weatherChaos/rodCost'
    }),
    treasureChance() {
      return this.$store.getters['mult/get']('weatherChaosTreasureChance');
    },
    fishChance() {
      return (1 - this.treasureChance) * this.$store.getters['mult/get']('weatherChaosFishChance');
    },
    trashChance() {
      return 1 - this.treasureChance - this.fishChance;
    },
    fishingTimeNeeded() {
      return this.$store.getters['mult/get']('weatherChaosFishingTime');
    },
    fishingPower() {
      return this.$store.getters['mult/get']('weatherChaosFishingPower');
    },
    fishSizeAverage() {
      return this.$store.getters['mult/get']('weatherChaosFishSizeAverage');
    },
    fishingTimeLeft() {
      return this.fishingTimeNeeded - this.$store.state.weatherChaos.fishingProgress;
    },
    fishingPercent() {
      return 100 * (this.fishingTimeNeeded - this.fishingTimeLeft) / this.fishingTimeNeeded;
    },
    location() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.$store.state.weatherChaos.location)) {
        if (elem.owned) {
          obj[key] = elem;
        }
      }
      return obj;
    },
    fishChances() {
      let obj = {};
      const weights = this.$store.getters['weatherChaos/fishWeights'];
      let totalWeight = 0;
      for (const [, elem] of Object.entries(weights)) {
        totalWeight += elem;
      }
      if (totalWeight > 0) {
        for (const [key, elem] of Object.entries(weights)) {
          obj[key] = elem / totalWeight;
        }
      }
      return obj;
    },
    resetCost() {
      return WEATHER_CHAOS_RESET_COST;
    },
    baitCost() {
      return WEATHER_CHAOS_BAIT_COST;
    },
    currentLocationNext() {
      const next = this.$store.state.weatherChaos.location[this.currentLocation].next;
      if (next === null || this.$store.state.weatherChaos.location[next.name].owned) {
        return null;
      }
      return next;
    }
  },
  methods: {
    changeLocation(name) {
      this.$store.dispatch('weatherChaos/changeLocation', name);
    },
    clickFishingRod(name) {
      if (this.fishingRod[name].owned) {
        this.$store.dispatch('weatherChaos/changeFishingRod', name);
      } else {
        if (this.$store.state.system.settings.confirm.items.gem.value) {
          this.$store.commit('system/updateKey', {key: 'confirm', value: {
            type: 'weatherChaosFishingRodBuy',
            name,
            price: {gem_topaz: this.rodCost},
          }});
        } else {
          this.$store.dispatch('weatherChaos/buyFishingRod', name);
        }
      }
    },
    clickBait(name) {
      if (this.currentBait === name || this.bait[name].owned > 0) {
        this.$store.dispatch('weatherChaos/changeBait', this.currentBait === name ? null : name);
      }
    },
    buyBait(name) {
      this.$store.dispatch('weatherChaos/buyBait', name);
    },
    resetWeather() {
      this.$store.dispatch('weatherChaos/resetWeatherCycle');
    }
  }
}
</script>
