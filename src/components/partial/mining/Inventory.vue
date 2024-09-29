<style scoped>
.ingredient-empty {
  position: relative;
  width: 56px;
  height: 56px;
}
.ingredient-amount {
  position: absolute;
  right: 2px;
  bottom: -2px;
  font-size: 14px;
}
</style>

<template>
  <div>
    <div class="d-flex justify-center flex-wrap ma-1">
      <currency large class="ma-1" name="mining_scrap"></currency>
      <currency v-for="name in subfeatureCurrencies[subfeature]" :key="`currency-${ name }`" class="ma-1" :name="name"></currency>
    </div>
    <div v-if="subfeature === 0" class="d-flex justify-center flex-wrap ma-1 mt-4 mt-lg-8">
      <currency v-for="(item, key) in ingredients" :key="key" :name="'mining_' + key" class="ma-1" :class="{'premium-glow': upgrade[`mining_more${ key.slice(3) }`].level >= 1, 'currency-clickable': unlock.miningPickaxeCrafting.use}" @click="addIngredient(key)"></currency>
      <currency v-for="(item, key) in enhancement" :key="key" :name="`mining_${ key }`" class="ma-1" :class="{'currency-clickable': unlock.miningEnhancement.use}" @click="setEnhancementIngredient(key)"></currency>
    </div>
    <div v-if="unlock.miningPickaxeCrafting.use && subfeature === 0" class="mt-4 mt-lg-8">
      <div class="d-flex flex-wrap justify-center ma-1 slot-container">
        <ingredient class="ma-1" v-for="(item, key) in ingredientList" :premium="key < pickaxePremiumSlots" :key="'ingredient-' + key" :index="key"></ingredient>
        <div
          v-for="i in pickaxeEmptySlots"
          :key="'empty-' + i"
          class="ingredient-empty bg-tile-default rounded ma-1"
          :class="{'premium-glow': (ingredientList.length + i - 1) < pickaxePremiumSlots, 'elevation-2': (ingredientList.length + i - 1) >= pickaxePremiumSlots}"
        ></div>
      </div>
      <div v-if="ingredientList.length > 0" class="d-flex align-center flex-wrap mx-1 my-2 justify-center">
        <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.miningPickaxeCraftingPower')">
          <template v-slot:activator="{ on, attrs }">
            <div class="mx-1 red--text" v-bind="attrs" v-on="on">{{ $formatNum(pickaxeStats.quality) }}</div>
          </template>
          <stat-breakdown :base="pickaxeStats.baseQuality" :multArray="pickaxeMult" name="miningPickaxeCraftingPower"></stat-breakdown>
        </gb-tooltip>
        <v-icon class="mx-1">mdi-close</v-icon>
        <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mining.crafting.impurity')">
          <template v-slot:activator="{ on, attrs }">
            <div class="mx-1" v-bind="attrs" v-on="on">(<span class="blue--text">{{ $formatNum(pickaxeStats.purity * 100, true) }}%</span> ~ <span class="blue--text">100%</span>)</div>
          </template>
          <div class="text-center">{{ $formatNum(pickaxeStats.impurity, true) }}</div>
          <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mining.crafting.purity') }}</h3>
          <stat-breakdown :base="pickaxeStats.cleanse" :multArray="pickaxePurityMult" name="miningPickaxeCraftingQuality"></stat-breakdown>
          <div>{{ $vuetify.lang.t('$vuetify.mining.crafting.purityDescription') }}</div>
        </gb-tooltip>
      </div>
      <div v-else class="text-center ma-1">{{ $vuetify.lang.t('$vuetify.mining.oreCrafting') }}</div>
      <div v-if="ingredientList.length > 0" class="d-flex align-center flex-wrap mx-1 my-2 justify-center">
        <v-icon>mdi-transfer-down</v-icon>
      </div>
      <div class="d-flex align-center flex-wrap justify-center">
        <div v-if="ingredientList.length > 0" class="ma-1">{{ $formatNum(pickaxeStats.quality * pickaxeStats.purity) }} ~ {{ $formatNum(pickaxeStats.quality) }}</div>
        <div v-if="ingredientList.length > 0 && pickaxeUpgradeChance > 0" class="ma-1">(<v-icon>mdi-arrow-up</v-icon>{{ $formatNum(pickaxeUpgradeChance * 100, true) }}%)</div>
        <gb-tooltip v-if="unlock.miningResin.use" :title-text="$vuetify.lang.t('$vuetify.currency.mining_resin.name')">
          <template v-slot:activator="{ on, attrs }">
            <div data-cy="mining-resin-input" class="d-flex justify-center align-center rounded ma-1 pa-1" :class="resinCurrency.color" v-bind="attrs" v-on="on">
              <v-icon class="mr-4">{{ resinCurrency.icon }}</v-icon>
              <v-btn :disabled="resin <= 0" class="pa-0" small color="error" min-height="24" min-width="24" height="24" @click="removeResin"><v-icon small>mdi-minus</v-icon></v-btn>
              <span class="mx-2 text-center" style="min-width: 24px;">{{ $formatNum(resin) }}</span>
              <v-btn :disabled="resin >= resinMax || resinAmount < (resin + 1)" class="pa-0" small color="success" min-height="24" min-width="24" height="24" @click="addResin"><v-icon small>mdi-plus</v-icon></v-btn>
            </div>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.mining.resinDescription', $formatNum(resinMax)) }}</div>
          <div v-if="resin > 0" class="green--text text--lighten-3">x{{ $formatNum(resin * 0.3 + 1, true) }} {{ $vuetify.lang.t('$vuetify.mining.crafting.power') }}</div>
          <div v-if="resin > 0" class="green--text text--lighten-3 mt-0">x{{ $formatNum(resin * 0.25 + 1, true) }} {{ $vuetify.lang.t('$vuetify.mining.crafting.purity') }}</div>
          <div class="text-center">{{ $vuetify.lang.t('$vuetify.mult.miningResinMax') }}</div>
          <stat-breakdown name="miningResinMax"></stat-breakdown>
        </gb-tooltip>
        <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mining.crafting.craftPickaxe')">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn class="ma-1" :color="pickaxeUpgradeChance > 0 ? 'success' : 'error'" :disabled="!canCraftPickaxe || isFrozen" @click="craftPickaxe({})">{{ $vuetify.lang.t('$vuetify.gooboo.craft') }}</v-btn>
            </div>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.mining.craftingDescription', $formatNum(pickaxePower)) }}</div>
          <div class="d-flex flex-wrap mx-n1 mb-n1">
            <price-tag class="ma-1" v-for="(amount, currency) in pickaxeCost" :key="'price-' + currency" :currency="`mining_${currency}`" :amount="amount"></price-tag>
          </div>
          <alert-text v-if="pickaxeStats.purity < 0.001" type="error">{{ $vuetify.lang.t('$vuetify.mining.crafting.minPurity') }}</alert-text>
          <template v-if="oreQuality > 1">
            <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.miningOreQuality') }}</h3>
            <div>{{ $vuetify.lang.t('$vuetify.mining.crafting.oreQuality') }}</div>
            <stat-breakdown name="miningOreQuality"></stat-breakdown>
          </template>
        </gb-tooltip>
        <consumable class="ma-1" name="mining_goldenHammer" :disabled="!canCraftPickaxe || !canAffordGoldenHammer || isFrozen" @click="craftPickaxe({mining_goldenHammer: 1})"></consumable>
      </div>
    </div>
    <div v-else-if="unlock.miningSmoke.use && subfeature === 1" class="d-flex align-center flex-wrap justify-center mt-4 mt-lg-8">
      <div class="ma-1">{{ $formatNum(pickaxePower) }}</div>
      <v-icon class="ma-1">mdi-transfer-right</v-icon>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.miningPickaxeCraftingPower')">
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" :class="{'red--text': currentSmokePower <= pickaxePower, 'green--text': currentSmokePower > pickaxePower}" v-bind="attrs" v-on="on">{{ $formatNum(currentSmokePower) }}</div>
        </template>
        <stat-breakdown :base="currentSmoke" name="miningPickaxeCraftingPower"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mining.crafting.craftPickaxe')">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn class="ma-1" color="success" :disabled="currentSmokePower <= pickaxePower || isFrozen" @click="craftPickaxe({})">{{ $vuetify.lang.t('$vuetify.gooboo.craft') }}</v-btn>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.mining.smokeDescription') }}</div>
      </gb-tooltip>
    </div>
    <div v-if="unlock.miningEnhancement.use && subfeature === 0" class="d-flex justify-center align-center flex-wrap ma-1">
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mining.enhancement.title')">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="mr-2" large v-bind="attrs" v-on="on">mdi-package-up</v-icon>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.mining.enhancement.description') }}</div>
      </gb-tooltip>
      <div class="ingredient-empty balloon-text-dynamic rounded d-flex justify-center align-center ma-1" :class="enhancementIngredient ? (currency['mining_' + enhancementIngredient].color + ' ' + ($vuetify.theme.dark ? 'darken-2' : 'lighten-2')) : 'bg-tile-default'">
        <template v-if="enhancementIngredient">
          <v-icon :class="{'mb-3': enhancementBars >= enhancementBarsNeeded}" large>{{ currency['mining_' + enhancementIngredient].icon }}</v-icon>
          <div v-if="enhancementBars >= enhancementBarsNeeded" class="ingredient-amount">{{ $formatNum(enhancementFinalNeeded) }}</div>
        </template>
      </div>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" style="width: 225px;" v-bind="attrs" v-on="on">
            <v-progress-linear class="balloon-text-dynamic rounded" height="32" :value="100 * enhancementBars / enhancementBarsNeeded">
              {{ $formatNum(enhancementBars) }} / {{ $formatNum(enhancementBarsNeeded) }}
            </v-progress-linear>
          </div>
        </template>
        <h3 class="text-center mt-0">{{ $vuetify.lang.t('$vuetify.mult.miningEnhancementBarsIncrement') }}</h3>
        <div>{{ $vuetify.lang.t('$vuetify.mining.enhancement.barsDescription') }}</div>
        <stat-breakdown name="miningEnhancementBarsIncrement"></stat-breakdown>
        <h3 class="text-center mt-4">{{ $vuetify.lang.t('$vuetify.mult.miningEnhancementFinalIncrement') }}</h3>
        <div>{{ $vuetify.lang.t('$vuetify.mining.enhancement.enhancementDescription') }}</div>
        <stat-breakdown name="miningEnhancementFinalIncrement"></stat-breakdown>
      </gb-tooltip>
      <v-btn class="ma-1" color="primary" :disabled="enhancementBars >= enhancementBarsNeeded || !canEnhanceBars" @click="performEnhancementBars">{{ $vuetify.lang.t('$vuetify.gooboo.add') }}</v-btn>
      <v-btn class="ma-1" color="primary" :disabled="enhancementBars < enhancementBarsNeeded || !canEnhanceFinal" @click="performEnhancementFinal">{{ $vuetify.lang.t('$vuetify.mining.enhance') }}</v-btn>
    </div>
    <smeltery v-if="unlock.miningSmeltery.see && subfeature === 0" class="mt-4 mt-lg-8"></smeltery>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Consumable from '../../render/Consumable.vue';
import Currency from '../../render/Currency.vue'
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import Ingredient from './Ingredient.vue';
import Smeltery from './Smeltery.vue';

export default {
  components: { Currency, Ingredient, Consumable, StatBreakdown, PriceTag, Smeltery, AlertText },
  data: () => ({
    subfeatureCurrencies: [
      ['mining_resin', 'mining_granite', 'mining_salt', 'mining_coal', 'mining_sulfur', 'mining_niter', 'mining_obsidian', 'mining_deeprock', 'mining_glowshard'],
      ['mining_smoke']
    ]
  }),
  computed: {
    ...mapState({
      ingredients: state => state.mining.ingredient,
      ingredientList: state => state.mining.ingredientList,
      unlock: state => state.unlock,
      upgrade: state => state.upgrade.item,
      pickaxePower: state => state.mining.pickaxePower,
      resin: state => state.mining.resin,
      resinCurrency: state => state.currency.mining_resin,
      subfeature: state => state.system.features.mining.currentSubfeature,
      isFrozen: state => state.cryolab.mining.active,
      enhancement: state => state.mining.enhancement,
      enhancementIngredient: state => state.mining.enhancementIngredient,
      enhancementBars: state => state.mining.enhancementBars,
      currency: state => state.currency
    }),
    ...mapGetters({
      pickaxeStats: 'mining/pickaxeStats',
      pickaxeCost: 'mining/pickaxeCost',
      enhancementChance: 'mining/enhancementChance',
      enhancementBarsNeeded: 'mining/enhancementBarsNeeded',
      enhancementFinalNeeded: 'mining/enhancementFinalNeeded'
    }),
    canCraftPickaxe() {
      return this.ingredientList.length > 0 && this.$store.getters['mining/pickaxeCanAfford'] && this.pickaxeStats.purity >= 0.001;
    },
    pickaxeEmptySlots() {
      return Math.max(0, this.$store.getters['mult/get']('miningPickaxeCraftingSlots') - this.ingredientList.length);
    },
    pickaxePremiumSlots() {
      return this.$store.getters['mult/get']('miningPickaxePremiumCraftingSlots');
    },
    oreQuality() {
      return this.$store.getters['mult/get']('miningOreQuality');
    },
    pickaxeUpgradeChance() {
      return this.ingredientList.length > 0 ? this.$store.getters['mining/pickaxeUpgradeChance'] : 0;
    },
    canAffordGoldenHammer() {
      return this.$store.getters['consumable/canAfford']('mining_goldenHammer');
    },
    pickaxeMult() {
      let arr = [];
      if (this.pickaxeStats.alloying > 1) {
        arr.push({name: 'alloying', value: this.pickaxeStats.alloying});
      }
      if (this.resin > 0) {
        arr.push({name: 'miningResin', value: this.resin * 0.3 + 1});
      }
      return arr;
    },
    pickaxePurityMult() {
      let arr = [];
      if (this.resin > 0) {
        arr.push({name: 'miningResin', value: this.resin * 0.25 + 1});
      }
      return arr;
    },
    resinMax() {
      return this.$store.getters['mult/get']('miningResinMax');
    },
    resinAmount() {
      return this.$store.getters['currency/value']('mining_resin');
    },
    currentSmoke() {
      return this.$store.state.currency.mining_smoke.value;
    },
    currentSmokePower() {
      return this.$store.getters['mult/get']('miningPickaxeCraftingPower', this.currentSmoke);
    },
    canEnhanceBars() {
      return this.enhancementIngredient !== null && this.currency['mining_' + this.enhancementIngredient].value >= 1;
    },
    canEnhanceFinal() {
      return this.enhancementIngredient !== null && this.currency['mining_' + this.enhancementIngredient].value >= this.enhancementFinalNeeded;
    }
  },
  methods: {
    addIngredient(name) {
      if (this.unlock.miningPickaxeCrafting.use && this.ingredientList.length < this.$store.getters['mult/get']('miningPickaxeCraftingSlots')) {
        this.$store.commit('mining/addIngredient', name);
      }
    },
    craftPickaxe(consumables = {}) {
      const price = this.$store.getters['consumable/priceMultiple'](consumables).price;
      if (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'consumable',
          subtype: 'craftPickaxe',
          consumable: consumables,
          price: this.$store.getters['currency/filterPrice'](price, 'gem'),
        }});
      } else {
        this.$store.dispatch('mining/craftPickaxe', consumables);
      }
    },
    removeResin() {
      this.$store.commit('mining/updateKey', {key: 'resin', value: this.resin - 1});
    },
    addResin() {
      this.$store.commit('mining/updateKey', {key: 'resin', value: this.resin + 1});
    },
    setEnhancementIngredient(name) {
      if (this.unlock.miningEnhancement.use) {
        this.$store.commit('mining/updateKey', {key: 'enhancementIngredient', value: this.enhancementIngredient === name ? null : name});
      }
    },
    performEnhancementBars() {
      this.$store.dispatch('mining/enhanceBars');
    },
    performEnhancementFinal() {
      this.$store.dispatch('mining/enhanceFinal');
    }
  }
}
</script>
