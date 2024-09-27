<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <div class="mx-auto" style="max-width: 640px;">
      <div class="text-center mt-12" style="font-size: 150%;">{{ $vuetify.lang.t('$vuetify.reset.feature') }}</div>
      <alert-text class="mx-2 mt-12" type="error">{{ $vuetify.lang.t('$vuetify.reset.warning') }}</alert-text>
      <div class="d-flex align-center ma-1 mt-4">
        <div class="d-flex flex-column flex-grow-1">
          <v-select data-cy="reset-progress-feature" class="ma-1" outlined hide-details item-text="name" item-value="name" :items="resetFeatures" v-model="featureSelected" :label="$vuetify.lang.t('$vuetify.gooboo.feature')">
            <template v-slot:selection="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${item.name}`) }}</template>
            <template v-slot:item="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${item.name}`) }}</template>
          </v-select>
        </div>
        <v-btn :disabled="!featureSelected" color="primary" class="ma-1" @click="reset">{{ $vuetify.lang.t('$vuetify.gooboo.reset') }}</v-btn>
      </div>
      <div class="text-center mt-12">{{ $vuetify.lang.t('$vuetify.reset.deleteSave') }}</div>
      <div class="d-flex justify-center align-center ma-1 mt-4">
        <v-btn x-large color="error" @click="resetAll">{{ $vuetify.lang.t('$vuetify.reset.deleteButton') }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AlertText from '../partial/render/AlertText.vue';

export default {
  components: { AlertText },
  data: () => ({
    featureSelected: null,
  }),
  computed: {
    ...mapState({
      unlock: state => state.unlock
    }),
    ...mapGetters({
      mainFeatures: 'system/mainFeatures'
    }),
    resetFeatures() {
      let arr = [...this.mainFeatures];
      if (this.unlock.schoolFeature.use) {
        arr.push({...this.$store.state.system.features.school, name: 'school'});
      }
      return arr;
    },
    isMainFeature() {
      const feat = this.resetFeatures.find(elem => elem.name === this.featureSelected);
      return feat ? feat.main : false;
    }
  },
  methods: {
    resetAll() {
      this.$store.commit('system/updateKey', {key: 'confirm', value: {
        type: 'resetAll'
      }});
    },
    reset() {
      this.$store.commit('system/updateKey', {key: 'confirm', value: {
        type: 'reset',
        feature: this.featureSelected
      }});
    }
  }
}
</script>
