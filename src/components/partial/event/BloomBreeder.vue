<style scoped>
.bloom-breeder {
  width: 128px;
  height: 64px;
}
.bloom-breeder-progress {
  font-size: 12px;
}
</style>

<template>
  <div v-if="breeder" class="d-flex flex-column bloom-breeder bg-tile-default rounded" v-bind="$attrs" v-on="$listeners">
    <v-spacer></v-spacer>
    <div class="d-flex justify-center align-center">
      <bloom-flower :item="breeder"></bloom-flower>
    </div>
    <v-spacer></v-spacer>
    <v-progress-linear class="bloom-breeder-progress rounded-b" height="18" :value="timePercent">{{ $formatTime(breedTime - breeder.time) }} / {{ $formatTime(breedTime) }}</v-progress-linear>
  </div>
  <gb-tooltip v-else :min-width="0">
    <template v-slot:activator="{ on, attrs }">
      <div class="bloom-breeder bg-tile-default rounded" :class="$vnode.data.staticClass" v-bind="{...attrs, ...$attrs}" v-on="{...on, ...$listeners}"></div>
    </template>
    <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.bloom.dragToBreeder') }}</div>
  </gb-tooltip>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import BloomFlower from './BloomFlower.vue';
export default {
  inheritAttrs: false,
  components: { BloomFlower },
  props: {
    slotId: {
      type: Number,
      required: true
    }
  },
  computed: {
    breeder() {
      const breeders = this.$store.state.bloom.breeder;
      return this.slotId >= breeders.length ? null : breeders[this.slotId];
    },
    flower() {
      if (!this.breeder) {
        return null;
      }
      return this.$store.state.bloom.flower[this.breeder.type];
    },
    timePercent() {
      if (!this.breeder) {
        return 0;
      }
      return 100 * this.breeder.time / this.breedTime;
    },
    breedTime() {
      if (!this.breeder) {
        return 1;
      }
      return this.$store.getters['mult/get'](`bloom${ capitalize(this.breeder.type) }BreedTime`);
    }
  }
}
</script>
