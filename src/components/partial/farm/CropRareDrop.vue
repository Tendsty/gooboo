<style scoped>
.half-opacity {
  opacity: 0.5;
}
</style>

<template>
  <div class="d-flex flex-wrap align-center" :class="{'half-opacity': dropChance < 0}">
    <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.gooboo.chance')">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">{{ $formatNum(dropChance * 100, true) }}%</div>
      </template>
      <stat-breakdown :name="isHunt ? 'farmHuntChance' : 'farmRareDropChance'" :base="item.chance" :baseArray="[...baseArray, ...hunterArray]" :multArray="multArray"></stat-breakdown>
    </gb-tooltip>
    <v-icon :color="iconColor">mdi-circle-small</v-icon>
    <template v-if="isHunt">
      <v-icon small class="mr-1" :color="iconColor">mdi-bow-arrow</v-icon>
      <div>{{ $formatNum(item.hunter) }}</div>
      <v-icon :color="iconColor">mdi-circle-small</v-icon>
      <div v-if="!item.found">???</div>
      <div v-else>+{{ $formatNum(currencyIncrease) }} {{ $vuetify.lang.t(`$vuetify.gooboo.multCapacity`, $vuetify.lang.t(`$vuetify.currency.${ item.name }.name`)) }}</div>
    </template>
    <div v-else-if="!item.found">???</div>
    <div v-else-if="item.type === 'consumable'">{{ $formatNum(item.value) }}x {{ $vuetify.lang.t(`$vuetify.consumable.${ item.name }.name`) }}</div>
    <div v-else-if="item.type === 'currency'">{{ $formatNum(item.value) }}x {{ $vuetify.lang.t(`$vuetify.currency.${ item.name }.name`) }}</div>
  </div>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import StatBreakdown from '../../render/StatBreakdown.vue';

export default {
  components: { StatBreakdown },
  props: {
    item: {
      type: Object,
      required: true
    },
    baseArray: {
      type: Array,
      required: false,
      default: () => []
    },
    multArray: {
      type: Array,
      required: false,
      default: () => []
    },
    dropBase: {
      type: Number,
      required: false,
      default: 0
    },
    dropMult: {
      type: Number,
      required: false,
      default: 1
    },
    isHunt: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    dropChance() {
      return this.$store.getters['mult/get'](this.isHunt ? 'farmHuntChance' : 'farmRareDropChance', this.item.chance + this.hunterStacks + this.dropBase, this.dropMult);
    },
    iconColor() {
      return this.isHunt ? `blue ${ this.$vuetify.theme.dark ? 'lighten-2' : 'darken-3' }` : undefined;
    },
    currencyIncrease() {
      const split = this.item.name.split('_');
      return this.isHunt ? Math.round(this.$store.state.mult.items[`currency${ capitalize(split[0]) + capitalize(split[1]) }Cap`].baseValue / 10) : 0;
    },
    hunterStacks() {
      return (this.isHunt && this.item.hunter > 0) ? this.item.hunter * -0.05 : 0;
    },
    hunterArray() {
      return this.hunterStacks < 0 ? [{name: 'farmGene_hunter', value: this.hunterStacks}] : [];
    }
  }
}
</script>
