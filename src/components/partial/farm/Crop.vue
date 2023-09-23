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
</style>

<template>
  <div class="d-flex flex-column justify-space-between" style="height: 100%">
    <div class="d-flex justify-center align-center" :class="{'crop-headline-small mt-1': $vuetify.breakpoint.smAndDown, 'ma-1': $vuetify.breakpoint.mdAndUp}" v-if="stageData.stage > 0">
      <v-icon :size="$vuetify.breakpoint.smAndDown ? 10 : 16">mdi-basket</v-icon>
      <v-icon :size="$vuetify.breakpoint.smAndDown ? 8 : 12" class="mx-1-sm" v-if="stageData.stage > 1">mdi-close</v-icon>
      <span class="stage-text-small" v-if="stageData.stage > 1">{{ stageData.stage }}</span>
    </div>
    <div :class="{'crop-headline-small': $vuetify.breakpoint.smAndDown}" v-else>
      <span>{{ $formatTime(60 * (item.growMax - item.grow), 'm') }}</span>
    </div>
    <v-icon :size="iconSize" :color="crop.color">{{ crop.icon }}</v-icon>
    <v-progress-linear :class="{'rounded-b': $vuetify.breakpoint.smAndDown, 'rounded-b-lg': $vuetify.breakpoint.smAndUp}" :height="$vuetify.breakpoint.xsOnly ? 4 : 12" :color="stageData.stage ? 'green' : 'light-green'" :value="stageData.percent"></v-progress-linear>
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
    stageData() {
      if (this.item.grow < this.item.growMax) {
        return {stage: 0, percent: 100 * this.item.grow / this.item.growMax};
      }
      const overgrow = this.$store.getters['farm/cropOvergrow'](this.item.crop);
      if (overgrow !== null) {
        let stage = 0;
        let max = this.item.growMax;
        let oldMax = this.item.growMax;
        while (this.item.grow >= max) {
          stage++;
          oldMax = max;
          max += Math.pow(overgrow, stage) * this.item.growMax;
        }
        return {stage, percent: 100 * (this.item.grow - Math.ceil(oldMax)) / (Math.ceil(max) - Math.ceil(oldMax))};
      }
      return {stage: 1, percent: 100};
    },
    iconSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.stageData.stage > 0 ? 20 : 12;
      }
      return this.stageData.stage > 0 ? 40 : 24;
    }
  }
}
</script>
