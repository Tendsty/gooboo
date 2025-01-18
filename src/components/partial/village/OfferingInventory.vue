<template>
  <div>
    <div class="d-flex justify-center flex-wrap ma-1">
      <currency class="ma-1" name="village_offering"></currency>
    </div>
    <div class="ma-2 mt-1">
      <v-progress-linear rounded height="24" :value="offeringGen * 100">
        <span v-if="timeLeft === null">-</span>
        <span v-else>{{ $formatTime(timeLeft) }}</span>
      </v-progress-linear>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Currency from '../../render/Currency.vue';

export default {
  components: { Currency },
  computed: {
    ...mapState({
      offeringGen: state => state.village.offeringGen
    }),
    timeLeft() {
      const gain = this.$store.getters['village/offeringPerSecond'];
      return gain > 0 ? Math.ceil((1 - this.offeringGen) / gain) : null;
    }
  }
}
</script>
