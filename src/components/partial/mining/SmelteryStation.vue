<template>
  <div class="bg-tile-default rounded elevation-2 ma-2">
    <div class="d-flex align-center flex-wrap pa-1">
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.miningSmelteryTemperature')">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-1 mr-5" v-bind="attrs" v-on="on">
            <v-icon>mdi-thermometer</v-icon>
            <div>{{ $formatNum(smeltery.minTemperature, true) }}°C</div>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.mining.smelteryTemperatureDescription2', $formatNum(temperatureSpeed * 100, true)) }}</div>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.miningSmelteryTime')">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-1">mdi-timer</v-icon>
            <div>{{ $formatTime(timeNeeded, 'ms') }}</div>
          </div>
        </template>
        <stat-breakdown name="miningSmelteryTime" :base="baseTimeNeeded" :multArray="temperatureSpeedMult"></stat-breakdown>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <price-tag v-for="(amount, currency) in price" :key="`price-${ currency }`" class="ma-1" :currency="currency" :amount="amount" :is-spent="!smelteryNotSpent.includes(currency)"></price-tag>
      <v-icon class="ma-1">mdi-transfer-right</v-icon>
      <price-tag class="ma-1" :currency="smeltery.output" :amount="1" add></price-tag>
      <v-spacer></v-spacer>
      <v-badge v-if="smeltery.stored > 0" inline color="secondary" :content="$formatNum(smeltery.stored)"></v-badge>
      <v-btn class="ma-1" small color="primary" :disabled="isFrozen || !canAfford" @click="buyMax">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
      <v-btn class="ma-1" color="primary" :disabled="isFrozen || !canAfford" @click="buy">{{ $vuetify.lang.t('$vuetify.mining.smelt') }}</v-btn>
    </div>
    <v-progress-linear class="rounded-b" height="4" :indeterminate="isHighspeed" :value="isHighspeed ? undefined : (smeltery.progress * 100)"></v-progress-linear>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MINING_SMELTERY_TEMPERATURE_SPEED, MINING_SMELTERY_TIME_INCREMENT } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';

export default {
  components: { PriceTag, StatBreakdown },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.mining.active,
      smelteryNotSpent: state => state.mining.smelteryNotSpent,
    }),
    smeltery() {
      return this.$store.state.mining.smeltery[this.name];
    },
    price() {
      return this.$store.getters['mining/smelteryPrice'](this.name);
    },
    canAfford() {
      return this.$store.getters['currency/canAfford'](this.price, this.price);
    },
    baseTimeNeeded() {
      return this.smeltery.timeNeeded * Math.pow(MINING_SMELTERY_TIME_INCREMENT, this.smeltery.total);
    },
    timeNeeded() {
      return this.$store.getters['mining/smelteryTimeNeeded'](this.name) * Math.pow(MINING_SMELTERY_TIME_INCREMENT, this.smeltery.stored);
    },
    temperatureSpeed() {
      return MINING_SMELTERY_TEMPERATURE_SPEED * (this.$store.getters['mult/get']('miningSmelteryTemperature') - this.smeltery.minTemperature);
    },
    temperatureSpeedMult() {
      return this.temperatureSpeed > 0 ? [{name: 'miningTemperature', value: 1 / (this.temperatureSpeed + 1)}] : [];
    },
    isHighspeed() {
      return this.timeNeeded < 1 && this.smeltery.stored > 0;
    }
  },
  methods: {
    buy() {
      this.$store.dispatch('mining/addToSmeltery', {name: this.name, max: false});
    },
    buyMax() {
      this.$store.dispatch('mining/addToSmeltery', {name: this.name, max: true});
    }
  }
}
</script>
