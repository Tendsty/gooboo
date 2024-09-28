<template>
  <div v-if="$vuetify.breakpoint.xlOnly">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#gallery"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.gallery')" icon="mdi-image-frame"></tab-icon-text></v-tab>
      <v-tab href="#shapes" v-if="canSeeShapes"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.shapes.name')" icon="mdi-shape-plus"></tab-icon-text></v-tab>
      <v-tab href="#auction" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.auction')" icon="mdi-gavel"></tab-icon-text></v-tab>
    </v-tabs>
    <v-row v-if="tab === 'gallery'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <idea-list></idea-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <inventory></inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="gallery" :requirementCustom="upgradeNextRequired" key="gallery-regular"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-if="tab === 'shapes'" no-gutters>
      <v-col class="scroll-container-tab" cols="9">
        <shape-minigame></shape-minigame>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="gallery" type="shape" key="gallery-shape"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'auction'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <prestige-status></prestige-status>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="gallery" type="prestige" :requirementCustom="upgradeNextRequired" key="gallery-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#gallery"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.gallery')" icon="mdi-image-frame"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#shapes" v-if="canSeeShapes"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.shapes.name')" icon="mdi-shape-plus"></tab-icon-text></v-tab>
      <v-tab href="#upgradesShapes" v-if="canSeeShapes"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.shapes.upgrades')" icon="mdi-arrow-up-bold-circle"></tab-icon-text></v-tab>
      <v-tab href="#auction" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.auction')" icon="mdi-gavel"></tab-icon-text></v-tab>
    </v-tabs>
    <idea-list class="scroll-container-tab" v-if="tab === 'gallery'"></idea-list>
    <v-row v-else-if="tab === 'upgrades'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <inventory></inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="gallery" :requirementCustom="upgradeNextRequired" key="gallery-regular"></upgrade-list>
      </v-col>
    </v-row>
    <shape-minigame v-else-if="tab === 'shapes'" class="scroll-container-tab"></shape-minigame>
    <upgrade-list v-else-if="tab === 'upgradesShapes'" class="scroll-container-tab" feature="gallery" type="shape" key="gallery-shape"></upgrade-list>
    <v-row v-else-if="tab === 'auction'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <prestige-status></prestige-status>
        <prestige-inventory></prestige-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="gallery" type="prestige" :requirementCustom="upgradeNextRequired" key="gallery-prestige"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-tabs class="mobile-tabs" v-model="tab" grow show-arrows>
      <v-tab href="#gallery"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.gallery')" icon="mdi-image-frame"></tab-icon-text></v-tab>
      <v-tab href="#inventory"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#upgrades"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#shapes" v-if="canSeeShapes"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.shapes.name')" icon="mdi-shape-plus"></tab-icon-text></v-tab>
      <v-tab href="#upgradesShapes" v-if="canSeeShapes"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.shapes.upgrades')" icon="mdi-arrow-up-bold-circle"></tab-icon-text></v-tab>
      <v-tab href="#auction" v-if="canPrestige"><tab-icon-text :text="$vuetify.lang.t('$vuetify.gallery.auction')" icon="mdi-gavel"></tab-icon-text></v-tab>
      <v-tab href="#upgradesPrestige" v-if="canPrestige"><tab-icon-text name="upgradesPrestige"></tab-icon-text></v-tab>
    </v-tabs>
    <idea-list v-if="tab === 'gallery'"></idea-list>
    <inventory v-else-if="tab === 'inventory'"></inventory>
    <upgrade-list v-else-if="tab === 'upgrades'" feature="gallery" :requirementCustom="upgradeNextRequired" key="gallery-regular"></upgrade-list>
    <shape-minigame v-else-if="tab === 'shapes'"></shape-minigame>
    <upgrade-list v-else-if="tab === 'upgradesShapes'" feature="gallery" type="shape" key="gallery-shape"></upgrade-list>
    <div v-else-if="tab === 'auction'">
      <prestige-status></prestige-status>
      <prestige-inventory></prestige-inventory>
    </div>
    <upgrade-list v-else-if="tab === 'upgradesPrestige'" feature="gallery" type="prestige" :requirementCustom="upgradeNextRequired" key="gallery-prestige"></upgrade-list>
  </div>
</template>

<script>
import IdeaList from '../partial/gallery/IdeaList.vue';
import Inventory from '../partial/gallery/Inventory.vue';
import PrestigeInventory from '../partial/gallery/PrestigeInventory.vue';
import PrestigeStatus from '../partial/gallery/PrestigeStatus.vue';
import ShapeMinigame from '../partial/gallery/ShapeMinigame.vue';
import TabIconText from '../partial/render/TabIconText.vue';
import UpgradeList from '../render/UpgradeList.vue';

export default {
  components: { UpgradeList, Inventory, PrestigeStatus, PrestigeInventory, IdeaList, TabIconText, ShapeMinigame },
  data: () => ({
    tab: 'gallery'
  }),
  computed: {
    canPrestige() {
      return this.$store.state.unlock.galleryAuction.see;
    },
    canSeeShapes() {
      return this.$store.state.unlock.galleryShape.see;
    },
    upgradeNextRequired() {
      const nextColor = this.$store.state.gallery.color.findIndex(color => {
        return this.$store.state.stat[`gallery_${color}`].total <= 0;
      });
      return nextColor ? [{value: nextColor + 1, text:
        this.$vuetify.lang.t('$vuetify.upgrade.keyset.default.nextRequirement') +
        this.$vuetify.lang.t('$vuetify.gallery.colorSuffix') + ' #' +
        (nextColor + 1)
      }] : [];
    }
  }
}
</script>
