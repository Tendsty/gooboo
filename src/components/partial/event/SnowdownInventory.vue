<template>
  <div>
    <div class="d-flex flex-wrap justify-center pa-1">
      <currency v-for="item in currencies" :key="`currency-${item}`" class="ma-1" :name="`event_${item}`"></currency>
    </div>
    <div class="d-flex justify-center align-center pa-1">
      <div class="d-flex align-center bg-tile-default elevation-2 rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="event_snowball" :amount="boostCost"></price-tag>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div class="ma-1" v-bind="attrs" v-on="on">
              <v-btn color="primary" :disabled="snowball < boostCost" @click="useBoost">
                <v-icon class="mr-2">mdi-chevron-double-right</v-icon>
                {{ $vuetify.lang.t(`$vuetify.gooboo.boost`) }}
              </v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.snowdown.boost') }}</div>
        </gb-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { SECONDS_PER_DAY, SNOWDOWN_BOOST_COST } from '../../../js/constants';
import tick from '../../../js/modules/event/snowdown/tick';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { Currency, PriceTag },
  data: () => ({
    currencies: ['sapling', 'yarn', 'dough', 'snow', 'snowball', 'snowdownToken']
  }),
  computed: {
    ...mapState({
      snowball: state => state.currency.event_snowball.value
    }),
    boostCost() {
      return SNOWDOWN_BOOST_COST;
    }
  },
  methods: {
    useBoost() {
      if (this.snowball >= this.boostCost) {
        tick(SECONDS_PER_DAY);
        this.$store.dispatch('currency/spend', {feature: 'event', name: 'snowball', amount: this.boostCost});
      }
    }
  }
}
</script>
