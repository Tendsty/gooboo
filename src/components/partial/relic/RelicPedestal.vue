<style scoped>
.pedestal-info {
  width: 48px;
}
.pedestal-letter {
  font-size: 24px;
  line-height: 24px;
}
</style>

<template>
  <div class="d-flex align-center">
    <v-select outlined hide-details multiple clearable item-value="name" :value="value" :items="relicListSorted" v-on:input="limitRelics">
      <template v-slot:selection="{ item }"><relic-pedestal-display :item="item" is-simple></relic-pedestal-display></template>
      <template v-slot:item="{ item }"><relic-pedestal-display :item="item"></relic-pedestal-display></template>
    </v-select>
    <div class="d-flex flex-column align-center flex-shrink-0 pedestal-info ml-1">
      <div class="pedestal-letter">{{ String.fromCharCode(65 + id) }}</div>
      <div>{{ $formatInt(value.length) }} / {{ $formatInt(max) }}</div>
    </div>
  </div>
</template>

<script>
import RelicPedestalDisplay from './RelicPedestalDisplay.vue';

export default {
  components: { RelicPedestalDisplay },
  inheritAttrs: false,
  props: {
    id: {
      type: Number,
      required: true
    },
    relicList: {
      type: Array,
      required: true
    },
    glyphList: {
      type: Array,
      required: true
    },
    pedestalList: {
      type: Array,
      required: true
    },
    glyphFilter: {
      type: String,
      required: false,
      default: null
    },
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    max() {
      return this.$store.getters['mult/get'](`relicPedestal${ this.id }`);
    },
    relicListSorted() {
      let usedList = [];
      this.pedestalList.forEach((elem, key) => {
        if (parseInt(key) !== this.id) {
          usedList.push(...elem);
        }
      });
      let arr = [...this.relicList].filter(el => !usedList.includes(el.name));
      if (this.glyphFilter) {
        arr.sort((a, b) => (b.glyph(b.level)[this.glyphFilter] ?? 0) - (a.glyph(a.level)[this.glyphFilter] ?? 0));
      }
      return arr;
    }
  },
  methods: {
    limitRelics(e) {
      if (e.length > this.max) {
        e.pop();
      }
      this.$emit('input', e);
    }
  }
}
</script>
