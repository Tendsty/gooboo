<template>
  <span>
    <span v-if="!hidePrefix">{{ ['mult', 'summerFestivalBuildingMult'].includes(type) ? (isDividing ? '/' : 'x') : (value >= 0 ? '+' : '') }}</span>
    <span v-if="['mult', 'summerFestivalBuildingMult'].includes(type)">{{ $formatNum(isDividing ? (1 / value) : value, true) }}</span>
    <span v-else-if="display === 'percent'">{{ $formatNum(value * 100, true) }}%</span>
    <span v-else-if="display === 'time'">{{ $formatTime(value) }}</span>
    <span v-else-if="display === 'perSecond'">{{ $formatNum(value, !round) }}/s</span>
    <span v-else-if="display === 'perHour'">{{ $formatNum(value, !round) }}/h</span>
    <span v-else-if="display === 'temperature'">{{ $formatNum(value, !round) }}°C</span>
    <span v-else-if="display === 'mult'">{{ $formatNum(value, !round) }}x</span>
    <span v-else>{{ $formatNum(value, !round) }}</span>
    <span v-if="type === 'bonus' && !hideBonusStar">*</span>
  </span>
</template>

<script>
export default {
  props: {
    mult: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    hidePrefix: {
      type: Boolean,
      required: false,
      default: false
    },
    hideBonusStar: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    multItem() {
      return this.$store.state.mult.items[this.mult];
    },
    display() {
      if (this.type === 'hordeActive') {
        return ['stun', 'revive'].includes(this.mult) ? 'number' : 'percent';
      } else if (this.type === 'hordeCooldown') {
        return 'time';
      } else if (this.mult === 'pearlChance') {
        return 'percent';
      } else if (this.$store.getters['mult/isHeirloomEffect'](this.mult)) {
        return 'mult';
      }
      return ['villageJob', 'farmBuilding', 'farmTile'].includes(this.type) ? 'number' : (this.multItem ? this.multItem.display : 'number');
    },
    round() {
      return this.multItem && this.multItem.round;
    },
    isDividing() {
      return this.value > 0 && this.value < 1;
    }
  }
}
</script>
