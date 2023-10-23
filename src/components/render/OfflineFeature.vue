<style scoped>
.offline-highlight {
  text-shadow: 0 1px 8px var(--v-amber-base);
}
</style>

<template>
  <v-card class="d-flex flex-column bg-tile-default rounded">
    <v-card-title class="justify-center pa-2">{{ $vuetify.lang.t(`$vuetify.feature.${name}`) }}</v-card-title>
    <v-card-text>
      <div class="d-flex" v-for="(item, stat) in stats" :class="{'offline-highlight': item.isNew}" :key="`stat-${stat}`">
        <div class="flex-grow-1">{{ $vuetify.lang.t(`$vuetify.stat.${stat}.description`) }}:</div>
        <div class="flex-grow-1 d-flex justify-space-between">
          <template v-if="item.before !== undefined">
            <div>{{ $formatNum(item.before, true) }}</div>
            <v-icon small>mdi-transfer-right</v-icon>
          </template>
          <div>{{ $formatNum(item.after, true) }}</div>
        </div>
      </div>
      <div v-if="hasUpgrades" class="text-center ma-1">{{ $vuetify.lang.t(`$vuetify.gooboo.offlineSummary.upgradesFinished`) }}:</div>
      <div class="d-flex" v-for="(item, upgrade) in upgrades" :class="{'offline-highlight': item.isNew}" :key="`upgrade-${upgrade}`">
        <div class="flex-grow-1">{{ $vuetify.lang.t(`$vuetify.upgrade.${upgrade}`) }}:</div>
        <div class="flex-grow-1 d-flex justify-space-between">
          <template v-if="item.before !== undefined">
            <div>{{ item.before }}</div>
            <v-icon small>mdi-transfer-right</v-icon>
          </template>
          <div>{{ item.after }}</div>
        </div>
      </div>
      <div class="d-flex flex-wrap ma-1">
        <price-tag class="ma-1" v-for="(amount, currency) in currencies" :key="`currency-${currency}`" add :highlight="amount.isNew" :currency="currency" :amount="amount.after - amount.before"></price-tag>
      </div>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="visitFeature">{{ $vuetify.lang.t(`$vuetify.gooboo.offlineSummary.toFeature`) }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import PriceTag from './PriceTag.vue';

export default {
  components: { PriceTag },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    stats: {},
    upgrades: {},
    currencies: {},
    hasUpgrades: false
  }),
  computed: {
    ...mapState({
      oldSavefile: state => state.system.oldSavefile
    })
  },
  mounted() {
    this.calculateStats();
  },
  methods: {
    visitFeature() {
      this.$store.commit('system/updateKey', {key: 'screen', value: this.name});
    },
    calculateStats() {
      // Reset data
      this.stats = {};
      this.upgrades = {};
      this.currencies = {};
      this.hasUpgrades = false;

      // List selected offline stats
      if (this.$store.state.system.features[this.name].offlineStat) {
        this.$store.state.system.features[this.name].offlineStat.forEach(elem => {
          const oldValue = this.oldSavefile.stat[elem] ? this.oldSavefile.stat[elem][0] : this.$store.state.stat[elem].default;
          if (this.$store.state.stat[elem].value > oldValue) {
            this.$set(this.stats, elem, {before: oldValue, after: this.$store.state.stat[elem].value, isNew: this.oldSavefile.stat[elem] === undefined});
          }
        });
      }

      // List all upgrades
      for (const [key, elem] of Object.entries(this.$store.state.upgrade.item)) {
        const oldValue = this.oldSavefile.upgrade[key] ? this.oldSavefile.upgrade[key][1] : 0;
        if (elem.feature === this.name && elem.level > oldValue) {
          this.$set(this.upgrades, key, {before: oldValue, after: elem.level, isNew: this.oldSavefile.upgrade[key] === undefined || this.oldSavefile.upgrade[key][2] <= 0});
          this.hasUpgrades = true;
        }
      }

      // List all currencies
      for (const [key, elem] of Object.entries(this.$store.state.currency)) {
        const oldValue = this.oldSavefile.currency[key] ?? 0;
        if (elem.feature === this.name && elem.value > oldValue) {
          this.$set(this.currencies, key, {before: oldValue, after: elem.value, isNew: this.oldSavefile.stat[key] === undefined});
        }
      }
    }
  },
  watch: {
    oldSavefile() {
      this.calculateStats();
    }
  }
}
</script>
