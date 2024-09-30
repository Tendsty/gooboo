<style scoped>
.craft-special {
  position: absolute;
  top: 8px;
  left: 8px;
}
</style>

<template>
  <div>
    <v-row no-gutters class="ma-1">
      <v-col cols="12" sm="6" lg="4">
        <v-card class="ma-1 pa-2">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex align-center">{{ $vuetify.lang.t('$vuetify.mult.villageArtisan') }}</v-col>
            <v-col cols="8" class="d-flex justify-center align-center">
              <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.villageArtisan')">
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ $formatNum(currentArtisan) }} / {{ $formatNum(maxArtisan) }}</span>
                </template>
                <div>{{ $vuetify.lang.t('$vuetify.village.artisanDescription') }}</div>
                <stat-breakdown name="villageArtisan"></stat-breakdown>
              </gb-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-card class="ma-1 pa-2">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex align-center">{{ $vuetify.lang.t('$vuetify.mult.villageCounter') }}</v-col>
            <v-col cols="8" class="d-flex justify-center align-center">
              <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.villageCounter')">
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ $formatNum(currentCounter) }} / {{ $formatNum(maxCounter) }}</span>
                </template>
                <div>{{ $vuetify.lang.t('$vuetify.village.counterDescription') }}</div>
                <stat-breakdown name="villageCounter"></stat-breakdown>
              </gb-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card class="ma-1 pa-2">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex align-center">{{ $vuetify.lang.t('$vuetify.mult.villageHappiness') }}</v-col>
            <v-col cols="8" class="d-flex justify-center align-center">
              <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.villageHappiness')">
                <template v-slot:activator="{ on, attrs }">
                  <span :class="{'red--text': happinessPercent < 100, 'green--text': happinessPercent > 100}" v-bind="attrs" v-on="on">{{ $formatNum(happinessPercent, true) }}%</span>
                </template>
                <div>{{ $vuetify.lang.t('$vuetify.village.happinessDescription') }}</div>
                <stat-breakdown name="villageHappiness"></stat-breakdown>
              </gb-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex flex-wrap ma-1">
      <crafting-item class="ma-1" v-for="craft in craftingItems" :key="craft" :name="craft" @click="selectCraft(craft)"></crafting-item>
    </div>
    <v-card v-if="selectedCraft" class="ma-2">
      <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.village.crafting.${ selectedCraft }`) }}</v-card-title>
      <v-card-subtitle class="pa-1 text-center">{{ $vuetify.lang.t('$vuetify.village.crafting.owned', $formatNum(craftObj.owned)) }}</v-card-subtitle>
      <v-card-text>
        <div class="d-flex flex-wrap mx-n1 my-1">
          <template v-for="(amount, currency, index) in craftObj.price">
            <v-chip v-if="currency.split('_')[0] === 'craft'" :key="currency + '-' + index" small label class="ma-1 px-2 balloon-text-dynamic" :color="craftingList[currency.split('_')[1]].color">
              <v-icon class="mr-2">{{ craftingList[currency.split('_')[1]].icon }}</v-icon>
              <span :class="{
                'red--text': craftingList[currency.split('_')[1]].owned < (craftObj.isSpecial ? amount(craftObj.owned) : amount),
                'text--lighten-2': $vuetify.theme.dark,
                'text--darken-4': !$vuetify.theme.dark
              }">{{ $formatNum(craftObj.isSpecial ? amount(craftObj.owned) : amount) }}</span>
            </v-chip>
            <price-tag v-else class="ma-1" :key="currency + '-' + index" :currency="currency" :amount="craftObj.isSpecial ? amount(craftObj.owned) : amount"></price-tag>
          </template>
        </div>
        <div class="d-flex align-center my-1">
          <v-btn
            class="mr-2"
            :color="craftObj.isCrafting ? 'success': 'error'"
            @click="toggleCrafting"
            :disabled="isFrozen || !craftObj.isCrafting && currentArtisan >= maxArtisan"
          ><v-icon>{{ craftObj.isCrafting ? 'mdi-check' : 'mdi-cancel' }}</v-icon></v-btn>
          <v-progress-linear class="rounded" height="16" :value="craftObj.progress * 100">{{ $formatTime(craftObj.timeNeeded) }}</v-progress-linear>
        </div>
        <div v-if="!craftObj.isSpecial" class="d-flex align-center my-1 mt-3">
          <v-btn
            class="mr-2"
            :color="craftObj.isSelling ? 'success': 'error'"
            @click="toggleSelling"
            :disabled="isFrozen || !craftObj.isSelling && currentCounter >= maxCounter"
          ><v-icon>{{ craftObj.isSelling ? 'mdi-currency-usd' : 'mdi-currency-usd-off' }}</v-icon></v-btn>
          <v-text-field type="number" :label="$vuetify.lang.t('$vuetify.village.crafting.sellPrice', $formatNum(craftObj.value))" min="1" outlined hide-details v-model="sellPrice"></v-text-field>
          <div class="text-center" style="min-width: 175px;">{{ $vuetify.lang.t('$vuetify.village.crafting.sellEvery', $formatTime(Math.round(1 / Math.min(craftObj.cacheSellChance, 1)))) }}</div>
        </div>
        <v-progress-linear v-if="currentMilestone !== null" class="rounded mt-2" color="blue" height="24" :value="milestonePercent">
          <div class="d-flex w-100 justify-space-between align-center ma-1">
            <span>{{ $vuetify.lang.t('$vuetify.village.crafting.crafts', $formatNum(craftObj.crafted), $formatNum(currentMilestone.needed)) }}:</span>
            <span v-if="currentMilestone.type === 'changeStat'" :key="`milestone-reward-stat-${selectedCraft}-${currentMilestone.needed}`">{{ $vuetify.lang.t(`$vuetify.village.crafting.changeStat.${ currentMilestone.name }`, currentMilestone.name === 'timeNeeded' ? $formatTime(currentMilestone.value) : $formatNum(currentMilestone.value)) }}</span>
            <display-row v-else :key="`milestone-reward-other-${selectedCraft}-${currentMilestone.needed}`" :type="currentMilestone.type" :name="currentMilestone.name" :after="currentMilestone.value"></display-row>
          </div>
        </v-progress-linear>
        <div v-if="craftObj.isSpecial">
          <div class="text-center">{{ $vuetify.lang.t('$vuetify.village.crafting.nextEffect') }}:</div>
          <display-row v-for="(item, key) in display" :key="`craft-reward-${selectedCraft}-${item.name}-${item.type}-${key}`" :type="item.type" :name="item.name" :before="item.before" :after="item.after"></display-row>
        </div>
      </v-card-text>
      <gb-tooltip v-if="craftObj.isSpecial" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="craft-special" v-bind="attrs" v-on="on">mdi-star</v-icon>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.village.crafting.special.description`) }}</div>
      </gb-tooltip>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import CraftingItem from './CraftingItem.vue';

export default {
  components: { CraftingItem, PriceTag, StatBreakdown, DisplayRow },
  data: () => ({
    selectedCraft: null,
    sellPrice: null
  }),
  computed: {
    ...mapState({
      craftingList: state => state.village.crafting,
      isFrozen: state => state.cryolab.village.active,
    }),
    ...mapGetters({
      currentArtisan: 'village/artisansActive',
      currentCounter: 'village/countersActive'
    }),
    craftingItems() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.craftingList)) {
        if (elem.unlocked) {
          arr.push(key);
        }
      }
      return arr;
    },
    craftObj() {
      return this.selectedCraft === null ? null : this.craftingList[this.selectedCraft];
    },
    happinessPercent() {
      return this.$store.getters['mult/get']('villageHappiness') * 100;
    },
    maxArtisan() {
      return this.$store.getters['mult/get']('villageArtisan');
    },
    maxCounter() {
      return this.$store.getters['mult/get']('villageCounter');
    },
    previousMilestone() {
      if (this.selectedCraft === null || this.craftObj.isSpecial) {
        return 0;
      }
      let amount = 0;
      for (const [key] of Object.entries(this.craftObj.milestone)) {
        if (parseInt(key) > this.craftObj.crafted) {
          return amount;
        }
        amount = parseInt(key);
      }
      return 0;
    },
    currentMilestone() {
      if (this.selectedCraft === null || this.craftObj.isSpecial) {
        return null;
      }
      for (const [key, elem] of Object.entries(this.craftObj.milestone)) {
        if (parseInt(key) > this.craftObj.crafted) {
          return {...elem, needed: parseInt(key)};
        }
      }
      return null;
    },
    milestonePercent() {
      if (this.currentMilestone === null || this.selectedCraft === null) {
        return 0;
      }
      return 100 * (this.craftObj.crafted - this.previousMilestone) / (this.currentMilestone.needed - this.previousMilestone);
    },
    display() {
      return this.craftObj.effect.map(elem => {
        const lvl = this.craftObj.owned;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl) : null,
          after: elem.value(lvl + 1)
        };
      });
    }
  },
  methods: {
    selectCraft(name) {
      this.selectedCraft = this.selectedCraft === name ? null : name;
    },
    toggleCrafting() {
      if (this.selectedCraft !== null) {
        this.$store.commit('village/updateSubkey', {key: 'crafting', name: this.selectedCraft, subkey: 'isCrafting', value: !this.craftObj.isCrafting});
      }
    },
    toggleSelling() {
      if (this.selectedCraft !== null) {
        this.$store.commit('village/updateSubkey', {key: 'crafting', name: this.selectedCraft, subkey: 'isSelling', value: !this.craftObj.isSelling});
      }
    }
  },
  watch: {
    selectedCraft(newVal) {
      this.sellPrice = newVal === null ? null : this.craftObj.sellPrice;
    },
    sellPrice(newVal) {
      if (newVal !== null && parseInt(newVal) >= 1) {
        const price = parseInt(newVal);
        this.$store.commit('village/updateSubkey', {key: 'crafting', name: this.selectedCraft, subkey: 'sellPrice', value: price});
        this.$store.commit('village/updateSubkey', {key: 'crafting', name: this.selectedCraft, subkey: 'cacheSellChance', value: 0.01 * Math.pow(this.craftObj.value / price, 2)});
      }
    }
  }
}
</script>
