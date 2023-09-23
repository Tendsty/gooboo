<template>
  <div class="bg-tile-default rounded pa-1">
    <v-icon class="ma-1" large :color="flower.color">{{ flower.icon }}</v-icon>
    <price-tag class="ma-1" currency="event_humus" :amount="flower.humusPrice"></price-tag>
    <v-btn class="success ma-1" :disabled="!canAfford" @click="buy">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
  </div>
</template>

<script>
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { PriceTag },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    flower() {
      return this.$store.state.bloom.flower[this.name];
    },
    canAfford() {
      return this.$store.getters['bloom/hasInventorySpace'] && this.$store.getters['currency/value']('event_humus') >= this.flower.humusPrice;
    },
    flowerObject() {
      return {
        type: this.name,
        tier: 0,
        gene: []
      };
    }
  },
  methods: {
    buy() {
      this.$store.dispatch('bloom/buyFlower', this.name);
    }
  }
}
</script>
