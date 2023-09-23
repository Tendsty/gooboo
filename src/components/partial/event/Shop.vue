<style scoped>
.shop-amount {
  font-size: 16px;
}
</style>

<template>
  <v-card>
    <v-card-text class="pb-0 pt-2">
      <div class="d-flex justify-center align-center">
        <prize :pool="pool" :prize-base="shop"></prize>
      </div>
      <div class="mx-n1 mt-2" v-if="!isMax">
        <price-tag class="ma-1" v-for="(amount, currency) in shop.price" :key="currency" :currency="currency" :amount="amount"></price-tag>
      </div>
    </v-card-text>
    <v-card-actions>
      <gb-tooltip v-if="shop.cap !== null" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="ma-1" style="height: 28px;" v-bind="attrs" v-on="on">
            <v-icon class="mr-1">mdi-package-variant</v-icon>
            {{ shop.cap - shop.taken }} / {{ shop.cap }}
          </v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.shop.bought') }}</div>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <v-btn small v-if="showMax && !isMax" color="primary" :disabled="maxAfford < 1 || (shop.type === 'treasure' && !hasTreasureSpace)" @click="buyMax">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
      <v-btn v-if="!isMax" color="primary" :disabled="maxAfford < 1 || (shop.type === 'treasure' && !hasTreasureSpace)" @click="buy">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PriceTag from '../../render/PriceTag.vue';
import Prize from './Prize.vue';

export default {
  components: { PriceTag, Prize },
  props: {
    pool: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    shop() {
      return this.$store.getters['event/shopData'](this.pool, this.index);
    },
    maxAfford() {
      return this.$store.getters['event/maxAffordShop'](this.pool, this.index);
    },
    isMax() {
      return this.shop.cap !== null && this.shop.taken >= this.shop.cap;
    },
    showMax() {
      return ['consumable', 'currency', 'cardPack'].includes(this.shop.type);
    },
    hasTreasureSpace() {
      return this.$store.getters['treasure/firstEmptySlot'] !== null;
    }
  },
  methods: {
    buy() {
      if (
        (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](this.shop.price, 'gem')) ||
        (this.$store.state.system.settings.confirm.items.eventToken.value && this.$store.getters['currency/contains'](this.shop.price, 'eventToken'))
      ) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'shop',
          pool: this.pool,
          index: this.index,
          price: this.shop.price,
          max: false,
        }});
      } else {
        this.$store.dispatch('event/buyShop', {pool: this.pool, index: this.index, max: false});
      }
    },
    buyMax() {
      let price = {};
      for (const [key, elem] of Object.entries(this.shop.price)) {
        price[key] = elem * this.maxAfford;
      }
      if (
        (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) ||
        (this.$store.state.system.settings.confirm.items.eventToken.value && this.$store.getters['currency/contains'](price, 'eventToken'))
      ) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'shop',
          pool: this.pool,
          index: this.index,
          price: price,
          max: true,
        }});
      } else {
        this.$store.dispatch('event/buyShop', {pool: this.pool, index: this.index, max: true});
      }
    }
  }
}
</script>
