<style scoped>
.relic-name-mobile {
  font-size: 10px;
}
.relic-feature-list {
  position: absolute;
  left: 0;
  right: 4px;
  bottom: -12px;
}
.relic-feature-circle {
  margin-right: 4px;
}
.relic-mobile .relic-feature-circle {
  height: 24px;
  margin-right: 2px;
}
.relic-glyph-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 4px;
}
.relic-description {
  font-size: 16px;
}
.relic-mobile .relic-description {
  font-size: 12px;
}
.relic-formula {
  font-size: 12px;
  line-height: 14px;
}
.relic-mobile .relic-formula {
  font-size: 9px;
  line-height: 11px;
}
.relic-active-box {
  width: 376px;
}
.relic-mobile .relic-active-box {
  width: 240px;
}
.relic-active-btn {
  text-transform: none;
}
.relic-mobile .relic-active-btn {
  font-weight: 400;
  letter-spacing: normal;
  max-width: 100px;
}
.relic-mobile .relic-active-btn >>> .v-btn__content {
  max-width: 100px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.glyph-amount {
  line-height: 11px;
  font-size: 11px;
}
.relic-mobile .glyph-amount {
  line-height: 9px;
  font-size: 9px;
}
.glyph-container {
  height: 26px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.relic-mobile .glyph-container {
  height: 22px;
}
.relic-mobile-text-input, .relic-mobile-text-input >>> .v-input__slot, .relic-mobile-text-input >>> .v-text-field__slot {
  height: 28px;
}
.relic-mobile-text-input >>> .v-input__slot {
  padding: 0 8px !important;
  min-height: 28px !important;
}
</style>

<template>
  <div class="d-flex align-center" :class="{'relic-mobile': $vuetify.breakpoint.xsOnly}">
    <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.gooboo.effect`)">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="d-flex flex-column justify-center align-center mb-3"
          :width="$vuetify.breakpoint.smAndUp ? 180 : 112"
          :height="$vuetify.breakpoint.smAndUp ? 128 : 96"
          :color="relic.color + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon :x-large="$vuetify.breakpoint.smAndUp">{{ relic.icon }}</v-icon>
          <div class="text-center ma-2 mb-n3" :class="{'relic-name-mobile mt-0': $vuetify.breakpoint.xsOnly}">{{ $vuetify.lang.t(`$vuetify.relic.${ name }.name`) }}</div>
          <div class="relic-feature-list d-flex flex-wrap justify-end">
            <div
              v-for="item in relic.feature"
              :key="'feature-' + item"
              :class="relic.color + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')"
              class="rounded-circle relic-feature-circle"
              :style="`border: 2px solid ${ $vuetify.theme.dark ? '#121212' : '#FFFFFF' } !important;`"
            >
              <v-icon class="ma-1" :class="{'mt-0': $vuetify.breakpoint.xsOnly}" :size="$vuetify.breakpoint.xsOnly ? 12 : 16">{{ features[item].icon }}</v-icon>
            </div>
          </div>
          <div v-if="canSeeMuseum" class="relic-glyph-list d-flex flex-wrap">
            <div
              v-for="(item, key) in glyphs"
              :key="`glyph-${ key }`"
              :class="glyph[key].color + ($vuetify.theme.dark ? ' darken-3' : ' lighten-3')"
              class="d-flex align-end glyph-container ml-1 rounded px-1"
              :style="`border: 1px solid ${ $vuetify.theme.dark ? '#121212' : '#FFFFFF' } !important;`"
            >
              <v-icon :size="$vuetify.breakpoint.xsOnly ? 16 : 20">{{ glyph[key].icon }}</v-icon>
              <span class="glyph-amount">{{ $formatInt(item) }}</span>
            </div>
          </div>
        </v-card>
      </template>
      <display-row class="mt-0" v-for="(item, key) in effect" :key="key" :name="item.name" :type="item.type" :after="item.value" show-icon></display-row>
    </gb-tooltip>
    <div
      v-if="relic.active"
      class="d-flex relic-active-box flex-column rounded-r mb-3"
      :class="relic.color + ($vuetify.theme.dark ? ' darken-3' : ' lighten-3')"
      :style="`height: ${ $vuetify.breakpoint.smAndUp ? 120 : 88 }px;`"
    >
      <div v-if="activeDescription !== null" class="relic-description text-center balloon-text-dynamic mt-1 mx-2" :class="{'mb-1': $vuetify.breakpoint.smAndUp}" :key="`description-${ name }`">{{ $vuetify.lang.t(`$vuetify.relic.${ name }.description`, ...activeDescription) }}</div>
      <div v-if="activeFormula !== null" class="relic-formula grey--text balloon-text-dynamic mx-2 mt-0" :class="$vuetify.theme.dark ? 'text--lighten-1' : 'text--darken-3'" :key="`formula-${ name }`">{{ $vuetify.lang.t(`$vuetify.relic.${ name }.formula`, ...activeFormula) }}</div>
      <v-spacer></v-spacer>
      <div class="d-flex align-end" :class="{'mt-n1': $vuetify.breakpoint.xsOnly}">
        <price-tag class="ma-1" v-for="(item, key) in relic.active.cost" :key="`cost-${ name }-${ key }`" :currency="key" :amount="item"></price-tag>
        <v-spacer></v-spacer>
        <v-text-field v-if="name === 'torch'" class="mb-1" :class="{'relic-mobile-text-input': $vuetify.breakpoint.xsOnly}" dense type="number" step="1" min="1" :max="optionMax" suffix="m" outlined hide-details v-model="optionValue"></v-text-field>
        <template v-else-if="name === 'notebook'">
          <v-checkbox class="mb-1" dense hide-details v-model="optionValue"></v-checkbox>
          <price-tag class="mb-1" currency="school_examPass" :amount="1"></price-tag>
        </template>
        <v-spacer></v-spacer>
        <v-btn class="relic-active-btn ma-1" color="primary" :small="$vuetify.breakpoint.smAndUp" :x-small="$vuetify.breakpoint.xsOnly" :disabled="!canAffordActive || activeDisabled" @click="useActive">{{ $vuetify.lang.t(`$vuetify.relic.${ name }.active`) }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PriceTag from '../../render/PriceTag.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, PriceTag },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    optionValue: null
  }),
  mounted() {
    switch (this.name) {
      case 'torch':
        this.optionValue = this.$store.state.mining.depth;
        break;
      case 'notebook':
        this.optionValue = false;
        break;
    }
  },
  computed: {
    ...mapState({
      features: state => state.system.features,
      glyph: state => state.relic.glyph,
    }),
    relic() {
      return this.$store.state.relic.item[this.name];
    },
    effect() {
      return this.relic.effect(this.relic.level);
    },
    glyphs() {
      return this.relic.glyph(this.relic.level);
    },
    activeDescription() {
      if (!this.relic.active || !this.relic.active.description) {
        return null;
      }
      return this.relic.active.description(this.relic.active.params(), this.optionValue);
    },
    activeFormula() {
      if (!this.relic.active || !this.relic.active.formula) {
        return null;
      }
      return this.relic.active.formula(this.relic.active.params(), this.optionValue);
    },
    activeDisabled() {
      if (!this.relic.active) {
        return true;
      }
      if (!this.relic.active.disabled) {
        return false;
      }
      return this.relic.active.disabled(this.relic.active.params(), this.optionValue);
    },
    canAffordActive() {
      return this.relic.active && this.$store.getters['currency/canAfford'](this.relic.active.cost, this.relic.active.cost);
    },
    canSeeMuseum() {
      return this.$store.state.unlock.relicMuseum.see;
    },
    optionMax() {
      switch (this.name) {
        case 'torch':
          return this.$store.state.stat.mining_maxDepth0.value;
      }
      return null;
    }
  },
  methods: {
    useActive() {
      this.$store.dispatch('relic/useActive', {name: this.name, option: this.optionValue});
    }
  }
}
</script>
