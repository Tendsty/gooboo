<template>
  <div>
    <v-select class="ma-2" outlined hide-details item-text="name" item-value="name" :items="mainFeatures" v-model="featureShop" :label="$vuetify.lang.t('$vuetify.gooboo.feature')">
      <template v-slot:selection="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${ item.name }`) }}</template>
      <template v-slot:item="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${ item.name }`) }}</template>
    </v-select>
    <upgrade-list :feature="featureShop" type="book" :key="featureShop + '-book'" no-tabs></upgrade-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UpgradeList from '../../render/UpgradeList.vue';

export default {
  components: { UpgradeList },
  data: () => ({
    featureShop: 'mining'
  }),
  computed: {
    ...mapGetters({
      mainFeatures: 'system/mainFeatures'
    })
  },
}
</script>
