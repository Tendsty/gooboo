<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <currency large class="ma-1" name="village_coin"></currency>
    </div>
    <div v-if="stat.village_wood.total > 0" class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.material`) }}</div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <template v-for="item in material">
        <currency :key="item" class="ma-1" :class="{'premium-glow': upgrade[`village_more${ item.charAt(8).toUpperCase() + item.slice(9) }`].level >= 1}" :name="item"></currency>
      </template>
    </div>
    <div v-if="stat.village_grain.total > 0 || stat.village_fruit.total > 0" class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.food`) }}</div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <template v-for="item in food">
        <currency :key="item" class="ma-1" :name="item">{{ $vuetify.lang.t(`$vuetify.village.foodConsume`, $formatNum(foodConsumption, true)) }}</currency>
      </template>
    </div>
    <div v-if="stat.village_knowledge.total > 0" class="text-center mt-2">{{ $vuetify.lang.t(`$vuetify.village.mental`) }}</div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <template v-for="item in mental">
        <currency :key="item" class="ma-1" :class="{'premium-glow': mental_premium.includes(item) && upgrade[`village_more${ item.charAt(8).toUpperCase() + item.slice(9) }`].level >= 1}" :name="item"></currency>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Currency from '../../render/Currency.vue';

export default {
  components: { Currency },
  data: () => ({
    mental_premium: ['village_knowledge', 'village_science']
  }),
  computed: {
    ...mapState({
      stat: state => state.stat,
      upgrade: state => state.upgrade.item
    }),
    ...mapGetters({
      list: 'currency/list'
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
    }
  }
}
</script>
