<template>
  <div class="d-flex justify-center flex-wrap ma-1">
    <currency v-for="item in gems" class="ma-1" :key="item" :name="'gem_' + item"></currency>
  </div>
</template>

<script>
import Currency from '../../render/Currency.vue';

export default {
  components: { Currency },
  data: () => ({
    gems: ['ruby', 'emerald', 'sapphire', 'amethyst', 'topaz', 'diamond', 'onyx']
  })
}
</script>
