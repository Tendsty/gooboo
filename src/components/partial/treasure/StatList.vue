<style scoped>
.unowned-treasure-bonus {
  opacity: 0.25;
}
.treasure-owned-number {
  width: 20px;
  height: 20px;
}
.treasure-owned-number > span {
  font-size: 12px;
  opacity: 0.6;
}
</style>

<template>
  <div class="ma-2 pa-2">
    <h3 class="text-center mb-2">{{ $vuetify.lang.t('$vuetify.treasure.effectSummary') }}</h3>
    <div v-for="(item, key) in effectSummary" :key="key">
      <div class="d-flex justify-center align-center ma-1"><v-icon class="mr-2">{{ features[key].icon }}</v-icon>{{ $vuetify.lang.t(`$vuetify.feature.${key}`) }}</div>
      <gb-tooltip v-for="(subitem, subkey) in item" :key="key + '-' + subkey" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on" :class="{'unowned-treasure-bonus': subitem.value === 1}">
            <v-icon small class="mr-2 balloon-text-black" :color="tierColor[subitem.minTier]">{{ typeIcon[subitem.type] }}</v-icon>
            <div class="d-flex justify-center align-center bg-tile-default rounded-circle treasure-owned-number mr-2"><span>{{ $formatInt(subitem.owned) }}</span></div>
            <display-row class="flex-grow-1" :name="subkey" type="mult" :after="subitem.value"></display-row>
          </div>
        </template>
        <div v-if="subitem.max === null" class="mt-0">{{ $vuetify.lang.t('$vuetify.treasure.effectOwned', $formatInt(subitem.owned)) }}</div>
        <div v-else class="mt-0">{{ $vuetify.lang.t('$vuetify.treasure.effectMax', $formatInt(subitem.max), $formatInt(subitem.owned)) }}</div>
        <div v-if="subitem.minTier > 0">{{ $vuetify.lang.t('$vuetify.treasure.effectMinTier', $formatInt(subitem.minTier + 1)) }}</div>
      </gb-tooltip>
    </div>
    <div>
      <div class="d-flex justify-center align-center ma-1"><v-icon class="mr-2">mdi-earth</v-icon>{{ $vuetify.lang.t('$vuetify.treasure.specialGroup') }}</div>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.eventPower')" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on" :class="{'unowned-treasure-bonus': eventPowerCache <= 0}">
            <v-icon small class="mr-2 balloon-text-black">{{ features.event.icon }}</v-icon>
            <div class="d-flex align-center flex-grow-1">
              <div class="flex-grow-1">{{ $vuetify.lang.t('$vuetify.mult.eventPower') }}:</div>
              <div class="pl-1">{{ $formatInt(Math.min(eventPowerCache, maxEventPower)) }} / {{ $formatInt(maxEventPower) }}</div>
            </div>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.treasure.eventPowerDescription') }}</div>
        <div v-if="eventPowerCache > 0">{{ $vuetify.lang.t('$vuetify.treasure.eventPowerEffect', $formatNum(eventPowerPrestigeMult, true)) }}</div>
        <alert-text v-if="eventPowerCache > maxEventPower" type="info">{{ $vuetify.lang.t('$vuetify.treasure.eventPowerOvercap', $formatInt(eventPowerCache - maxEventPower)) }}</alert-text>
      </gb-tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, AlertText },
  data: () => ({
    typeIcon: {
      regular: 'mdi-square-rounded',
      prestige: 'mdi-star',
      special: 'mdi-creation',
    }
  }),
  computed: {
    ...mapState({
      unlock: state => state.unlock,
      features: state => state.system.features,
      effectCache: state => state.treasure.effectCache,
      eventPowerCache: state => state.treasure.eventPowerCache,
      tierColor: state => state.treasure.tierColor,
    }),
    ...mapGetters({
      maxEventPower: 'treasure/maxEventPower',
      eventPowerPrestigeMult: 'treasure/eventPowerPrestigeMult',
    }),
    effectSummary() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.$store.getters['treasure/visibleEffect'])) {
        if (obj[elem.feature] === undefined) {
          obj[elem.feature] = {};
        }
        obj[elem.feature][key] = {
          owned: (this.effectCache[key] !== undefined) ? this.effectCache[key].owned : 0,
          value: (this.effectCache[key] !== undefined) ? this.effectCache[key].value : 1,
          type: elem.type,
          minTier: elem.minTier,
          max: elem.max,
        };
      }
      return obj;
    }
  }
}
</script>
