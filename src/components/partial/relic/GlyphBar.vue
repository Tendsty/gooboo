<style scoped>
.glyph-level {
  width: 40px;
  height: 40px;
  font-size: 24px;
  z-index: 1;
}
.glyph-progress {
  width: 200px;
}
.glyph-side {
  width: 32px;
  height: 32px;
}
.glyph-change {
  font-size: 12px;
}
.glyph-reset {
  text-decoration: line-through var(--v-primary-base);
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.relic.glyph.title', $vuetify.lang.t(`$vuetify.relic.glyph.${ name }`))">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex align-center" :key="`glyph-${ name }`" :class="$vnode.data.staticClass" v-bind="attrs" v-on="on">
        <div class="d-flex justify-center align-center glyph-level rounded-circle balloon-text-dynamic" :class="`${ glyph.color } ${ themeCss }`">{{ $formatInt(glyphLevel) }}</div>
        <v-progress-linear class="glyph-progress ml-n2" height="32" :value="glyphProgress * 100" :color="glyph.color">
          <div class="d-flex justify-center flex-wrap pt-1">
            <div v-if="showStats" class="d-flex align-center balloon-text-dynamic mt-n1 pl-1" :class="{'glyph-change': showChange}">
              <span>{{ $formatInt(glyphLevel) }}</span>
              <v-icon class="mx-1" :size="showChange ? 10 : 14">mdi-transfer-right</v-icon>
              <span>{{ $formatInt(glyphStat.max) }}</span>
              <v-icon class="mx-1" :size="showChange ? 10 : 14">mdi-circle-small</v-icon>
              <span :class="{'glyph-reset': showChange}">{{ $formatNum(glyphProgress * 100) }}%</span>
              <span>&nbsp;({{ $formatTime(timeUntilNext) }})</span>
            </div>
            <div v-if="showChange" class="d-flex align-center balloon-text-dynamic primary--text mt-n1 pl-1">
              <span>{{ $formatInt(glyphLevel) }}</span>
              <v-icon class="mx-1" color="primary" size="14">mdi-transfer-right</v-icon>
              <span>{{ $formatInt(glyphChange.max) }}</span>
              <v-icon class="mx-1" color="primary" size="14">mdi-circle-small</v-icon>
              <span>{{ $formatTime(timeUntilNextChange) }}</span>
            </div>
          </div>
        </v-progress-linear>
        <div class="glyph-side d-flex justify-center align-center rounded-r-lg" :class="`${ glyph.color } ${ themeCss }`">
          <v-icon class="mx-1">{{ glyph.icon }}</v-icon>
        </div>
      </div>
    </template>
    <display-row v-for="(item, key) in display" class="mt-0" :key="`${ item.name }-${ item.type }-${ key }`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
    <alert-text v-if="glyph.progress <= 0 && !showStats && !showChange" type="info">{{ $vuetify.lang.t('$vuetify.relic.glyph.noLevel') }}</alert-text>
    <alert-text v-if="showStats && glyphStat.max > (glyphLevel + 1)" type="info">{{ $vuetify.lang.t('$vuetify.relic.glyph.speedOvercap', $formatNum(overcapSpeed, true)) }}</alert-text>
    <alert-text v-if="showStats && glyphStat.speed > glyphStat.max" type="info">{{ $vuetify.lang.t('$vuetify.relic.glyph.speedBonus', $formatInt(glyphStat.speed - glyphStat.max), $formatNum(bonusSpeed, true)) }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { RELIC_GLYPH_SPEED_OVERCAP } from '../../../js/constants';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    glyphStat: {
      type: Object,
      required: false,
      default: null
    },
    glyphChange: {
      type: Object,
      required: false,
      default: null
    },
  },
  computed: {
    showStats() {
      return this.glyphStat && this.glyphStat.max > this.glyphLevel;
    },
    showChange() {
      return this.glyphChange && this.glyphChange.max > this.glyphLevel;
    },
    overcapSpeed() {
      return Math.pow(RELIC_GLYPH_SPEED_OVERCAP, this.glyphStat.max - this.glyphLevel - 1);
    },
    bonusSpeed() {
      return this.$store.getters['relic/glyphBonusMult'](this.glyphStat.max, this.glyphStat.speed - this.glyphStat.max);
    },
    glyph() {
      return this.$store.state.relic.glyph[this.name];
    },
    themeCss() {
      return this.$vuetify.theme.dark ? 'darken-1' : 'lighten-1';
    },
    timeUntilNext() {
      return Math.ceil((1 - this.glyphProgress) * this.$store.getters['relic/glyphTimeNeeded'](this.glyphLevel, this.glyphStat.max, this.glyphStat.speed - this.glyphStat.max));
    },
    timeUntilNextChange() {
      return Math.ceil(this.$store.getters['relic/glyphTimeNeeded'](this.glyphLevel, this.glyphChange.max, this.glyphChange.speed - this.glyphChange.max));
    },
    glyphProgress() {
      return this.glyph.progress - this.glyphLevel;
    },
    glyphLevel() {
      return Math.floor(this.glyph.progress);
    },
    display() {
      return this.glyph.effect.map(elem => {
        const lvl = this.glyphLevel;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl) : null,
          after: elem.value(lvl + 1)
        };
      });
    },
  }
}
</script>
