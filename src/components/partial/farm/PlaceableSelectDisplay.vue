<style scoped>
.crop-level {
  font-size: 12px;
  min-width: 16px;
}
</style>

<template>
  <div class="d-flex align-center flex-grow-1">
    <v-icon class="mr-2" :color="colorIcon">{{ item.icon }}</v-icon>
    <div v-if="type === 'building'">{{ $vuetify.lang.t(`$vuetify.farm.building.${ name }.name`) }}</div>
    <div v-if="isSimple && type === 'crop'" :class="colorText">{{ $vuetify.lang.t(`$vuetify.farm.crop.${ name }`) }}</div>
    <div class="d-flex flex-column flex-grow-1" v-if="!isSimple && type === 'crop'">
      <div class="d-flex align-center flex-grow-1">
        <div :class="colorText">{{ $vuetify.lang.t(`$vuetify.farm.crop.${ name }`) }}</div>
        <v-spacer></v-spacer>
        <v-chip label small class="px-2 mr-2 balloon-text-dynamic" :color="growTimeColor"><v-icon class="mr-2">mdi-timer</v-icon>{{ $formatTime(cropGrow * 60) }}</v-chip>
      </div>
      <div v-if="canSeeExp" class="d-flex align-center flex-grow-1">
        <div class="crop-level text-center" :class="`${ isHighestLevel ? 'light-blue' : 'grey' }--text`">{{ crop.level }}</div>
        <div class="mx-2 flex-grow-1">
          <v-progress-linear class="rounded" :color="isHighestLevel ? 'light-blue' : 'grey'" height="6" :value="100 * crop.exp / expNeeded"></v-progress-linear>
        </div>
      </div>
    </div>
    <v-icon v-if="!isSimple && type === 'crop'" size="20">{{ cropTypeIcon[crop.type] }}</v-icon>
    <template v-if="!isSimple && type === 'building'">
      <v-spacer></v-spacer>
      <v-chip v-if="premium >= 1" color="red" label small class="px-2" :class="{'mr-2': owned >= 1}">{{ premium }}</v-chip>
      <v-chip v-if="owned >= 1" label small class="px-2">{{ owned }}</v-chip>
    </template>
  </div>
</template>

<script>
import { MINUTES_PER_DAY, MINUTES_PER_HOUR } from '../../../js/constants';
export default {
  data: () => ({
    cropTypeIcon: {
      vegetable: 'mdi-carrot',
      berry: 'mdi-fruit-grapes',
      grain: 'mdi-barley',
      flower: 'mdi-flower',
    }
  }),
  props: {
    item: {
      type: Object,
      required: true
    },
    isSimple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    type() {
      return this.item.name.split('_')[0];
    },
    name() {
      return this.item.name.split('_')[1];
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'lighten-2' : 'darken-1';
    },
    colorText() {
      return this.item.color + '--text text--' + this.themeModifier;
    },
    colorIcon() {
      return this.item.color ? (this.item.color + ' ' + this.themeModifier) : null;
    },
    crop() {
      if (this.type !== 'crop') {
        return null;
      }
      return this.$store.state.farm.crop[this.name];
    },
    cropGeneStats() {
      if (this.type !== 'crop') {
        return null;
      }
      return this.$store.getters['farm/cropGeneStats'](this.name);
    },
    cropGrow() {
      if (this.type !== 'crop') {
        return 0;
      }
      return this.$store.getters['mult/get'](
        'farmGrow',
        this.crop.grow + this.cropGeneStats.mult.farmGrow.baseValue,
        this.cropGeneStats.mult.farmGrow.multValue
      );
    },
    expNeeded() {
      if (this.type !== 'crop') {
        return Infinity;
      }
      return this.$store.getters['farm/expNeeded'](this.name);
    },
    canSeeExp() {
      return this.$store.state.unlock.farmCropExp.see;
    },
    isHighestLevel() {
      return this.type === 'crop' && this.crop.level >= this.crop.levelMax;
    },
    building() {
      if (this.type !== 'building') {
        return null;
      }
      return this.$store.state.farm.building[this.name];
    },
    premium() {
      if (this.type !== 'building') {
        return 0;
      }
      return this.building.maxPremium - this.building.cachePremium;
    },
    owned() {
      if (this.type !== 'building') {
        return 0;
      }
      return this.building.max - this.building.cacheAmount - this.premium;
    },
    growTimeColor() {
      if (this.type !== 'crop') {
        return 'grey';
      }
      if (this.cropGrow <= (MINUTES_PER_HOUR * 2)) {
        return 'green';
      }
      if (this.cropGrow <= (MINUTES_PER_HOUR * 4)) {
        return 'light-green';
      }
      if (this.cropGrow <= (MINUTES_PER_HOUR * 8)) {
        return 'yellow';
      }
      if (this.cropGrow <= (MINUTES_PER_HOUR * 16)) {
        return 'amber';
      }
      if (this.cropGrow <= (MINUTES_PER_DAY)) {
        return 'orange';
      }
      if (this.cropGrow <= (MINUTES_PER_DAY * 1 + MINUTES_PER_HOUR * 12)) {
        return 'orange-red';
      }
      if (this.cropGrow <= (MINUTES_PER_DAY * 2)) {
        return 'red';
      }
      if (this.cropGrow <= (MINUTES_PER_DAY * 3)) {
        return 'pink';
      }
      if (this.cropGrow <= (MINUTES_PER_DAY * 4)) {
        return 'pink-purple';
      }
      if (this.cropGrow <= (MINUTES_PER_DAY * 7)) {
        return 'purple';
      }
      return 'deep-purple';
    }
  }
}
</script>
