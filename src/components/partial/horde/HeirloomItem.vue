<template>
  <gb-tooltip>
    <template v-slot:activator="{ on, attrs }">
      <v-card :class="{[premiumGlowName]: isPremium}" v-bind="attrs" v-on="on">
        <v-card-title class="justify-space-between align-center">
          <v-icon :color="heirloom.color">{{ heirloom.icon }}</v-icon>
          <div>{{ $vuetify.lang.t(`$vuetify.horde.heirloom.${ name }`) }}</div>
          <div>x{{ $formatNum(heirloom.amount) }}</div>
        </v-card-title>
        <v-card-text>
          <display-row v-for="(item, key) in display" :key="`${ item.name }-${ item.type }-${ key }`" :name="item.name" :type="item.type" :after="item.current"></display-row>
          <v-progress-linear v-if="canSeeBoost" class="mt-2 rounded" height="20" :value="boostPercent">
            <v-icon class="mx-1" small>mdi-arrow-up</v-icon>
            <div>{{ $formatInt(heirloom.level) }}</div>
            <v-spacer></v-spacer>
            <div class="mr-1">{{ $formatInt(heirloom.boost) }} / {{ $formatInt(tillNext) }}</div>
          </v-progress-linear>
        </v-card-text>
      </v-card>
    </template>
    <h3 class="text-center mt-0">{{ $vuetify.lang.t('$vuetify.gooboo.effect') }}</h3>
    <stat-breakdown :name="`${ name }HeirloomEffect`" :base="1"></stat-breakdown>
    <template v-if="canSeeBoost && heirloom.level > 0">
      <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.horde.heirloom.boost.name') }}</h3>
      <div>{{ $vuetify.lang.t('$vuetify.horde.heirloom.boost.description', $formatInt(heirloom.level), $formatNum(exponent, true)) }}</div>
      <display-row v-for="(item, key) in display" :key="`boost-${ item.name }-${ item.type }-${ key }`" :name="item.name" :type="item.type" :before="item.base" :after="item.current"></display-row>
    </template>
    <alert-text v-if="heirloom.minZone === Infinity" class="mt-2" type="info">{{ $vuetify.lang.t(`$vuetify.horde.heirloom.special`) }}</alert-text>
    <alert-text v-else-if="heirloom.minZone > 0" class="mt-2" type="info">{{ $vuetify.lang.t(`$vuetify.horde.heirloom.min`, heirloom.minZone) }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { HORDE_HEIRLOOM_BOOST_EXPONENT } from '../../../js/constants';
import { capitalize } from '../../../js/utils/format';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, AlertText, StatBreakdown },
  props: {
    name: {
      type: String,
      required: false
    }
  },
  computed: {
    heirloom() {
      return this.$store.state.horde.heirloom[this.name];
    },
    tillNext() {
      return [...this.$store.state.horde.heirloomAmountNeeded, null][this.heirloom.level];
    },
    tillPrevious() {
      return this.heirloom.level >= 1 ? [...this.$store.state.horde.heirloomAmountNeeded][this.heirloom.level - 1] : 0;
    },
    boostPercent() {
      return this.tillNext === null ? 100 : (100 * (this.heirloom.boost - this.tillPrevious) / (this.tillNext - this.tillPrevious));
    },
    canSeeBoost() {
      return this.heirloom.minZone !== Infinity && this.$store.state.unlock.hordeRaidboss.see;
    },
    display() {
      return this.heirloom.effect.map(elem => {
        const value = elem.value(this.$store.getters['mult/get'](`${ this.name }HeirloomEffect`, this.heirloom.amount));
        return {
          ...elem,
          base: value,
          current: elem.type === 'mult' ? Math.pow(value, this.exponent) : (Math.pow(value + 1, this.exponent) - 1)
        };
      });
    },
    isPremium() {
      return this.$store.state.upgrade.item[`horde_ancient${ capitalize(this.name) }`]?.level >= 1;
    },
    premiumGlowName() {
      return `premium-${ this.$store.state.system.settings.performance.items.cssAnimations.value ? 'glow' : 'frame' }-${ this.$store.state.upgrade.item[`horde_ancient${ capitalize(this.name) }`]?.level }`;
    },
    exponent() {
      return HORDE_HEIRLOOM_BOOST_EXPONENT * this.heirloom.level + 1;
    }
  }
}
</script>
