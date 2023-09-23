<style scoped>
.ingredient-empty {
  width: 96px;
  height: 96px;
}
.opacity-01 {
  opacity: 0.1;
}
</style>

<template>
  <div>
    <div class="d-flex flex-wrap justify-center pa-1">
      <currency v-for="item in baseCurrencies" :key="`currency-${item}`" class="ma-1" :name="`event_${item}`"></currency>
    </div>
    <div class="d-flex flex-wrap justify-center mt-4 pa-1">
      <currency v-for="item in ingredientCurrencies" :key="`currency-${item}`" class="ma-1" :name="`event_${item}`" @click="addIngredient(item)">
        <template v-if="hasBonusSlots">
          <div class="text-center">{{ $vuetify.lang.t(`$vuetify.event.nightHunt.asBonusIngredient`) }}:</div>
          <display-row class="mt-0" v-for="(subitem, key) in ingredientStat[item].effect" :key="`${subitem.name}-${subitem.type}-${key}`" :name="subitem.name" :type="subitem.type" :after="subitem.value"></display-row>
        </template>
      </currency>
    </div>
    <div class="d-flex flex-wrap justify-center mt-12 pa-1">
      <night-hunt-ingredient class="ma-1" v-for="(item, key) in ritualIngredients" :key="'ritual-' + key" key-name="ritualIngredients" :index="key"></night-hunt-ingredient>
      <div v-for="i in emptyRitualSlots" class="ingredient-empty rounded-lg bg-tile-default ma-1" :key="'ritual-e-' + i"></div>
      <div v-if="hasBonusSlots" class="mx-4"></div>
      <night-hunt-ingredient class="ma-1" v-for="(item, key) in bonusIngredients" :key="'bonus-' + key" key-name="bonusIngredients" :index="key"></night-hunt-ingredient>
      <div v-for="i in emptyBonusSlots" class="ingredient-empty rounded-lg bg-tile-default ma-1" :key="'bonus-e-' + i"></div>
    </div>
    <div v-if="ritualIngredients.length > 0" class="d-flex flex-wrap justify-center pa-1">
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.nightHuntRitualStability`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-2" v-bind="attrs" v-on="on">
            <v-icon color="error" class="mr-1">mdi-scale-balance</v-icon>
            <span class="error--text">{{ $formatNum(ritualStats.nightHuntRitualStability * 100, true) }}%</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.event.nightHunt.ritualStabilityDescription`) }}</div>
        <div>{{ $vuetify.lang.t(`$vuetify.event.nightHunt.ritualStabilityDescription1`, $formatNum(stabilityChance1, true)) }}</div>
        <div v-if="hasBonusSlots">{{ $vuetify.lang.t(`$vuetify.event.nightHunt.ritualStabilityDescription2`, $formatNum(stabilityChance2, true)) }}</div>
        <div>{{ $vuetify.lang.t(`$vuetify.event.nightHunt.ritualStabilityDescription3`, $formatNum(stabilityChance3, true)) }}</div>
        <stat-breakdown
          name="nightHuntRitualStability"
          :base="ritualBaseStats.nightHuntRitualStability.base"
          :baseArray="ritualArrays.nightHuntRitualStability.base"
          :multArray="ritualArrays.nightHuntRitualStability.mult"
          :bonusArray="ritualArrays.nightHuntRitualStability.bonus"
        ></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.nightHuntRitualSuccessChance`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-2" v-bind="attrs" v-on="on">
            <v-icon color="success" class="mr-1">mdi-check</v-icon>
            <span class="success--text">{{ $formatNum(ritualStats.nightHuntRitualSuccessChance * 100, true) }}%</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.event.nightHunt.ritualSuccessDescription`) }}</div>
        <stat-breakdown
          name="nightHuntRitualSuccessChance"
          :base="ritualBaseStats.nightHuntRitualSuccessChance.base"
          :baseArray="ritualArrays.nightHuntRitualSuccessChance.base"
          :multArray="ritualArrays.nightHuntRitualSuccessChance.mult"
          :bonusArray="ritualArrays.nightHuntRitualSuccessChance.bonus"
        ></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip v-if="ritualStats.nightHuntRitualFamiliarity > 0" :title-text="$vuetify.lang.t(`$vuetify.mult.nightHuntRitualFamiliarity`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-2" v-bind="attrs" v-on="on">
            <v-icon color="warning" class="mr-1">mdi-finance</v-icon>
            <span class="warning--text">+{{ $formatNum(ritualStats.nightHuntRitualFamiliarity * 100, true) }}%</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.event.nightHunt.ritualFamiliarityDescription`) }}</div>
        <stat-breakdown
          name="nightHuntRitualFamiliarity"
          :baseArray="ritualArrays.nightHuntRitualFamiliarity.base"
          :multArray="ritualArrays.nightHuntRitualFamiliarity.mult"
          :bonusArray="ritualArrays.nightHuntRitualFamiliarity.bonus"
        ></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip v-if="ritualStats.nightHuntRitualHintChance > 0" :title-text="$vuetify.lang.t(`$vuetify.mult.nightHuntRitualHintChance`)">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center ma-2" v-bind="attrs" v-on="on">
            <v-icon color="info" class="mr-1">mdi-information-variant</v-icon>
            <span class="info--text">{{ $formatNum(ritualStats.nightHuntRitualHintChance * 100, true) }}%</span>
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.event.nightHunt.ritualHintDescription`, $formatNum(hintPenalty)) }}</div>
        <stat-breakdown
          name="nightHuntRitualHintChance"
          :baseArray="ritualArrays.nightHuntRitualHintChance.base"
          :multArray="ritualArrays.nightHuntRitualHintChance.mult"
          :bonusArray="ritualArrays.nightHuntRitualHintChance.bonus"
        ></stat-breakdown>
      </gb-tooltip>
    </div>
    <div v-else style="height: 48px;"></div>
    <div class="d-flex justify-center align-center pa-1 pb-3">
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn class="ma-1" color="primary" :disabled="!canPerformRitual" @click="performRitual">{{ $vuetify.lang.t(`$vuetify.event.nightHunt.performRitual`) }}</v-btn>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.event.nightHunt.performRitualDescription`) }}</div>
        <div v-if="ritualIngredients.length > 0" class="d-flex flex-wrap">
          <price-tag class="ma-1" v-for="(item, key) in ritualCost" :key="'cost-' + key" :currency="`event_${key}`" :amount="item"></price-tag>
        </div>
      </gb-tooltip>
      <v-icon v-if="ritualIngredients.length > 0 && !ritualPerformed" color="success" large class="ma-1">mdi-new-box</v-icon>
      <v-icon v-else large class="ma-1 opacity-01">mdi-new-box</v-icon>
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-badge bottom bordered overlap :content="$formatNum(undiscoveredRituals)" :value="ritualIngredients.length > 0" :color="undiscoveredRituals > 0 ? 'primary' : 'error'">
            <v-icon :class="{'opacity-01': undiscoveredRituals <= 0}" large v-bind="attrs" v-on="on">mdi-flask-round-bottom</v-icon>
          </v-badge>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.event.nightHunt.findablePotions`) }}</div>
      </gb-tooltip>
    </div>
    <div v-if="currentHint" class="d-flex flex-wrap justify-center align-center pa-1">
      <div class="bg-tile-default rounded ma-1 pa-2" v-for="(item, key) in currentHintPosition" :key="'position-' + key">
        <currency-icon v-if="item !== null" :name="`event_${item}`" large></currency-icon>
        <v-icon v-else>mdi-help</v-icon>
      </div>
      <div class="mx-2"></div>
      <v-badge v-for="(item, key) in currentHintIngredient" :key="'ingredient-' + key" class="ma-2" bottom bordered offset-x="10" offset-y="10" :content="$formatNum(item)" :color="item > 0 ? 'primary' : 'error'">
        <currency-icon :name="`event_${key}`" large></currency-icon>
      </v-badge>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { NIGHT_HUNT_HINT_PENALTY } from '../../../js/constants';
import { buildArray } from '../../../js/utils/array';
import Currency from '../../render/Currency.vue';
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import NightHuntIngredient from './NightHuntIngredient.vue';

export default {
  components: { Currency, NightHuntIngredient, DisplayRow, CurrencyIcon, StatBreakdown, PriceTag },
  data: () => ({
    baseCurrencies: ['essence', 'magic', 'nightHuntToken']
  }),
  computed: {
    ...mapState({
      ritualIngredients: state => state.nightHunt.ritualIngredients,
      bonusIngredients: state => state.nightHunt.bonusIngredients,
      ingredientStat: state => state.nightHunt.ingredientStat
    }),
    ...mapGetters({
      canPerformRitual: 'nightHunt/canPerformRitual',
      ritualBaseStats: 'nightHunt/ritualBaseStats',
      ritualBonusStats: 'nightHunt/ritualBonusStats',
      ritualStats: 'nightHunt/ritualStats',
      ritualPerformed: 'nightHunt/ritualPerformed',
      undiscoveredRituals: 'nightHunt/undiscoveredRituals',
      ritualCost: 'nightHunt/ritualCost'
    }),
    emptyRitualSlots() {
      return this.$store.getters['mult/get']('nightHuntMaxIngredients') - this.ritualIngredients.length;
    },
    emptyBonusSlots() {
      return this.$store.getters['mult/get']('nightHuntBonusIngredientCount') - this.bonusIngredients.length;
    },
    hasBonusSlots() {
      return this.$store.getters['mult/get']('nightHuntBonusIngredientCount') > 0;
    },
    ingredientCurrencies() {
      return Object.keys(this.ingredientStat);
    },
    currentHint() {
      return this.$store.state.nightHunt.ritualHint[this.ritualIngredients.length] ?? null;
    },
    currentHintTarget() {
      if (!this.currentHint) {
        return null;
      }
      return this.$store.state.nightHunt.potion[this.currentHint.target].recipe;
    },
    currentHintPosition() {
      if (!this.currentHint) {
        return null;
      }
      return buildArray(this.ritualIngredients.length).map(elem => this.currentHint.position.includes(elem) ? this.currentHintTarget[elem] : null);
    },
    currentHintIngredient() {
      if (!this.currentHint) {
        return null;
      }
      let obj = {};
      this.currentHint.ingredient.forEach(elem => {
        obj[elem] = this.currentHintTarget.filter(el => el === elem).length;
      });
      return obj;
    },
    ritualArrays() {
      let obj = {};
      ['nightHuntRitualStability', 'nightHuntRitualSuccessChance', 'nightHuntRitualFamiliarity', 'nightHuntRitualHintChance'].forEach(stat => {
        obj[stat] = {base: [], mult: [], bonus: []};
        if (this.ritualBaseStats[stat].mult !== undefined) {
          obj[stat].mult.push({name: 'ritualTier', value: this.ritualBaseStats[stat].mult});
        }
        if (this.ritualBaseStats[stat].bonus !== undefined) {
          obj[stat].bonus.push({name: stat === 'nightHuntRitualHintChance' ? 'ritualHint' : 'ritualPotionLevel', value: this.ritualBaseStats[stat].bonus});
        }
        ['base', 'mult', 'bonus'].forEach(elem => {
          if (this.ritualBonusStats[stat][elem] !== undefined) {
            obj[stat][elem].push({name: 'ritualIngredient', value: this.ritualBonusStats[stat][elem]});
          }
        });
      });
      return obj;
    },
    stabilityChance1() {
      return Math.min(1, Math.max(0, this.ritualStats.nightHuntRitualStability - 1)) * 100;
    },
    stabilityChance2() {
      return Math.min(1, Math.max(0, this.ritualStats.nightHuntRitualStability)) * 100;
    },
    stabilityChance3() {
      return (1 - Math.min(1, Math.max(0, this.ritualStats.nightHuntRitualStability + 1))) * 100;
    },
    hintPenalty() {
      return NIGHT_HUNT_HINT_PENALTY * 100;
    }
  },
  methods: {
    addIngredient(name) {
      if (this.emptyRitualSlots > 0) {
        this.$store.commit('nightHunt/addIngredient', {key: 'ritualIngredients', name});
      } else if (this.emptyBonusSlots > 0) {
        this.$store.commit('nightHunt/addIngredient', {key: 'bonusIngredients', name});
      }
    },
    performRitual() {
      this.$store.dispatch('nightHunt/performRitual');
    }
  }
}
</script>
