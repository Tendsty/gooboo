<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">{{ $vuetify.lang.t(`$vuetify.message.prize.get`) }}</v-card-title>
    <v-card-subtitle v-if="bingoTier > 0" class="text-center pa-0 mt-n2 mb-2">{{ $vuetify.lang.t(`$vuetify.message.prize.bingo${ bingoTier }`) }}</v-card-subtitle>
    <v-card-text class="pa-0">
      <prize :pool="message.pool" :prizeBase="message.value"></prize>
    </v-card-text>
  </v-card>
</template>

<script>
import Prize from '../event/Prize.vue';

export default {
  components: { Prize },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    bingoTier() {
      return this.message.pool.slice(0, 5) !== 'bingo' ? 0 : Math.max(0, parseInt(this.message.pool.slice(5)) - 1);
    }
  }
}
</script>
