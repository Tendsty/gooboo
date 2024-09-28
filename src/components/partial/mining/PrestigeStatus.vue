<template>
  <status-template feature="mining" :prestigeGain="prestigeGain">
    <template slot="header">
      <div class="d-flex justify-center align-center ma-1">
        <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mining.dweller.title')">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label small class="ma-1 px-2" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-pickaxe</v-icon>
              <span v-if="unlock.miningDepthDweller.use">
                <span>{{ Math.round(dwellerCap * 100) / 100 }}m</span>
                <span v-if="dweller < dwellerLimit">&nbsp;/&nbsp;{{ Math.round(dwellerLimit * 100) / 100 }}m</span>
                <span v-else>&nbsp;(+{{ Math.round((dweller - dwellerCap) * 100) / 100 }}m)</span>
              </span>
              <v-icon v-else>mdi-lock</v-icon>
              <v-icon class="ml-1" v-if="dweller >= dwellerLimit">mdi-check</v-icon>
            </v-chip>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.mining.dweller.description1') }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.mining.dweller.description2') }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.mining.dweller.description3', $formatNum(dwellerPercent)) }}</div>
          <alert-text class="mb-2" type="info">{{ $vuetify.lang.t('$vuetify.mining.dweller.descriptionOvercap', $formatNum(dwellerOvercapPercent)) }}</alert-text>
          <div v-for="(nextTime, key) in timesUntilNext" :key="`next-time-${ key }`">
            <price-tag v-if="nextTime.gain !== null" class="mr-1" add :currency="`mining_crystal${ crystalColor }`" :amount="nextTime.gain"></price-tag>
            <span>{{ $vuetify.lang.t('$vuetify.mining.dweller.nextTime', Math.round(nextTime.depth * 100) / 100, $formatTime(nextTime.time)) }}</span>
          </div>
        </gb-tooltip>
        <gb-tooltip v-if="maxDweller0 > 0" :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-chip :color="`${ currency.mining_crystalGreen.color } ${ themeModifier }`" label small class="ma-1 px-2" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-crown</v-icon>
              {{ Math.round(maxDweller0 * 100) / 100 }}m
            </v-chip>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.mining.dweller.description4') }}</div>
        </gb-tooltip>
        <gb-tooltip v-if="maxDweller1 > 0" :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-chip :color="`${ currency.mining_crystalYellow.color } ${ themeModifier }`" label small class="ma-1 px-2" v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-crown</v-icon>
              {{ Math.round(maxDweller1 * 100) / 100 }}m
            </v-chip>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.mining.dweller.description4') }}</div>
        </gb-tooltip>
      </div>
    </template>
  </status-template>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { MINING_DWELLER_OVERCAP_MULT, MINING_DWELLER_OVERFLOW } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';
import StatusTemplate from '../prestige/StatusTemplate.vue';
import AlertText from '../render/AlertText.vue';

export default {
  components: { StatusTemplate, PriceTag, AlertText },
  computed: {
    ...mapState({
      maxDweller0: state => state.stat.mining_depthDwellerCap0.total,
      maxDweller1: state => state.stat.mining_depthDwellerCap1.total,
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
            obj.mining_crystalGreen = {
              base: this.$store.getters['mining/dwellerBaseGreenCrystal'],
              total: this.$store.getters['mining/dwellerGreenCrystal'],
              gainMult: 'currencyMiningCrystalGreenGain',
            };
          }
          if (this.$store.getters['mult/get']('currencyMiningEmberGain') > 0) {
            obj.mining_ember = {
              total: this.$store.getters['mult/get']('currencyMiningEmberGain') * this.$store.state.stat[`mining_depthDweller${ this.subfeature }`].value,
              showDescription: true,
              gainMult: 'currencyMiningEmberGain',
            };
          }
          break;
        }
        case 1: {
          if (this.$store.getters['mining/dwellerYellowCrystal'] > 0) {
            obj.mining_crystalYellow = {
              base: this.$store.getters['mining/dwellerBaseYellowCrystal'],
              total: this.$store.getters['mining/dwellerYellowCrystal'],
              gainMult: 'currencyMiningCrystalYellowGain',
            };
          }
          break;
        }
      }
      return obj;
    },
    dweller() {
      return this.$store.state.stat['mining_depthDweller' + this.subfeature].value;
    },
    dwellerCap() {
      return this.$store.state.stat['mining_depthDwellerCap' + this.subfeature].value;
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'darken-2' : 'lighten-2';
    },
    dwellerPercent() {
      return 100 * this.$store.getters['mult/get']('miningDepthDwellerMax');
    },
    timesUntilNext() {
      const max = this.$store.getters['mining/dwellerLimit'];
      let current = this.dweller;
      let arr = [];
      for (let i = 0; i < 3; i++) {
        current += 0.5;
        if (current < (Math.ceil(max * 2) / 2)) {
          const currentFloored = Math.floor(current * 2) / 2;
          arr.push({
            depth: currentFloored,
            time: this.$store.getters['mining/timeUntilNext'](currentFloored),
            gain: this.$store.getters['mining/dwellerGain'](Math.floor(current * 2), this.subfeature)
          });
        }
      }
      if (this.dweller < max && (arr.length <= 0 || arr[arr.length - 1].depth < max)) {
        arr.push({
          depth: max,
          time: this.$store.getters['mining/timeUntilNext'](max),
          gain: this.$store.getters['mining/dwellerGain'](Math.floor(max * 2), this.subfeature)
        });
      }
      const baseValue = Math.floor(Math.max(this.dweller, max) * 2) / 2;
      const maxValue = Math.floor(max * 2) / 2;
      current = Math.max(this.dweller, max);
      let bonusTime = 0;
      while (arr.length < 4) {
        current += 0.5;
        const currentFloored = Math.floor(current * 2) / 2;
        const bonusPercent = baseValue > 0 ? (currentFloored / maxValue) : 1;
        const dwellerSpeed = MINING_DWELLER_OVERFLOW * this.$store.getters['mult/get']('miningDepthDwellerSpeed') / max;
        let currentProgress = current - 0.5;
        while (currentProgress < currentFloored) {
          const breakpointCount = Math.floor(10 * (currentProgress + 0.000000000001) / max) - 10;
          const targetAmount = Math.min(max * (breakpointCount + 11) / 10, currentFloored);
          bonusTime += (targetAmount - currentProgress) * Math.pow(1 / MINING_DWELLER_OVERCAP_MULT, breakpointCount + 1) / dwellerSpeed;
          currentProgress = targetAmount;
        }
        arr.push({
          depth: currentFloored,
          time: this.$store.getters['mining/timeUntilNext'](max) + Math.ceil(bonusTime),
          gain: this.$store.getters['mining/dwellerGain'](maxValue * 2, this.subfeature) * bonusPercent
        });
        current = currentFloored;
      }
      return arr;
    },
    crystalColor() {
      return this.$store.getters['mining/crystalColor'](this.subfeature);
    },
    dwellerOvercapPercent() {
      return MINING_DWELLER_OVERCAP_MULT * 100;
    }
  }
}
</script>
