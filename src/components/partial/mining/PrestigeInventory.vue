<template>
  <inventory-template :currencies="currencies" :prestige-stones="prestigeStone" :disabled="isFrozen"></inventory-template>
</template>

<script>
import { mapState } from 'vuex';
import InventoryTemplate from '../prestige/InventoryTemplate.vue';

export default {
  components: { InventoryTemplate },
  data: () => ({
    currencies: ['mining_crystalGreen', 'mining_crystalYellow', 'mining_ember', 'mining_helium', 'mining_neon', 'mining_argon', 'mining_krypton', 'mining_xenon', 'mining_radon']
  }),
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.mining.active
    }),
    prestigeStone() {
      let arr = [];
      if (this.$store.state.stat.mining_depthDwellerCap0.total >= 10) {
        arr.push({currency: 'mining_crystalGreen', stat: 'mining_bestPrestige0'});
      }
      if (this.$store.state.stat.mining_depthDwellerCap1.total >= 10) {
        arr.push({currency: 'mining_crystalYellow', stat: 'mining_bestPrestige1'});
      }
      return arr;
    }
  }
}
</script>
