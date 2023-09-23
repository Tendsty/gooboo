<template>
  <bingo v-if="type === 'bingo'"></bingo>
  <wheel-of-fortune v-else-if="type === 'wheelOfFortune'"></wheel-of-fortune>
</template>

<script>
import { mapState } from 'vuex';
import Bingo from './Bingo.vue';
import WheelOfFortune from './WheelOfFortune.vue';

export default {
  components: { Bingo, WheelOfFortune },
  computed: {
    ...mapState({
      type: state => state.event.casino_type
    })
  }
}
</script>
