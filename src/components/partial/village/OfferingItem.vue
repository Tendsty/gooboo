<template>
  <div class="bg-tile-default elevation-2 pa-1 rounded">
    <currency always-show class="my-1 mx-auto" :name="`village_${name}`"></currency>
    <div class="d-flex align-center">
      <v-chip class="ma-1" style="height: 28px;">
        <v-icon class="mr-1">mdi-fire</v-icon>
        {{ offering.offeringBought }}
      </v-chip>
      <v-spacer></v-spacer>
      <price-tag class="ma-1" :currency="`village_${name}`" :amount="sacrificeCost"></price-tag>
      <v-btn small class="ma-1" color="primary" :disabled="!canAffordSacrifice || disabled" @click="buySacrifice(true)">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn class="ma-1" color="primary" :disabled="!canAffordSacrifice || disabled" @click="buySacrifice(false)">{{ $vuetify.lang.t('$vuetify.village.offering.sacrifice') }}</v-btn>
          </div>
        </template>
        <div class="mt-0">
          <span>{{ $vuetify.lang.t('$vuetify.village.offering.description.0') }}</span>
          <span>{{ $formatNum(sacrificeCost) }}&nbsp;</span>
          <currency-icon :name="'village_' + name"></currency-icon>
          <span>{{ $vuetify.lang.t('$vuetify.village.offering.description.1') }}</span>
          <span>{{ $formatNum(offering.amount) }}&nbsp;</span>
          <currency-icon name="village_offering"></currency-icon>
          <span>{{ $vuetify.lang.t('$vuetify.village.offering.description.2') }}</span>
        </div>
      </gb-tooltip>
    </div>
    <div class="d-flex align-center">
      <v-chip class="ma-1" style="height: 28px;">
        <v-icon class="mr-1">mdi-chevron-double-up</v-icon>
        {{ offering.upgradeBought }}
      </v-chip>
      <v-spacer></v-spacer>
      <price-tag class="ma-1" currency="village_offering" :amount="offering.amount"></price-tag>
      <v-btn small class="ma-1" color="primary" :disabled="!canAffordUpgrade || disabled" @click="buyUpgrade(true)">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn class="ma-1" color="primary" :disabled="!canAffordUpgrade || disabled" @click="buyUpgrade(false)">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
          </div>
        </template>
        <display-row class="mt-0" :name="capName" type="base" :before="valueBefore" :after="valueAfter"></display-row>
      </gb-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { capitalize } from '../../../js/utils/format';
import Currency from '../../render/Currency.vue';
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import PriceTag from '../../render/PriceTag.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { Currency, PriceTag, DisplayRow, CurrencyIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      currency: state => state.currency
    }),
    offering() {
      return this.$store.state.village.offering[this.name];
    },
    sacrificeCost() {
      return this.offering.cost(this.offering.offeringBought);
    },
    canAffordSacrifice() {
      return this.$store.getters['currency/value']('village_' + this.name) >= this.sacrificeCost;
    },
    canAffordUpgrade() {
      return this.$store.getters['currency/value']('village_offering') >= this.offering.amount;
    },
    capName() {
      return 'currencyVillage' + capitalize(this.name) + 'Cap';
    },
    valuePerOffering() {
      return this.$store.getters['mult/get']('villageOfferingPower', this.offering.effect);
    },
    valueBefore() {
      return this.offering.upgradeBought * this.valuePerOffering;
    },
    valueAfter() {
      return (this.offering.upgradeBought + 1) * this.valuePerOffering;
    }
  },
  methods: {
    buySacrifice(max) {
      this.$store.dispatch('village/buyOffering', {name: this.name, max});
    },
    buyUpgrade(max) {
      this.$store.dispatch('village/upgradeOffering', {name: this.name, buyMax: max});
    }
  }
}
</script>
