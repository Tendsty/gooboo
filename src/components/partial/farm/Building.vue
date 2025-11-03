<style scoped>
.vegetable-icon {
  position: absolute;
  opacity: 0.2;
  left: 8px;
  top: 8px;
}
.berry-icon {
  position: absolute;
  opacity: 0.2;
  right: 8px;
  top: 8px;
}
.grain-icon {
  position: absolute;
  opacity: 0.2;
  left: 8px;
  bottom: 8px;
}
.flower-icon {
  position: absolute;
  opacity: 0.2;
  right: 8px;
  bottom: 8px;
}
.flag-divider-horizontal {
  position: absolute;
  opacity: 0.2;
  background-color: white;
  height: 4px;
  left: 1px;
  right: 1px;
}
.flag-divider-vertical {
  position: absolute;
  opacity: 0.2;
  background-color: white;
  width: 4px;
  top: 1px;
  bottom: 1px;
}
</style>

<template>
  <gb-tooltip :title-text="isPremium ? $vuetify.lang.t(`$vuetify.farm.building.premium`, $vuetify.lang.t(`$vuetify.farm.building.${ name }.name`)) : $vuetify.lang.t(`$vuetify.farm.building.${ name }.name`)">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex justify-center align-center" style="height: 100%" v-bind="attrs" v-on="on">
        <v-icon :class="{[premiumGlowName]: isPremium}" :size="iconSize">{{ building.icon }}</v-icon>
        <v-icon v-if="name === 'flag'" class="vegetable-icon">mdi-carrot</v-icon>
        <v-icon v-if="name === 'flag'" class="berry-icon">mdi-fruit-grapes</v-icon>
        <v-icon v-if="name === 'flag'" class="grain-icon">mdi-barley</v-icon>
        <v-icon v-if="name === 'flag'" class="flower-icon">mdi-flower</v-icon>
        <div v-if="name === 'flag'" class="flag-divider-horizontal"></div>
        <div v-if="name === 'flag'" class="flag-divider-vertical"></div>
      </div>
    </template>
    <div>{{ $vuetify.lang.t(`$vuetify.farm.building.${ name }.description`, ...buildingParams) }}</div>
  </gb-tooltip>
</template>

<script>
import { FARM_BUILDING_PREMIUM_BONUS, FARM_FLAG_YIELD, FARM_LECTERN_EXP, FARM_PINWHEEL_RARE_DROP, FARM_SPRINKLER_GROW, FARM_SPRINKLER_OVERGROW } from '../../../js/constants';
import { formatNum } from '../../../js/utils/format';

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    isPremium: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    building() {
      return this.$store.state.farm.building[this.name];
    },
    iconSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 20;
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        return 30;
      }
      return 40;
    },
    premiumBonus() {
      return this.isPremium ? (FARM_BUILDING_PREMIUM_BONUS + 1) : 1;
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
    },
    premiumGlowName() {
      return `premium-${ this.$store.state.system.settings.performance.items.cssAnimations.value ? 'glow' : 'frame' }-1-text`;
    }
  }
}
</script>
