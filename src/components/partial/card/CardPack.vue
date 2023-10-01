<template>
  <div class="d-flex flex-wrap align-center">
    <div class="mx-1">{{ $vuetify.lang.t(`$vuetify.card.pack.${ item.name }`) }}</div>
    <v-chip v-if="item.feature" class="px-2 mx-1" label small><v-icon class="mr-1">{{ featureIcon }}</v-icon>{{ $vuetify.lang.t(`$vuetify.feature.${ item.feature }`) }}</v-chip>
    <v-chip class="px-2 mx-1" label small><v-icon class="mr-1">mdi-cards</v-icon>{{ item.amount }}</v-chip>
    <price-tag class="mx-1" currency="gem_emerald" :amount="item.price"></price-tag>
  </div>
</template>

<script>
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { PriceTag },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    featureIcon() {
      return this.item.feature ? this.$store.state.system.features[this.item.feature].icon : null;
    }
  }
}
</script>
