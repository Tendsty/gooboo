<template>
  <inventory-template :currencies="currencies" :prestige-stones="prestigeStone" :disabled="isFrozen"></inventory-template>
</template>

<script>
import { mapState } from 'vuex';
import InventoryTemplate from '../prestige/InventoryTemplate.vue';

export default {
  components: { InventoryTemplate },
  data: () => ({
    currencies: ['village_blessing']
  }),
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.village.active
    }),
    prestigeStone() {
      let arr = [];
      if (this.$store.state.unlock.villageBuildings4.see) {
        arr.push({currency: 'village_blessing', stat: 'village_bestPrestige'});
      }
      return arr;
    }
  }
}
</script>
