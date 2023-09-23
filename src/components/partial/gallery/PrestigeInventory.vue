<template>
  <inventory-template :currencies="currencies" :prestige-stones="prestigeStone" :disabled="isFrozen"></inventory-template>
</template>

<script>
import { mapState } from 'vuex';
import InventoryTemplate from '../prestige/InventoryTemplate.vue';

export default {
  components: { InventoryTemplate },
  data: () => ({
    currencies: ['gallery_cash']
  }),
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.gallery.active
    }),
    prestigeStone() {
      let arr = [];
      if (this.$store.state.unlock.galleryDrums.see) {
        arr.push({currency: 'gallery_cash', stat: 'gallery_bestPrestige'});
      }
      return arr;
    }
  }
}
</script>
