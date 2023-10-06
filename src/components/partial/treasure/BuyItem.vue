<template>
  <v-card class="d-flex pa-2 pr-1 align-center">
    <gb-tooltip :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-icon large class="mr-1" v-bind="attrs" v-on="on">{{ typeObj.icon ? typeObj.icon : 'mdi-help' }}</v-icon>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.treasure.buyTreasure`) }}</div>
    </gb-tooltip>
    <price-tag class="mx-1" currency="gem_emerald" :amount="price"></price-tag>
    <v-btn :data-cy="`treasure-buy-${ name }`" class="mx-1" color="primary" :disabled="!canAfford || newItem !== null" @click="buyItem">{{ $vuetify.lang.t(`$vuetify.gooboo.buy`) }}</v-btn>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { PriceTag },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      newItem: state => state.treasure.newItem
    }),
    typeObj() {
      return this.$store.state.treasure.type[this.name];
    },
    canAfford() {
      return this.$store.getters['currency/value']('gem_emerald') >= this.price;
    },
    price() {
      return this.typeObj.buyPrice;
    }
  },
  methods: {
    buyItem() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'treasure',
          treasureType: this.name,
          price: {gem_emerald: this.price},
        }});
      } else {
        this.$store.dispatch('treasure/buy', this.name);
      }
    }
  }
}
</script>
