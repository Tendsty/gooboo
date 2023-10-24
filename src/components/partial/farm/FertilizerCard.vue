<template>
  <div>
    <alert-text v-if="consumable.price === null" class="my-1" type="warning">{{ $vuetify.lang.t(`$vuetify.farm.fertilizerCannotBeBought`) }}</alert-text>
    <alert-text v-if="fertilizer.type !== 'all'" class="my-1" type="warning">{{ $vuetify.lang.t(`$vuetify.farm.fertilizerEffect.${fertilizer.type}`) }}</alert-text>
    <div v-for="(item, key) in fertilizer.effect" :key="'effect-' + key" :class="{
      'success--text': key === 'farmGrow' ? item < 1 : item > 1,
      'error--text': key === 'farmGrow' ? item > 1 : item < 1,
      'text--lighten-2': $vuetify.theme.dark,
      'text--darken-2': !$vuetify.theme.dark
    }">{{ $vuetify.lang.t(`$vuetify.mult.${key}`) }} {{ (item > 0 && item < 1) ? ('/' + $formatNum(1 / item, true)) : ('x' + $formatNum(item, true)) }}</div>
  </div>
</template>

<script>
import AlertText from '../render/AlertText.vue';

export default {
  components: { AlertText },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    fertilizer() {
      return this.$store.state.farm.fertilizer[this.name];
    },
    consumable() {
      return this.$store.state.consumable[`farm_${this.name}`];
    }
  }
}
</script>
