<template>
  <v-card class="d-flex pa-2 pr-1 align-center">
    <price-tag v-if="name === null" class="mx-1" currency="treasure_fragment" :amount="fragmentGain" add></price-tag>
    <v-icon v-else-if="typeObj.icon" large class="mr-1">{{ typeObj.icon }}</v-icon>
    <price-tag class="mx-1" currency="gem_emerald" :amount="price"></price-tag>
    <v-btn v-if="name === null" small class="mx-1" color="primary" :disabled="!canAfford" @click="buyItem(true)">{{ $vuetify.lang.t(`$vuetify.gooboo.max`) }}</v-btn>
    <v-btn :data-cy="`treasure-buy-${ name !== null ? name : 'fragment' }`" class="mx-1" color="primary" :disabled="!canAfford || (name !== null && newItem !== null)" @click="buyItem(false)">{{ $vuetify.lang.t(`$vuetify.gooboo.buy`) }}</v-btn>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { TREASURE_FRAGMENT_BUY_COST } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { PriceTag },
  props: {
    name: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState({
      newItem: state => state.treasure.newItem
    }),
    typeObj() {
      return this.name === null ? {} : this.$store.state.treasure.type[this.name];
    },
    canAfford() {
      return this.$store.getters['currency/value']('gem_emerald') >= this.price;
    },
    price() {
      return this.name === null ? TREASURE_FRAGMENT_BUY_COST : this.typeObj.buyPrice;
    },
    fragmentGain() {
      return this.$store.getters['treasure/fragmentGain'];
    }
  },
  methods: {
    buyItem(max = false) {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        if (this.name === null) {
          const amount = Math.min(Math.floor(this.$store.getters['currency/value']('gem_emerald') / TREASURE_FRAGMENT_BUY_COST), max ? Infinity : 1);
          this.$store.commit('system/updateKey', {key: 'confirm', value: {
            type: 'treasureFragment',
            max,
            price: {gem_emerald: this.price * amount},
            gain: {treasure_fragment: this.fragmentGain * amount},
          }});
        } else {
          this.$store.commit('system/updateKey', {key: 'confirm', value: {
            type: 'treasure',
            treasureType: this.name,
            price: {gem_emerald: this.price},
          }});
        }
      } else {
        if (this.name === null) {
          this.$store.dispatch('treasure/buyFragments', max);
        } else {
          this.$store.dispatch('treasure/buy', this.name);
        }
      }
    }
  }
}
</script>
