<style scoped>
.unemployed-amount {
  min-height: 32px;
}
.unemployed-amount-mobile {
  min-height: 24px;
}
</style>

<template>
  <div>
    <v-card class="ma-2 pa-2">
      <v-row no-gutters>
        <v-col cols="4" class="d-flex align-center">
          <gb-tooltip>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.village.unemployed') }}</span>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t('$vuetify.village.unemployedDescription') }}</div>
          </gb-tooltip>
        </v-col>
        <v-col cols="8" class="d-flex justify-center align-center unemployed-amount" :class="{'unemployed-amount-mobile': $vuetify.breakpoint.xsOnly}">
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.villageWorker')">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ $formatNum(unemployed) }} / {{ $formatNum(worker) }}</span>
            </template>
            <stat-breakdown name="villageWorker"></stat-breakdown>
          </gb-tooltip>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="canSeeHappiness" class="ma-2 pa-2">
      <v-row no-gutters>
        <v-col cols="4" class="d-flex align-center">{{ $vuetify.lang.t('$vuetify.mult.villageHappiness') }}</v-col>
        <v-col cols="8" class="d-flex justify-center align-center unemployed-amount" :class="{'unemployed-amount-mobile': $vuetify.breakpoint.xsOnly}">
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.villageHappiness')">
            <template v-slot:activator="{ on, attrs }">
              <span :class="{'red--text': happinessPercent < 100, 'green--text': happinessPercent > 100}" v-bind="attrs" v-on="on">{{ $formatNum(happinessPercent, true) }}%</span>
            </template>
            <div>{{ $vuetify.lang.t('$vuetify.village.happinessDescription') }}</div>
            <stat-breakdown name="villageHappiness"></stat-breakdown>
          </gb-tooltip>
        </v-col>
      </v-row>
    </v-card>
    <template v-for="(item, key) in jobs">
      <job v-if="item.max === null || item.max > 0" :key="'job-' + key" class="ma-2" :name="key" :disabled="isFrozen"></job>
    </template>
    <v-card v-if="taxPercent > 0" class="ma-2 pa-2">
      <v-row no-gutters>
        <v-col cols="4" class="d-flex align-center">
          <gb-tooltip>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.village.taxpayers') }}</span>
            </template>
            <div class="mt-0">
              <span>{{ $vuetify.lang.t('$vuetify.village.taxpayersDescription1', $formatNum(foodConsumption, true), $formatNum(coinsPerFood, true)) }}</span>
              <currency-icon name="village_coin"></currency-icon>
              <span>{{ $vuetify.lang.t('$vuetify.village.taxpayersDescription2') }}</span>
            </div>
          </gb-tooltip>
        </v-col>
        <v-col cols="8" class="d-flex justify-center align-center unemployed-amount" :class="{'unemployed-amount-mobile': $vuetify.breakpoint.xsOnly}">
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.villageTaxRate')">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ $formatNum(employed) }} ({{ $formatNum(taxPercent) }}%)</span>
            </template>
            <stat-breakdown name="villageTaxRate"></stat-breakdown>
          </gb-tooltip>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { VILLAGE_COINS_PER_FOOD } from '../../../js/constants';
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import Job from './Job.vue'

export default {
  components: { Job, StatBreakdown, CurrencyIcon },
  computed: {
    ...mapState({
      jobs: state => state.village.job,
      isFrozen: state => state.cryolab.village.active
    }),
    ...mapGetters({
      employed: 'village/employed',
      unemployed: 'village/unemployed'
    }),
    worker() {
      return this.$store.getters['mult/get']('villageWorker');
    },
    happinessPercent() {
      return this.$store.getters['mult/get']('villageHappiness') * 100;
    },
    taxPercent() {
      return this.$store.getters['mult/get']('villageTaxRate') * 100;
    },
    foodConsumption() {
      return this.$store.getters['mult/get']('villageTaxRate') * this.employed;
    },
    coinsPerFood() {
      return this.$store.getters['mult/get']('currencyVillageCoinGain', VILLAGE_COINS_PER_FOOD);
    },
    canSeeHappiness() {
      return this.$store.state.unlock.villageBuildings4.see;
    }
  }
}
</script>
