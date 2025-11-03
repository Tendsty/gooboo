<template>
  <div class="d-flex align-center flex-grow-1">
    <v-icon class="mr-1">{{ item.icon }}</v-icon>
    <div>
      <div class="ma-1">{{ $vuetify.lang.t(`$vuetify.relic.${ item.name }.name`) }}</div>
      <div v-if="Object.keys(glyphs).length > 0" class="d-flex mt-n2">
        <v-chip
          v-for="(amount, key) in glyphs"
          :key="`glyph-${ key }`"
          :color="glyph[key].color"
          class="ma-1 pa-1 balloon-text-dynamic"
          style="height: 20px;"
          small
          label
        >
          <v-icon class="mr-1">{{ glyph[key].icon }}</v-icon>
          <span>{{ $formatInt(amount) }}</span>
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      glyph: state => state.relic.glyph,
    }),
    glyphs() {
      return this.item.glyph(this.item.level);
    }
  }
}
</script>
