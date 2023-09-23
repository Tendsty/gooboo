<template>
  <div v-if="canSee">
    <div class="d-flex justify-center ma-2">
      <currency name="gallery_inspiration" :customPercent="inspirationPercent">
        <span>{{ $vuetify.lang.t(`$vuetify.gallery.nextInspiration.0`) }}</span>
        <currency-icon name="gallery_inspiration"></currency-icon>
        <span>{{ $vuetify.lang.t(`$vuetify.gallery.nextInspiration.1`) }}</span>
        <span>{{ $formatTime(nextInspirationTime) }}</span>
      </currency>
    </div>
    <div v-for="(content, tier) in ideas" :key="tier" class="d-flex flex-wrap justify-center align-center bg-tile-default rounded ma-2 pa-1 elevation-2">
      <idea-item v-for="(item, key) in content" :key="tier + '-' + key" class="ma-1" :name="item" :disabled="isFrozen"></idea-item>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Currency from '../../render/Currency.vue';
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import IdeaItem from './IdeaItem.vue';

export default {
  components: { Currency, IdeaItem, CurrencyIcon },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.gallery.active
    }),
    inspirationPercent() {
      return 100 * this.$store.state.gallery.inspirationTime / this.$store.getters['gallery/inspirationTimeNeededCurrent'];
    },
    ideas() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.gallery.idea)) {
        if (elem.owned) {
          while (arr.length < elem.tier) {
            arr.push([]);
          }
          arr[elem.tier - 1].push(key);
        }
      }
      return arr;
    },
    canSee() {
      return this.$store.state.unlock.galleryInspiration.see;
    },
    nextInspirationTime() {
      return this.$store.getters['gallery/inspirationTimeNeeded'](this.$store.state.gallery.inspirationAmount) - this.$store.state.gallery.inspirationTime;
    }
  }
}
</script>
