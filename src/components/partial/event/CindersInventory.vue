<style scoped>
.enlightened-card {
  text-shadow: 0 0 4px #FFC080;
}
.active-candle {
  width: 72px;
  height: 48px;
}
</style>

<template>
  <div class="cinders-inventory">
    <div class="d-flex flex-wrap justify-center pa-1">
      <currency v-for="item in currencies" :key="`currency-${item}`" class="ma-1" :name="`event_${item}`"></currency>
    </div>
    <div class="d-flex flex-wrap justify-center align-center pa-1">
      <div class="d-flex flex-column justify-space-between active-candle bg-tile-default rounded ma-1">
        <template v-if="activeCandle">
          <v-icon>{{ activeCandle.icon }}</v-icon>
          <v-progress-linear class="rounded-b" height="20" :value="activeCandlePercent">{{ $formatTime(activeCandleDuration) }}</v-progress-linear>
        </template>
      </div>
      <cinders-candle v-for="item in candles" :key="`candle-${item}`" class="ma-1" :name="item"></cinders-candle>
    </div>
    <upgrade-list feature="event" :cols="$vuetify.breakpoint.xlOnly ? 4 : 12" type="cindersProducer" key="event-cindersProducer">
      <template v-slot="{upgradeName}">
        <div class="d-flex justify-space-between align-center" :class="{'enlightened-card': isEnlightened(upgradeName.split('_')[1])}">
          <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.gooboo.gain`)">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">{{ $formatNum(singleProduction(upgradeName.split('_')[1])) }}/s {{ $vuetify.lang.t(`$vuetify.event.cinders.perProducer`) }}</div>
            </template>
            <stat-breakdown :name="'cindersProduction' + upgradeName.split('_')[1].charAt(0).toUpperCase() + upgradeName.split('_')[1].slice(1)"></stat-breakdown>
          </gb-tooltip>
          <div>{{ $formatNum(multipleProduction(upgradeName.split('_')[1])) }}/s total ({{ $formatNum(percentProduction(upgradeName.split('_')[1]), true) }}%)</div>
        </div>
      </template>
    </upgrade-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Currency from '../../render/Currency.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import UpgradeList from '../../render/UpgradeList.vue';
import CindersCandle from './CindersCandle.vue';

export default {
  components: { Currency, UpgradeList, StatBreakdown, CindersCandle },
  data: () => ({
    currencies: ['light', 'soot', 'wax', 'cindersToken']
  }),
  computed: {
    ...mapGetters({
      singleProduction: 'cinders/singleProduction',
      multipleProduction: 'cinders/multipleProduction',
      percentProduction: 'cinders/percentProduction',
      isEnlightened: 'cinders/isEnlightened'
    }),
    candles() {
      return Object.keys(this.$store.state.cinders.candle);
    },
    activeCandle() {
      const obj = this.$store.state.cinders.activeCandle;
      if (!obj) {
        return null;
      }
      return this.$store.state.cinders.candle[obj.name];
    },
    activeCandleDuration() {
      return this.$store.state.cinders.activeCandle?.duration;
    },
    activeCandlePercent() {
      if (!this.activeCandle) {
        return 0;
      }
      return 100 * this.activeCandleDuration / this.activeCandle.duration;
    }
  }
}
</script>
