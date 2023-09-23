<template>
  <div v-if="$vuetify.breakpoint.xlOnly">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#horde"><tab-icon-text :text="$vuetify.lang.t('$vuetify.horde.horde')" icon="mdi-account-group"></tab-icon-text></v-tab>
      <v-tab href="#souls" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.horde.souls')" icon="mdi-ghost"></tab-icon-text></v-tab>
    </v-tabs>
    <v-row v-if="tab === 'horde'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <status></status>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <item-list v-if="canUseItems"></item-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="horde" :requirementStat="['horde_maxZone']" key="horde-regular"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'souls'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <prestige-status></prestige-status>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="horde" type="prestige" :requirementStat="['horde_maxZone']" key="horde-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#horde"><tab-icon-text :text="$vuetify.lang.t('$vuetify.horde.horde')" icon="mdi-account-group"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#souls" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.horde.souls')" icon="mdi-ghost"></tab-icon-text></v-tab>
    </v-tabs>
    <status class="scroll-container-tab" v-if="tab === 'horde'"></status>
    <v-row v-else-if="tab === 'upgrades'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <item-list v-if="canUseItems"></item-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="horde" :requirementStat="['horde_maxZone']" key="horde-regular"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'souls'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-status></prestige-status>
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="horde" type="prestige" :requirementStat="['horde_maxZone']" key="horde-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-tabs class="mobile-tabs" v-model="tab" grow show-arrows>
      <v-tab href="#horde"><tab-icon-text :text="$vuetify.lang.t('$vuetify.horde.horde')" icon="mdi-account-group"></tab-icon-text></v-tab>
      <v-tab href="#items" v-if="canUseItems"><tab-icon-text :text="$vuetify.lang.t('$vuetify.horde.items.name')" icon="mdi-bag-personal"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#souls" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.horde.souls')" icon="mdi-ghost"></tab-icon-text></v-tab>
      <v-tab href="#upgradesPrestige" v-if="canPrestige"><tab-icon-text name="upgradesPrestige"></tab-icon-text></v-tab>
    </v-tabs>
    <status v-if="tab === 'horde'"></status>
    <item-list v-else-if="tab === 'items'"></item-list>
    <upgrade-list v-else-if="tab === 'upgrades'" feature="horde" :requirementStat="['horde_maxZone']" key="horde-regular"></upgrade-list>
    <div v-else-if="tab === 'souls'">
      <prestige-status></prestige-status>
      <prestige-inventory></prestige-inventory>
    </div>
    <upgrade-list v-else-if="tab === 'upgradesPrestige'" feature="horde" type="prestige" :requirementStat="['horde_maxZone']" key="horde-prestige"></upgrade-list>
  </div>
</template>

<script>
import ItemList from '../partial/horde/ItemList.vue';
import UpgradeList from '../render/UpgradeList.vue';
import Status from '../partial/horde/Status.vue';
import PrestigeStatus from '../partial/horde/PrestigeStatus.vue';
import PrestigeInventory from '../partial/horde/PrestigeInventory.vue';
import TabIconText from '../partial/render/TabIconText.vue';

export default {
  components: { UpgradeList, ItemList, Status, PrestigeStatus, PrestigeInventory, TabIconText },
  data: () => ({
    tab: 'horde'
  }),
  computed: {
    canUseItems() {
      return this.$store.state.unlock.hordeItems.use;
    },
    canPrestige() {
      return this.$store.state.unlock.hordePrestige.use;
    }
  }
}
</script>
