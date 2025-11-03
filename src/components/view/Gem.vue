<style scoped>
.diamond-forge {
  font-size: 32px;
}
</style>

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
      <v-progress-linear class="balloon-text-dynamic my-2 rounded" height="24" :value="genPercentSecondary">{{ $formatTime(timeToNextSecondary) }}</v-progress-linear>
      <div v-if="canSeeAchievement" class="text-center">{{ $vuetify.lang.t('$vuetify.gem.newGemsTimeAchievementSecondary', $formatNum(genSpeedIncreaseSecondary, true), $formatNum(totalAchievements), $formatNum(genSpeedIncreaseTotalSecondary, true), $formatTime(genSpeedBase), $formatTime(timeNeededSecondary)) }}</div>
      <div v-else class="text-center">{{ $vuetify.lang.t('$vuetify.gem.newGemsTimeSecondary', $formatTime(timeNeededSecondary)) }}</div>
      <template v-if="canSeeDiamond">
        <v-progress-linear class="balloon-text-dynamic mt-10 mb-2 rounded" color="cyan" height="24" :value="genPercentDiamond">{{ $formatTime(timeToNextDiamond) }}</v-progress-linear>
        <div class="text-center">{{ $vuetify.lang.t('$vuetify.gem.newDiamondTime', $formatTime(timeNeededDiamond)) }}</div>
      </template>
    </v-col>
    <v-col cols="12" md="6" lg="3" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
      <div class="d-flex align-center" style="min-height: 72px;">
        <div class="ma-2 flex-grow-1 diamond-forge text-center" :class="premiumGlowName" v-if="showDiamondForge">{{ $vuetify.lang.t('$vuetify.gem.diamondForge')}}</div>
        <v-select v-else data-cy="gem-upgrade-feature" class="ma-2" outlined hide-details item-text="name" item-value="name" :items="gemShopFeatures" v-model="featureShop" :label="$vuetify.lang.t('$vuetify.gooboo.feature')">
          <template v-slot:selection="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${item.name}`) }}</template>
          <template v-slot:item="{ item }">{{ $vuetify.lang.t(`$vuetify.feature.${item.name}`) }}</template>
        </v-select>
        <v-btn v-if="canSeeDiamondForge" class="ma-2 ml-0" color="cyan" icon @click="showDiamondForge = !showDiamondForge"><v-icon>mdi-anvil</v-icon></v-btn>
      </div>
      <diamond-forge v-if="showDiamondForge"></diamond-forge>
      <upgrade-list v-else :feature="featureShop" type="premium" :key="featureShop + '-premium'" no-tabs></upgrade-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { GEM_SPEED_BASE, GEM_SPEED_DIAMOND_BASE, GEM_SPEED_PRIMARY_PER_ACHIEVEMENT, GEM_SPEED_SECONDARY_PER_ACHIEVEMENT } from '../../js/constants';
import DiamondForge from '../partial/gem/DiamondForge.vue';
import GemList from '../partial/gem/GemList.vue';
import UpgradeList from '../render/UpgradeList.vue';

export default {
  components: { UpgradeList, GemList, DiamondForge },
  data: () => ({
    gems: ['ruby', 'emerald', 'sapphire', 'amethyst', 'topaz', 'diamond', 'onyx'],
    featureShop: 'mining',
    showDiamondForge: false,
  }),
  computed: {
    ...mapGetters({
      mainFeatures: 'system/mainFeatures'
    }),
    gemShopFeatures() {
      let arr = [...this.mainFeatures];
      if (this.$store.state.unlock.schoolLibrarySubfeature.use) {
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
      return GEM_SPEED_BASE / this.$store.getters['gem/genSpeedPrimary'];
    },
    timeNeededSecondary() {
      return GEM_SPEED_BASE / this.$store.getters['gem/genSpeedSecondary'];
    },
    timeToNext() {
      return Math.ceil((1 - this.$store.state.gem.progressPrimary) * this.timeNeeded);
    },
    genPercent() {
      return 100 * this.$store.state.gem.progressPrimary;
    },
    timeToNextSecondary() {
      return Math.ceil((1 - this.$store.state.gem.progressSecondary) * this.timeNeededSecondary);
    },
    genPercentSecondary() {
      return 100 * this.$store.state.gem.progressSecondary;
    },
    genSpeedBase() {
      return GEM_SPEED_BASE;
    },
    genSpeedIncrease() {
      return GEM_SPEED_PRIMARY_PER_ACHIEVEMENT * 100;
    },
    genSpeedIncreaseSecondary() {
      return GEM_SPEED_SECONDARY_PER_ACHIEVEMENT * 100;
    },
    totalAchievements() {
      return this.$store.getters['achievement/totalLevel'];
    },
    genSpeedIncreaseTotal() {
      return GEM_SPEED_PRIMARY_PER_ACHIEVEMENT * 100 * this.totalAchievements;
    },
    genSpeedIncreaseTotalSecondary() {
      return GEM_SPEED_SECONDARY_PER_ACHIEVEMENT * 100 * this.totalAchievements;
    },
    timeNeededDiamond() {
      return GEM_SPEED_DIAMOND_BASE;
    },
    timeToNextDiamond() {
      return Math.ceil((1 - this.$store.state.gem.progressDiamond) * this.timeNeededDiamond);
    },
    genPercentDiamond() {
      return 100 * this.$store.state.gem.progressDiamond;
    },
    canSeeAchievement() {
      return this.$store.state.unlock.achievementFeature.see;
    },
    canSeeDiamond() {
      return this.$store.state.unlock.gemDiamond.see;
    },
    premiumGlowName() {
      return `premium-${ this.$store.state.system.settings.performance.items.cssAnimations.value ? 'glow' : 'frame' }-2-text`;
    },
    canSeeDiamondForge() {
      return this.$store.state.unlock.gemDiamond.see;
    }
  }
}
</script>
