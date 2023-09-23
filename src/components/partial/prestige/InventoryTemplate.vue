<template>
  <div>
    <div class="d-flex justify-center flex-wrap ma-1">
      <currency v-for="item in currencies" :key="'currency-' + item" class="ma-1" :name="item"></currency>
    </div>
    <div class="d-flex justify-center flex-wrap ma-1">
      <div v-for="(item, key) in prestigeStones" :key="'stone-' + key" class="d-flex align-center bg-tile-default elevation-2 rounded ma-1 pa-1">
        <price-tag class="ma-1" add :currency="item.currency" :amount="stat[item.stat].total"></price-tag>
        <consumable class="ma-1" name="gem_prestigeStone" :disabled="disabled" @click="fastPrestige(item)"></consumable>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Consumable from '../../render/Consumable.vue';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { Currency, Consumable, PriceTag },
  props: {
    currencies: {
      type: Array,
      required: false,
      default: () => []
    },
    prestigeStones: {
      type: Array,
      required: false,
      default: () => []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      stat: state => state.stat
    })
  },
  methods: {
    fastPrestige(item) {
      if (this.$store.getters['consumable/canAfford']('gem_prestigeStone')) {
        const price = this.$store.getters['consumable/priceMultiple']({gem_prestigeStone: 1}).price;
        if (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) {
          this.$store.commit('system/updateKey', {key: 'confirm', value: {
            type: 'consumable',
            subtype: 'fastPrestige',
            prestige: item,
            price: this.$store.getters['currency/filterPrice'](price, 'gem'),
          }});
        } else {
          this.$store.dispatch('gem/fastPrestige', item);
        }
      }
    }
  }
}
</script>
