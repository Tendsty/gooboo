<style scoped>
.ingredient-container {
  position: relative;
  width: 56px;
  height: 56px;
}
.ingredient-amount {
  position: absolute;
  right: 2px;
  bottom: -2px;
  font-size: 14px;
}
.ingredient-more {
  position: absolute;
  left: 2px;
  top: 2px;
  opacity: 0.75;
}
.ingredient-less {
  position: absolute;
  left: 2px;
  bottom: 2px;
  opacity: 0.75;
}
.ingredient-close {
  position: absolute;
  right: 2px;
  top: 2px;
  opacity: 0.75;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.currency.${ currencyName }.name`)" :min-width="200">
    <template v-slot:activator="{ on, attrs }">
      <div class="ingredient-container balloon-text-dynamic rounded d-flex justify-center align-center" @mouseover="hovered = true" @mouseleave="hovered = false" :class="[$vuetify.theme.dark ? 'darken-2' : 'lighten-2', currency.color, {'premium-glow': premium}, $vnode.data.staticClass]" v-bind="attrs" v-on="{$listeners, ...on}">
        <v-icon class="mb-3" large>{{ currency.icon }}</v-icon>
        <div class="ingredient-amount">{{ $formatNum(amount) }}</div>
        <v-btn @click="compressMore" v-if="canCompress && hovered" :disabled="!canUpgrade" class="ingredient-more px-1" x-small min-width="0" min-height="0"><v-icon size="12">mdi-arrow-up</v-icon></v-btn>
        <v-btn @click="compressLess" v-if="canCompress && hovered" :disabled="compress <= 0" class="ingredient-less px-1" x-small min-width="0" min-height="0"><v-icon size="12">mdi-arrow-down</v-icon></v-btn>
        <v-btn @click="removeIngredient" v-if="hovered" class="ingredient-close px-1" color="error" x-small min-width="0" min-height="0"><v-icon size="12">mdi-close</v-icon></v-btn>
      </div>
    </template>
    <div>{{ $formatNum(ore.power) }} {{ $vuetify.lang.t('$vuetify.mining.crafting.power') }}</div>
    <div :class="`red--text ${ $vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-2'} mt-0`" v-if="impurity > 1">x{{ $formatNum(impurity, true) }} {{ $vuetify.lang.t('$vuetify.mining.crafting.impurity') }}</div>
    <div :class="`green--text ${ $vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-2'} mt-0`" v-if="purity > 0">+{{ $formatNum(purity, true) }} {{ $vuetify.lang.t('$vuetify.mining.crafting.purity') }}</div>
    <alert-text v-if="premium" type="info">{{ $vuetify.lang.t('$vuetify.mining.crafting.premiumSlot') }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { MINING_CRAFTING_COMPRESSION } from '../../../js/constants';
import AlertText from '../render/AlertText.vue';

export default {
  components: { AlertText },
  props: {
    index: {
      type: Number,
      required: true
    },
    premium: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    hovered: false
  }),
  computed: {
    name() {
      return this.$store.state.mining.ingredientList[this.index].name;
    },
    compress() {
      return this.$store.state.mining.ingredientList[this.index].compress;
    },
    currencyName() {
      return 'mining_' + this.name;
    },
    currency() {
      return this.$store.state.currency[this.currencyName];
    },
    amount() {
      return Math.pow(MINING_CRAFTING_COMPRESSION, this.compress);
    },
    canCompress() {
      return this.$store.state.unlock[this.ore.compressUnlock].use;
    },
    canUpgrade() {
      return this.currency.cap >= Math.pow(MINING_CRAFTING_COMPRESSION, this.compress + 1);
    },
    ore() {
      return this.$store.state.mining.ingredient[this.name];
    },
    impurity() {
      const baseValue = Math.max(1, this.ore.impurity * Math.pow(0.95, this.compress) - this.compress * 0.05);
      return this.premium ? ((baseValue - 1) / 2 + 1) : baseValue;
    },
    purity() {
      return this.compress * (this.premium ? 0.5 : 0.25);
    }
  },
  methods: {
    removeIngredient() {
      this.$store.commit('mining/removeIngredient', this.index);
    },
    compressMore() {
      this.$store.commit('mining/updateIngredientKey', {index: this.index, key: 'compress', value: this.compress + 1});
    },
    compressLess() {
      this.$store.commit('mining/updateIngredientKey', {index: this.index, key: 'compress', value: this.compress - 1});
    }
  }
}
</script>
