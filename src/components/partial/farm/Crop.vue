<style scoped>
.crop-headline-small {
  font-size: 10px;
}
.stage-text-small {
  font-size: 12px;
  line-height: 1;
}
.crop-headline-small .stage-text-small {
  font-size: 8px;
}
.crop-symbol-bar {
  position: absolute;
  right: 4px;
  top: 14px;
  opacity: 0.25;
}
.crop-symbol-bar-small {
  right: 0px;
  top: 4px;
}
.care-icon {
  position: absolute;
  left: 2px;
  bottom: 12px;
}
.mr-05 {
  margin-right: 2px;
}
.farm-container {
  position: relative;
}
.farm-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.2;
}
.farm-care-hidden {
  opacity: 0;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.farm.crop.${ item.crop }`)">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex flex-column justify-space-between" style="height: 100%" v-bind="attrs" v-on="on" @mouseenter="applyCare">
        <div class="d-flex justify-center align-center" :class="{'crop-headline-small mt-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}" v-if="isGrown">
          <v-icon :size="$vuetify.breakpoint.smAndDown ? 10 : 16">mdi-basket</v-icon>
          <v-icon v-if="item.cache.overgrow === null && item.grow === 1" class="ml-1" :size="$vuetify.breakpoint.smAndDown ? 8 : 12">mdi-check</v-icon>
          <span v-else class="stage-text-small ml-1">{{ $formatNum(item.grow * 100) }}%</span>
        </div>
        <div :class="{'crop-headline-small': $vuetify.breakpoint.smAndDown}" v-else>
          <span>{{ $formatTime(Math.ceil(60 * (1 - item.grow) / item.cache.grow)) }}</span>
        </div>
        <div>
          <v-icon :size="iconSize" :color="crop.color">{{ crop.icon }}</v-icon>
          <v-icon v-if="item.giant" :size="iconSize" :color="crop.color">{{ crop.icon }}</v-icon>
        </div>
        <v-progress-linear :class="{'rounded-b': $vuetify.breakpoint.smAndDown, 'rounded-b-lg': $vuetify.breakpoint.mdAndUp}" :height="$vuetify.breakpoint.smAndDown ? 4 : 12" :color="isGrown ? 'green' : 'light-green'" :value="item.grow * 100"></v-progress-linear>
        <div class="crop-symbol-bar" :class="{'crop-symbol-bar-small': $vuetify.breakpoint.smAndDown}">
          <v-icon :size="buildingIconSize" v-if="item.cache.sprinkler" class="mr-05">mdi-sprinkler-variant</v-icon>
          <v-icon :size="buildingIconSize" v-if="item.cache.lectern" class="mr-05">mdi-book-open-page-variant</v-icon>
          <v-icon :size="buildingIconSize" v-if="item.cache.pinwheelSource" class="mr-05">mdi-pinwheel</v-icon>
          <v-icon :size="buildingIconSize" v-if="item.cache.flag" class="mr-05">mdi-flag</v-icon>
          <v-icon :size="buildingIconSize" v-if="item.cache.gnome" class="mr-05">mdi-human-child</v-icon>
          <v-icon :size="buildingIconSize" v-if="item.cache.lonely" class="mr-05">mdi-circle-expand</v-icon>
        </div>
        <v-icon class="care-icon balloon-text-dynamic" :class="{'farm-care-hidden': !item.care.active}" color="light-blue" :size="$vuetify.breakpoint.smAndDown ? 16 : 32">mdi-watering-can</v-icon>
      </div>
    </template>
    <template v-if="unlock.farmCare.use && crop.type !== 'special'">
      <div class="farm-container d-flex align-center pa-1 mb-2">
        <div class="farm-bg light-blue rounded"></div>
        <v-icon large class="mr-2" color="light-blue">mdi-watering-can</v-icon>
        <div>
          <div v-if="geneStats.care.yield" class="d-flex align-center mt-0" :class="hasMaxYieldCare ? `success--text text--${ themeCss }` : ''">
            <div>{{ $formatNum(100 * geneStats.care.yield.weight / totalCareWeight, true) }}%</div>
            <v-icon :color="hasMaxYieldCare ? `success ${ themeCss }` : undefined">mdi-circle-small</v-icon>
            <v-icon small class="mr-2" :color="hasMaxYieldCare ? `success ${ themeCss }` : undefined">{{ currency['farm_' + crop.type].icon }}</v-icon>
            <div>{{ $formatNum(1 + item.care.yield, true) }}x / {{ $formatNum(geneStats.care.yield.max + 1, true) }}x</div>
          </div>
          <div v-if="geneStats.care.rareDrop" class="d-flex align-center mt-0" :class="hasMaxRareDropCare ? `success--text text--${ themeCss }` : ''">
            <div>{{ $formatNum(100 * geneStats.care.rareDrop.weight / totalCareWeight, true) }}%</div>
            <v-icon :color="hasMaxRareDropCare ? `success ${ themeCss }` : undefined">mdi-circle-small</v-icon>
            <v-icon small class="mr-2" :color="hasMaxRareDropCare ? `success ${ themeCss }` : undefined">mdi-dice-multiple</v-icon>
            <div>{{ $formatNum(1 + item.care.rareDrop, true) }}x / {{ $formatNum(geneStats.care.rareDrop.max + 1, true) }}x</div>
          </div>
          <div v-if="unlock.farmCropExp.use && geneStats.care.exp" class="d-flex align-center mt-0" :class="hasMaxExpCare ? `success--text text--${ themeCss }` : ''">
            <div>{{ $formatNum(100 * geneStats.care.exp.weight / totalCareWeight, true) }}%</div>
            <v-icon :color="hasMaxExpCare ? `success ${ themeCss }` : undefined">mdi-circle-small</v-icon>
            <v-icon small class="mr-2" :color="hasMaxExpCare ? `success ${ themeCss }` : undefined">mdi-star</v-icon>
            <div>{{ $formatNum(1 + item.care.exp, true) }}x / {{ $formatNum(geneStats.care.exp.max + 1, true) }}x</div>
          </div>
          <div v-if="geneStats.care.gold" class="d-flex align-center mt-0">
            <div>{{ $formatNum(100 * geneStats.care.gold.weight / totalCareWeight, true) }}%</div>
            <v-icon>mdi-circle-small</v-icon>
            <v-icon small class="mr-2">mdi-gold</v-icon>
            <div>{{ $formatInt(geneStats.care.gold.amount) }} - {{ $formatInt(geneStats.care.gold.max) }}</div>
          </div>
          <div v-if="geneStats.care.time" class="d-flex align-center mt-0" :class="item.grow >= 1 ? `success--text text--${ themeCss }` : ''">
            <div>{{ $formatNum(100 * geneStats.care.time.weight / totalCareWeight, true) }}%</div>
            <v-icon :color="item.grow >= 1 ? `success ${ themeCss }` : undefined">mdi-circle-small</v-icon>
            <v-icon small class="mr-2" :color="item.grow >= 1 ? `success ${ themeCss }` : undefined">mdi-timer</v-icon>
            <div>{{ $formatTime(geneStats.care.time.amount * 60) }}</div>
          </div>
        </div>
      </div>
    </template>
    <div class="farm-container d-flex align-center pa-1">
      <div class="farm-bg green rounded"></div>
      <v-icon large class="mr-2" color="green">mdi-basket</v-icon>
      <div>
        <template v-if="crop.type !== 'special'">
          <div class="d-flex align-center mt-0"><v-icon small class="mr-2">{{ currency['farm_' + crop.type].icon }}</v-icon><div>{{ $formatNum(baseYield * giantMult * growMult) }}</div></div>
          <div v-if="unlock.farmDisableEarlyGame.use" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-gold</v-icon><div>{{ $formatNum(baseGoldChance * giantMult * growMult * 100, true) }}%</div></div>
        </template>
        <div v-if="unlock.farmCropExp.use && (crop.type === 'special' || baseExp > 0)" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-star</v-icon><div>+{{ $formatNum(crop.type !== 'special' ? (baseExp * giantMult * growMult) : giantMult, true) }}</div></div>
      </div>
    </div>
    <template v-if="crop.type !== 'special'">
      <div v-if="item.cache.overgrow !== null" class="d-flex align-center"><v-icon small class="mr-2">mdi-sprout</v-icon><div>{{ $formatNum(100 * item.cache.overgrow) }}% (x{{ $formatNum(item.cache.overgrowMult, true) }})</div></div>
      <div v-if="item.cache.sprinkler || item.cache.lectern || item.cache.pinwheelSource || item.cache.flag || item.cache.gnome || item.cache.lonely"></div>
      <div v-if="item.cache.sprinkler" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-sprinkler-variant</v-icon><div>/{{ $formatNum(item.cache.sprinkler * sprinklerGrow + 1, true) }} {{ $vuetify.lang.t('$vuetify.mult.farmGrow') }}</div></div>
      <div v-if="item.cache.sprinkler" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-sprinkler-variant</v-icon><div>+{{ $formatNum(item.cache.sprinkler * sprinklerOvergrow * 100) }}% {{ $vuetify.lang.t('$vuetify.mult.farmOvergrow') }}</div></div>
      <div v-if="item.cache.sprinkler" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-sprinkler-variant</v-icon><div>{{ $vuetify.lang.t('$vuetify.farm.building.sprinkler.care') }}</div></div>
      <div v-if="item.cache.lectern" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-book-open-page-variant</v-icon><div>x{{ $formatNum(item.cache.lectern * lecternExp + 1) }} {{ $vuetify.lang.t('$vuetify.mult.farmExperience') }}</div></div>
      <div v-if="item.cache.pinwheelSource" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-pinwheel</v-icon><div>{{ $vuetify.lang.t('$vuetify.farm.building.pinwheel.rareDrop') }}</div></div>
      <div v-if="item.cache.flag" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-flag</v-icon><div>x{{ $formatNum(item.cache.flag * 0.5 + 1, true) }} {{ $vuetify.lang.t('$vuetify.mult.farmCropGain') }}</div></div>
      <div v-if="item.cache.gnome" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-human-child</v-icon><div>x{{ $formatNum(item.cache.gnome * 0.04 + 1, true) }} {{ $vuetify.lang.t('$vuetify.mult.farmAllGain') }}</div></div>
      <div v-if="item.cache.lonely" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-circle-expand</v-icon><div>/1.3 {{ $vuetify.lang.t('$vuetify.mult.farmGrow') }}</div></div>
      <div v-if="item.cache.lonely" class="d-flex align-center mt-0"><v-icon small class="mr-2">mdi-circle-expand</v-icon><div>+150% {{ $vuetify.lang.t('$vuetify.mult.farmOvergrow') }}</div></div>
    </template>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
import { FARM_LECTERN_EXP, FARM_SPRINKLER_GROW, FARM_SPRINKLER_OVERGROW } from '../../../js/constants';
import { capitalize } from '../../../js/utils/format';

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      currency: state => state.currency,
      unlock: state => state.unlock,
    }),
    crop() {
      return this.$store.state.farm.crop[this.item.crop];
    },
    growMult() {
      return Math.max(1, this.item.grow);
    },
    isGrown() {
      return this.item.grow >= 1;
    },
    iconSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.isGrown ? 20 : 12;
      }
      return this.isGrown ? 40 : 24;
    },
    buildingIconSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 6;
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        return 12;
      }
      return 16;
    },
    geneStats() {
      return this.$store.getters['farm/cropGeneStats'](this.item.crop, this.item.fertilizer);
    },
    safeTime() {
      return Math.max(1, this.item.time);
    },
    baseYield() {
      return this.$store.getters['mult/get'](
        'currencyFarm' + capitalize(this.crop.type) + 'Gain',
        this.crop.yield + this.geneStats.mult.farmCropGain.baseValue,
        (((this.item.buildingEffect.flag ?? 0) / this.safeTime) * 0.5 + 1) * this.geneStats.mult.farmCropGain.multValue
      ) * (0.04 * (this.item.buildingEffect.gnomeBoost ?? 0) / this.safeTime + 1);
    },
    baseGoldChance() {
      return this.$store.getters['mult/get'](
        'farmGoldChance',
        this.$store.getters['farm/baseGoldChance'](this.item.crop) + this.geneStats.mult.farmGoldChance.baseValue,
        ((this.item.buildingEffect.gardenGnome ?? 0) / this.safeTime) * this.geneStats.mult.farmGoldChance.multValue
      ) * (0.04 * (this.item.buildingEffect.gnomeBoost ?? 0) / this.safeTime + 1);
    },
    baseExp() {
      return this.$store.getters['mult/get'](
        'farmExperience',
        this.geneStats.mult.farmExperience.baseValue,
        (((this.item.buildingEffect.lectern ?? 0) / this.safeTime) * 2 + 1) * this.geneStats.mult.farmExperience.multValue
      ) * (0.04 * (this.item.buildingEffect.gnomeBoost ?? 0) / this.safeTime + 1);
    },
    hasMaxYieldCare() {
      return this.geneStats.care.yield && this.item.care.yield >= this.geneStats.care.yield.max;
    },
    hasMaxRareDropCare() {
      return this.geneStats.care.rareDrop && this.item.care.rareDrop >= this.geneStats.care.rareDrop.max;
    },
    hasMaxExpCare() {
      return this.geneStats.care.exp && this.item.care.exp >= this.geneStats.care.exp.max;
    },
    themeCss() {
      return this.$vuetify.theme.dark ? 'lighten-2' : 'darken-2';
    },
    sprinklerGrow() {
      return FARM_SPRINKLER_GROW;
    },
    sprinklerOvergrow() {
      return FARM_SPRINKLER_OVERGROW;
    },
    lecternExp() {
      return FARM_LECTERN_EXP;
    },
    totalCareWeight() {
      let weight = 0;
      for (const [, elem] of Object.entries(this.geneStats.care)) {
        weight += elem.weight;
      }
      return weight;
    },
    giantMult() {
      return this.item.giant ? this.crop.giantMult : 1;
    }
  },
  methods: {
    applyCare() {
      if (!this.$store.state.cryolab.farm.active && this.item.care.active) {
        this.$store.dispatch('farm/applyCare', {x: this.x, y: this.y});
      }
    }
  }
}
</script>
