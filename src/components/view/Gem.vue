<template>
  <v-row no-gutters>
    <v-col cols="12" lg="6" v-if="$vuetify.breakpoint.smAndDown || $vuetify.breakpoint.lgAndUp" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
      <gem-list></gem-list>
    </v-col>
    <v-col class="px-2" cols="12" md="6" lg="3" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
      <gem-list v-if="$vuetify.breakpoint.mdOnly"></gem-list>
      <v-progress-linear class="balloon-text-dynamic my-2 rounded" height="24" :value="genPercent">{{ $formatTime(timeToNext) }}</v-progress-linear>
      <div v-if="canSeeAchievement" class="text-center">{{ $vuetify.lang.t('$vuetify.gem.newGemsTimeAchievement', $formatNum(genSpeedIncrease, true), $formatNum(totalAchievements), $formatNum(genSpeedIncreaseTotal, true), $formatTime(genSpeedBase), $formatTime(timeNeeded)) }}</div>
      <div v-else class="text-center">{{ $vuetify.lang.t('$vuetify.gem.newGemsTime', $formatTime(timeNeeded)) }}</div>
    </v-col>
    <v-col cols="12" md="6" lg="3" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
      <v-select data-cy="gem-upgrade-feature" class="ma-2" outlined hide-details item-text="name" item-value="name" :items="gemShopFeatures" v-model="featureShop" :label="$vuetify.lang.t('$vuetify.gooboo.feature')">
        <template v-slot:selection="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${item.name}`) }}</template>
        <template v-slot:item="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${item.name}`) }}</template>
      </v-select>
      <upgrade-list :feature="featureShop" type="premium" :key="featureShop + '-premium'" no-tabs></upgrade-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { GEM_SPEED_BASE, GEM_SPEED_PER_ACHIEVEMENT } from '../../js/constants';
import GemList from '../partial/gem/GemList.vue';
import UpgradeList from '../render/UpgradeList.vue';

export default {
  components: { UpgradeList, GemList },
  data: () => ({
    gems: ['ruby', 'emerald', 'sapphire', 'amethyst', 'topaz', 'diamond', 'onyx'],
    featureShop: 'mining'
  }),
  computed: {
    ...mapGetters({
      mainFeatures: 'system/mainFeatures'
    }),
    gemShopFeatures() {
      let arr = [...this.mainFeatures];
      if (this.$store.state.unlock.schoolFeature.use) {
        arr.push({...this.$store.state.system.features.school, name: 'school'});
      }
      if (this.$store.state.unlock.eventFeature.use) {
        arr.push({...this.$store.state.system.features.gem, name: 'gem'});
      }
      if (this.$store.state.unlock.treasureFeature.use) {
        arr.push({...this.$store.state.system.features.treasure, name: 'treasure'});
      }
      return arr;
    },
    timeNeeded() {
      return GEM_SPEED_BASE / this.$store.getters['gem/genSpeed'];
    },
    timeToNext() {
      return Math.ceil((1 - this.$store.state.gem.progress) * this.timeNeeded);
    },
    genPercent() {
      return 100 * this.$store.state.gem.progress;
    },
    genSpeedBase() {
      return GEM_SPEED_BASE;
    },
    genSpeedIncrease() {
      return GEM_SPEED_PER_ACHIEVEMENT * 100;
    },
    totalAchievements() {
      return this.$store.getters['achievement/totalLevel'];
    },
    genSpeedIncreaseTotal() {
      return GEM_SPEED_PER_ACHIEVEMENT * 100 * this.totalAchievements;
    },
    canSeeAchievement() {
      return this.$store.state.unlock.achievementFeature.see;
    }
  }
}
</script>
