<style scoped>
.mini-relic-large {
  width: 36px;
  height: 36px;
}
.mini-relic-small {
  width: 24px;
  height: 24px;
}
.glyph-amount {
  line-height: 11px;
  font-size: 11px;
}
.glyph-container {
  height: 26px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.relic.${ name }.name`)">
    <template v-slot:activator="{ on, attrs }">
      <v-chip class="pa-0 justify-center" :class="['mini-relic-' + (large ? 'large' : 'small'), $vnode.data.staticClass]" :color="relic.color + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')" label v-bind="attrs" v-on="on">
        <v-icon :size="large ? 28 : 16">{{ relic.icon }}</v-icon>
      </v-chip>
    </template>
    <div v-if="canSeeMuseum" class="d-flex flex-wrap mb-2 ml-n1">
      <div
        v-for="(item, key) in glyphs"
        :key="`glyph-${ key }`"
        :class="glyph[key].color + ($vuetify.theme.dark ? ' darken-3' : ' lighten-3')"
        class="d-flex align-end glyph-container ml-1 rounded px-1"
        :style="`border: 1px solid ${ $vuetify.theme.dark ? '#121212' : '#FFFFFF' } !important;`"
      >
        <v-icon size="20">{{ glyph[key].icon }}</v-icon>
        <span class="glyph-amount">{{ $formatInt(item) }}</span>
      </div>
    </div>
    <div v-if="activeDescription !== null" class="d-flex align-center mb-2">
      <v-icon class="mr-1">mdi-cursor-default-click</v-icon>
      <div>{{ $vuetify.lang.t(`$vuetify.relic.${ name }.active`) }}: {{ $vuetify.lang.t(`$vuetify.relic.${ name }.description`, ...activeDescription) }}</div>
    </div>
    <display-row class="mt-0" v-for="(item, key) in effect" :key="key" :name="item.name" :type="item.type" :after="item.value" show-icon></display-row>
    <alert-text v-if="isAchievementReward" type="info">{{ $vuetify.lang.t(`$vuetify.achievement.nextReward`) }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: false,
      default: null
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    isAchievementReward: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      glyph: state => state.relic.glyph,
    }),
    relic() {
      return this.$store.state.relic.item[this.name];
    },
    finalLevel() {
      return this.level ?? this.relic.level;
    },
    effect() {
      return this.relic.effect(this.finalLevel);
    },
    glyphs() {
      return this.relic.glyph(this.finalLevel);
    },
    canSeeMuseum() {
      return this.$store.state.unlock.relicMuseum.see;
    },
    activeDescription() {
      if (!this.relic.active || !this.relic.active.description) {
        return null;
      }
      return this.relic.active.description(this.relic.active.params(), null);
    },
  }
}
</script>
