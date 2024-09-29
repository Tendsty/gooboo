<style scoped>
.tower-btn {
  width: 220px;
}
.floor-unreached {
  opacity: 0.5;
}
</style>

<template>
  <div class="tower-btn bg-tile-default rounded elevation-2 ma-1 pa-1">
    <div class="text-center pa-1">
      {{ $vuetify.lang.t(`$vuetify.horde.tower.${ name }`) }}
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="px-2" small v-bind="attrs" v-on="on">~{{ zoneEstimation }}</v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.horde.tower.zoneDescription`, zoneEstimation, Math.round(tower.statBase), $formatNum(tower.statScaling, true)) }}</div>
      </gb-tooltip>
    </div>
    <div class="d-flex justify-space-between align-center">
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.horde.tower.floorTitle`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-1">mdi-trophy-award</v-icon>
            {{ tower.highest }}
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.tower.floorDescription`) }}</div>
        <div v-for="(reward, floor) in rewards" :key="`reward-${ floor }`" class="d-flex justify-space-between align-center" :class="{'floor-unreached': !reward.gained}">
          <span>{{ $vuetify.lang.t(`$vuetify.horde.tower.floor`, floor) }}:</span>
          <display-row :type="reward.type" :name="reward.name" :after="reward.value"></display-row>
        </div>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.horde.tower.rewardTitle`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-1">{{ crown.icon }}</v-icon>
            +{{ $formatNum(tower.crowns) }}
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.tower.rewardDescription1`, $formatNum(tower.crowns)) }}</div>
        <div>
          <span>{{ $vuetify.lang.t(`$vuetify.horde.tower.rewardDescription2`, heirloomFloors) }}</span>
          <v-icon
            v-for="heirloom in tower.heirlooms"
            :key="`heirloom-${ heirloom }`"
            class="ma-1"
            :class="`balloon-text-${ $vuetify.theme.dark ? 'white' : 'black' }`"
            :color="heirloomList[heirloom].color"
            small
          >{{ heirloomList[heirloom].icon }}</v-icon>
        </div>
      </gb-tooltip>
    </div>
    <div class="d-flex justify-center flex-wrap">
      <sigil v-for="sigilName in tower.sigils" :key="'sigil-' + sigilName" class="ma-1" :name="sigilName" :tier="1" small></sigil>
    </div>
    <div class="d-flex justify-center">
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" v-bind="attrs" v-on="on">
            <v-btn @click="enterTower" :disabled="isFrozen || !canEnter" small color="primary">{{ $vuetify.lang.t(`$vuetify.horde.tower.enter`) }}</v-btn>
          </div>
        </template>
        <div class="mt-0">
          <span>{{ $vuetify.lang.t(`$vuetify.horde.tower.enterCost`) }}&nbsp;</span>
          <price-tag currency="horde_towerKey" :amount="1"></price-tag>
        </div>
      </gb-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HORDE_HEIRLOOM_TOWER_FLOORS } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import Sigil from './Sigil.vue';

export default {
  components: { DisplayRow, Sigil, PriceTag },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      crown: state => state.currency.horde_crown,
      heirloomList: state => state.horde.heirloom,
      isFrozen: state => state.cryolab.horde.active,
    }),
    tower() {
      return this.$store.state.horde.tower[this.name];
    },
    rewards() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.tower.reward)) {
        const gained = parseInt(key) <= this.tower.highest;
        obj[key] = {...elem, gained};
        if (!gained) {
          break;
        }
      }
      return obj;
    },
    zoneEstimation() {
      return Math.round(this.tower.statBase + this.tower.highest * this.tower.statScaling);
    },
    canEnter() {
      return this.$store.state.horde.currentTower === null && this.$store.getters['currency/value']('horde_towerKey') >= 1;
    },
    heirloomFloors() {
      return HORDE_HEIRLOOM_TOWER_FLOORS;
    }
  },
  methods: {
    enterTower() {
      this.$store.dispatch('horde/enterTower', this.name);
    }
  }
}
</script>
