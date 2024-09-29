<template>
  <span>
    <span v-if="!hidePrefix">{{ ['mult', 'summerFestivalBuildingMult'].includes(type) ? (isDividing ? '/' : 'x') : (value >= 0 ? '+' : '') }}</span>
    <span v-if="['mult', 'summerFestivalBuildingMult'].includes(type)">{{ $formatNum(isDividing ? (1 / value) : value, true) }}</span>
    <span v-else-if="display === 'percent'">{{ $formatNum(baseValue * 100, true) }}%</span>
    <span v-else-if="display === 'time'">{{ $formatTime(value) }}</span>
    <span v-else-if="display === 'timeMs'">{{ $formatTime(value, 'ms') }}</span>
    <span v-else-if="display === 'perSecond'">{{ $formatNum(baseValue, !round) }}/s</span>
    <span v-else-if="display === 'perHour'">{{ $formatNum(baseValue, !round) }}/h</span>
    <span v-else-if="display === 'temperature'">{{ $formatNum(baseValue, !round) }}°C</span>
    <span v-else-if="display === 'mult'">{{ $formatNum(baseValue, !round) }}x</span>
    <span v-else>{{ $formatNum(baseValue, !round) }}</span>
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
      if (this.type === 'hordeActive' || this.type === 'hordeActiveCrit') {
        return ['revive', 'divisionShield'].includes(this.mult) ? 'number' : (['stun', 'silence'].includes(this.mult) ? 'time' : 'percent');
      } else if (this.type === 'hordeCooldown' || this.type === 'hordeBuff') {
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
    },
    roundNearZero() {
      return this.multItem && this.multItem.roundNearZero;
    },
    baseValue() {
      return (this.roundNearZero && this.value < 0.000000001 && this.value > -0.000000001) ? 0 : this.value;
    }
  }
}
</script>
