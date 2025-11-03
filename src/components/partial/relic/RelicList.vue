<template>
  <div>
    <div class="d-flex justify-center ma-1 mt-2">
      <currency name="relic_power" large></currency>
    </div>
    <div class="d-flex flex-wrap ma-1 pb-2">
      <item class="ma-1" v-for="(item, key) in owned" :key="key" :name="item"></item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Currency from '../../render/Currency.vue';
import Item from './Item.vue';

export default {
  components: { Item, Currency },
  computed: {
    ...mapGetters({
      owned: 'relic/owned'
    })
  }
}
</script>
