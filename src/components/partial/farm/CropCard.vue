<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.farm.crop.${ name }`) }}</v-card-title>
    <v-card-text>
      <div class="d-flex justify-center align-center flex-wrap">
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">{{ $formatTime(cropGrow * 60, 'm') }}</div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.farm.timeDescription') }}</div>
        </gb-tooltip>
        <v-icon class="mx-2">mdi-circle-small</v-icon>
        <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.farm.yield')">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex justify-center align-center" v-bind="attrs" v-on="on">
              <div>{{ $formatNum(cropYield) }}</div>
              <v-icon class="ml-1" small>{{ currency['farm_' + crop.type].icon }}</v-icon>
            </div>
          </template>
          <stat-breakdown :name="yieldMultName" :base="crop.yield" :multArray="yieldMult"></stat-breakdown>
        </gb-tooltip>
        <template v-if="cropBaseOvergrow > 0">
          <v-icon class="mx-2">mdi-circle-small</v-icon>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.farmOvergrow')">
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center align-center" v-bind="attrs" v-on="on">
                <div>{{ $formatNum(cropBaseOvergrow * 100, true) }}%</div>
                <v-icon class="ml-1" small>mdi-resize</v-icon>
              </div>
            </template>
            <stat-breakdown name="farmOvergrow" :baseArray="overgrowBase"></stat-breakdown>
            <div>{{ $vuetify.lang.t('$vuetify.farm.overgrowDescription', $formatNum(cropOvergrow, true)) }}</div>
          </gb-tooltip>
        </template>
        <template v-if="hasGnome">
          <v-icon class="mx-2">mdi-circle-small</v-icon>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.farm.goldChance')">
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center align-center" v-bind="attrs" v-on="on">
                <div>{{ $formatNum(cropGoldChance * gnomeAmount * 100, true) }}%</div>
                <v-icon class="ml-1" small>mdi-gold</v-icon>
              </div>
            </template>
            <stat-breakdown name="farmGoldChance" :base="cropGoldChanceBase * 0.01" :multArray="goldChanceMult"></stat-breakdown>
            <div>{{ $vuetify.lang.t('$vuetify.farm.goldChanceDescription') }}</div>
            <alert-text v-if="(cropGoldChance * gnomeAmount) > 1" type="info">{{ $vuetify.lang.t(
              '$vuetify.farm.goldChanceMultiple',
              $formatNum(Math.floor(cropGoldChance * gnomeAmount)),
              $formatNum(((cropGoldChance * gnomeAmount) - Math.floor(cropGoldChance * gnomeAmount)) * 100, true)
            ) }}</alert-text>
            <alert-text v-if="gnomeAmount <= 0" type="error">{{ $vuetify.lang.t('$vuetify.farm.goldChanceWarning') }}</alert-text>
          </gb-tooltip>
        </template>
        <v-icon class="mx-2">mdi-circle-small</v-icon>
        <price-tag v-if="cropCost > 0" currency="farm_gold" :amount="cropCost"></price-tag>
        <span v-else>{{ $vuetify.lang.t('$vuetify.gooboo.free') }}</span>
        <template v-if="unlock.farmFertilizer.use">
          <v-icon class="mx-2">mdi-circle-small</v-icon>
          <gb-tooltip :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center align-center" v-bind="attrs" v-on="on">
                <div>{{ $formatNum(cropFertilizerCost) }}</div>
                <v-icon class="ml-1" small>mdi-sack-percent</v-icon>
              </div>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t('$vuetify.farm.fertilizerCostDescription') }}</div>
          </gb-tooltip>
        </template>
      </div>
      <div v-if="rareDrops.length > 0" class="mb-2">
        <div>{{ $vuetify.lang.t('$vuetify.farm.rareDrops') }}:</div>
        <crop-rare-drop class="ml-1" v-for="(item, key) in rareDrops" :key="'rare-drop-' + key" :item="item" :dropMult="rareDropMultNumber" :multArray="rareDropMult"></crop-rare-drop>
      </div>
      <div class="d-flex flex-wrap align-end justify-space-between" v-if="unlock.farmCropExp.use">
        <span>{{ $vuetify.lang.t('$vuetify.gooboo.level') }} {{ crop.level }}{{ crop.levelMax > 0 ? ` (${$formatNum(crop.levelMax)})` : '' }}</span>
        <gb-tooltip v-if="crop.level >= 4" :title-text="$vuetify.lang.t('$vuetify.gooboo.prestige')">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              class="ma-1 mr-0"
              :color="cropLevelGain > 0 ? 'primary' : 'error'"
              @click="prestige"
              :disabled="isFrozen"
              v-bind="attrs"
              v-on="on"
            >{{ $vuetify.lang.t('$vuetify.gooboo.prestige') }}</v-btn>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.farm.prestige.description`) }}</div>
          <div v-if="currentPrestigeLevel > 0">{{ $vuetify.lang.t(`$vuetify.farm.prestige.current`, currentPrestigeLevel, $formatNum(currentPrestigeEffect, true)) }}</div>
          <div v-if="cropLevelGain > 0">{{ $vuetify.lang.t(`$vuetify.farm.prestige.next`, cropLevelGain, currentPrestigeLevel + cropLevelGain, $formatNum(nextPrestigeEffect, true)) }}</div>
          <div v-else>{{ $vuetify.lang.t(`$vuetify.farm.prestige.nextNoEffect`) }}</div>
        </gb-tooltip>
      </div>
      <gb-tooltip v-if="unlock.farmCropExp.use" :title-text="$vuetify.lang.t('$vuetify.gooboo.multGain', $vuetify.lang.t('$vuetify.farm.experience'))">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear class="balloon-text-dynamic rounded" height="20" color="light-blue" :value="100 * crop.exp / expNeeded" v-bind="attrs" v-on="on">
            {{ $formatNum(crop.exp) }} / {{ $formatNum(expNeeded) }}
          </v-progress-linear>
        </template>
        <stat-breakdown name="farmExperience" :baseArray="expBase" :multArray="expMult"></stat-breakdown>
        <div>{{ $vuetify.lang.t(`$vuetify.farm.expToLevelUp`, $formatNum(harvestsNeeded)) }}</div>
      </gb-tooltip>
      <div class="d-flex flex-wrap ma-1">
        <v-badge v-for="(item, key) in boughtUpgrades" :key="'bought-' + key" class="ma-1 mr-2" overlap bottom bordered :content="item" color="secondary" :value="item > 1">
          <gb-tooltip :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">{{ icons[key] }}</v-icon>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.farm.cropUpgrade.${ key }`) }}</div>
          </gb-tooltip>
        </v-badge>
      </div>
      <div v-if="freeUpgrades > 0" class="my-1">
        {{ freeUpgrades }} {{ $vuetify.lang.t(`$vuetify.farm.freeUpgrades.${ freeUpgrades > 1 ? 'p' : 's' }`) }}
      </div>
      <div v-if="crop.cacheUpgradeCount < crop.level" class="d-flex flex-wrap justify-center ma-1">
        <crop-upgrade v-for="(item, key) in crop.nextUpgrades" :key="'next-' + key" class="ma-1" :crop="name" :upgrade="item"></crop-upgrade>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { capitalize } from '../../../js/utils/format';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import CropRareDrop from './CropRareDrop.vue';
import CropUpgrade from './CropUpgrade.vue';

export default {
  components: { CropUpgrade, StatBreakdown, CropRareDrop, PriceTag, AlertText },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      icons: state => state.farm.cropUpgradeIcons,
      currency: state => state.currency,
      unlock: state => state.unlock,
      isFrozen: state => state.cryolab.farm.active
    }),
    ...mapGetters({
      currentPrestigeLevel: 'farm/currentPrestigeLevel',
      prestigeMult: 'farm/prestigeMult'
    }),
    currentPrestigeEffect() {
      return this.prestigeMult(this.currentPrestigeLevel);
    },
    nextPrestigeEffect() {
      return this.prestigeMult(this.currentPrestigeLevel + this.cropLevelGain);
    },
    expNeeded() {
      return this.$store.getters['farm/expNeeded'](this.name);
    },
    crop() {
      return this.$store.state.farm.crop[this.name];
    },
    cropYield() {
      return this.$store.getters['farm/cropYield'](this.name);
    },
    cropGrow() {
      return this.$store.getters['farm/cropGrow'](this.name);
    },
    cropBaseOvergrow() {
      return this.$store.getters['farm/cropBaseOvergrow'](this.name);
    },
    cropOvergrow() {
      return this.$store.getters['farm/cropOvergrow'](this.name);
    },
    cropCost() {
      return this.$store.getters['farm/cropCost'](this.name);
    },
    cropExp() {
      return this.$store.getters['farm/cropExp'](this.name);
    },
    cropFertilizerCost() {
      return this.$store.getters['farm/cropFertilizerCost'](this.name);
    },
    freeUpgrades() {
      return this.crop.level - this.crop.cacheUpgradeCount;
    },
    boughtUpgrades() {
      let upg = {};
      for (const [key, elem] of Object.entries(this.crop.upgrades)) {
        if (elem > 0) {
          upg[key] = elem;
        }
      }
      return upg;
    },
    yieldMult() {
      let arr = [];

      if (this.crop.upgrades.yield) {
        arr.push({name: 'farmUpgrade_yield', value: Math.pow(1.15, this.crop.upgrades.yield)});
      }
      if (this.crop.upgrades.double) {
        arr.push({name: 'farmUpgrade_double', value: Math.pow(1.5, this.crop.upgrades.double)});
      }

      return arr;
    },
    expBase() {
      let arr = [];

      if (this.crop.upgrades.exp) {
        arr.push({name: 'farmUpgrade_exp', value: this.crop.upgrades.exp * 0.5});
      }

      return arr;
    },
    expMult() {
      let arr = [];

      if (this.crop.upgrades.double) {
        arr.push({name: 'farmUpgrade_double', value: Math.pow(1.5, this.crop.upgrades.double)});
      }

      return arr;
    },
    rareDropMult() {
      let arr = [];

      if (this.crop.upgrades.drops) {
        arr.push({name: 'farmUpgrade_drops', value: Math.pow(1.2, this.crop.upgrades.drops)});
      }
      if (this.crop.upgrades.double) {
        arr.push({name: 'farmUpgrade_double', value: Math.pow(1.2, this.crop.upgrades.double)});
      }

      return arr;
    },
    rareDropMultNumber() {
      let mult = 1;

      if (this.crop.upgrades.drops) {
        mult *= Math.pow(1.2, this.crop.upgrades.drops);
      }
      if (this.crop.upgrades.double) {
        mult *= Math.pow(1.2, this.crop.upgrades.double);
      }

      return mult;
    },
    overgrowBase() {
      let arr = [];

      if (this.crop.upgrades.overgrow) {
        arr.push({name: 'farmUpgrade_overgrow', value: this.crop.upgrades.overgrow * 0.5});
      }

      return arr;
    },
    rareDrops() {
      return this.crop.rareDrop.filter(elem => elem.found);
    },
    yieldMultName() {
      return 'currencyFarm' + capitalize(this.crop.type) + 'Gain';
    },
    harvestsNeeded() {
      return Math.ceil((this.expNeeded - this.crop.exp) / this.cropExp);
    },
    cropLevelGain() {
      return this.crop.level - this.crop.levelMax;
    },
    gnomeAmount() {
      return this.$store.state.farm.building.gardenGnome.cacheAmount + this.$store.state.farm.building.gardenGnome.cachePremium;
    },
    cropGoldChanceBase() {
      return Math.pow(this.crop.grow, 0.5);
    },
    cropGoldChance() {
      return this.cropGoldChanceBase * this.$store.getters['farm/cropGoldChance'](this.name);
    },
    hasGnome() {
      return this.$store.state.farm.building.gardenGnome.max >= 1;
    },
    goldChanceMult() {
      let arr = [];

      if (this.crop.upgrades.gold) {
        arr.push({name: 'farmUpgrade_gold', value: Math.pow(1.12, this.crop.upgrades.gold)});
      }
      if (this.crop.upgrades.double) {
        arr.push({name: 'farmUpgrade_double', value: Math.pow(1.5, this.crop.upgrades.double)});
      }
      arr.push({name: 'farmGardenGnome', value: this.gnomeAmount});

      return arr;
    }
  },
  methods: {
    prestige() {
      if (this.$store.state.system.settings.confirm.items.prestige.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'prestigeCrop',
          name: this.name,
          price: {},
        }});
      } else {
        this.$store.dispatch('farm/cropPrestige', this.name);
      }
    }
  }
}
</script>
