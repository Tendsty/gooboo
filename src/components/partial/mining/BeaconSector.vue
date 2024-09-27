<style scoped>
.beacon-sector {
  border: 1px solid white;
  max-width: 480px;
}
.beacon-cell {
  width: 10%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  height: 24px;
}
.cursor-pointer {
  cursor: pointer;
}
.disabled-cell {
  opacity: 0.75;
}
</style>

<template>
  <div>
    <div class="text-center ma-2">
      <v-btn icon :disabled="page <= 0" @click="sectorPrev"><v-icon>mdi-step-backward</v-icon></v-btn>
      <span class="mx-1">{{ page * 100 + 1 }}m - {{ page * 100 + 100 }}m</span>
      <v-btn icon :disabled="page >= maxPage" @click="sectorNext"><v-icon>mdi-step-forward</v-icon></v-btn>
    </div>
    <div class="d-flex flex-wrap beacon-sector bg-tile-default mx-auto">
      <div v-for="item in cells" class="beacon-cell" :key="`cell-${ item.depth }`" :class="{'cursor-pointer': !item.disabled}" @click="!item.disabled && selectDepth(item)">
        <v-icon size="10" :color="item.color" :class="{'disabled-cell': item.disabled, 'mr-1': $vuetify.breakpoint.smAndUp}">{{ item.icon }}</v-icon>
        <div :class="[item.colorText, {'font-weight-bold': item.depth === depth, 'disabled-cell': item.disabled}]">{{ item.depth }}</div>
      </div>
    </div>
    <div v-if="selectedDepth !== null" class="ma-2">
      <div class="d-flex justify-center align-center">
        <span>{{ selectedDepth.depth }}m</span>
        <v-icon class="mx-1">mdi-circle-small</v-icon>
        <span v-if="selectedDepth.beaconEffect">{{ $vuetify.lang.t(`$vuetify.mining.beacon.${ selectedDepth.beaconEffect }`) }}</span>
        <span v-else>{{ $vuetify.lang.t('$vuetify.mining.beacon.noBeacon') }}</span>
      </div>
      <div v-if="selectedDepth.anomaly" class="d-flex align-center mt-2">
        <v-icon size="16" class="mr-1">{{ selectedDepth.icon }}</v-icon>
        <span>{{ $vuetify.lang.t('$vuetify.mining.anomaly.name') }}: {{ $vuetify.lang.t(`$vuetify.mining.anomaly.${ selectedDepth.anomaly }`) }}</span>
      </div>
      <div v-if="selectedDepth.beacon" class="d-flex justify-center mt-2">
        <gb-tooltip key="beacon-remove">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn color="error" :disabled="isFrozen || beaconCooldown > 0" @click="removeBeacon">{{ $vuetify.lang.t('$vuetify.mining.beacon.remove') }}</v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.mining.beacon.removeDescription') }}</div>
          <alert-text v-if="beaconCooldown > 0" type="error">{{ $vuetify.lang.t('$vuetify.mining.beacon.removeCooldown', $formatTime(beaconCooldown)) }}</alert-text>
        </gb-tooltip>
      </div>
      <div v-else-if="beaconList.length > 0" class="d-flex align-center mt-2">
        <v-select class="mr-2" outlined dense hide-details item-value="name" v-model="selectedBeacon" :items="beaconList">
          <template v-slot:selection="{ item }"><span :class="`${ item.color }--text`">{{ item.owned }}x {{ $vuetify.lang.t(`$vuetify.mining.beacon.${ item.name }`) }}</span></template>
          <template v-slot:item="{ item }"><span :class="`${ item.color }--text`">{{ item.owned }}x {{ $vuetify.lang.t(`$vuetify.mining.beacon.${ item.name }`) }}</span></template>
        </v-select>
        <gb-tooltip key="beacon-place" :title-text="$vuetify.lang.t(`$vuetify.mining.beacon.${ selectedBeacon ? selectedBeacon : 'noBeacon' }`)" :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn color="primary" :disabled="isFrozen || !canPlaceBeacon" @click="placeBeacon">{{ $vuetify.lang.t('$vuetify.mining.beacon.place') }}</v-btn>
            </div>
          </template>
          <div v-if="!selectedBeacon" class="mt-0">{{ $vuetify.lang.t('$vuetify.mining.beacon.selectToPlace') }}</div>
          <display-row class="mt-0" v-for="(effect, key) in selectedBeaconEffect" :key="`effect-beacon-${ key }`" :type="effect.type" :name="effect.name" :after="effect.value"></display-row>
        </gb-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { AlertText, DisplayRow },
  data: () => ({
    page: 0,
    selectedDepth: null,
    selectedBeacon: null,
  }),
  mounted() {
    this.page = Math.ceil(this.depth / 100) - 1;
  },
  computed: {
    ...mapState({
      beacon: state => state.mining.beacon,
      beaconPlaced: state => state.mining.beaconPlaced,
      depth: state => state.mining.depth,
      beaconCooldown: state => state.mining.beaconCooldown,
      isFrozen: state => state.cryolab.mining.active,
    }),
    maxTotalDepth() {
      return this.$store.state.stat[`mining_maxDepth0`].total;
    },
    maxPage() {
      return Math.ceil(this.maxTotalDepth / 100) - 1;
    },
    cells() {
      let arr = [];
      for (let i = 0; i < 100; i++) {
        const depth = this.page * 100 + i + 1;
        let icon = 'mdi-circle-small';
        let color = undefined;
        let anomaly = null;
        if (depth >= 300 && depth % 10 === 0) {
          icon = 'mdi-shield';
          anomaly = 'toughness';
        }
        const beacon = this.beaconPlaced[depth] ?? null;
        const beaconEffect = this.$store.getters['mining/depthBeacon'](depth);
        if (beaconEffect) {
          color = this.beacon[beaconEffect].color;
        }
        const disabled = depth > this.maxTotalDepth;
        if (disabled) {
          icon = 'mdi-help';
          color = 'grey';
        }
        const colorAddition = (!disabled && beaconEffect && beacon !== beaconEffect) ? (this.$vuetify.theme.dark ? 'lighten-3' : 'darken-3') : null;
        arr.push({depth, icon, beacon, beaconEffect, color: color + (colorAddition ? ` ${ colorAddition }` : ''), colorText: `${ color }--text` + (colorAddition ? ` text--${ colorAddition }` : ''), anomaly, disabled});
      }
      return arr;
    },
    beaconList() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.beacon)) {
        const owned = this.$store.getters['mining/beaconOwned'](key);
        if (owned >= 1) {
          arr.push({...elem, owned, name: key});
        }
      }
      return arr;
    },
    canPlaceBeacon() {
      return this.selectedBeacon !== null && this.selectedDepth !== null;
    },
    selectedBeaconEffect() {
      if (this.selectedBeacon) {
        const beacon = this.beacon[this.selectedBeacon];
        return beacon.effect.map(effect => {
          return {...effect, value: effect.value(beacon.level)};
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    sectorPrev() {
      this.page--;
    },
    sectorNext() {
      this.page++;
    },
    selectDepth(obj) {
      if (this.selectedDepth && this.selectedDepth.depth === obj.depth) {
        this.selectedDepth = null;
      } else {
        this.selectedDepth = obj;
      }
    },
    placeBeacon() {
      this.$store.dispatch('mining/placeBeacon', {beacon: this.selectedBeacon, depth: this.selectedDepth.depth});
      this.selectedDepth.beacon = this.selectedBeacon;
      this.selectedDepth.beaconEffect = this.selectedBeacon;
      this.selectedBeacon = null;
    },
    removeBeacon() {
      this.$store.dispatch('mining/removeBeacon', this.selectedDepth.depth);
      this.selectedDepth.beacon = null;
      this.selectedDepth.beaconEffect = null;
    }
  }
}
</script>
