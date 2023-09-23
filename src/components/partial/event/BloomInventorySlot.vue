<style scoped>
.bloom-inventory-slot {
  width: 64px;
  height: 64px;
}
</style>

<template>
  <div class="d-flex justify-center align-center bloom-inventory-slot bg-tile-default rounded" v-on="$listeners">
    <bloom-flower v-if="inventory" :item="inventory"></bloom-flower>
  </div>
</template>

<script>
import BloomFlower from './BloomFlower.vue';

export default {
  components: { BloomFlower },
  props: {
    slotId: {
      type: Number,
      required: true
    }
  },
  computed: {
    inventory() {
      const slots = this.$store.state.bloom.inventory;
      return this.slotId >= slots.length ? null : slots[this.slotId];
    }
  }
}
</script>
