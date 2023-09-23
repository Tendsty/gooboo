<template>
  <div>
    <div class="d-flex flex-wrap justify-center pa-1">
      <currency v-for="item in currencies" :key="`currency-${ item }`" class="ma-1" :name="`event_${ item }`"></currency>
    </div>
  </div>
</template>

<script>
import Currency from '../../render/Currency.vue';

export default {
  components: { Currency },
  data: () => ({
    currencies: ['cloud', 'weatherChaosToken', 'algae', 'driftwood', 'plastic', 'slime']
  }),
}
</script>
