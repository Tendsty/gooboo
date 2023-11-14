<template>
  <div class="d-flex justify-center mt-n1 mb-1">
    <gb-tooltip :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-chip small class="ma-1 balloon-text-dynamic" v-bind="attrs" v-on="on">
          <v-icon class="mr-1">mdi-domain</v-icon>
          {{ $formatNum(building) }}
        </v-chip>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t('$vuetify.village.buildingStat') }}</div>
    </gb-tooltip>
    <gb-tooltip :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-chip small class="ma-1 balloon-text-dynamic" v-bind="attrs" v-on="on">
          <v-icon class="mr-1">mdi-home-analytics</v-icon>
          {{ $formatNum(housing) }}
        </v-chip>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t('$vuetify.village.housingStat') }}</div>
    </gb-tooltip>
    <gb-tooltip v-if="power > 0" :title-text="$vuetify.lang.t('$vuetify.mult.villagePower')">
      <template v-slot:activator="{ on, attrs }">
        <v-chip small color="yellow" class="ma-1 balloon-text-dynamic" v-bind="attrs" v-on="on">
          <v-icon class="mr-1">mdi-lightning-bolt</v-icon>
          {{ $formatNum(power) }}
        </v-chip>
      </template>
      <div>{{ $vuetify.lang.t('$vuetify.village.powerDescription', $formatNum(powerBonus, true)) }}</div>
      <stat-breakdown name="villagePower"></stat-breakdown>
    </gb-tooltip>
    <gb-tooltip v-if="pollution > 0" :title-text="$vuetify.lang.t('$vuetify.mult.villagePollution')">
      <template v-slot:activator="{ on, attrs }">
        <v-chip small class="ma-1 balloon-text-dynamic" :color="pollutionColor" v-bind="attrs" v-on="on">
          <v-icon class="mr-1">mdi-smoke</v-icon>
          {{ $formatNum(pollution) }}
        </v-chip>
      </template>
      <div>{{ $vuetify.lang.t('$vuetify.village.pollutionDescription', $formatNum(nextPollutionPenalty)) }}</div>
      <stat-breakdown name="villagePollution"></stat-breakdown>
      <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.villagePollutionTolerance') }}</h3>
      <stat-breakdown name="villagePollutionTolerance"></stat-breakdown>
    </gb-tooltip>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import StatBreakdown from '../../render/StatBreakdown.vue';

export default {
  components: { StatBreakdown },
  computed: {
    ...mapState({
      building: state => state.stat.village_maxBuilding.value,
      housing: state => state.stat.village_maxHousing.value
    }),
    power() {
      return this.$store.getters['mult/get']('villagePower');
    },
    pollution() {
      return this.$store.getters['mult/get']('villagePollution');
    },
    pollutionColor() {
      if (this.pollution <= 0) {
        return 'green';
      }
      const diff = this.$store.getters['mult/get']('villagePollutionTolerance') - this.pollution;
      if (diff >= 0) {
        return 'light-green';
      } else if (diff >= -5) {
        return 'amber';
      } else if (diff >= -10) {
        return 'orange';
      } else if (diff >= -15) {
        return 'orange-red';
      } else {
        return 'red';
      }
    },
    powerBonus() {
      return this.power * 0.2 + 1;
    },
    nextPollutionPenalty() {
      const tolerance = this.$store.getters['mult/get']('villagePollutionTolerance');
      return this.pollution < tolerance ? 1 : (2 + this.pollution - tolerance);
    }
  }
}
</script>
