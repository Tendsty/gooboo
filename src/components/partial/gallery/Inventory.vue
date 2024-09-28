<template>
  <div>
    <div v-if="canSeeDrums" class="d-flex justify-center align-center ma-1">
      <currency class="ma-1" name="gallery_package"></currency>
      <v-btn class="ma-1" color="primary" :disabled="!canOpenPackage || isFrozen" @click="openPackages">{{ $vuetify.lang.t(`$vuetify.gallery.openPackage`) }}</v-btn>
    </div>
    <color class="ma-2" name="beauty"></color>
    <color v-for="(color, key) in availableColors" :key="`color-${color}`" class="ma-2" :name="color" :disabled="isFrozen" :is-last="(key + 1) === availableColors.length"></color>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Currency from '../../render/Currency.vue';
import Color from './Color.vue';

export default {
  components: { Color, Currency },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.gallery.active
    }),
    ...mapGetters({
      availableColors: 'gallery/availableColors'
    }),
    canSeeDrums() {
      return this.$store.state.unlock.galleryDrums.see;
    },
    canOpenPackage() {
      return this.$store.state.currency.gallery_package.value >= 1;
    }
  },
  methods: {
    openPackages() {
      this.$store.dispatch('gallery/openPackages');
    }
  }
}
</script>
