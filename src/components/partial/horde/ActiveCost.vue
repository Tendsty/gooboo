<template>
  <div class="text-center">
    <v-icon small class="mr-1">mdi-timer</v-icon>
    <span>{{ $formatTime(Math.ceil(cooldown)) }}</span>
    <span v-if="cooldownLeft > 0">&nbsp;({{ $formatTime(Math.ceil(cooldownLeft)) }})</span>
    <span v-else-if="nextChargeTime !== null">&nbsp;({{ $formatTime(Math.round(nextChargeTime)) }})</span>
    <template v-if="cost.health !== undefined">
      <v-icon small class="mx-1">mdi-circle-small</v-icon>
      <v-icon small class="mr-1">mdi-heart</v-icon>
      <span>{{ $formatNum(cost.health, true) }}%</span>
    </template>
    <template v-if="cost.energy !== undefined">
      <v-icon small class="mx-1">mdi-circle-small</v-icon>
      <v-icon small class="mr-1">mdi-lightning-bolt</v-icon>
      <span>{{ $formatNum(cost.energy) }}</span>
    </template>
    <template v-if="cost.mana !== undefined">
      <v-icon small class="mx-1">mdi-circle-small</v-icon>
      <v-icon small class="mr-1">mdi-water</v-icon>
      <span>{{ $formatNum(cost.mana) }}</span>
    </template>
    <template v-if="cost.mysticalShard !== undefined">
      <v-icon small class="mx-1">mdi-circle-small</v-icon>
      <v-icon small class="mr-1">mdi-billiards-rack</v-icon>
      <span>{{ $formatNum(cost.mysticalShard) }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    cooldown: {
      type: Number,
      required: true
    },
    cooldownLeft: {
      type: Number,
      required: false,
      default: 0
    },
    nextChargeTime: {
      type: Number,
      required: false,
      default: null
    },
    cost: {
      type: Object,
      required: false,
      default: () => {return {};}
    }
  }
}
</script>
