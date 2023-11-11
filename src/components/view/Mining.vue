<template>
  <div v-if="$vuetify.breakpoint.xlOnly">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#mine"><tab-icon-text :text="$vuetify.lang.t('$vuetify.mining.mine')" icon="mdi-pickaxe"></tab-icon-text></v-tab>
      <v-tab href="#dweller" v-if="unlock.miningDepthDweller.see"><tab-icon-text :text="$vuetify.lang.t('$vuetify.mining.depthDweller')" icon="mdi-elevator-down"></tab-icon-text></v-tab>
    </v-tabs>
    <v-row v-if="tab === 'mine'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <status></status>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <inventory></inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="mining" :subfeature="subfeature" :requirementStat="upgradeStat" key="mining-regular"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'dweller'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <prestige-status></prestige-status>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="mining" type="prestige" :requirementStat="upgradePrestigeStat" key="mining-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#mine"><tab-icon-text :text="$vuetify.lang.t('$vuetify.mining.mine')" icon="mdi-pickaxe"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#dweller" v-if="unlock.miningDepthDweller.see"><tab-icon-text :text="$vuetify.lang.t('$vuetify.mining.depthDweller')" icon="mdi-elevator-down"></tab-icon-text></v-tab>
    </v-tabs>
    <status class="scroll-container-tab" v-if="tab === 'mine'"></status>
    <v-row v-else-if="tab === 'upgrades'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <inventory></inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="mining" :subfeature="subfeature" :requirementStat="upgradeStat" key="mining-regular"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'dweller'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-status></prestige-status>
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="mining" type="prestige" :requirementStat="upgradePrestigeStat" key="mining-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-tabs class="mobile-tabs" v-model="tab" grow show-arrows>
      <v-tab href="#mine"><tab-icon-text :text="$vuetify.lang.t('$vuetify.mining.mine')" icon="mdi-pickaxe"></tab-icon-text></v-tab>
      <v-tab href="#inventory"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#dweller" v-if="unlock.miningDepthDweller.see"><tab-icon-text :text="$vuetify.lang.t('$vuetify.mining.depthDweller')" icon="mdi-elevator-down"></tab-icon-text></v-tab>
      <v-tab href="#upgradesPrestige" v-if="unlock.miningDepthDweller.see"><tab-icon-text name="upgradesPrestige"></tab-icon-text></v-tab>
    </v-tabs>
    <status v-if="tab === 'mine'"></status>
    <inventory v-else-if="tab === 'inventory'"></inventory>
    <upgrade-list v-else-if="tab === 'upgrades'" feature="mining" :subfeature="subfeature" :requirementStat="upgradeStat" key="mining-regular"></upgrade-list>
    <div v-else-if="tab === 'dweller'">
      <prestige-status></prestige-status>
      <prestige-inventory></prestige-inventory>
    </div>
    <upgrade-list v-else-if="tab === 'upgradesPrestige'" feature="mining" type="prestige" :requirementStat="upgradePrestigeStat" key="mining-prestige"></upgrade-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Inventory from '../partial/mining/Inventory.vue';
import PrestigeInventory from '../partial/mining/PrestigeInventory.vue';
import PrestigeStatus from '../partial/mining/PrestigeStatus.vue';
import Status from '../partial/mining/Status.vue';
import TabIconText from '../partial/render/TabIconText.vue';
import UpgradeList from '../render/UpgradeList.vue';

export default {
  components: { UpgradeList, Inventory, Status, PrestigeStatus, PrestigeInventory, TabIconText },
  data: () => ({
    tab: 'mine'
  }),
  computed: {
    ...mapState({
      unlock: state => state.unlock,
      subfeature: state => state.system.features.mining.currentSubfeature
    }),
    upgradeStat() {
      return ['mining_maxDepth' + this.subfeature];
    },
    upgradePrestigeStat() {
      let arr = ['mining_depthDwellerCap0'];
      if (this.unlock.miningGasSubfeature.see) {
        arr.push('mining_depthDwellerCap1');
      }
      return arr;
    }
  }
}
</script>
