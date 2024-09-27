<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.consumable.${ name }.name`)">
    <template v-slot:activator="{ on, attrs }">
      <div :class="$vnode.data.staticClass" v-bind="attrs" v-on="on">
        <v-btn class="px-2" :class="{'selected-primary': isSelected}" :color="consumable.color" :disabled="disabled" v-on="$listeners">
          <v-badge inline bordered :content="$formatNum(consumable.amount)" :color="consumable.amount > 0 ? consumable.color : 'grey'">
            <v-icon>{{ consumable.icon }}</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </template>
    <div>{{ $vuetify.lang.t(`$vuetify.consumable.${ name }.description`) }}</div>
    <div v-if="consumable.amount > 0" class="text-center">{{ $formatNum(consumable.amount) }} {{ $vuetify.lang.t(`$vuetify.consumable.owned`) }}</div>
    <div v-if="consumable.price !== null" class="d-flex flex-wrap mx-n1 mb-n1">
      <price-tag class="ma-1" v-for="(amount, currency) in consumable.price" :key="currency" :currency="currency" :amount="amount"></price-tag>
    </div>
    <template v-if="showDetails && hasFertilizer">
      <div class="text-center">{{ $vuetify.lang.t(`$vuetify.unlock.farmFertilizer`) }}</div>
      <fertilizer-card :name="name.slice(5)"></fertilizer-card>
    </template>
    <slot></slot>
  </gb-tooltip>
</template>

<script>
import FertilizerCard from '../partial/farm/FertilizerCard.vue';
import PriceTag from './PriceTag.vue';

export default {
  components: { PriceTag, FertilizerCard },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false
    },
    showDetails: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    consumable() {
      return this.$store.state.consumable[this.name];
    },
    hasFertilizer() {
      return !!this.$store.state.farm.fertilizer[this.name.slice(5)];
    }
  }
}
</script>
