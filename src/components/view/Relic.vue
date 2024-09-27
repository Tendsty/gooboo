<template>
  <div>
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#relics"><tab-icon-text :text="$vuetify.lang.t('$vuetify.relic.relics')" icon="mdi-ring"></tab-icon-text></v-tab>
      <v-tab href="#museum" v-if="canSeeMuseum"><tab-icon-text :text="$vuetify.lang.t('$vuetify.relic.museum')" icon="mdi-bank"></tab-icon-text></v-tab>
    </v-tabs>
    <relic-list v-if="tab === 'relics'" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container-tab' : ''"></relic-list>
    <museum-tab v-else-if="tab === 'museum'" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container-tab' : ''"></museum-tab>
  </div>
</template>

<script>
import MuseumTab from '../partial/relic/MuseumTab.vue';
import RelicList from '../partial/relic/RelicList.vue';
import TabIconText from '../partial/render/TabIconText.vue';

export default {
  components: { RelicList, TabIconText, MuseumTab },
  data: () => ({
    tab: 'relics'
  }),
  computed: {
    canSeeMuseum() {
      return false;
    }
  }
}
</script>
