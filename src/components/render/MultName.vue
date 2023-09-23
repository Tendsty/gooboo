<template>
  <span v-if="isLocked">???</span>
  <span v-else-if="isUpgradeCap">{{ $vuetify.lang.t(`$vuetify.upgrade.${upgradeName}`) }} {{ $vuetify.lang.t(`$vuetify.gooboo.maxLevel`) }}</span>
  <span v-else-if="isCurrencyCap">{{ $vuetify.lang.t(`$vuetify.gooboo.multCapacity`, $vuetify.lang.t(`$vuetify.currency.${currencyName}.name`)) }}</span>
  <span v-else-if="isCurrencyGain">{{ $vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t(`$vuetify.currency.${currencyGainName}.name`)) }}</span>
  <span v-else>{{ $vuetify.lang.t(`$vuetify.mult.${name}`) }}</span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    isUpgradeCap() {
      return this.$store.getters['mult/isUpgradeCap'](this.name);
    },
    isCurrencyCap() {
      return this.$store.getters['mult/isCurrencyCap'](this.name);
    },
    isCurrencyGain() {
      return this.$store.getters['mult/isCurrencyGain'](this.name);
    },
    upgradeName() {
      if (!this.isUpgradeCap) {
        return null;
      }
      return this.$store.getters['mult/getUpgradeName'](this.name);
    },
    currencyName() {
      if (!this.isCurrencyCap) {
        return null;
      }
      return this.$store.getters['mult/getCurrencyName'](this.name);
    },
    currencyGainName() {
      if (!this.isCurrencyGain) {
        return null;
      }
      return this.$store.getters['mult/getCurrencyName'](this.name, 4);
    },
    isLocked() {
      const mult = this.$store.state.mult.items[this.name];
      return mult && mult.unlock !== null && !this.$store.state.unlock[mult.unlock].see;
    }
  }
}
</script>
