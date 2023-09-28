<style scoped>
.category-header {
  font-size: 20px;
}
.patch-icon {
  opacity: 0.25;
}
</style>

<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="d-flex justify-space-between align-center flex-wrap">
        <span class="d-flex align-center">
          <gb-tooltip :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-if="versionType === 'major'" color="amber" class="mr-2" v-bind="attrs" v-on="on">mdi-trophy</v-icon>
              <v-icon v-else-if="versionType === 'minor'" class="mr-2" v-bind="attrs" v-on="on">mdi-star</v-icon>
              <v-icon v-else class="mr-2 patch-icon" v-bind="attrs" v-on="on">mdi-bandage</v-icon>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.patchnote.versionType.${ versionType }`) }}</div>
          </gb-tooltip>
          <span>{{ version }}</span>
          <template v-if="versionType !== 'patch'">
            <v-icon>mdi-circle-small</v-icon>
            <span>{{ $vuetify.lang.t(`$vuetify.patchnote.v.${version.slice(0, -2)}`) }}</span>
          </template>
        </span>
        <span class="text-right mr-2">{{ $vuetify.lang.t(`$vuetify.patchnote.releasedOn`) }} {{ dayDisplay }}</span>
      </span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="bg-tile-default rounded elevation-1 pa-4" v-for="(items, category, index) in contentDisplay" :key="category" :class="{'mt-6': index > 0}">
        <div class="category-header d-flex">
          <v-icon class="mr-2">{{ features[category.split('_')[0]] ? features[category.split('_')[0]].icon : 'mdi-earth' }}</v-icon>
          {{ category.split('_').length > 1 ? $vuetify.lang.t(`$vuetify.subfeature.${category.split('_')[0]}.${category.split('_')[1]}`) : $vuetify.lang.t(`$vuetify.feature.${category}`) }}
        </div>
        <ul class="mt-2">
          <li v-for="(item, key) in items" :key="key">
            <patchnote-item :item="item" :class="{'mt-1': key > 0}"></patchnote-item>
          </li>
        </ul>
      </div>
      <ul class="mt-4" v-if="hiddenCount > 0"><li>{{ $vuetify.lang.t(`$vuetify.patchnote.changeCount`, hiddenCount) }}</li></ul>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapState } from 'vuex';
import PatchnoteItem from './PatchnoteItem.vue';

const semverMinor = require('semver/functions/minor');
const semverPatch = require('semver/functions/patch');

export default {
  components: { PatchnoteItem },
  props: {
    version: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      features: state => state.system.features,
      unlock: state => state.unlock
    }),
    dayDisplay() {
      return (new Date(`${this.day}T00:00:00`)).toLocaleDateString([this.$store.state.system.settings.general.items.lang.value, 'default'], {year: 'numeric', month: 'long', day: 'numeric'});
    },
    contentDisplay() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.content)) {
        const keySplit = key.split('_');
        const feature = keySplit[0];
        const subfeature = keySplit.length > 1 ? parseInt(keySplit[1]) : 0;
        const unlock = this.features[feature] ? (subfeature > 0 ? this.features[feature].subfeatures[subfeature - 1] : this.features[feature].unlock) : null;
        if (unlock === null || this.unlock[unlock].see) {
          const itemList = elem.filter(el => el.unlock === undefined || this.unlock[el.unlock].see);
          if (itemList.length > 0) {
            obj[key] = itemList;
          }
        }
      }
      return obj;
    },
    changeCount() {
      let count = 0;
      for (const [, elem] of Object.entries(this.content)) {
        count += elem.length;
      }
      return count;
    },
    hiddenCount() {
      let count = this.changeCount;
      for (const [, elem] of Object.entries(this.contentDisplay)) {
        count -= elem.length;
      }
      return count;
    },
    versionType() {
      if (semverPatch(this.version) > 0) {
        return 'patch';
      } else if (semverMinor(this.version) > 0) {
        return 'minor';
      } else {
        return 'major';
      }
    }
  }
}
</script>
