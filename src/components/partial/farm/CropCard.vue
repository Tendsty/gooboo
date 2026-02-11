<style scoped>
.giant-crop-btn {
  position: absolute;
  left: 8px;
  top: 8px;
  min-width: 0 !important;
  width: 28px;
}
</style>

<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.farm.crop.${ name }`) }}</v-card-title>
    <v-card-text>
      <div class="d-flex justify-center align-center flex-wrap" key="crop-stats-bar">
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">{{ $formatTime(cropGrow * 60) }}</div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.farm.timeDescription') }}</div>
          <stat-breakdown
            name="farmGrow"
            :base="(plantGiant ? crop.giantGrow : crop.grow) * 60"
            :baseArray="cropGeneStats.mult.farmGrow.baseArray"
            :multArray="cropGeneStats.mult.farmGrow.multArray"
          ></stat-breakdown>
        </gb-tooltip>
        <template v-if="crop.type !== 'special'">
          <v-icon class="mx-2">mdi-circle-small</v-icon>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.farm.yield')">
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center align-center" v-bind="attrs" v-on="on">
                <div>{{ $formatNum(cropYield) }}</div>
                <v-icon class="ml-1" small>{{ currency['farm_' + crop.type].icon }}</v-icon>
              </div>
            </template>
            <stat-breakdown
              :name="yieldMultName"
              :base="crop.yield"
              :baseArray="cropGeneStats.mult.farmCropGain.baseArray"
              :multArray="cropGeneStats.mult.farmCropGain.multArray"
            ></stat-breakdown>
          </gb-tooltip>
        </template>
        <template v-if="crop.type !== 'special' && cropOvergrow > 0">
          <v-icon class="mx-2">mdi-circle-small</v-icon>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.farmOvergrow')">
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center align-center" v-bind="attrs" v-on="on">
                <div>{{ $formatNum(cropOvergrow * 100, true) }}%</div>
                <v-icon class="ml-1" small>mdi-resize</v-icon>
              </div>
            </template>
            <stat-breakdown
              name="farmOvergrow"
              :baseArray="cropGeneStats.mult.farmOvergrow.baseArray"
              :multArray="cropGeneStats.mult.farmOvergrow.multArray"
            ></stat-breakdown>
            <div>{{ $vuetify.lang.t('$vuetify.farm.overgrowDescription', $formatNum(1 / cropOvergrow + 1, true)) }}</div>
            <alert-text type="formula" v-if="showFormulas">{{ $vuetify.lang.t('$vuetify.farm.overgrowFormula') }}</alert-text>
          </gb-tooltip>
        </template>
        <template v-if="crop.type !== 'special' && hasGnome">
          <v-icon class="mx-2">mdi-circle-small</v-icon>
          <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.farm.goldChance')">
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center align-center" v-bind="attrs" v-on="on">
                <div>{{ $formatNum(cropGoldChance * 100, true) }}%</div>
                <v-icon class="ml-1" small>mdi-gold</v-icon>
              </div>
            </template>
            <stat-breakdown
              name="farmGoldChance"
              :base="cropGoldChanceBase"
              :baseArray="cropGeneStats.mult.farmGoldChance.baseArray"
              :multArray="goldChanceMult"
            ></stat-breakdown>
            <div>{{ $vuetify.lang.t('$vuetify.farm.goldChanceDescription') }}</div>
            <alert-text v-if="cropGoldChance > 1" type="info">{{ $vuetify.lang.t(
              '$vuetify.farm.goldChanceMultiple',
              $formatNum(Math.floor(cropGoldChance)),
              $formatNum((cropGoldChance - Math.floor(cropGoldChance)) * 100, true)
            ) }}</alert-text>
            <alert-text v-if="gnomeAmount <= 0" type="error">{{ $vuetify.lang.t('$vuetify.farm.goldChanceWarning') }}</alert-text>
          </gb-tooltip>
        </template>
        <v-icon v-if="Object.keys(crop.cost).length > 0" class="mx-2">mdi-circle-small</v-icon>
        <price-tag v-for="(elem, key) in crop.cost" :key="`crop-cost-${ key }`" :currency="key" :amount="elem * ((crop.type === 'special' && plantGiant) ? crop.giantMult : 1)"></price-tag>
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
      <div v-if="crop.type !== 'special' && showEfficiency" class="d-flex justify-center align-center flex-wrap" key="crop-efficiency-bar">
        <div class="d-flex justify-center align-center">
          <div>{{ $formatNum(cropYield * 60 / cropGrow) }}</div>
          <v-icon class="ml-1" small>{{ currency['farm_' + crop.type].icon }}</v-icon>
          <div>/ h</div>
        </div>
        <template v-if="hasGnome">
          <v-icon class="mx-2">mdi-circle-small</v-icon>
          <div class="d-flex justify-center align-center">
            <div>{{ $formatNum(cropGoldChance * 6000 / cropGrow, true) }}%</div>
            <v-icon class="mx-1" small>mdi-gold</v-icon>
            <div>/ h</div>
          </div>
        </template>
      </div>
      <div v-if="rareDrops.length > 0 || Object.keys(cropGeneStats.rareDrop).length > 0" class="mb-2" key="crop-rare-drop-list">
        <div>{{ $vuetify.lang.t('$vuetify.farm.rareDrops') }}:</div>
        <crop-rare-drop
          class="ml-1"
          v-for="(item, key) in rareDrops"
          :key="'rare-drop-native-' + key"
          :item="item"
          :dropBase="cropGeneStats.mult.farmRareDropChance.baseValue"
          :dropMult="cropGeneStats.mult.farmRareDropChance.multValue * item.mult"
          :baseArray="cropGeneStats.mult.farmRareDropChance.baseArray"
          :multArray="item.mult === 1 ? cropGeneStats.mult.farmRareDropChance.multArray : [...cropGeneStats.mult.farmRareDropChance.multArray, {name: 'multiplier', value: item.mult}]"
        ></crop-rare-drop>
        <crop-rare-drop
          class="ml-1"
          v-for="(item, key) in cropGeneStats.rareDrop"
          :key="'rare-drop-gene-' + key"
          :item="{name: item.name, type: 'currency', chance: item.chance, value: item.amount, found: true}"
          :dropBase="cropGeneStats.mult.farmRareDropChance.baseValue"
          :dropMult="cropGeneStats.mult.farmRareDropChance.multValue * item.mult"
          :baseArray="cropGeneStats.mult.farmRareDropChance.baseArray"
          :multArray="item.mult === 1 ? cropGeneStats.mult.farmRareDropChance.multArray : [...cropGeneStats.mult.farmRareDropChance.multArray, {name: 'multiplier', value: item.mult}]"
        ></crop-rare-drop>
      </div>
      <div v-if="cropGeneStats.tag.includes('farmHunter') && rareDropsHunted.length > 0" class="blue--text mt-4 mb-2" :class="$vuetify.theme.dark ? 'text--lighten-2' : 'text--darken-3'">
        <div>{{ $vuetify.lang.t('$vuetify.farm.huntedRareDrops') }}:</div>
        <crop-rare-drop
          class="ml-1"
          v-for="(item, key) in rareDropsHunted"
          :key="'rare-drop-hunter-' + key"
          :item="item"
          :dropBase="cropGeneStats.mult.farmRareDropChance.baseValue"
          :dropMult="cropGeneStats.mult.farmRareDropChance.multValue * cropGeneStats.mult.farmHuntChance.multValue * item.mult"
          :baseArray="cropGeneStats.mult.farmRareDropChance.baseArray"
          :multArray="item.mult === 1 ? [...cropGeneStats.mult.farmRareDropChance.multArray, ...cropGeneStats.mult.farmHuntChance.multArray] : [...cropGeneStats.mult.farmRareDropChance.multArray, ...cropGeneStats.mult.farmHuntChance.multArray, {name: 'multiplier', value: item.mult}]"
          is-hunt
        ></crop-rare-drop>
      </div>
      <div class="d-flex flex-wrap align-end justify-space-between" v-if="unlock.farmCropExp.use" key="crop-level-prestige">
        <span>{{ $vuetify.lang.t('$vuetify.gooboo.level') }} {{ crop.level }}{{ crop.levelMax > 0 ? ` (${$formatNum(crop.levelMax)})` : '' }}</span>
        <gb-tooltip v-if="crop.type !== 'special' && crop.level >= 4" :title-text="$vuetify.lang.t('$vuetify.gooboo.prestige')">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn
                small
                class="ma-1 mr-0"
                :color="cropLevelGain > 0 ? 'primary' : 'error'"
                @click="prestige"
                :disabled="isFrozen || cropCount > 0"
              >{{ $vuetify.lang.t('$vuetify.gooboo.prestige') }}</v-btn>
            </div>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.farm.prestige.description`) }}</div>
          <div v-if="currentPrestigeLevel > 0">{{ $vuetify.lang.t(`$vuetify.farm.prestige.current`, currentPrestigeLevel, $formatNum(currentPrestigeEffect, true)) }}</div>
          <div v-if="cropLevelGain > 0">{{ $vuetify.lang.t(`$vuetify.farm.prestige.next`, cropLevelGain, currentPrestigeLevel + cropLevelGain, $formatNum(nextPrestigeEffect, true)) }}</div>
          <div v-else>{{ $vuetify.lang.t(`$vuetify.farm.prestige.nextNoEffect`) }}</div>
          <alert-text v-if="cropCount > 0" type="error">{{ $vuetify.lang.t(`$vuetify.farm.prestige.cropOnField`) }}</alert-text>
        </gb-tooltip>
      </div>
      <div v-if="unlock.farmCropExp.use" key="crop-exp-bar">
        <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.gooboo.multGain', $vuetify.lang.t('$vuetify.farm.experience'))">
          <template v-slot:activator="{ on, attrs }">
            <v-progress-linear class="balloon-text-dynamic rounded" height="20" color="light-blue" :value="100 * crop.exp / expNeeded" v-bind="attrs" v-on="on">
              {{ $formatNum(crop.exp) }} / {{ $formatNum(expNeeded) }}
            </v-progress-linear>
          </template>
          <stat-breakdown
            v-if="crop.type !== 'special'"
            name="farmExperience"
            :baseArray="this.cropGeneStats.mult.farmExperience.baseArray"
            :multArray="this.cropGeneStats.mult.farmExperience.multArray"
          ></stat-breakdown>
          <div v-if="cropExp > 0">{{ $vuetify.lang.t('$vuetify.farm.expToLevelUp', $formatNum(harvestsNeeded)) }}</div>
          <template v-if="crop.type === 'special'">
            <div class="text-center">{{ $vuetify.lang.t('$vuetify.farm.specialCropEffect') }}</div>
            <display-row class="mt-0" v-for="(item, key) in specialEffect" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
          </template>
          <template v-else>
            <alert-text v-if="Math.max(crop.level, crop.levelMax) >= 40" type="info">{{ $vuetify.lang.t(`$vuetify.farm.prestige.noMoreGL`) }}</alert-text>
            <alert-text v-else-if="Math.max(crop.level, crop.levelMax) >= 10" type="info">{{ $vuetify.lang.t(`$vuetify.farm.prestige.increasedGLRequirement`) }}</alert-text>
          </template>
        </gb-tooltip>
      </div>
      <template v-if="crop.type !== 'special'">
        <div v-if="currentGenePicker !== null" key="crop-gene-picker">
          <div class="text-center mt-2">{{ $vuetify.lang.t('$vuetify.farm.gene.pickLevel', genePickerLevel) }}:</div>
          <div class="d-flex flex-wrap justify-center">
            <gene-icon
              v-for="geneName in currentGenePicker"
              class="ma-1"
              :disabled="gene[geneName].lockOnField && cropCount > 0"
              @click="pickGene(geneName)"
              :key="`gene-pick-${ geneName }`"
              :name="geneName"
              clickable
              show-upgrade
            ></gene-icon>
          </div>
        </div>
        <div v-if="unlock.farmCropExp.use" class="d-flex justify-center mt-2" key="crop-dna-display">
          <gb-tooltip :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <v-chip v-bind="attrs" v-on="on">
                <v-icon class="mr-1">mdi-dna</v-icon>
                {{ $formatInt(cropDnaLeft) }}
              </v-chip>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.farm.gene.dnaDescription`) }}</div>
            <div>{{ $vuetify.lang.t(`$vuetify.farm.gene.dnaDuplicate`) }}</div>
            <div v-if="crop.genesBlocked.length > 0">
              <span>{{ $vuetify.lang.t(`$vuetify.farm.gene.dnaBlocked`) }}:&nbsp;</span>
              <span v-for="(blocked, index) in crop.genesBlocked" :key="`gene-blocked-${ blocked }`">
                <span v-if="index > 0">,&nbsp;</span>
                <span>{{ $vuetify.lang.t(`$vuetify.farm.gene.${ blocked }`) }}</span>
              </span>
            </div>
          </gb-tooltip>
        </div>
        <div v-for="geneName in crop.genes" class="d-flex align-center" :key="`gene-taken-${ geneName }`">
          <gene-icon class="ma-1 ml-0" :name="geneName"></gene-icon>
          <gene-upgrade v-if="gene[geneName].maxLevel > 0" class="ma-1 flex-grow-1" :crop="name" :name="geneName"></gene-upgrade>
        </div>
        <div v-if="unlock.cardFeature.use && unlock.farmCropExp.use">
          <card-overview :key="`card-select-${ name }`" feature="farm" :crop="name" :group="crop.type"></card-overview>
        </div>
      </template>
    </v-card-text>
    <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.farm.giantCrop.name')">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="giant-crop-btn"
          small
          @click="toggleGiant"
          :color="plantGiant ? 'primary' : 'secondary'"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon size="20">mdi-resize</v-icon>
        </v-btn>
      </template>
      <div>{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.description`) }}</div>
      <ul class="mt-0">
        <li>{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.stat.0`, $formatTime(cropBaseGrow * 60), $formatTime(cropGiantGrow * 60)) }}</li>
        <li v-if="unlock.farmFertilizer.use">{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.stat.1`, $formatNum(cropFertilizerCostBase), $formatNum(cropFertilizerCostGiant)) }}</li>
        <li v-if="crop.type !== 'special'">{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.stat.2`, $formatNum(crop.giantMult, true)) }}</li>
        <li v-if="crop.type === 'special'">{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.stat.3`, $formatNum(crop.giantMult, true)) }}</li>
        <li v-if="crop.type === 'special'">{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.stat.4`, $formatNum(crop.giantMult, true)) }}</li>
      </ul>
      <div>{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.${ plantGiant ? 'giant' : 'regular' }`) }} ({{ $vuetify.lang.t(`$vuetify.farm.giantCrop.clickToToggle`) }})</div>
      <alert-text v-if="showEfficiency" type="info">{{ $vuetify.lang.t(`$vuetify.farm.giantCrop.efficiency`, $formatNum(100 * crop.giantMult * crop.grow / crop.giantGrow)) }}</alert-text>
    </gb-tooltip>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { fallbackArray } from '../../../js/utils/array';
import { capitalize } from '../../../js/utils/format';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import CardOverview from '../card/CardOverview.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import CropRareDrop from './CropRareDrop.vue';
import GeneIcon from './GeneIcon.vue';
import GeneUpgrade from './GeneUpgrade.vue';

export default {
  components: { StatBreakdown, CropRareDrop, PriceTag, AlertText, GeneIcon, GeneUpgrade, CardOverview, DisplayRow },
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
      isFrozen: state => state.cryolab.farm.active,
      gene: state => state.farm.gene,
      plantGiant: state => state.farm.plantGiant,
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
    cropDnaLeft() {
      return this.$store.getters['farm/cropDnaLeft'](this.name);
    },
    crop() {
      return this.$store.state.farm.crop[this.name];
    },
    cropYield() {
      return this.$store.getters['mult/get'](
        this.yieldMultName,
        this.crop.yield + this.cropGeneStats.mult.farmCropGain.baseValue,
        this.cropGeneStats.mult.farmCropGain.multValue
      );
    },
    cropBaseGrow() {
      return this.$store.getters['mult/get'](
        'farmGrow',
        this.crop.grow + this.cropGeneStats.mult.farmGrow.baseValue,
        this.cropGeneStats.mult.farmGrow.multValue
      );
    },
    cropGiantGrow() {
      return this.$store.getters['mult/get'](
        'farmGrow',
        this.crop.giantGrow + this.cropGeneStats.mult.farmGrow.baseValue,
        this.cropGeneStats.mult.farmGrow.multValue
      );
    },
    cropGrow() {
      return this.plantGiant ? this.cropGiantGrow : this.cropBaseGrow;
    },
    cropOvergrow() {
      return this.$store.getters['mult/get'](
        'farmOvergrow',
        this.cropGeneStats.mult.farmOvergrow.baseValue,
        this.cropGeneStats.mult.farmOvergrow.multValue
      );
    },
    cropExp() {
      return this.crop.type !== 'special' ? this.$store.getters['mult/get'](
        'farmExperience',
        this.cropGeneStats.mult.farmExperience.baseValue,
        this.cropGeneStats.mult.farmExperience.multValue
      ) : (this.plantGiant ? this.crop.giantMult : 1);
    },
    cropFertilizerCostBase() {
      return this.$store.getters['farm/cropFertilizerCost'](this.name, false);
    },
    cropFertilizerCostGiant() {
      return this.$store.getters['farm/cropFertilizerCost'](this.name, true);
    },
    cropFertilizerCost() {
      return this.plantGiant ? this.cropFertilizerCostGiant : this.cropFertilizerCostBase;
    },
    rareDrops() {
      return this.crop.rareDrop.filter(elem => elem.found || this.$store.getters['mult/get']('farmRareDropChance', elem.chance) >= (this.crop.genes.includes('rareDropChance') ? -0.05 : -0.1));
    },
    rareDropsHunted() {
      return this.rareDrops.filter(elem => elem.type === 'currency');
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
      return this.$store.state.farm.building.gardenGnome.cacheAmount + this.$store.state.farm.building.gardenGnome.cachePremium / 2;
    },
    cropGoldChanceBase() {
      return this.$store.getters['farm/baseGoldChance'](this.name) + this.cropGeneStats.mult.farmGoldChance.baseValue;
    },
    cropGoldChance() {
      return this.$store.getters['mult/get'](
        'farmGoldChance',
        this.cropGoldChanceBase,
        this.gnomeAmount * this.cropGeneStats.mult.farmGoldChance.multValue
      );
    },
    hasGnome() {
      return this.$store.state.farm.building.gardenGnome.max >= 1;
    },
    goldChanceMult() {
      return [...this.cropGeneStats.mult.farmGoldChance.multArray, {name: 'farmGardenGnome', value: this.gnomeAmount}];
    },
    currentGenePicker() {
      let picker = null;
      let index = 0;
      for (const [key, value] of Object.entries(this.$store.state.farm.geneLevels)) {
        if (this.crop.level >= parseInt(key) && this.crop.genes.length <= index) {
          picker = [...value].filter(elem => !this.crop.genesBlocked.includes(elem));
          break;
        }
        index++;
      }
      return picker;
    },
    genePickerLevel() {
      return fallbackArray(Object.keys(this.$store.state.farm.geneLevels), '?', this.crop.genes.length);
    },
    cropGeneStats() {
      return this.$store.getters['farm/cropGeneStats'](this.name, this.$store.state.farm.selectedFertilizerName, this.plantGiant);
    },
    cropCount() {
      return this.$store.state.farm.field.reduce((a, b) => a + b.reduce((c, d) => c + ((d !== null && d.crop === this.name) ? 1 : 0), 0), 0);
    },
    showFormulas() {
      return this.$store.state.system.settings.general.items.showFormulas.value;
    },
    showEfficiency() {
      return this.$store.state.system.settings.general.items.showEfficiencyStats.value;
    },
    specialEffect() {
      return this.crop.specialEffect.map(elem => {
        const lvl = this.crop.level;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl) : null,
          after: elem.value(lvl + 1)
        };
      }).filter(elem => {
        return elem.before !== elem.after;
      });
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
    },
    pickGene(name) {
      if (!this.gene[name].lockOnField || this.cropCount <= 0) {
        this.$store.dispatch('farm/pickGene', {crop: this.name, gene: name});
      }
    },
    toggleGiant() {
      this.$store.commit('farm/updateKey', {key: 'plantGiant', value: !this.plantGiant});
    }
  }
}
</script>
