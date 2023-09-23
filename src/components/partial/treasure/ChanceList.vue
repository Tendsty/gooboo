<template>
  <div class="ma-1 d-flex flex-wrap">
    <gb-tooltip v-for="item in tierChances" :key="item.tier" :title-text="$vuetify.lang.t(`$vuetify.treasure.tier`) + ' ' + (item.tier + 1)">
      <template v-slot:activator="{ on, attrs }">
        <div class="balloon-text-dynamic ma-1 px-2 py-1 rounded elevation-2" :class="tierColor[item.tier]" v-bind="attrs" v-on="on">{{ $formatNum(item.chance * 100, true) }}%</div>
      </template>
      <div class="text-center">{{ $vuetify.lang.t(`$vuetify.treasure.tierEffect.globalLevel`) }}</div>
      <template v-if="item.tier > 0">
        <div class="text-center">{{ $vuetify.lang.t(`$vuetify.treasure.tierEffect.upgrade`) }} x{{ $formatNum(Math.pow(upgradeMult, item.tier), true) }}</div>
        <div class="text-center mt-0">{{ $vuetify.lang.t(`$vuetify.treasure.tierEffect.destroy`) }} x{{ $formatNum(Math.pow(destroyMult, item.tier), true) }}</div>
        <div class="text-center">{{ $vuetify.lang.t(`$vuetify.treasure.tierEffect.regular`) }} x{{ $formatNum(Math.pow(regularMult, item.tier), true) }}</div>
        <div class="text-center mt-0" v-if="canSeeSpecial">{{ $vuetify.lang.t(`$vuetify.treasure.tierEffect.special`) }} x{{ $formatNum(Math.pow(specialMult, item.tier), true) }}</div>
      </template>
    </gb-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { TREASURE_TIER_DESTROY_MULT, TREASURE_TIER_REGULAR_MULT, TREASURE_TIER_SPECIAL_MULT, TREASURE_TIER_UPGRADE_MULT } from '../../../js/constants';

export default {
  computed: {
    ...mapState({
      tierColor: state => state.treasure.tierColor
    }),
    ...mapGetters({
      tierChances: 'treasure/tierChancesRaw'
    }),
    upgradeMult() {
      return TREASURE_TIER_UPGRADE_MULT;
    },
    destroyMult() {
      return TREASURE_TIER_DESTROY_MULT;
    },
    regularMult() {
      return TREASURE_TIER_REGULAR_MULT;
    },
    specialMult() {
      return TREASURE_TIER_SPECIAL_MULT;
    },
    canSeeSpecial() {
      return this.$store.state.unlock.treasureSpecialEffect.see;
    }
  }
}
</script>
