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
    <alert-text v-if="!afford" type="error">{{ $vuetify.lang.t('$vuetify.gooboo.cantAfford') }}</alert-text>
    <alert-text v-if="!affordCap" type="error">{{ $vuetify.lang.t('$vuetify.gooboo.capTooLow') }}</alert-text>
    <alert-text v-if="showMultWarning" type="warning">{{ $vuetify.lang.t('$vuetify.currency.benefitLoss') }}</alert-text>
    <template v-if="currency.value > 0">
      <display-row class="mt-0" v-for="(item, key) in currencyMult" :key="key" :name="key" :type="item.type" :after="item.value"></display-row>
    </template>
    <template v-if="!hideDetails && currency.showGainMult && (gainBase !== null || gainAmount > 0)">
      <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
      <stat-breakdown :name="gainName" :base="gainBase"></stat-breakdown>
    </template>
    <template v-if="!hideDetails && currency.cap !== null">
      <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.capacity') }}</div>
      <stat-breakdown :name="capName"></stat-breakdown>
    </template>
  </div>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
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
    }
  },
  computed: {
    currency() {
      return this.$store.state.currency[this.name];
    },
    gainName() {
      if (!this.currency.showGainMult) {
        return null;
      }
      const splitName = this.name.split('_');
      return 'currency' + capitalize(splitName[0]) + capitalize(splitName[1]) + 'Gain';
    },
    gainAmount() {
      if (this.gainName === null) {
        return null;
      }
      return this.$store.getters['mult/get'](this.gainName);
    },
    capName() {
      const splitName = this.name.split('_');
      return 'currency' + capitalize(splitName[0]) + capitalize(splitName[1]) + 'Cap';
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
    }
  }
}
</script>
