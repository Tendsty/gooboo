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
.mr-05 {
  margin-right: 2px;
}
</style>

<template>
  <div class="d-flex flex-column justify-space-between" style="height: 100%">
    <div class="d-flex justify-center align-center" :class="{'crop-headline-small mt-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}" v-if="isGrown">
      <v-icon :size="$vuetify.breakpoint.smAndDown ? 10 : 16">mdi-basket</v-icon>
      <span class="stage-text-small ml-1">{{ $formatNum(grow * 100) }}%</span>
    </div>
    <div :class="{'crop-headline-small': $vuetify.breakpoint.smAndDown}" v-else>
      <span>{{ $formatTime(Math.ceil(60 * (1 - item.grow) / item.cache.grow)) }}</span>
    </div>
    <v-icon :size="iconSize" :color="crop.color">{{ crop.icon }}</v-icon>
    <v-progress-linear :class="{'rounded-b': $vuetify.breakpoint.smAndDown, 'rounded-b-lg': $vuetify.breakpoint.mdAndUp}" :height="$vuetify.breakpoint.smAndDown ? 4 : 12" :color="isGrown ? 'green' : 'light-green'" :value="grow * 100"></v-progress-linear>
    <div class="crop-symbol-bar" :class="{'crop-symbol-bar-small': $vuetify.breakpoint.smAndDown}">
      <v-icon :size="buildingIconSize" v-if="item.cache.sprinkler" class="mr-05">mdi-sprinkler-variant</v-icon>
      <v-icon :size="buildingIconSize" v-if="item.cache.lectern" class="mr-05">mdi-book-open-page-variant</v-icon>
      <v-icon :size="buildingIconSize" v-if="item.cache.pinwheelSource" class="mr-05">mdi-pinwheel</v-icon>
      <v-icon :size="buildingIconSize" v-if="item.cache.flag" class="mr-05">mdi-flag</v-icon>
      <v-icon :size="buildingIconSize" v-if="item.cache.gnome" class="mr-05">mdi-human-child</v-icon>
      <v-icon :size="buildingIconSize" v-if="item.cache.lonely" class="mr-05">mdi-circle-expand</v-icon>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    crop() {
      return this.$store.state.farm.crop[this.item.crop];
    },
    grow() {
      return this.item.grow;
    },
    isGrown() {
      return this.grow >= 1;
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
    }
  }
}
</script>
