<template>
  <div>
    <div class="d-flex justify-center ma-1">
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.miningSmelteryTemperature')">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-icon>mdi-thermometer</v-icon>
            <span>{{ $formatNum(temperature, true) }}°C</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.mining.smelteryTemperatureDescription', $formatNum(temperatureSpeed * 100, true)) }}</div>
        <stat-breakdown name="miningSmelteryTemperature"></stat-breakdown>
      </gb-tooltip>
    </div>
    <smeltery-station v-for="name in smelteries" :key="`smeltery-${ name }`" :name="name"></smeltery-station>
    <div v-if="nextTemperature !== null" class="d-flex align-center bg-tile-default rounded elevation-2 ma-2 pa-2">
      <v-icon :color="`error ${ $vuetify.theme.dark ? 'lighten-2' : 'darken-2' }`">mdi-thermometer</v-icon>
      <span class="error--text" :class="{'text--lighten-2': $vuetify.theme.dark, 'text--darken-2': !$vuetify.theme.dark}">{{ $formatNum(nextTemperature, true) }}°C</span>
      <v-spacer></v-spacer>
      <v-icon large class="mr-2">mdi-lock</v-icon>
    </div>
  </div>
</template>

<script>
import { MINING_SMELTERY_TEMPERATURE_SPEED } from '../../../js/constants';
import StatBreakdown from '../../render/StatBreakdown.vue';
import SmelteryStation from './SmelteryStation.vue';

export default {
  components: { StatBreakdown, SmelteryStation },
  computed: {
    temperature() {
      return this.$store.getters['mult/get']('miningSmelteryTemperature');
    },
    smelteries() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.mining.smeltery)) {
        if (this.temperature >= elem.minTemperature) {
          arr.push(key);
        }
      }
      return arr;
    },
    nextTemperature() {
      let temp = null;
      for (const [, elem] of Object.entries(this.$store.state.mining.smeltery)) {
        if (this.temperature < elem.minTemperature && (temp === null || elem.minTemperature < temp)) {
          temp = elem.minTemperature;
        }
      }
      return temp;
    },
    temperatureSpeed() {
      return MINING_SMELTERY_TEMPERATURE_SPEED;
    }
  }
}
</script>
