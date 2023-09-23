<template>
  <v-row v-if="$vuetify.breakpoint.xlOnly" no-gutters>
    <v-col class="scroll-container" cols="6">
      <field-bar></field-bar>
      <field class="mx-auto"></field>
    </v-col>
    <v-col class="scroll-container" cols="3">
      <inventory></inventory>
    </v-col>
    <v-col class="scroll-container" cols="3">
      <upgrade-list feature="farm" :requirementCustom="upgradeNextRequired" key="farm-regular"></upgrade-list>
    </v-col>
  </v-row>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#farm"><tab-icon-text :text="$vuetify.lang.t('$vuetify.farm.farm')" icon="mdi-barn"></tab-icon-text></v-tab>
      <v-tab href="#inventory"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
    </v-tabs>
    <div v-if="tab === 'farm'" class="scroll-container-tab">
      <field-bar></field-bar>
      <field class="mx-auto"></field>
    </div>
    <div v-else-if="tab === 'inventory'">
      <v-row no-gutters>
        <v-col class="scroll-container-tab" cols="6">
          <inventory></inventory>
        </v-col>
        <v-col class="scroll-container-tab" cols="6">
          <upgrade-list feature="farm" :requirementCustom="upgradeNextRequired" key="farm-regular"></upgrade-list>
        </v-col>
      </v-row>
    </div>
  </div>
  <div v-else>
    <v-tabs class="mobile-tabs" v-model="tab" grow show-arrows>
      <v-tab href="#farm"><tab-icon-text :text="$vuetify.lang.t('$vuetify.farm.farm')" icon="mdi-barn"></tab-icon-text></v-tab>
      <v-tab href="#inventory"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
    </v-tabs>
    <div v-if="tab === 'farm'">
      <field-bar></field-bar>
      <field class="mx-auto"></field>
    </div>
    <inventory v-else-if="tab === 'inventory'"></inventory>
    <upgrade-list v-else-if="tab === 'upgrades'" feature="farm" :requirementCustom="upgradeNextRequired" key="farm-regular"></upgrade-list>
  </div>
</template>

<script>
import Field from '../partial/farm/Field.vue';
import FieldBar from '../partial/farm/FieldBar.vue';
import Inventory from '../partial/farm/Inventory.vue';
import TabIconText from '../partial/render/TabIconText.vue';
import UpgradeList from '../render/UpgradeList.vue';

export default {
  components: { UpgradeList, Field, FieldBar, Inventory, TabIconText },
  data: () => ({
    tab: 'farm'
  }),
  computed: {
    upgradeNextRequired() {
      const stat = this.$store.state.upgrade.item.farm_seedBox.highestLevel;
      let next = null;
      [...this.$store.state.upgrade.cache.farm_0_regular].forEach(elem => {
        const upgrade = this.$store.state.upgrade.item[elem];
        if (upgrade.requirementValue !== null && upgrade.requirementStat === 'farm_seedBox' && stat < upgrade.requirementValue && (next === null || upgrade.requirementValue < next)) {
          next = upgrade.requirementValue;
        }
      });
      return next !== null ? [{value: next, text:
        this.$vuetify.lang.t('$vuetify.upgrade.keyset.default.nextRequirement') +
        this.$vuetify.lang.t('$vuetify.upgrade.farm_seedBox') + ' ' +
        this.$vuetify.lang.t('$vuetify.gooboo.levelSuffix') + ' ' + this.$formatNum(next)
      }] : [];
    }
  }
}
</script>
