<template>
  <status-template feature="mining" :prestigeGain="prestigeGain">
    <template slot="header">
      <div class="d-flex justify-center align-center ma-1">
        <v-chip label small class="ma-1 px-2">
          <v-icon class="mr-2">mdi-pickaxe</v-icon>
          <span v-if="unlock.miningDepthDweller.use">{{ Math.round(dweller * 100) / 100 }}m / {{ Math.round(dwellerLimit * 100) / 100 }}m</span>
          <v-icon v-else>mdi-lock</v-icon>
        </v-chip>
        <v-chip v-if="maxDweller0 > 0" :color="`${ currency.mining_crystalGreen.color } ${ themeModifier }`" label small class="ma-1 px-2">
          <v-icon class="mr-2">mdi-crown</v-icon>
          {{ Math.round(maxDweller0 * 100) / 100 }}m
        </v-chip>
        <v-chip v-if="maxDweller1 > 0" :color="`${ currency.mining_crystalYellow.color } ${ themeModifier }`" label small class="ma-1 px-2">
          <v-icon class="mr-2">mdi-crown</v-icon>
          {{ Math.round(maxDweller1 * 100) / 100 }}m
        </v-chip>
      </div>
    </template>
  </status-template>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import StatusTemplate from '../prestige/StatusTemplate.vue';

export default {
  components: { StatusTemplate },
  computed: {
    ...mapState({
      maxDweller0: state => state.stat.mining_depthDweller0.total,
      maxDweller1: state => state.stat.mining_depthDweller1.total,
      unlock: state => state.unlock,
      subfeature: state => state.system.features.mining.currentSubfeature,
      currency: state => state.currency
    }),
    ...mapGetters({
      dwellerLimit: 'mining/dwellerLimit'
    }),
    prestigeGain() {
      let obj = {};
      switch (this.subfeature) {
        case 0: {
          if (this.$store.getters['mining/dwellerGreenCrystal'] > 0) {
            obj.mining_crystalGreen = this.$store.getters['mining/dwellerGreenCrystal'];
          }
          if (this.$store.getters['mult/get']('currencyMiningEmberGain') > 0) {
            obj.mining_ember = this.$store.getters['mult/get']('currencyMiningEmberGain');
          }
          break;
        }
        case 1: {
          if (this.$store.getters['mining/dwellerYellowCrystal'] > 0) {
            obj.mining_crystalYellow = this.$store.getters['mining/dwellerYellowCrystal'];
          }
          break;
        }
      }
      return obj;
    },
    dweller() {
      return this.$store.state.stat['mining_depthDweller' + this.subfeature].value;
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'darken-2' : 'lighten-2';
    }
  }
}
</script>
