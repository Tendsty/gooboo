<template>
  <div>
    <v-tabs :class="$vuetify.breakpoint.xsOnly ? 'mobile-tabs' : ''" v-model="tab" grow show-arrows>
      <v-tab v-for="item in achievementFeatures" :key="'name-' + item.name" :href="`#${item.name}`">
        <tab-icon-text :text="$vuetify.lang.t(`$vuetify.feature.${item.name}`)" :icon="item.icon"></tab-icon-text>
      </v-tab>
    </v-tabs>
    <v-row class="ma-1" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container-tab' : ''" no-gutters>
      <v-col v-for="item in list" :key="'item-' + item" cols="12" sm="6" md="4" lg="3" xl="2">
        <item class="ma-1" :name="item"></item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Item from '../partial/achievement/Item.vue'
import TabIconText from '../partial/render/TabIconText.vue';

export default {
  components: { Item, TabIconText },
  data: () => ({
    tab: 'meta'
  }),
  computed: {
    ...mapGetters({
      mainFeatures: 'system/mainFeatures'
    }),
    list() {
      return this.$store.getters['achievement/list'](this.tab);
    },
    achievementFeatures() {
      return [{name: 'meta', icon: 'mdi-earth'}, ...this.mainFeatures];
    },
  }
}
</script>
