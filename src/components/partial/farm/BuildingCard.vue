<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.farm.building.${ name }.name`) }}</v-card-title>
    <v-card-subtitle v-if="premium > 0" class="pa-2 text-center">{{ $vuetify.lang.t(`$vuetify.farm.building.premiumOwned`, premium) }}</v-card-subtitle>
    <v-card-subtitle v-else class="pa-2 text-center">{{ $vuetify.lang.t(`$vuetify.farm.building.owned`, owned) }}</v-card-subtitle>
    <v-card-text>{{ $vuetify.lang.t(`$vuetify.farm.building.${ name }.description`, ...buildingParams) }}</v-card-text>
  </v-card>
</template>

<script>
import { FARM_BUILDING_PREMIUM_BONUS, FARM_FLAG_YIELD, FARM_LECTERN_EXP, FARM_PINWHEEL_RARE_DROP, FARM_SPRINKLER_GROW, FARM_SPRINKLER_OVERGROW } from '../../../js/constants';
import { formatNum } from '../../../js/utils/format';

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    building() {
      return this.$store.state.farm.building[this.name];
    },
    premium() {
      return this.building.maxPremium - this.building.cachePremium;
    },
    owned() {
      return this.building.max - this.building.cacheAmount;
    },
    premiumBonus() {
      return this.premium > 0 ? (FARM_BUILDING_PREMIUM_BONUS + 1) : 1;
    },
    buildingParams() {
      if (this.name === 'sprinkler') {
        return [formatNum(FARM_SPRINKLER_GROW * this.premiumBonus * 100), formatNum(FARM_SPRINKLER_OVERGROW * this.premiumBonus * 100)];
      } else if (this.name === 'lectern') {
        return [formatNum(FARM_LECTERN_EXP * this.premiumBonus * 100)];
      } else if (this.name === 'pinwheel') {
        return [formatNum(FARM_PINWHEEL_RARE_DROP * this.premiumBonus * 8 + 1, true)];
      } else if (this.name === 'flag') {
        return [formatNum(FARM_FLAG_YIELD * this.premiumBonus * 100)];
      }
      return [];
    }
  }
}
</script>
