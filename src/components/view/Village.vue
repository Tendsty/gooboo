<template>
  <div v-if="$vuetify.breakpoint.xlOnly">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#village"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.village')" icon="mdi-home-group"></tab-icon-text></v-tab>
      <v-tab href="#offering" v-if="canSeeOffering"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.offering.name')" icon="mdi-candle"></tab-icon-text></v-tab>
      <v-tab href="#policies" v-if="canSeePolicies"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.policy.name')" icon="mdi-script-text"></tab-icon-text></v-tab>
      <v-tab href="#pray" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.pray')" icon="mdi-hands-pray"></tab-icon-text></v-tab>
    </v-tabs>
    <v-row v-if="tab === 'village'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <resources></resources>
      </v-col>
      <v-col v-if="subfeature === 0" class="scroll-container-tab" cols="3">
        <job-list></job-list>
      </v-col>
      <v-col v-if="subfeature === 1" class="scroll-container-tab" cols="6">
        <crafting-list></crafting-list>
      </v-col>
      <v-col v-if="subfeature === 0" class="scroll-container-tab" cols="3">
        <upgrade-queue feature="village" type="building" :disabled="isFrozen"></upgrade-queue>
        <building-stat-bar></building-stat-bar>
        <upgrade-list feature="village" type="building" key="village-building"></upgrade-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="village" key="village-regular" :subfeature="subfeature"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'offering'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <offering-inventory></offering-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="9">
        <offering-list :cols="4"></offering-list>
      </v-col>
    </v-row>
    <policy-list v-else-if="tab === 'policies'"></policy-list>
    <v-row v-else-if="tab === 'pray'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <prestige-status></prestige-status>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="village" type="prestige" :requirementCustom="upgradeNextRequired" key="village-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#village"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.village')" icon="mdi-home-group"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#offering" v-if="canSeeOffering"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.offering.name')" icon="mdi-candle"></tab-icon-text></v-tab>
      <v-tab href="#policies" v-if="canSeePolicies"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.policy.name')" icon="mdi-script-text"></tab-icon-text></v-tab>
      <v-tab href="#pray" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.pray')" icon="mdi-hands-pray"></tab-icon-text></v-tab>
    </v-tabs>
    <v-row v-if="tab === 'village'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <resources></resources>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <job-list v-if="subfeature === 0"></job-list>
        <crafting-list v-else-if="subfeature === 1"></crafting-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'upgrades'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <template v-if="subfeature === 0">
          <upgrade-queue feature="village" type="building" :disabled="isFrozen"></upgrade-queue>
          <building-stat-bar></building-stat-bar>
          <upgrade-list feature="village" type="building" key="village-building"></upgrade-list>
        </template>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="village" key="village-regular" :subfeature="subfeature"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'offering'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <offering-inventory></offering-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <offering-list></offering-list>
      </v-col>
    </v-row>
    <policy-list v-else-if="tab === 'policies'"></policy-list>
    <v-row v-else-if="tab === 'pray'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-status></prestige-status>
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="village" type="prestige" :requirementCustom="upgradeNextRequired" key="village-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-tabs class="mobile-tabs" v-model="tab" grow show-arrows>
      <v-tab href="#village"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.village')" icon="mdi-home-group"></tab-icon-text></v-tab>
      <v-tab v-if="subfeature === 0" href="#jobs"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.job.name')" icon="mdi-account-hard-hat"></tab-icon-text></v-tab>
      <v-tab v-else-if="subfeature === 1" href="#crafting"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.job.name')" icon="mdi-hammer"></tab-icon-text></v-tab>
      <v-tab v-if="subfeature === 0" href="#buildings"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.buildings')" icon="mdi-hammer"></tab-icon-text></v-tab>
      <v-tab href="#upgrades" v-if="canSeeUpgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#offering" v-if="canSeeOffering"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.offering.name')" icon="mdi-candle"></tab-icon-text></v-tab>
      <v-tab href="#policies" v-if="canSeePolicies"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.policy.name')" icon="mdi-script-text"></tab-icon-text></v-tab>
      <v-tab href="#pray" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.village.pray')" icon="mdi-hands-pray"></tab-icon-text></v-tab>
      <v-tab href="#upgradesPrestige" v-if="canPrestige"><tab-icon-text name="upgradesPrestige"></tab-icon-text></v-tab>
    </v-tabs>
    <resources v-if="tab === 'village'"></resources>
    <job-list v-else-if="tab === 'jobs'"></job-list>
    <crafting-list v-else-if="tab === 'crafting'"></crafting-list>
    <div v-else-if="tab === 'buildings'">
      <upgrade-queue feature="village" type="building" :disabled="isFrozen"></upgrade-queue>
      <building-stat-bar></building-stat-bar>
      <upgrade-list feature="village" type="building" key="village-building"></upgrade-list>
    </div>
    <upgrade-list v-else-if="tab === 'upgrades'" feature="village" key="village-regular" :subfeature="subfeature"></upgrade-list>
    <policy-list v-else-if="tab === 'policies'"></policy-list>
    <div v-else-if="tab === 'offering'" no-gutters>
      <offering-inventory></offering-inventory>
      <offering-list></offering-list>
    </div>
    <div v-else-if="tab === 'pray'">
      <prestige-status></prestige-status>
      <prestige-inventory></prestige-inventory>
    </div>
    <upgrade-list v-else-if="tab === 'upgradesPrestige'" feature="village" type="prestige" :requirementCustom="upgradeNextRequired" key="village-prestige"></upgrade-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TabIconText from '../partial/render/TabIconText.vue';
import BuildingStatBar from '../partial/village/BuildingStatBar.vue';
import CraftingList from '../partial/village/CraftingList.vue';
import JobList from '../partial/village/JobList.vue';
import OfferingInventory from '../partial/village/OfferingInventory.vue';
import OfferingList from '../partial/village/OfferingList.vue';
import PolicyList from '../partial/village/PolicyList.vue';
import PrestigeInventory from '../partial/village/PrestigeInventory.vue';
import PrestigeStatus from '../partial/village/PrestigeStatus.vue';
import Resources from '../partial/village/Resources.vue';
import UpgradeList from '../render/UpgradeList.vue';
import UpgradeQueue from '../render/UpgradeQueue.vue';

export default {
  components: { UpgradeList, Resources, JobList, PrestigeStatus, PrestigeInventory, UpgradeQueue, OfferingInventory, OfferingList, PolicyList, TabIconText, BuildingStatBar, CraftingList },
  data: () => ({
    tab: 'village'
  }),
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.village.active,
      subfeature: state => state.system.features.village.currentSubfeature
    }),
    canSeeUpgrades() {
      return this.$store.state.unlock.villageCoinUpgrades.see;
    },
    canPrestige() {
      return this.$store.state.unlock.villagePrestige.see;
    },
    canSeeOffering() {
      return this.subfeature === 0 && this.$store.state.unlock.villageOffering1.see;
    },
    canSeePolicies() {
      return this.subfeature === 0 && this.$store.getters['mult/get']('villagePolicyTaxes') >= 1;
    },
    upgradeNextRequired() {
      const nextBuild = ['campfire', 'communityCenter', 'townHall', 'localGovernment', 'government', 'steamEngine', 'ecoCouncil'].find(build => {
        return this.$store.state.upgrade.item[`village_${build}`].highestLevel < 1;
      });
      return nextBuild ? [{value: 1, text:
        this.$vuetify.lang.t('$vuetify.upgrade.keyset.building.nextRequirement') +
        this.$vuetify.lang.t(`$vuetify.upgrade.village_${nextBuild}`) + ' ' +
        this.$vuetify.lang.t('$vuetify.gooboo.levelSuffix') + ' 1'
      }] : [];
    }
  }
}
</script>
