<style scoped>
.effect-name {
  font-size: 14px;
}
</style>

<template>
  <div class="d-flex align-center w-100">
    <v-icon small class="mr-1">{{ featureIcon }}</v-icon>
    <mult-name class="effect-name" :name="mult"></mult-name>
    <v-spacer></v-spacer>
    <div class="effect-name ml-2">{{ scalingIcon }}{{ $formatNum(effectPower, true) }}</div>
  </div>
</template>

<script>
import MultName from '../../render/MultName.vue';

export default {
  components: { MultName },
  props: {
    mult: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    treasureObj: {
      type: Object,
      required: true
    }
  },
  computed: {
    featureIcon() {
      return this.$store.state.system.features[this.$store.state.treasure.effect[this.mult].feature].icon;
    },
    effectPower() {
      return this.$store.getters['treasure/effectValue'](this.mult, this.treasureObj.tier, this.treasureObj.level, this.$store.state.treasure.type[this.treasureObj.type].slots[this.index].power) + 1;
    },
    scalingIcon() {
      return this.$store.state.treasure.effect[this.mult].scaling === 'divisive' ? '/' : 'x';
    }
  }
}
</script>
