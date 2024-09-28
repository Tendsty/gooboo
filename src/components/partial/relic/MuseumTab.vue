<style scoped>
.glyph-level {
  width: 32px;
  height: 32px;
}
.glyph-progress {
  width: 140px;
}
</style>

<template>
  <div>
    <div class="d-flex flex-wrap">
      <div v-for="(glyph, name) in glyphs" class="d-flex align-center ma-1" :key="`glyph-${ name }`">
        <div class="d-flex justify-center align-center glyph-level rounded-circle balloon-text-dynamic" :class="glyph.color">{{ glyph.level }}</div>
        <v-progress-linear class="glyph-progress ml-n2" height="24" :value="glyph.progress * 100" :color="glyph.color">10{{ $formatNum(glyph.progress * 100) }}% ({{ $formatTime(80000) }})</v-progress-linear>
        <div class="rounded-r-lg ml-n1" :class="`${ glyph.color } darken-5`">
          <v-icon class="mx-1" small>{{ glyph.icon }}</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      glyphs: state => state.relic.glyph
    })
  }
}
</script>
