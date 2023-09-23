<style scoped>
.unowned-treasure-bonus {
  opacity: 0.25;
}
</style>

<template>
  <div class="ma-2 pa-2">
    <h3 class="text-center mb-2">{{ $vuetify.lang.t(`$vuetify.treasure.effectSummary`) }}</h3>
    <div v-for="(item, key) in effectSummary" :key="key">
      <div class="ma-1 text-center"><v-icon class="mr-2">{{ features[key].icon }}</v-icon>{{ $vuetify.lang.t(`$vuetify.feature.${key}`) }}</div>
      <display-row v-for="(subitem, subkey) in item" :key="key + '-' + subkey" :class="{'unowned-treasure-bonus': subitem.value === 1}" :name="subkey" type="mult" :after="subitem.value" :show-star="subitem.special"></display-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  computed: {
    ...mapState({
      unlock: state => state.unlock,
      features: state => state.system.features,
      effectList: state => state.treasure.effect,
      effectCache: state => state.treasure.effectCache
    }),
    effectSummary() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.effectList)) {
        if (key === 'mining' || this.unlock[`${key}Feature`].see) {
          obj[key] = {};
          for (const [subkey, subelem] of Object.entries(elem)) {
            if ((subelem.unlock === null || this.unlock[subelem.unlock].see) && (subelem.type !== 'special' || this.unlock.treasureSpecialEffect.see)) {
              obj[key][subkey] = {value: (this.effectCache[key] !== undefined && this.effectCache[key][subkey] !== undefined) ? this.effectCache[key][subkey] : 1, special: subelem.type === 'special'};
            }
          }
        }
      }
      return obj;
    }
  }
}
</script>
