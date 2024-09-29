<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <currency v-if="subfeature === 0" large class="ma-1" name="village_coin" :baseArray="foodConversion">
        <alert-text type="info">{{ $vuetify.lang.t('$vuetify.village.coinNotAffected') }}</alert-text>
      </currency>
      <currency v-else-if="subfeature === 1" large class="ma-1" name="village_copperCoin"></currency>
    </div>
    <div v-if="stat.village_wood.total > 0" class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.material`) }}</div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <template v-for="item in material">
        <currency :key="item" class="ma-1" :class="{'premium-glow': upgrade[`village_more${ item.charAt(8).toUpperCase() + item.slice(9) }`].level >= 1}" :name="item"></currency>
      </template>
    </div>
    <div v-if="subfeature === 0 && (stat.village_grain.total > 0 || stat.village_fruit.total > 0)" class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.food`) }}</div>
    <div v-if="subfeature === 0" class="d-flex flex-wrap justify-center ma-1">
      <template v-for="item in food">
        <currency :key="item" class="ma-1" :name="item">{{ $vuetify.lang.t(`$vuetify.village.foodConsume`, $formatNum(foodConsumption, true)) }}</currency>
      </template>
    </div>
    <div v-if="subfeature === 0 && stat.village_knowledge.total > 0" class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.mental`) }}</div>
    <div v-if="subfeature === 0" class="d-flex flex-wrap justify-center ma-1">
      <template v-for="item in mental">
        <currency
          :key="item"
          class="ma-1"
          :class="{'premium-glow': mental_premium.includes(item) && upgrade[`village_more${ item.charAt(8).toUpperCase() + item.slice(9) }`].level >= 1}"
          :name="item"
          :gainBase="item === 'village_joy' ? joyGainBase : null"
        >
          <alert-text v-if="item === 'village_faith'" type="info">{{ $vuetify.lang.t('$vuetify.village.faithNotAffected') }}</alert-text>
        </currency>
      </template>
    </div>
    <template v-if="subfeature === 0 && canSeeLoot">
      <div class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.loot`) }}</div>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.village.loot')">
        <template v-slot:activator="{ on, attrs }">
          <div class="mx-4 my-1" v-bind="attrs" v-on="on">
            <v-progress-linear class="rounded" height="24" :value="explorerProgress * 100">
              <span v-if="lootSecondsLeft !== null">{{ $formatTime(lootSecondsLeft) }}</span>
            </v-progress-linear>
          </div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.village.lootDescription`) }}</div>
        <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.villageLootGain') }}</h3>
        <stat-breakdown name="villageLootGain"></stat-breakdown>
        <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.villageLootQuality') }}</h3>
        <stat-breakdown name="villageLootQuality"></stat-breakdown>
        <div>{{ $vuetify.lang.t(`$vuetify.village.lootRarity`) }}</div>
        <div
          v-for="(weight, key) in lootWeights"
          :key="`loot-weight-${ key }`"
          class="d-flex align-center rounded mt-1 pa-1 pr-2"
          :class="[currency[`village_loot${ key }`].color, $vuetify.theme.dark ? 'darken-2' : 'lighten-2']"
        >
          <v-icon class="mr-1">{{ currency[`village_loot${ key }`].icon }}</v-icon>
          <div>{{ $vuetify.lang.t(`$vuetify.currency.village_loot${ key }.name`) }}</div>
          <v-spacer></v-spacer>
          <div>{{ $formatNum(100 * weight / lootTotalWeight, true) }}%</div>
        </div>
        <div
          v-if="lootWeights.length < 6"
          class="d-flex align-center rounded mt-1 pa-1 pr-2"
          :class="[currency[`village_loot${ lootWeights.length }`].color, $vuetify.theme.dark ? 'darken-2' : 'lighten-2']"
        >
          <v-icon class="mr-1">{{ currency[`village_loot${ lootWeights.length }`].icon }}</v-icon>
          <div>???</div>
          <v-spacer></v-spacer>
          <div>{{ $vuetify.lang.t(`$vuetify.village.lootNeedQuality`, $formatNum((lootWeights.length - 1) * 50)) }}</div>
        </div>
      </gb-tooltip>
      <div class="d-flex flex-wrap justify-center ma-1">
        <template v-for="item in loot">
          <currency :key="item" class="ma-1" :name="item"></currency>
        </template>
      </div>
    </template>
    <template v-if="subfeature === 1 && canSeeSpecialIngredients">
      <div class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.specialIngredient`) }}</div>
      <div class="d-flex flex-wrap justify-center ma-1">
        <currency v-for="item in specialIngredient" :key="item" class="ma-1" :name="item"></currency>
      </div>
      <div class="d-flex justify-center"><consumable name="village_ingredientBox" @click="openIngredientBox"></consumable></div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { SECONDS_PER_HOUR, VILLAGE_COINS_PER_FOOD } from '../../../js/constants';
import Consumable from '../../render/Consumable.vue';
import Currency from '../../render/Currency.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';

export default {
  components: { Currency, StatBreakdown, AlertText, Consumable },
  data: () => ({
    mental_premium: ['village_knowledge', 'village_science']
  }),
  computed: {
    ...mapState({
      stat: state => state.stat,
      upgrade: state => state.upgrade.item,
      currency: state => state.currency,
      explorerProgress: state => state.village.explorerProgress,
      subfeature: state => state.system.features.village.currentSubfeature
    }),
    ...mapGetters({
      list: 'currency/list',
      lootWeights: 'village/lootWeights',
      joyGainBase: 'village/joyGainBase'
    }),
    foodConsumption() {
      return this.$store.getters['mult/get']('villageTaxRate') * this.$store.getters['village/employed'];
    },
    material() {
      return this.list('village', 'regular', 'material');
    },
    food() {
      return this.list('village', 'regular', 'food');
    },
    mental() {
      return this.list('village', 'regular', 'mental');
    },
    loot() {
      return this.list('village', 'regular', 'loot');
    },
    specialIngredient() {
      return this.list('village', 'regular', 'specialIngredient');
    },
    canSeeLoot() {
      return this.$store.state.unlock.villageLoot.see;
    },
    canSeeSpecialIngredients() {
      return this.$store.state.unlock.villageSpecialIngredient.see;
    },
    lootTotalWeight() {
      let total = 0;
      for (const [, elem] of Object.entries(this.lootWeights)) {
        total += elem;
      }
      return total;
    },
    lootSecondsLeft() {
      const lootGain = this.$store.getters['mult/get']('villageLootGain');
      if (lootGain <= 0) {
        return null;
      }
      return Math.ceil((1 - this.explorerProgress) * SECONDS_PER_HOUR / lootGain);
    },
    foodConversion() {
      const taxpayers = this.$store.getters['mult/get']('villageTaxRate') * this.$store.getters['village/employed'];
      if (taxpayers <= 0) {
        return [];
      }
      return this.food.map(currencyName => {
        const food = currencyName.split('_')[1];
        const nextAmount = this.$store.getters['currency/value']('village_' + food) + this.$store.getters['mult/get'](this.$store.getters['currency/gainMultName']('village', food));
        return {name: 'villageFood_' + food, value: Math.min(taxpayers, nextAmount) * VILLAGE_COINS_PER_FOOD};
      }).filter(elem => elem.value > 0);
    }
  },
  methods: {
    openIngredientBox() {
      const consumables = {village_ingredientBox: 1};
      const price = this.$store.getters['consumable/priceMultiple'](consumables).price;
      if (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'consumable',
          subtype: 'openIngredientBox',
          consumable: consumables,
          price: this.$store.getters['currency/filterPrice'](price, 'gem'),
        }});
      } else {
        this.$store.dispatch('village/openIngredientBox');
      }
    }
  }
}
</script>
