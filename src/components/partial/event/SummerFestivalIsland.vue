<style scoped>
.island-cell {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 6px;
  opacity: 0.5;
}
.island-cell-cover {
  position: absolute;
  background-color: #E8E8E8;
  opacity: 1;
}
.dark-island .island-cell-cover {
  background-color: #121212;
}
.island-cell-locked {
  opacity: 0.05;
}
.island-cell-halfselected {
  border: 3px dashed #00000080;
}
.dark-island .island-cell-halfselected {
  border: 3px dashed #FFFFFF80;
}
.island-cell-selected {
  border: 3px dashed #000000;
  opacity: 0.75;
}
.dark-island .island-cell-selected {
  border: 3px dashed #FFFFFF;
}
.island-cell-builderror {
  border-color: var(--v-error-base);
}
.island-cell-locked.island-cell-selected {
  opacity: 0.25;
}
.island-cell:hover {
  opacity: 1;
}
.island-cell-locked:not(:hover):not(.island-cell-selected) {
  background-color: #808080 !important;
}
.island-cell-locked:not(:hover):not(.island-cell-selected) > i {
  visibility: hidden;
}
.island-cell-locked:hover {
  opacity: 0.2;
}
.island-cell-tile-icon {
  transition: none;
  position: absolute;
  top: 12px;
  right: 12px;
}
.island-cell-selected > .island-cell-tile-icon, .island-cell-halfselected > .island-cell-tile-icon {
  top: 9px;
  right: 9px;
}
.connect-indicator {
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50%);
  background-color: #C0C0C0;
  width: 92px;
  height: 24px;
}
.dark-island .connect-indicator {
  background-color: #404040;
}
.indicator-1 {
  top: calc(100% - 12px);
  left: calc(50% - 24px);
  rotate: 60deg;
}
.indicator-2 {
  top: calc(100% - 12px);
  left: calc(50% - 68px);
  rotate: 120deg;
}

/* tablet view */
.island-tablet .island-cell {
  width: 60px;
  height: 60px;
  margin: 0 4.5px;
}
.island-tablet .connect-indicator {
  width: 69px;
  height: 18px;
  top: calc(50% - 9px);
  left: calc(50%);
}
.island-tablet .indicator-1 {
  top: calc(100% - 9px);
  left: calc(50% - 18px);
}
.island-tablet .indicator-2 {
  top: calc(100% - 9px);
  left: calc(50% - 51px);
}
.island-tablet .island-cell-tile-icon {
  top: 9px;
  right: 9px;
}
.island-tablet .island-cell-selected > .island-cell-tile-icon, .island-tablet .island-cell-halfselected > .island-cell-tile-icon {
  top: 6px;
  right: 6px;
}

/* mobile view */
.island-mobile .island-cell {
  width: 40px;
  height: 40px;
  margin: 0 3px;
}
.island-mobile .connect-indicator {
  width: 46px;
  height: 12px;
  top: calc(50% - 6px);
  left: calc(50%);
}
.island-mobile .indicator-1 {
  top: calc(100% - 6px);
  left: calc(50% - 12px);
}
.island-mobile .indicator-2 {
  top: calc(100% - 6px);
  left: calc(50% - 34px);
}
.island-mobile .island-cell-tile-icon {
  top: 6px;
  right: 6px;
}
.island-mobile .island-cell-selected > .island-cell-tile-icon, .island-mobile .island-cell-halfselected > .island-cell-tile-icon {
  top: 3px;
  right: 3px;
}
</style>

<template>
  <div :class="{'island-tablet': $vuetify.breakpoint.smOnly, 'island-mobile': $vuetify.breakpoint.xsOnly, 'dark-island': $vuetify.theme.dark}">
    <div v-if="island !== null" class="pa-2">
      <div v-for="(row, y) in island" :key="`row-${y}`" class="d-flex mx-auto" style="width: fit-content;">
        <div v-for="(cell, x) in row" :key="`cell-${y}-${x}`" style="position: relative;">
          <div v-if="cell.cacheConnect0" class="connect-indicator"></div>
          <div v-if="cell.cacheConnect1" class="connect-indicator indicator-1"></div>
          <div v-if="cell.cacheConnect2" class="connect-indicator indicator-2"></div>
          <div class="island-cell island-cell-cover rounded-circle"></div>
          <div
            class="d-flex justify-center align-center island-cell rounded-circle"
            :class="{
              'island-cell-halfselected': selectedBuildingCell === cell.building || secondaryRequirement.findIndex(elem => elem.x === x && elem.y === y) !== -1,
              'island-cell-selected': selectedCell !== null && selectedCell.x === x && selectedCell.y === y,
              'island-cell-locked': !cell.unlocked,
              'island-cell-builderror': selectedBuilding && !canPlaceBuilding
            }"
            :style="`background-color: var(--v-${cellType[cell.tile].color}-base);`"
            @click="selectCell(x, y)"
            @mouseover="hoverCell(x, y)"
          >
            <v-icon v-if="cellType[cell.tile].icon" :size="16 * iconSizeMult" class="island-cell-tile-icon">{{ cellType[cell.tile].icon }}</v-icon>
            <v-icon v-if="cell.building" :size="36 * iconSizeMult">{{ buildQueue.includes(cell.building) ? 'mdi-hammer' : buildingListBase[placedBuilding[cell.building].type].icon }}</v-icon>
            <v-badge v-else-if="cell.drop > 0" overlap bordered bottom :content="$formatNum(cell.drop)" :value="cell.drop > 1">
              <v-icon :size="36 * iconSizeMult">{{ currency[`event_${cellType[cell.tile].produces}`].icon }}</v-icon>
            </v-badge>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap align-center bg-tile-default rounded pa-1 ma-2">
      <gb-tooltip v-for="(item, key) in buildingList" :key="`building-${ key }`" :title-text="$vuetify.lang.t(`$vuetify.event.summerFestival.building.${ key }.name`)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-1 px-0"
            min-width="36"
            :color="selectedBuilding === key ? 'primary' : 'secondary'"
            @click="selectBuilding(key)"
            v-bind="attrs"
            v-on="on"
          ><v-icon>{{ item.icon }}</v-icon></v-btn>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.event.summerFestival.building.${ key }.description`) }}</div>
        <div class="d-flex flex-wrap mx-n1">
          <price-tag class="ma-1" v-for="(amount, currency) in item.price(0)" :key="'price-preview-' + currency" :currency="currency" :amount="amount"></price-tag>
        </div>
        <div>
          <v-icon small>mdi-timer</v-icon>
          {{ $formatTime(item.timeNeeded(0)) }}
        </div>
        <div>{{ $vuetify.lang.t(`$vuetify.event.summerFestival.placeOn`) }}:</div>
        <ul>
          <li v-for="(tileName, pos) in item.shape" :key="`shape-${ key }-${ pos }`">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.tile.${ tileName }`) }} ({{ $vuetify.lang.t(`$vuetify.event.summerFestival.tilePos.${ pos }`) }})</li>
        </ul>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.summerFestivalBuildQueueSlots`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on">
            <v-icon small class="mr-1">mdi-hammer</v-icon>
            <span>{{ buildQueue.length }} / {{ maxQueueSlots }}</span>
          </div>
        </template>
        <stat-breakdown name="summerFestivalBuildQueueSlots"></stat-breakdown>
        <template v-if="buildQueue.length > 0">
          <div>{{ $vuetify.lang.t(`$vuetify.event.summerFestival.inQueue`) }}:</div>
          <ul>
            <li v-for="(item, key) in buildQueue" :key="`queue-slot-${ key }`">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.building.${ placedBuilding[Math.abs(item)].type }.name`) }}</li>
          </ul>
        </template>
        <div v-else class="text-center">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.emptyQueue`) }}</div>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" v-bind="attrs" v-on="on">
            <v-btn color="primary" :disabled="!selectedBuilding" @click="rotateBuilding"><v-icon>mdi-rotate-right</v-icon></v-btn>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.summerFestival.rotateDescription') }}</div>
      </gb-tooltip>
      <v-btn class="ma-1" color="primary" :disabled="!canPlaceBuilding || buildQueue.length >= maxQueueSlots" @click="placeBuilding">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.build`) }}</v-btn>
    </div>
    <div class="bg-tile-default rounded pa-1 ma-2" v-if="selectedCell">
      <h3 class="text-center mb-2">
        <span>{{ $vuetify.lang.t(`$vuetify.event.summerFestival.tile.${ island[selectedCell.y][selectedCell.x].tile }`) }}&nbsp;</span>
        <span v-if="selectedCellType.produces">({{ $vuetify.lang.t('$vuetify.event.summerFestival.produces') }}: {{ $vuetify.lang.t(`$vuetify.currency.event_${selectedCellType.produces}.name`) }})</span>
        <span v-else>({{ $vuetify.lang.t('$vuetify.event.summerFestival.producesNothing') }})</span>
      </h3>
      <div class="d-flex flex-wrap align-center" v-if="!island[selectedCell.y][selectedCell.x].unlocked">
        <v-btn class="ma-1" color="primary" :disabled="!canAffordExpansion || !selectedCellIsConnected" @click="buyCell">{{ $vuetify.lang.t('$vuetify.gooboo.unlock') }}</v-btn>
        <div v-if="freeExpansion > 0" class="ma-1">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.freeExpansion.${ freeExpansion === 1 ? 's' : 'p' }`, freeExpansion) }}</div>
        <price-tag v-else-if="topazExpansionCost !== null" class="ma-1" currency="gem_topaz" :amount="topazExpansionCost"></price-tag>
      </div>
      <summer-festival-building-card v-else-if="island[selectedCell.y][selectedCell.x].building" :id="island[selectedCell.y][selectedCell.x].building"></summer-festival-building-card>
      <template v-else>
        <div class="text-center">{{ $vuetify.lang.t('$vuetify.event.summerFestival.empty') }}</div>
        <div v-if="canTerraform" class="d-flex flex-wrap">
          <gb-tooltip v-for="(item, key) in cellType[island[selectedCell.y][selectedCell.x].tile].terraform" :key="`terraform-${ key }`" :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <div class="ma-1" v-bind="attrs" v-on="on">
                <v-btn color="primary" :disabled="!canAfford(item.price)" @click="terraformTile(key)">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.tile.${ key }`) }}</v-btn>
              </div>
            </template>
            <div class="d-flex flex-wrap mt-0">
              <price-tag v-for="(amount, currency) in item.price" :key="`terraform-price-${ key }-${ currency }`" class="ma-1" :currency="currency" :amount="amount"></price-tag>
              <price-tag v-for="(amount, currency) in item.reward" :key="`terraform-reward-${ key }-${ currency }`" class="ma-1" :currency="currency" :amount="amount" add></price-tag>
            </div>
          </gb-tooltip>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import SummerFestivalBuildingCard from './SummerFestivalBuildingCard.vue';

export default {
  components: { PriceTag, SummerFestivalBuildingCard, StatBreakdown },
  computed: {
    ...mapState({
      currency: state => state.currency,
      cellType: state => state.summerFestival.cellType,
      island: state => state.summerFestival.island,
      selectedCell: state => state.summerFestival.selectedCell,
      freeExpansion: state => state.summerFestival.freeExpansion,
      selectedBuilding: state => state.summerFestival.selectedBuilding,
      buildingRotate: state => state.summerFestival.buildingRotate,
      placedBuilding: state => state.summerFestival.placedBuilding,
      buildingListBase: state => state.summerFestival.building,
      buildQueue: state => state.summerFestival.buildQueue,
      maxStageStat: state => state.stat.event_summerFestivalMaxStage
    }),
    ...mapGetters({
      topazExpansionCost: 'summerFestival/topazExpansionCost',
      selectedCellIsConnected: 'summerFestival/selectedCellIsConnected',
      buildingRequirement: 'summerFestival/buildingRequirement',
      canPlaceBuilding: 'summerFestival/canPlaceBuilding',
      multGet: 'mult/get',
      canAfford: 'currency/canAfford'
    }),
    canAffordExpansion() {
      return this.freeExpansion > 0 || (this.topazExpansionCost !== null && this.$store.getters['currency/value']('gem_topaz') >= this.topazExpansionCost);
    },
    selectedBuildingCell() {
      if (!this.selectedCell) {
        return -1;
      }
      return this.island[this.selectedCell.y][this.selectedCell.x].building ?? -1;
    },
    selectedCellType() {
      if (!this.selectedCell) {
        return -1;
      }
      return this.cellType[this.island[this.selectedCell.y][this.selectedCell.x].tile];
    },
    secondaryRequirement() {
      return this.buildingRequirement.filter(elem => elem.value !== null);
    },
    buildingPrice() {
      if (this.selectedBuilding === null) {
        return {};
      }
      return this.buildingListBase[this.selectedBuilding].price(0);
    },
    maxQueueSlots() {
      return this.$store.getters['mult/get']('summerFestivalBuildQueueSlots');
    },
    buildingList() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.buildingListBase)) {
        let amount = 0;
        for (const [, building] of Object.entries(this.placedBuilding)) {
          if (building.type === key) {
            amount++;
          }
        }
        if (this.maxStageStat.value >= elem.stageLevel && (elem.maxAmount === null || amount < elem.maxAmount)) {
          obj[key] = elem;
        }
      }
      return obj;
    },
    canTerraform() {
      return this.$store.state.unlock.summerFestivalTerraform.use;
    },
    iconSizeMult() {
      return this.$vuetify.breakpoint.xsOnly ? 0.5 : (this.$vuetify.breakpoint.smOnly ? 0.75 : 1);
    }
  },
  methods: {
    selectCell(x, y) {
      this.$store.commit('summerFestival/updateKey', {key: 'selectedCell', value: (
        this.selectedCell !== null && this.selectedCell.x === x && this.selectedCell.y === y
      ) ? null : {x, y}});
    },
    hoverCell(x, y) {
      if (this.island[y][x].drop > 0) {
        this.$store.dispatch('summerFestival/collectDrop', {x, y});
      }
    },
    buyCell() {
      if (this.freeExpansion > 0) {
        this.$store.dispatch('summerFestival/buyIslandCell', this.selectedCell);
      } else if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'summerFestivalCellBuy',
          cell: this.selectedCell,
          price: {gem_topaz: this.topazExpansionCost},
        }});
      } else {
        this.$store.dispatch('summerFestival/buyIslandCell', this.selectedCell);
      }
    },
    selectBuilding(name) {
      this.$store.commit('summerFestival/updateKey', {key: 'selectedBuilding', value: (
        this.selectedBuilding !== null && this.selectedBuilding === name
      ) ? null : name});
    },
    rotateBuilding() {
      this.$store.commit('summerFestival/updateKey', {key: 'buildingRotate', value: this.buildingRotate < 5 ? (this.buildingRotate + 1) : 0});
    },
    placeBuilding() {
      this.$store.dispatch('summerFestival/placeBuilding');
    },
    terraformTile(tile) {
      if (this.selectedCell !== null) {
        this.$store.dispatch('summerFestival/terraformTile', {x: this.selectedCell.x, y: this.selectedCell.y, tile});
      }
    }
  }
}
</script>
