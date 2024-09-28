<template>
  <status-template feature="village" :prestigeGain="prestigeGain"></status-template>
</template>

<script>
import { mapState } from 'vuex';
import StatusTemplate from '../prestige/StatusTemplate.vue';

export default {
  components: { StatusTemplate },
  computed: {
    ...mapState({
      subfeature: state => state.system.features.village.currentSubfeature
    }),
    prestigeGain() {
      let obj = {};
      switch (this.subfeature) {
        case 0: {
          const val = this.$store.state.currency.village_faith.value;
          if (val > 0) {
            obj.village_blessing = {total: val, showDescription: true};
          }
          break;
        }
        case 1: {
          const val = this.$store.getters['village/sharesGain'];
          if (val > 0) {
            obj.village_shares = {total: val, showDescription: true};
          }
          break;
        }
      }
      return obj;
    }
  }
}
</script>
