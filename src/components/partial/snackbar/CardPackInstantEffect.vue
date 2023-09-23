<template>
  <span v-if="effectType === 'currency'">+{{ $formatNum(value) }} {{ $vuetify.lang.t(`$vuetify.currency.${effectName}.name`) }}</span>
  <span v-else-if="effectType === 'consumable'">+{{ $formatNum(value) }} {{ $vuetify.lang.t(`$vuetify.consumable.${effectName}.name`) }}</span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    effectType() {
      return this.name.split('_')[0];
    },
    effectName() {
      return this.name.slice(this.name.split('_')[0].length + 1);
    }
  }
}
</script>
