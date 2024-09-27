<template>
  <status-template feature="gallery" :prestigeGain="prestigeGain"></status-template>
</template>

<script>
import { mapGetters } from 'vuex';
import StatusTemplate from '../prestige/StatusTemplate.vue';

export default {
  components: { StatusTemplate },
  computed: {
    ...mapGetters({
      prestigeGainBase: 'gallery/prestigeGain'
    }),
    prestigeGain() {
      return this.prestigeGainBase > 0 ? {gallery_cash: {
        base: this.$store.getters['gallery/prestigeGainBase'],
        total: this.prestigeGainBase,
        gainMult: 'currencyGalleryCashGain',
        showDescription: true,
      }} : {};
    }
  }
}
</script>
