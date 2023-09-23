<template>
  <div class="d-flex align-center bg-tile-default rounded pa-1">
    <price-tag class="ma-1" currency="event_wax" :amount="candle.cost"></price-tag>
    <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.event.cinders.candle.${name}`)">
      <template v-slot:activator="{ on, attrs }">
        <div class="ma-1" v-bind="attrs" v-on="on">
          <v-btn min-width="36" color="primary" class="px-2" :disabled="!canAfford" @click="useCandle">
            <v-icon>{{ candle.icon }}</v-icon>
          </v-btn>
        </div>
      </template>
      <div>{{ $vuetify.lang.t(`$vuetify.event.cinders.candle.duration`, $formatTime(candle.duration)) }}</div>
      <div class="mt-0">x{{ $formatNum(candlePower, true) }} {{ $vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t(`$vuetify.currency.event_light.name`)) }}</div>
      <div class="mt-0">
        <span>{{ $vuetify.lang.t(`$vuetify.event.cinders.candle.sootGain.0`) }}</span>
        <span>{{ candle.soot }}</span>
        <span>{{ $vuetify.lang.t(`$vuetify.event.cinders.candle.sootGain.1`) }}</span>
        <currency-icon name="event_soot"></currency-icon>
        <span>{{ $vuetify.lang.t(`$vuetify.event.cinders.candle.sootGain.2`) }}</span>
      </div>
    </gb-tooltip>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { PriceTag, CurrencyIcon },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      currency: state => state.currency
    }),
    candle() {
      return this.$store.state.cinders.candle[this.name];
    },
    canAfford() {
      return this.$store.getters['currency/value']('event_wax') >= this.candle.cost;
    },
    candlePower() {
      return this.$store.getters['mult/get']('cindersCandlePower', this.candle.lightMult - 1, 1, 1);
    }
  },
  methods: {
    useCandle() {
      this.$store.dispatch('cinders/useCandle', this.name);
    }
  }
}
</script>
