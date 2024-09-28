<template>
  <div class="tooltip-text-container">
    <div v-if="!hideDetails">{{ $vuetify.lang.t(`$vuetify.currency.${name}.description`) }}</div>
    <slot></slot>
    <alert-text v-if="!hideDetails && isOvercap" type="error">{{
      currency.overcapMult > 0 ? ($vuetify.lang.t('$vuetify.currency.overcapGain', $formatNum(overcapMult * 100, true)) + (overcapStage > 1 ? ` (x${ overcapStage })` : '')) : $vuetify.lang.t('$vuetify.currency.overcapNoGain')
    }}</alert-text>
    <div class="text-center mt-2">
      <span :class="afford ? '' : `red--text ${ $vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-2'}`">
        <span>{{ $formatNum(currency.value, true) }}</span>
        <span v-if="neededPercent !== null"> ({{ $formatNum(neededPercent, true) }}%)</span>
      </span>
      <template v-if="currency.cap !== null">
        <span> / </span>
        <span :class="affordCap ? '' : `red--text ${ $vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-2'}`">
          <span>{{ currency.cap !== null ? ($formatNum(currency.cap, true)) : '' }}</span>
          <span v-if="neededCapPercent !== null"> ({{ $formatNum(neededCapPercent, true) }}%)</span>
        </span>
      </template>
    </div>
    <div v-if="gainTimerNeeded !== null" class="text-center mt-n1">
      {{ $vuetify.lang.t('$vuetify.currency.gainTimerNeeded', (currency.timerIsEstimate ? '~' : '') + $formatTime(gainTimerNeeded)) }}
    </div>
    <div v-if="capTimerNeeded !== null" class="text-center mt-n1">
      {{ $vuetify.lang.t(`$vuetify.currency.${ overcapStage >= 1 ? 'overcapTimerNeeded' : 'capTimerNeeded' }`, (currency.timerIsEstimate ? '~' : '') + $formatTime(capTimerNeeded)) }}
    </div>
    <alert-text v-if="!afford" type="error">{{ $vuetify.lang.t('$vuetify.gooboo.cantAfford') }}</alert-text>
    <alert-text v-if="!affordCap" type="error">{{ $vuetify.lang.t('$vuetify.gooboo.capTooLow') }}</alert-text>
    <alert-text v-if="showMultWarning" type="warning">{{ $vuetify.lang.t('$vuetify.currency.benefitLoss') }}</alert-text>
    <template v-if="currency.value > 0">
      <display-row class="mt-0" v-for="(item, key) in currencyMult" :key="key" :name="key" :type="item.type" :after="item.value"></display-row>
    </template>
    <template v-if="!hideDetails && currency.showGainMult && (gainBase !== null || baseArray.length > 0 || gainAmount > 0)">
      <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
      <stat-breakdown :name="gainName" :base="gainBase" :base-array="baseArray" :mult-array="multArray" :bonus-array="bonusArray"></stat-breakdown>
    </template>
    <template v-if="!hideDetails && currency.cap !== null">
      <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.capacity') }}</div>
      <stat-breakdown :name="capName"></stat-breakdown>
    </template>
  </div>
</template>

<script>
import StatBreakdown from '../../render/StatBreakdown.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import AlertText from './AlertText.vue';

export default {
  components: { StatBreakdown, DisplayRow, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    showMultWarning: {
      type: Boolean,
      required: false,
      default: false
    },
    needed: {
      type: Number,
      required: false,
      default: null
    },
    hideDetails: {
      type: Boolean,
      required: false,
      default: false
    },
    gainBase: {
      type: Number,
      required: false,
      default: null
    },
    baseArray: {
      type: Array,
      required: false,
      default: (() => [])
    },
    multArray: {
      type: Array,
      required: false,
      default: (() => [])
    },
    bonusArray: {
      type: Array,
      required: false,
      default: (() => [])
    }
  },
  computed: {
    currency() {
      return this.$store.state.currency[this.name];
    },
    gainName() {
      return this.currency.showGainMult ? this.$store.getters['currency/gainMultName'](...this.name.split('_')) : null;
    },
    gainAmount() {
      return this.gainName === null ? null : this.$store.getters['mult/get'](this.gainName);
    },
    capName() {
      return this.currency.cap !== null ? this.$store.getters['currency/capMultName'](...this.name.split('_')) : null;
    },
    afford() {
      return this.needed === null || this.currency.value >= this.needed;
    },
    affordCap() {
      return this.needed === null || this.currency.cap === null || this.currency.cap >= this.needed;
    },
    neededPercent() {
      if (this.needed === null) {
        return null;
      } else {
        return 100 * this.currency.value / this.needed;
      }
    },
    neededCapPercent() {
      if (this.needed === null || this.currency.cap === null) {
        return null;
      } else {
        return 100 * this.currency.cap / this.needed;
      }
    },
    isOvercap() {
      return this.currency.cap !== null && this.currency.value >= this.currency.cap;
    },
    overcapStage() {
      if (!this.isOvercap) {
        return 0;
      }
      return Math.floor(this.currency.value / this.currency.cap);
    },
    overcapMult() {
      if (!this.isOvercap) {
        return 1;
      }
      return this.currency.overcapMult * Math.pow(this.currency.overcapScaling, this.overcapStage - 1);
    },
    currencyMult() {
      if (this.currency.currencyMult === null) {
        return null;
      }
      let obj = {};
      const value = this.$store.getters['currency/value'](this.name);
      for (const [key, elem] of Object.entries(this.currency.currencyMult)) {
        obj[key] = {type: elem.type, value: elem.value(value)};
      }
      return obj;
    },
    gainDisplay() {
      return this.gainName === null ? null : this.$store.state.mult.items[this.gainName].display;
    },
    gainTimeMult() {
      switch (this.gainDisplay) {
        case 'perSecond':
          return 1;
        case 'perHour':
          return 3600;
        default:
          return 1;
      }
    },
    showTimer() {
      return (this.currency.showGainTimer && this.gainAmount !== null && this.gainAmount > 0) ||
        (this.timerFunction !== null && this.timerFunction > 0);
    },
    timerFunction() {
      return this.currency.gainTimerFunction === null ? null : this.currency.gainTimerFunction();
    },
    gainTimerNeeded() {
      if (!this.showTimer || this.needed === null || !this.affordCap || this.needed <= this.currency.value) {
        return null;
      }
      const gainAmount = this.currency.showGainTimer ? this.gainAmount : this.timerFunction;
      return Math.ceil((this.needed - this.currency.value) * this.gainTimeMult / gainAmount);
    },
    capTimerNeeded() {
      if (!this.showTimer || this.needed !== null || this.currency.cap === null || this.overcapMult <= 0) {
        return null;
      }
      const gainAmount = this.currency.showGainTimer ? this.gainAmount : this.timerFunction;
      return Math.ceil((this.currency.cap * (this.overcapStage + 1) - this.currency.value) * this.gainTimeMult / (gainAmount * this.overcapMult));
    }
  }
}
</script>
