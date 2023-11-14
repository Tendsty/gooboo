<template>
  <div>
    <div class="d-flex justify-center flex-wrap ma-1">
      <currency class="ma-1" name="village_offering"></currency>
    </div>
    <div class="ma-2 mt-1">
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear rounded height="24" :value="offeringGen * 100" v-bind="attrs" v-on="on">
            <span v-if="timeLeft === null">-</span>
            <span v-else>{{ $formatTime(timeLeft) }}</span>
          </v-progress-linear>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.village.offering.autoGen', $formatNum(offeringAmount)) }}</div>
      </gb-tooltip>
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
      offeringGen: state => state.village.offeringGen,
      offeringAmount: state => state.stat.village_offeringAmount.value
    }),
    timeLeft() {
      const gain = this.$store.getters['village/offeringPerSecond'];
      return gain > 0 ? Math.ceil((1 - this.offeringGen) / gain) : null;
    }
  }
}
</script>
