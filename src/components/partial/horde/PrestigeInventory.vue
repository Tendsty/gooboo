<template>
  <inventory-template :currencies="currencies" :prestige-stones="prestigeStone" :disabled="isFrozen">
    <heirloom-list></heirloom-list>
  </inventory-template>
</template>

<script>
import { mapState } from 'vuex';
import InventoryTemplate from '../prestige/InventoryTemplate.vue';
import HeirloomList from './HeirloomList.vue';

export default {
  components: { InventoryTemplate, HeirloomList },
  data: () => ({
    currencies: ['horde_soulEmpowered', 'horde_crown', 'horde_courage']
  }),
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.horde.active
    }),
    prestigeStone() {
      let arr = [];
      if (this.$store.state.stat.horde_maxZone.total >= 40) {
        arr.push({currency: 'horde_soulEmpowered', stat: 'horde_bestPrestige0'});
      }
      if (this.$store.state.unlock.hordeAreaMonkeyJungle.see) {
        arr.push({currency: 'horde_courage', stat: 'horde_bestPrestige1'});
      }
      return arr;
    }
  }
}
</script>
