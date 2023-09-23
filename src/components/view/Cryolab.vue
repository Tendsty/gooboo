<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <div class="d-flex justify-center ma-2">
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.cryolabMaxFeatures`)">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.cryolab.frozen', currentFrozen, maxFrozen) }}</span>
        </template>
        <stat-breakdown name="cryolabMaxFeatures"></stat-breakdown>
      </gb-tooltip>
    </div>
    <v-row class="ma-1" no-gutters>
      <v-col v-for="feature in features" :key="`feature-${ feature }`" cols="12" md="6" xl="3">
        <lab-feature class="ma-1" :name="feature"></lab-feature>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LabFeature from '../partial/cryolab/LabFeature.vue';
import StatBreakdown from '../render/StatBreakdown.vue';

export default {
  components: { LabFeature, StatBreakdown },
  computed: {
    ...mapGetters({
      currentFrozen: 'cryolab/currentFrozen'
    }),
    features() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.cryolab)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push(key);
        }
      }
      return arr;
    },
    maxFrozen() {
      return this.$store.getters['mult/get']('cryolabMaxFeatures');
    }
  }
}
</script>
